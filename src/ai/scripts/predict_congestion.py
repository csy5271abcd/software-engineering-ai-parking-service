# SmartPark AI 학습 모델을 사용해 주차장별 미래 혼잡도 예측 CSV를 생성한다.
# 출력은 백엔드/MySQL 적재에 사용할 congestion_predictions.csv 스키마를 따른다.

from __future__ import annotations

import json
from dataclasses import dataclass
from datetime import datetime, timedelta
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.pipeline import Pipeline


PREDICTION_HOURS = 24
RANDOM_SEED = 42
MODEL_VERSION_FALLBACK = "ai-congestion-rf-v1"
OUTPUT_ENCODING = "utf-8-sig"
TEST_MODE = False
TEST_MODE_PARKING_LOTS = 30
TEST_MODE_HOURS = 6

CLASS_ORDER = ["LOW", "MEDIUM", "HIGH", "VERY_HIGH"]
DAY_NAMES = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]

PARKING_LOT_COLUMNS = [
    "parking_lot_id",
    "name",
    "district",
    "latitude",
    "longitude",
    "nearby_poi_type",
    "total_spaces",
    "price_per_hour",
    "parking_type",
    "is_public",
    "is_shared",
    "has_nfc",
]

EXTERNAL_FACTOR_COLUMNS = [
    "district",
    "date",
    "hour",
    "weather",
    "temperature",
    "rainfall_mm",
    "event_nearby",
    "event_scale",
    "traffic_level",
    "season",
]

DEFAULT_FEATURE_CANDIDATES = [
    "district",
    "latitude",
    "longitude",
    "nearby_poi_type",
    "total_spaces",
    "price_per_hour",
    "parking_type",
    "is_public",
    "is_shared",
    "has_nfc",
    "year",
    "month",
    "day",
    "day_of_week",
    "hour",
    "time_slot",
    "is_weekend",
    "is_holiday",
    "season",
    "weather",
    "temperature",
    "rainfall_mm",
    "event_nearby",
    "event_scale",
    "traffic_level",
]

PREDICTION_OUTPUT_COLUMNS = [
    "prediction_id",
    "parking_lot_id",
    "target_datetime",
    "predicted_available_spaces",
    "predicted_occupancy_rate",
    "congestion_score",
    "congestion_level",
    "recommendation_score",
    "recommendation_reason",
    "model_version",
    "created_at",
    "updated_at",
]


@dataclass(frozen=True)
class ProjectPaths:
    project_root: Path
    raw_data_dir: Path
    output_data_dir: Path
    models_dir: Path
    model_path: Path
    metadata_path: Path
    parking_lots_path: Path
    external_factors_path: Path
    predictions_path: Path
    summary_path: Path


def get_project_paths() -> ProjectPaths:
    project_root = Path(__file__).resolve().parents[1]
    raw_data_dir = project_root / "data" / "raw"
    output_data_dir = project_root / "data" / "output"
    models_dir = project_root / "models"
    return ProjectPaths(
        project_root=project_root,
        raw_data_dir=raw_data_dir,
        output_data_dir=output_data_dir,
        models_dir=models_dir,
        model_path=models_dir / "congestion_model.joblib",
        metadata_path=models_dir / "congestion_model_metadata.json",
        parking_lots_path=raw_data_dir / "parking_lots.csv",
        external_factors_path=raw_data_dir / "external_factors.csv",
        predictions_path=output_data_dir / "congestion_predictions.csv",
        summary_path=output_data_dir / "congestion_predictions_summary.json",
    )


def validate_input_files(paths: ProjectPaths) -> None:
    if not paths.model_path.exists():
        print("모델 파일이 없습니다. 먼저 python scripts\\train_congestion_model.py를 실행해 congestion_model.joblib를 생성하세요.")
        raise FileNotFoundError(f"Required model file not found: {paths.model_path}")

    missing_paths = [
        path for path in [paths.parking_lots_path, paths.external_factors_path] if not path.exists()
    ]
    if missing_paths:
        missing_text = ", ".join(str(path) for path in missing_paths)
        raise FileNotFoundError(f"Required input file not found: {missing_text}")


