# SmartPark AI raw CSV 3종을 chunk 단위로 병합해 training_dataset.csv를 생성한다.
# 대용량 parking_usage_history.csv는 전체 로딩하지 않고 pandas chunksize로 전처리한다.

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

import numpy as np
import pandas as pd


CHUNK_SIZE_ROWS = 500_000
TEST_MODE = False
TEST_MAX_CHUNKS = 3
MODEL_VERSION = "ai-preprocess-v1"
OUTPUT_ENCODING = "utf-8-sig"

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

USAGE_REQUIRED_COLUMNS = [
    "record_id",
    "parking_lot_id",
    "date",
    "year",
    "month",
    "day",
    "day_of_week",
    "hour",
    "time_slot",
    "is_weekend",
    "is_holiday",
    "occupied_spaces",
    "available_spaces",
    "reserved_spaces",
    "soon_available_spaces",
    "occupancy_rate",
    "turnover_rate",
]

TRAINING_DATASET_COLUMNS = [
    "record_id",
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
    "date",
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
    "occupied_spaces",
    "available_spaces",
    "reserved_spaces",
    "soon_available_spaces",
    "occupancy_rate",
    "turnover_rate",
    "congestion_score",
    "congestion_level",
    "recommendation_score",
    "recommendation_reason",
]

CONGESTION_LEVELS = {"LOW", "MEDIUM", "HIGH", "VERY_HIGH", "UNKNOWN"}

USAGE_DTYPES = {
    "record_id": "string",
    "parking_lot_id": "string",
    "date": "string",
    "year": "int16",
    "month": "int8",
    "day": "int8",
    "day_of_week": "category",
    "hour": "int8",
    "time_slot": "category",
    "is_weekend": "bool",
    "is_holiday": "bool",
    "occupied_spaces": "int32",
    "available_spaces": "int32",
    "reserved_spaces": "int32",
    "soon_available_spaces": "int32",
    "occupancy_rate": "float32",
    "turnover_rate": "float32",
}


@dataclass(frozen=True)
class ProjectPaths:
    project_root: Path
    raw_data_dir: Path
    processed_data_dir: Path
    parking_lots_path: Path
    external_factors_path: Path
    usage_history_path: Path
    training_dataset_path: Path


def get_project_paths() -> ProjectPaths:
    project_root = Path(__file__).resolve().parents[1]
    raw_data_dir = project_root / "data" / "raw"
    processed_data_dir = project_root / "data" / "processed"
    return ProjectPaths(
        project_root=project_root,
        raw_data_dir=raw_data_dir,
        processed_data_dir=processed_data_dir,
        parking_lots_path=raw_data_dir / "parking_lots.csv",
        external_factors_path=raw_data_dir / "external_factors.csv",
        usage_history_path=raw_data_dir / "parking_usage_history.csv",
        training_dataset_path=processed_data_dir / "training_dataset.csv",
    )


def validate_input_files(paths: ProjectPaths) -> None:
    missing_paths = [
        path
        for path in [paths.parking_lots_path, paths.external_factors_path, paths.usage_history_path]
        if not path.exists()
    ]
    if missing_paths:
        missing_text = ", ".join(str(path) for path in missing_paths)
        raise FileNotFoundError(f"Required input file not found: {missing_text}")


def require_columns(df: pd.DataFrame, columns: list[str], source_name: str) -> None:
    missing_columns = [column for column in columns if column not in df.columns]
    if missing_columns:
        raise ValueError(f"{source_name} is missing required columns: {missing_columns}")