def load_model(model_path: Path) -> Pipeline:
    return joblib.load(model_path)


def load_model_metadata(metadata_path: Path) -> dict[str, object]:
    if not metadata_path.exists():
        print(f"[warn] Model metadata not found. Fallback model version will be used: {metadata_path}")
        return {}
    with metadata_path.open("r", encoding="utf-8") as file:
        return json.load(file)


def load_reference_data(raw_dir: Path) -> tuple[pd.DataFrame, pd.DataFrame]:
    parking_lots_df = pd.read_csv(
        raw_dir / "parking_lots.csv",
        encoding=OUTPUT_ENCODING,
        usecols=PARKING_LOT_COLUMNS,
    )
    external_factors_df = pd.read_csv(
        raw_dir / "external_factors.csv",
        encoding=OUTPUT_ENCODING,
        usecols=EXTERNAL_FACTOR_COLUMNS,
    )
    validate_reference_data(parking_lots_df, external_factors_df)
    return parking_lots_df, external_factors_df


def validate_reference_data(parking_lots_df: pd.DataFrame, external_factors_df: pd.DataFrame) -> None:
    missing_parking = [column for column in PARKING_LOT_COLUMNS if column not in parking_lots_df.columns]
    missing_external = [column for column in EXTERNAL_FACTOR_COLUMNS if column not in external_factors_df.columns]
    if missing_parking:
        raise ValueError(f"parking_lots.csv is missing required columns: {missing_parking}")
    if missing_external:
        raise ValueError(f"external_factors.csv is missing required columns: {missing_external}")
    if parking_lots_df["parking_lot_id"].duplicated().any():
        raise ValueError("parking_lots.csv has duplicated parking_lot_id values.")
    if (parking_lots_df["total_spaces"] < 1).any():
        raise ValueError("total_spaces must be greater than or equal to 1.")
    if (parking_lots_df["price_per_hour"] < 0).any():
        raise ValueError("price_per_hour must be greater than or equal to 0.")
    if external_factors_df.duplicated(subset=["district", "date", "hour"]).any():
        raise ValueError("external_factors.csv has duplicated district/date/hour keys.")


def get_time_slot(hour: int) -> str:
    if 0 <= hour <= 5:
        return "dawn"
    if 6 <= hour <= 10:
        return "morning"
    if 11 <= hour <= 13:
        return "lunch"
    if 14 <= hour <= 17:
        return "afternoon"
    if 18 <= hour <= 21:
        return "evening"
    return "night"


def get_season(month: int) -> str:
    if 3 <= month <= 5:
        return "spring"
    if 6 <= month <= 8:
        return "summer"
    if 9 <= month <= 11:
        return "fall"
    return "winter"


def clamp_array(values: np.ndarray | pd.Series, min_value: float, max_value: float) -> np.ndarray:
    return np.clip(np.asarray(values, dtype=float), min_value, max_value)


def is_mock_holiday(target: datetime) -> bool:
    fixed_holidays = {(1, 1), (3, 1), (5, 5), (6, 6), (8, 15), (10, 3), (10, 9), (12, 25)}
    return (target.month, target.day) in fixed_holidays


def generate_target_datetimes(prediction_hours: int) -> list[datetime]:
    now = datetime.now()
    next_hour = (now.replace(minute=0, second=0, microsecond=0) + timedelta(hours=1))
    return [next_hour + timedelta(hours=offset) for offset in range(prediction_hours)]


def build_prediction_base(parking_lots_df: pd.DataFrame, target_datetimes: list[datetime]) -> pd.DataFrame:
    datetime_df = pd.DataFrame({"target_datetime_obj": target_datetimes})
    datetime_df["target_datetime"] = datetime_df["target_datetime_obj"].dt.strftime("%Y-%m-%d %H:%M:%S")
    datetime_df["date"] = datetime_df["target_datetime_obj"].dt.strftime("%Y-%m-%d")
    datetime_df["year"] = datetime_df["target_datetime_obj"].dt.year
    datetime_df["month"] = datetime_df["target_datetime_obj"].dt.month
    datetime_df["day"] = datetime_df["target_datetime_obj"].dt.day
    datetime_df["day_of_week"] = datetime_df["target_datetime_obj"].dt.weekday.map(lambda idx: DAY_NAMES[idx])
    datetime_df["hour"] = datetime_df["target_datetime_obj"].dt.hour
    datetime_df["time_slot"] = datetime_df["hour"].map(get_time_slot)
    datetime_df["is_weekend"] = datetime_df["target_datetime_obj"].dt.weekday >= 5
    datetime_df["is_holiday"] = datetime_df["target_datetime_obj"].map(is_mock_holiday)
    datetime_df["season"] = datetime_df["month"].map(get_season)
    datetime_df = datetime_df.drop(columns=["target_datetime_obj"])

    parking_lots_df = parking_lots_df.copy()
    parking_lots_df["_join_key"] = 1
    datetime_df["_join_key"] = 1
    prediction_base_df = parking_lots_df.merge(datetime_df, on="_join_key", how="inner").drop(columns=["_join_key"])
    return prediction_base_df


def attach_external_factors(
    prediction_base_df: pd.DataFrame,
    external_factors_df: pd.DataFrame,
) -> tuple[pd.DataFrame, int]:
    external_lookup = external_factors_df[
        ["district", "date", "hour", "weather", "temperature", "rainfall_mm", "event_nearby", "event_scale", "traffic_level", "season"]
    ].copy()
    merged_df = prediction_base_df.merge(
        external_lookup,
        on=["district", "date", "hour"],
        how="left",
        suffixes=("", "_external"),
        validate="many_to_one",
    )

    unmatched_count = int(merged_df["weather"].isna().sum())
    merged_df["weather"] = merged_df["weather"].fillna("CLEAR")
    merged_df["temperature"] = merged_df["temperature"].fillna(20.0)
    merged_df["rainfall_mm"] = merged_df["rainfall_mm"].fillna(0.0)
    merged_df["event_nearby"] = np.where(merged_df["event_nearby"].isna(), False, merged_df["event_nearby"]).astype(bool)
    merged_df["event_scale"] = merged_df["event_scale"].fillna("NONE")
    merged_df["traffic_level"] = merged_df["traffic_level"].fillna("MEDIUM")
    merged_df["season"] = merged_df["season_external"].fillna(merged_df["season"])
    merged_df = merged_df.drop(columns=["season_external"])
    return merged_df, unmatched_count


def get_feature_columns(metadata: dict[str, object], prediction_df: pd.DataFrame) -> list[str]:
    metadata_features = metadata.get("feature_columns") if metadata else None
    feature_columns = metadata_features if isinstance(metadata_features, list) and metadata_features else DEFAULT_FEATURE_CANDIDATES
    feature_columns = [str(column) for column in feature_columns]
    validate_prediction_features(prediction_df, feature_columns)
    return feature_columns


def validate_prediction_features(prediction_df: pd.DataFrame, feature_columns: list[str]) -> None:
    missing_features = [column for column in feature_columns if column not in prediction_df.columns]
    if missing_features:
        raise ValueError(f"Prediction data is missing model feature columns: {missing_features}")


def predict_congestion_levels(
    model: Pipeline,
    prediction_df: pd.DataFrame,
    feature_columns: list[str],
) -> tuple[np.ndarray, np.ndarray | None]:
    X = prediction_df[feature_columns].copy()
    levels = model.predict(X)
    confidences = None
    if hasattr(model, "predict_proba"):
        probabilities = model.predict_proba(X)
        confidences = probabilities.max(axis=1)
    return levels, confidences