def load_reference_data(paths: ProjectPaths) -> tuple[pd.DataFrame, pd.DataFrame]:
    parking_lots_df = pd.read_csv(
        paths.parking_lots_path,
        encoding=OUTPUT_ENCODING,
        usecols=PARKING_LOT_COLUMNS,
        dtype={
            "parking_lot_id": "string",
            "name": "string",
            "district": "string",
            "latitude": "float64",
            "longitude": "float64",
            "nearby_poi_type": "category",
            "total_spaces": "int32",
            "price_per_hour": "int32",
            "parking_type": "category",
            "is_public": "bool",
            "is_shared": "bool",
            "has_nfc": "bool",
        },
    )
    external_factors_df = pd.read_csv(
        paths.external_factors_path,
        encoding=OUTPUT_ENCODING,
        usecols=EXTERNAL_FACTOR_COLUMNS,
        dtype={
            "district": "string",
            "date": "string",
            "hour": "int8",
            "weather": "category",
            "temperature": "float32",
            "rainfall_mm": "float32",
            "event_nearby": "bool",
            "event_scale": "category",
            "traffic_level": "category",
            "season": "category",
        },
    )
    validate_reference_data(parking_lots_df, external_factors_df)
    return parking_lots_df, external_factors_df


def validate_reference_data(parking_lots_df: pd.DataFrame, external_factors_df: pd.DataFrame) -> None:
    require_columns(parking_lots_df, PARKING_LOT_COLUMNS, "parking_lots.csv")
    require_columns(external_factors_df, EXTERNAL_FACTOR_COLUMNS, "external_factors.csv")
    if parking_lots_df["parking_lot_id"].duplicated().any():
        raise ValueError("parking_lots.csv has duplicated parking_lot_id values.")
    if external_factors_df.duplicated(subset=["district", "date", "hour"]).any():
        raise ValueError("external_factors.csv has duplicated district/date/hour keys.")
    if not external_factors_df["traffic_level"].isin(["LOW", "MEDIUM", "HIGH"]).all():
        raise ValueError("external_factors.csv contains invalid traffic_level values.")


def get_season(month: int) -> str:
    if 3 <= month <= 5:
        return "spring"
    if 6 <= month <= 8:
        return "summer"
    if 9 <= month <= 11:
        return "fall"
    return "winter"


def clamp(value: float, min_value: float, max_value: float) -> float:
    return max(min_value, min(value, max_value))


def calculate_congestion_score(df: pd.DataFrame) -> pd.DataFrame:
    traffic_penalty = pd.to_numeric(
        df["traffic_level"].astype("object").map({"LOW": 0, "MEDIUM": 5, "HIGH": 10}),
        errors="coerce",
    ).fillna(5).astype("float32")
    weather_penalty = pd.to_numeric(
        df["weather"].astype("object").map({"CLEAR": 0, "CLOUDY": 2, "RAIN": 6, "SNOW": 8}),
        errors="coerce",
    ).fillna(0).astype("float32")
    event_penalty = pd.to_numeric(
        df["event_scale"].astype("object").map({"NONE": 0, "SMALL": 3, "MEDIUM": 6, "LARGE": 10}),
        errors="coerce",
    ).fillna(0).astype("float32")
    time_slot_penalty = (
        df["time_slot"].astype("object")
        .map({"morning": 5, "lunch": 4, "evening": 7, "dawn": -3, "night": -2, "afternoon": 2})
        .fillna(0)
        .astype("float32")
    )
    soon_available_bonus = np.minimum(df["soon_available_spaces"].astype("float32") * 0.5, 8)

    score = (
        df["occupancy_rate"].astype("float32") * 70
        + traffic_penalty
        + weather_penalty
        + event_penalty
        + time_slot_penalty
        - soon_available_bonus
    )
    df["congestion_score"] = np.round(np.clip(score, 0, 100), 2)
    return df


def assign_congestion_level(df: pd.DataFrame) -> pd.DataFrame:
    score = df["congestion_score"]
    df["congestion_level"] = np.select(
        [
            score.ge(0) & score.lt(35),
            score.ge(35) & score.lt(65),
            score.ge(65) & score.lt(85),
            score.ge(85) & score.le(100),
        ],
        ["LOW", "MEDIUM", "HIGH", "VERY_HIGH"],
        default="UNKNOWN",
    )
    return df


def calculate_recommendation_score(df: pd.DataFrame) -> pd.DataFrame:
    available_ratio_score = (df["available_spaces"].astype("float32") / df["total_spaces"].astype("float32")) * 100
    price_score = ((6000 - df["price_per_hour"].astype("float32")) / 5000) * 100
    price_score = np.clip(price_score, 0, 100)
    nfc_score = np.where(df["has_nfc"], 5, 0)
    soon_available_score = np.minimum(df["soon_available_spaces"].astype("float32") * 1.5, 8)

    score = (
        (100 - df["congestion_score"].astype("float32")) * 0.45
        + available_ratio_score * 0.25
        + price_score * 0.15
        + nfc_score
        + soon_available_score
    )
    df["recommendation_score"] = np.round(np.clip(score, 0, 100), 2)
    return df


def generate_recommendation_reason(row: pd.Series) -> str:
    if row["congestion_level"] == "LOW":
        reason = "현재 여유 공간이 많아 주차 가능성이 높습니다."
    elif row["congestion_level"] == "MEDIUM":
        reason = "혼잡도는 보통이지만 이용 가능한 공간이 남아 있습니다."
    elif row["congestion_level"] == "HIGH":
        reason = "혼잡도가 높은 편이므로 곧 비워질 자리 여부를 확인하는 것이 좋습니다."
    elif row["congestion_level"] == "VERY_HIGH":
        reason = "현재 매우 혼잡하여 대체 주차장 확인이 필요합니다."
    else:
        reason = "혼잡도 판단을 위한 데이터가 부족합니다."

    if bool(row.get("has_nfc", False)):
        reason += " NFC 이용이 가능해 입출차가 편리합니다."
    elif int(row.get("soon_available_spaces", 0)) >= 3:
        reason += " 곧 비워질 자리가 일부 있습니다."
    return reason


def add_recommendation_reason(df: pd.DataFrame) -> pd.DataFrame:
    # 4천만 행 규모에서는 row별 apply가 병목이므로 level별 기본 문장을 벡터화해 조합한다.
    level = df["congestion_level"]
    df["recommendation_reason"] = np.select(
        [
            level == "LOW",
            level == "MEDIUM",
            level == "HIGH",
            level == "VERY_HIGH",
        ],
        [
            "현재 여유 공간이 많아 주차 가능성이 높습니다.",
            "혼잡도는 보통이지만 이용 가능한 공간이 남아 있습니다.",
            "혼잡도가 높은 편이므로 곧 비워질 자리 여부를 확인하는 것이 좋습니다.",
            "현재 매우 혼잡하여 대체 주차장 확인이 필요합니다.",
        ],
        default="혼잡도 판단을 위한 데이터가 부족합니다.",
    )
    df["recommendation_reason"] = pd.Series(df["recommendation_reason"], index=df.index, dtype="string")

    nfc_suffix = " NFC 이용이 가능해 입출차가 편리합니다."
    soon_suffix = " 곧 비워질 자리가 일부 있습니다."
    df.loc[df["has_nfc"], "recommendation_reason"] = df.loc[df["has_nfc"], "recommendation_reason"] + nfc_suffix
    soon_mask = (~df["has_nfc"]) & (df["soon_available_spaces"] >= 3)
    df.loc[soon_mask, "recommendation_reason"] = df.loc[soon_mask, "recommendation_reason"] + soon_suffix
    return df