def estimate_congestion_score(levels: np.ndarray, confidences: np.ndarray | None) -> np.ndarray:
    ranges = {
        "LOW": (15.0, 34.0, 25.0),
        "MEDIUM": (35.0, 64.0, 50.0),
        "HIGH": (65.0, 84.0, 75.0),
        "VERY_HIGH": (85.0, 98.0, 92.0),
    }
    scores = np.zeros(len(levels), dtype=float)
    if confidences is None:
        confidences = np.ones(len(levels), dtype=float)

    for level, (low, high, representative) in ranges.items():
        mask = levels == level
        uncertainty = 1.0 - confidences[mask]
        if level == "LOW":
            level_scores = representative + uncertainty * (high - representative)
        elif level == "VERY_HIGH":
            level_scores = representative - uncertainty * (representative - low)
        elif level == "MEDIUM":
            level_scores = representative + uncertainty * (high - representative)
        else:
            level_scores = representative - uncertainty * (representative - low)
        scores[mask] = level_scores
    return np.round(clamp_array(scores, 0, 100), 2)


def estimate_occupancy_and_available_spaces(df: pd.DataFrame) -> pd.DataFrame:
    occupancy_ranges = {
        "LOW": (0.20, 0.45),
        "MEDIUM": (0.45, 0.70),
        "HIGH": (0.70, 0.88),
        "VERY_HIGH": (0.88, 0.98),
    }
    score_ranges = {
        "LOW": (15.0, 34.0),
        "MEDIUM": (35.0, 64.0),
        "HIGH": (65.0, 84.0),
        "VERY_HIGH": (85.0, 98.0),
    }

    occupancy = np.zeros(len(df), dtype=float)
    for level, (occ_low, occ_high) in occupancy_ranges.items():
        mask = df["congestion_level"].eq(level)
        score_low, score_high = score_ranges[level]
        ratio = (df.loc[mask, "congestion_score"] - score_low) / max(score_high - score_low, 1)
        ratio = clamp_array(ratio, 0, 1)
        occupancy[mask.to_numpy()] = occ_low + ratio * (occ_high - occ_low)

    df["predicted_occupancy_rate"] = np.round(clamp_array(occupancy, 0, 1), 4)
    available = np.rint(df["total_spaces"] * (1 - df["predicted_occupancy_rate"])).astype(int)
    df["predicted_available_spaces"] = np.clip(available, 0, df["total_spaces"]).astype(int)
    return df


def calculate_recommendation_score(df: pd.DataFrame) -> pd.DataFrame:
    available_ratio_score = (df["predicted_available_spaces"] / df["total_spaces"]) * 100
    price_score = ((6000 - df["price_per_hour"]) / 5000) * 100
    price_score = clamp_array(price_score, 0, 100)
    nfc_score = np.where(df["has_nfc"], 5, 0)
    score = (
        (100 - df["congestion_score"]) * 0.5
        + available_ratio_score * 0.25
        + price_score * 0.15
        + nfc_score
    )
    df["recommendation_score"] = np.round(clamp_array(score, 0, 100), 2)
    return df


def generate_recommendation_reason(row: pd.Series) -> str:
    base_reasons = {
        "LOW": "예상 혼잡도가 낮아 주차 가능성이 높습니다.",
        "MEDIUM": "예상 혼잡도는 보통이며 이용 가능한 공간이 일부 남아 있습니다.",
        "HIGH": "예상 혼잡도가 높은 편이므로 대체 주차장도 함께 확인하는 것이 좋습니다.",
        "VERY_HIGH": "예상 혼잡도가 매우 높아 다른 주차장을 우선 확인하는 것이 좋습니다.",
    }
    reason = base_reasons.get(row["congestion_level"], "예상 혼잡도 정보를 확인하기 어렵습니다.")
    if row["predicted_available_spaces"] >= 5:
        reason += " 예상 여유 공간이 남아 있습니다."
    elif bool(row["has_nfc"]):
        reason += " NFC 이용이 가능해 입출차가 편리합니다."
    return reason


def build_prediction_output(df: pd.DataFrame, model_version: str, generated_at: str) -> pd.DataFrame:
    output_df = pd.DataFrame(
        {
            "prediction_id": [f"PRED-{index:08d}" for index in range(1, len(df) + 1)],
            "parking_lot_id": df["parking_lot_id"],
            "target_datetime": df["target_datetime"],
            "predicted_available_spaces": df["predicted_available_spaces"].astype(int),
            "predicted_occupancy_rate": df["predicted_occupancy_rate"],
            "congestion_score": df["congestion_score"],
            "congestion_level": df["congestion_level"],
            "recommendation_score": df["recommendation_score"],
            "recommendation_reason": df["recommendation_reason"],
            "model_version": model_version,
            "created_at": generated_at,
            "updated_at": generated_at,
        }
    )
    return output_df[PREDICTION_OUTPUT_COLUMNS]


def validate_prediction_output(df: pd.DataFrame) -> None:
    missing_columns = [column for column in PREDICTION_OUTPUT_COLUMNS if column not in df.columns]
    if missing_columns:
        raise ValueError(f"congestion_predictions.csv is missing columns: {missing_columns}")
    if df["prediction_id"].duplicated().any():
        raise ValueError("prediction_id must be unique.")
    if (df["predicted_available_spaces"] < 0).any():
        raise ValueError("predicted_available_spaces must not be negative.")
    if not df["predicted_occupancy_rate"].between(0, 1).all():
        raise ValueError("predicted_occupancy_rate must be between 0 and 1.")
    if not df["congestion_score"].between(0, 100).all():
        raise ValueError("congestion_score must be between 0 and 100.")
    if not df["congestion_level"].isin(CLASS_ORDER).all():
        raise ValueError("congestion_level contains invalid values.")
    if not df["recommendation_score"].between(0, 100).all():
        raise ValueError("recommendation_score must be between 0 and 100.")
    required_non_empty = ["target_datetime", "created_at", "updated_at"]
    if df[required_non_empty].isna().any().any() or (df[required_non_empty].astype(str) == "").any().any():
        raise ValueError("target_datetime, created_at, updated_at must not be empty.")


def save_predictions(df: pd.DataFrame, output_path: Path) -> None:
    df.to_csv(output_path, index=False, encoding=OUTPUT_ENCODING, lineterminator="\n")


def save_prediction_summary(summary: dict[str, object], output_path: Path) -> None:
    with output_path.open("w", encoding="utf-8") as file:
        json.dump(summary, file, ensure_ascii=False, indent=2)


def print_overwrite_notice(paths: list[Path]) -> None:
    for path in paths:
        if path.exists():
            print(f"[overwrite] Existing file will be replaced: {path}")