def preprocess_chunk(
    usage_chunk_df: pd.DataFrame,
    parking_lots_df: pd.DataFrame,
    external_factors_df: pd.DataFrame,
) -> tuple[pd.DataFrame, int]:
    require_columns(usage_chunk_df, USAGE_REQUIRED_COLUMNS, "parking_usage_history.csv chunk")
    if not usage_chunk_df["parking_lot_id"].isin(parking_lots_df["parking_lot_id"]).all():
        unknown_count = int((~usage_chunk_df["parking_lot_id"].isin(parking_lots_df["parking_lot_id"])).sum())
        raise ValueError(f"usage chunk contains {unknown_count} unknown parking_lot_id values.")

    merged_df = usage_chunk_df.merge(parking_lots_df, on="parking_lot_id", how="left", validate="many_to_one")
    merged_df = merged_df.merge(
        external_factors_df,
        on=["district", "date", "hour"],
        how="left",
        validate="many_to_one",
    )

    missing_external_count = int(merged_df["weather"].isna().sum())
    if missing_external_count:
        print(f"[warn] external_factors unmatched rows={missing_external_count:,}; default values applied")

    merged_df["season"] = merged_df["season"].astype("object")
    missing_season_mask = merged_df["season"].isna()
    if missing_season_mask.any():
        merged_df.loc[missing_season_mask, "season"] = merged_df.loc[missing_season_mask, "month"].map(get_season)

    merged_df["weather"] = merged_df["weather"].astype("object").fillna("CLEAR")
    merged_df["temperature"] = merged_df["temperature"].fillna(20.0).astype("float32")
    merged_df["rainfall_mm"] = merged_df["rainfall_mm"].fillna(0.0).astype("float32")
    merged_df["event_nearby"] = merged_df["event_nearby"].fillna(False).astype("bool")
    merged_df["event_scale"] = merged_df["event_scale"].astype("object").fillna("NONE")
    merged_df["traffic_level"] = merged_df["traffic_level"].astype("object").fillna("MEDIUM")

    merged_df = calculate_congestion_score(merged_df)
    merged_df = assign_congestion_level(merged_df)
    merged_df = calculate_recommendation_score(merged_df)
    merged_df = add_recommendation_reason(merged_df)

    result_df = merged_df[TRAINING_DATASET_COLUMNS].copy()
    validate_processed_chunk(result_df)
    return result_df, missing_external_count


def validate_processed_chunk(df: pd.DataFrame) -> None:
    require_columns(df, TRAINING_DATASET_COLUMNS, "training_dataset.csv chunk")
    if not df["congestion_score"].between(0, 100).all():
        raise ValueError("congestion_score must be between 0 and 100.")
    if not df["recommendation_score"].between(0, 100).all():
        raise ValueError("recommendation_score must be between 0 and 100.")
    if not df["congestion_level"].isin(CONGESTION_LEVELS).all():
        raise ValueError("congestion_level contains invalid values.")
    if not df["occupancy_rate"].between(0, 1).all():
        raise ValueError("occupancy_rate must be between 0 and 1.")
    if not ((df["occupied_spaces"] + df["available_spaces"]) == df["total_spaces"]).all():
        raise ValueError("occupied_spaces + available_spaces must equal total_spaces.")
    if (df["available_spaces"] < 0).any():
        raise ValueError("available_spaces must not be negative.")


def write_training_dataset_chunk(df: pd.DataFrame, output_path: Path, is_first_chunk: bool) -> None:
    df.to_csv(
        output_path,
        index=False,
        mode="w" if is_first_chunk else "a",
        header=is_first_chunk,
        encoding=OUTPUT_ENCODING,
        lineterminator="\n",
    )


def preprocess_usage_history_in_chunks(
    paths: ProjectPaths,
    parking_lots_df: pd.DataFrame,
    external_factors_df: pd.DataFrame,
) -> dict[str, object]:
    if paths.training_dataset_path.exists():
        print(f"[overwrite] Existing file will be replaced: {paths.training_dataset_path}")

    total_rows = 0
    chunk_count = 0
    congestion_score_sum = 0.0
    recommendation_score_sum = 0.0
    level_counts = {level: 0 for level in ["LOW", "MEDIUM", "HIGH", "VERY_HIGH", "UNKNOWN"]}

    reader = pd.read_csv(
        paths.usage_history_path,
        encoding=OUTPUT_ENCODING,
        chunksize=CHUNK_SIZE_ROWS,
        dtype=USAGE_DTYPES,
    )
    for chunk_index, usage_chunk_df in enumerate(reader, start=1):
        if TEST_MODE and chunk_index > TEST_MAX_CHUNKS:
            print(f"[test] TEST_MODE enabled; stopped after {TEST_MAX_CHUNKS} chunks")
            break

        processed_df, _ = preprocess_chunk(usage_chunk_df, parking_lots_df, external_factors_df)
        write_training_dataset_chunk(processed_df, paths.training_dataset_path, is_first_chunk=chunk_index == 1)

        chunk_rows = len(processed_df)
        total_rows += chunk_rows
        chunk_count += 1
        congestion_score_sum += float(processed_df["congestion_score"].sum())
        recommendation_score_sum += float(processed_df["recommendation_score"].sum())
        current_level_counts = processed_df["congestion_level"].value_counts()
        for level in level_counts:
            level_counts[level] += int(current_level_counts.get(level, 0))

        print(
            f"[chunk {chunk_index}] "
            f"rows={chunk_rows:,}, cumulative_rows={total_rows:,}, "
            f"avg_occupancy_rate={processed_df['occupancy_rate'].mean():.4f}, "
            f"avg_congestion_score={processed_df['congestion_score'].mean():.2f}, "
            f"avg_recommendation_score={processed_df['recommendation_score'].mean():.2f}"
        )

        del usage_chunk_df
        del processed_df

    average_congestion_score = congestion_score_sum / total_rows if total_rows else 0.0
    average_recommendation_score = recommendation_score_sum / total_rows if total_rows else 0.0
    return {
        "total_rows": total_rows,
        "chunk_count": chunk_count,
        "average_congestion_score": average_congestion_score,
        "average_recommendation_score": average_recommendation_score,
        "level_counts": level_counts,
    }


def main() -> None:
    paths = get_project_paths()
    paths.processed_data_dir.mkdir(parents=True, exist_ok=True)
    validate_input_files(paths)

    print("[start] SmartPark AI training_dataset preprocessing")
    print(f"[input] parking_lots={paths.parking_lots_path}")
    print(f"[input] external_factors={paths.external_factors_path}")
    print(f"[input] parking_usage_history={paths.usage_history_path}")
    print(f"[output] training_dataset={paths.training_dataset_path}")
    print(f"[config] chunk_size_rows={CHUNK_SIZE_ROWS:,}, test_mode={TEST_MODE}, model_version={MODEL_VERSION}")

    parking_lots_df, external_factors_df = load_reference_data(paths)
    print(f"[loaded] parking_lots rows={len(parking_lots_df):,}")
    print(f"[loaded] external_factors rows={len(external_factors_df):,}")

    result = preprocess_usage_history_in_chunks(paths, parking_lots_df, external_factors_df)
    level_counts = result["level_counts"]
    print(f"[done] training_dataset.csv path={paths.training_dataset_path}")
    print(f"[summary] processed_rows={result['total_rows']:,}, chunks={result['chunk_count']:,}")
    print(f"[summary] average_congestion_score={result['average_congestion_score']:.2f}")
    print(f"[summary] average_recommendation_score={result['average_recommendation_score']:.2f}")
    print(
        "[summary] congestion_level_distribution="
        f"LOW:{level_counts['LOW']:,}, "
        f"MEDIUM:{level_counts['MEDIUM']:,}, "
        f"HIGH:{level_counts['HIGH']:,}, "
        f"VERY_HIGH:{level_counts['VERY_HIGH']:,}, "
        f"UNKNOWN:{level_counts['UNKNOWN']:,}"
    )
    print("[complete] SmartPark AI 분석용 training_dataset 생성 완료")


if __name__ == "__main__":
    main()