def main() -> None:
    np.random.seed(RANDOM_SEED)
    paths = get_project_paths()
    paths.output_data_dir.mkdir(parents=True, exist_ok=True)
    validate_input_files(paths)
    print_overwrite_notice([paths.predictions_path, paths.summary_path])

    print("[start] SmartPark AI congestion prediction generation")
    print(f"[model] {paths.model_path}")
    print(f"[metadata] {paths.metadata_path}")
    print(f"[raw] {paths.raw_data_dir}")
    print(f"[output] {paths.predictions_path}")

    model = load_model(paths.model_path)
    metadata = load_model_metadata(paths.metadata_path)
    parking_lots_df, external_factors_df = load_reference_data(paths.raw_data_dir)
    if TEST_MODE:
        parking_lots_df = parking_lots_df.head(TEST_MODE_PARKING_LOTS).copy()

    prediction_hours = TEST_MODE_HOURS if TEST_MODE else PREDICTION_HOURS
    target_datetimes = generate_target_datetimes(prediction_hours)
    prediction_base_df = build_prediction_base(parking_lots_df, target_datetimes)
    prediction_df, unmatched_external_count = attach_external_factors(prediction_base_df, external_factors_df)
    feature_columns = get_feature_columns(metadata, prediction_df)

    print(f"[loaded] parking_lots rows={len(parking_lots_df):,}")
    print(f"[loaded] external_factors rows={len(external_factors_df):,}")
    print(f"[target] target_datetime_count={len(target_datetimes):,}")
    print(f"[target] prediction_rows={len(prediction_df):,}")
    print(f"[external] unmatched_rows={unmatched_external_count:,}")

    model_version = str(metadata.get("model_version") or MODEL_VERSION_FALLBACK)
    levels, confidences = predict_congestion_levels(model, prediction_df, feature_columns)
    prediction_df["congestion_level"] = levels
    prediction_df["prediction_confidence"] = confidences if confidences is not None else np.nan
    prediction_df["congestion_score"] = estimate_congestion_score(levels, confidences)
    prediction_df = estimate_occupancy_and_available_spaces(prediction_df)
    prediction_df = calculate_recommendation_score(prediction_df)
    prediction_df["recommendation_reason"] = prediction_df.apply(generate_recommendation_reason, axis=1)

    generated_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    output_df = build_prediction_output(prediction_df, model_version, generated_at)
    validate_prediction_output(output_df)
    # total_spaces is not part of the output schema, so validate the upper bound before dropping it.
    if (prediction_df["predicted_available_spaces"] > prediction_df["total_spaces"]).any():
        raise ValueError("predicted_available_spaces must not exceed total_spaces.")

    save_predictions(output_df, paths.predictions_path)

    level_distribution = {
        level: int(count)
        for level, count in output_df["congestion_level"].value_counts().reindex(CLASS_ORDER, fill_value=0).items()
    }
    top_recommended = output_df.sort_values("recommendation_score", ascending=False).head(10)[
        ["parking_lot_id", "target_datetime", "congestion_level", "recommendation_score", "predicted_available_spaces"]
    ]
    summary = {
        "generated_at": generated_at,
        "model_version": model_version,
        "model_file": str(paths.model_path),
        "metadata_file": str(paths.metadata_path),
        "prediction_hours": prediction_hours,
        "test_mode": TEST_MODE,
        "total_prediction_rows": int(len(output_df)),
        "parking_lot_count": int(parking_lots_df["parking_lot_id"].nunique()),
        "target_datetime_count": int(len(target_datetimes)),
        "congestion_level_distribution": level_distribution,
        "average_congestion_score": float(round(output_df["congestion_score"].mean(), 4)),
        "average_recommendation_score": float(round(output_df["recommendation_score"].mean(), 4)),
        "average_predicted_occupancy_rate": float(round(output_df["predicted_occupancy_rate"].mean(), 4)),
        "average_predicted_available_spaces": float(round(output_df["predicted_available_spaces"].mean(), 4)),
        "average_prediction_confidence": None if confidences is None else float(round(np.mean(confidences), 4)),
        "external_factor_unmatched_rows": int(unmatched_external_count),
        "top_recommended_parking_lots": top_recommended.to_dict(orient="records"),
        "source_note": "congestion_predictions.csv is generated from SmartPark AI model and is intended for backend/MySQL integration.",
    }
    save_prediction_summary(summary, paths.summary_path)

    print(f"[model_version] {model_version}")
    print(f"[summary] congestion_level_distribution={level_distribution}")
    print(f"[summary] average_congestion_score={summary['average_congestion_score']:.4f}")
    print(f"[summary] average_recommendation_score={summary['average_recommendation_score']:.4f}")
    print("[top_recommended_parking_lots]")
    print(top_recommended.to_string(index=False))
    print("[saved]")
    print(f"- {paths.predictions_path}")
    print(f"- {paths.summary_path}")
    print("[complete] SmartPark AI 혼잡도 예측 결과 생성 완료")


if __name__ == "__main__":
    main()
