# SmartPark AI 혼잡도 분석용 congestion_level 분류 모델을 학습한다.
# training_sample.csv를 입력으로 사용하고 평가 결과와 모델 산출물을 저장한다.

from __future__ import annotations

import json
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.impute import SimpleImputer
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    f1_score,
)
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler


RANDOM_SEED = 42
TEST_SIZE = 0.2
TARGET_COLUMN = "congestion_level"
MODEL_VERSION = "ai-congestion-rf-v1"
USE_REALTIME_USAGE_FEATURES = False
TEST_MODE = False
TEST_MODE_SAMPLE_ROWS = 30_000
OUTPUT_ENCODING = "utf-8-sig"

CLASS_ORDER = ["LOW", "MEDIUM", "HIGH", "VERY_HIGH"]

LEAKAGE_COLUMNS = [
    "record_id",
    "parking_lot_id",
    "name",
    "address",
    "date",
    "congestion_score",
    "congestion_level",
    "recommendation_score",
    "recommendation_reason",
]

REALTIME_USAGE_COLUMNS = [
    "occupied_spaces",
    "available_spaces",
    "reserved_spaces",
    "soon_available_spaces",
    "occupancy_rate",
    "turnover_rate",
]

BASE_FEATURE_CANDIDATES = [
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


@dataclass(frozen=True)
class ProjectPaths:
    project_root: Path
    processed_data_dir: Path
    output_data_dir: Path
    models_dir: Path
    input_path: Path
    model_path: Path
    metadata_path: Path
    evaluation_path: Path
    classification_report_path: Path
    confusion_matrix_path: Path
    feature_importance_path: Path


def get_project_paths() -> ProjectPaths:
    project_root = Path(__file__).resolve().parents[1]
    processed_data_dir = project_root / "data" / "processed"
    output_data_dir = project_root / "data" / "output"
    models_dir = project_root / "models"
    return ProjectPaths(
        project_root=project_root,
        processed_data_dir=processed_data_dir,
        output_data_dir=output_data_dir,
        models_dir=models_dir,
        input_path=processed_data_dir / "training_sample.csv",
        model_path=models_dir / "congestion_model.joblib",
        metadata_path=models_dir / "congestion_model_metadata.json",
        evaluation_path=output_data_dir / "model_evaluation.json",
        classification_report_path=output_data_dir / "classification_report.csv",
        confusion_matrix_path=output_data_dir / "confusion_matrix.csv",
        feature_importance_path=output_data_dir / "feature_importance.csv",
    )


def validate_input_file(input_path: Path) -> None:
    if not input_path.exists():
        raise FileNotFoundError(f"Required input file not found: {input_path}")


def load_training_sample(input_path: Path) -> pd.DataFrame:
    df = pd.read_csv(input_path, encoding=OUTPUT_ENCODING)
    if TARGET_COLUMN in df.columns and (df[TARGET_COLUMN] == "UNKNOWN").any():
        excluded_count = int((df[TARGET_COLUMN] == "UNKNOWN").sum())
        print(f"[filter] UNKNOWN rows excluded from training: {excluded_count:,}")
        df = df[df[TARGET_COLUMN] != "UNKNOWN"].copy()

    if TEST_MODE and len(df) > TEST_MODE_SAMPLE_ROWS:
        df = (
            df.groupby(TARGET_COLUMN, group_keys=False)
            .apply(lambda group: group.sample(
                n=min(len(group), max(1, TEST_MODE_SAMPLE_ROWS // df[TARGET_COLUMN].nunique())),
                random_state=RANDOM_SEED,
            ))
            .sample(frac=1, random_state=RANDOM_SEED)
            .reset_index(drop=True)
        )
        print(f"[test] TEST_MODE enabled; sampled rows={len(df):,}")
    return df


def validate_training_data(df: pd.DataFrame) -> None:
    if TARGET_COLUMN not in df.columns:
        raise ValueError(f"Required target column is missing: {TARGET_COLUMN}")
    invalid_targets = set(df[TARGET_COLUMN].dropna().unique()) - set(CLASS_ORDER)
    if invalid_targets:
        raise ValueError(f"Invalid target values found: {sorted(invalid_targets)}")
    if len(df) < 1_000:
        raise ValueError("training_sample.csv must contain at least 1,000 rows.")
    if df[TARGET_COLUMN].nunique() < 2:
        raise ValueError("Target column must contain at least 2 classes.")
    for score_column in ["congestion_score", "recommendation_score"]:
        if score_column in df.columns and not df[score_column].between(0, 100).all():
            raise ValueError(f"{score_column} must be between 0 and 100.")


def get_feature_columns(df: pd.DataFrame) -> tuple[list[str], list[str]]:
    candidates = BASE_FEATURE_CANDIDATES.copy()
    if USE_REALTIME_USAGE_FEATURES:
        candidates.extend(REALTIME_USAGE_COLUMNS)

    missing_candidates = [column for column in candidates if column not in df.columns]
    if missing_candidates:
        print(f"[warn] Missing feature candidates ignored: {missing_candidates}")

    excluded_columns = LEAKAGE_COLUMNS.copy()
    if not USE_REALTIME_USAGE_FEATURES:
        excluded_columns.extend(REALTIME_USAGE_COLUMNS)

    feature_columns = [
        column
        for column in candidates
        if column in df.columns and column not in excluded_columns and column != TARGET_COLUMN
    ]
    if not feature_columns:
        raise ValueError("No feature columns are available after leakage exclusions.")
    return feature_columns, excluded_columns


def split_features_target(df: pd.DataFrame, feature_columns: list[str]) -> tuple[pd.DataFrame, pd.Series]:
    X = df[feature_columns].copy()
    y = df[TARGET_COLUMN].copy()
    return X, y


def build_one_hot_encoder() -> OneHotEncoder:
    try:
        return OneHotEncoder(handle_unknown="ignore", sparse_output=False)
    except TypeError:
        return OneHotEncoder(handle_unknown="ignore", sparse=False)


def build_preprocessing_pipeline(X: pd.DataFrame) -> tuple[ColumnTransformer, list[str], list[str]]:
    numeric_features = X.select_dtypes(include=["number"]).columns.tolist()
    categorical_features = [column for column in X.columns if column not in numeric_features]

    numeric_pipeline = Pipeline(
        steps=[
            ("imputer", SimpleImputer(strategy="median")),
            ("scaler", StandardScaler()),
        ]
    )
    categorical_pipeline = Pipeline(
        steps=[
            ("imputer", SimpleImputer(strategy="most_frequent")),
            ("onehot", build_one_hot_encoder()),
        ]
    )
    preprocessor = ColumnTransformer(
        transformers=[
            ("numeric", numeric_pipeline, numeric_features),
            ("categorical", categorical_pipeline, categorical_features),
        ],
        remainder="drop",
        verbose_feature_names_out=True,
    )
    return preprocessor, numeric_features, categorical_features


def build_model_pipeline(preprocessor: ColumnTransformer) -> Pipeline:
    classifier = RandomForestClassifier(
        n_estimators=200,
        max_depth=18,
        min_samples_split=5,
        min_samples_leaf=2,
        class_weight="balanced",
        random_state=RANDOM_SEED,
        n_jobs=-1,
    )
    return Pipeline(steps=[("preprocessor", preprocessor), ("classifier", classifier)])


def train_model(model_pipeline: Pipeline, X_train: pd.DataFrame, y_train: pd.Series) -> Pipeline:
    print("[train] Model training started")
    model_pipeline.fit(X_train, y_train)
    print("[train] Model training completed")
    return model_pipeline


def evaluate_model(model_pipeline: Pipeline, X_test: pd.DataFrame, y_test: pd.Series) -> dict[str, object]:
    y_pred = model_pipeline.predict(X_test)
    report = classification_report(y_test, y_pred, labels=CLASS_ORDER, output_dict=True, zero_division=0)
    matrix = confusion_matrix(y_test, y_pred, labels=CLASS_ORDER)
    return {
        "accuracy": float(accuracy_score(y_test, y_pred)),
        "macro_f1": float(f1_score(y_test, y_pred, average="macro")),
        "weighted_f1": float(f1_score(y_test, y_pred, average="weighted")),
        "classification_report": report,
        "confusion_matrix": matrix,
        "predictions": y_pred,
    }


def extract_feature_importance(model_pipeline: Pipeline, feature_columns: list[str]) -> pd.DataFrame:
    preprocessor = model_pipeline.named_steps["preprocessor"]
    classifier = model_pipeline.named_steps["classifier"]
    try:
        feature_names = preprocessor.get_feature_names_out(feature_columns)
    except TypeError:
        feature_names = preprocessor.get_feature_names_out()

    importance_df = pd.DataFrame(
        {
            "feature": feature_names,
            "importance": classifier.feature_importances_,
        }
    ).sort_values("importance", ascending=False, ignore_index=True)
    importance_df["rank"] = np.arange(1, len(importance_df) + 1)
    return importance_df[["feature", "importance", "rank"]]


def save_model(model_pipeline: Pipeline, model_path: Path) -> None:
    joblib.dump(model_pipeline, model_path)


def save_metadata(metadata: dict[str, object], metadata_path: Path) -> None:
    with metadata_path.open("w", encoding="utf-8") as file:
        json.dump(metadata, file, ensure_ascii=False, indent=2)


def save_evaluation_outputs(
    evaluation: dict[str, object],
    output_paths: ProjectPaths,
    feature_importance_df: pd.DataFrame,
    y_train: pd.Series,
    y_test: pd.Series,
    feature_count: int,
) -> None:
    report = evaluation["classification_report"]
    matrix = evaluation["confusion_matrix"]

    report_rows = []
    for class_label in CLASS_ORDER:
        class_metrics = report[class_label]
        report_rows.append(
            {
                "class": class_label,
                "precision": class_metrics["precision"],
                "recall": class_metrics["recall"],
                "f1_score": class_metrics["f1-score"],
                "support": class_metrics["support"],
            }
        )
    pd.DataFrame(report_rows).to_csv(
        output_paths.classification_report_path,
        index=False,
        encoding=OUTPUT_ENCODING,
    )

    pd.DataFrame(matrix, index=CLASS_ORDER, columns=CLASS_ORDER).to_csv(
        output_paths.confusion_matrix_path,
        encoding=OUTPUT_ENCODING,
    )
    feature_importance_df.to_csv(
        output_paths.feature_importance_path,
        index=False,
        encoding=OUTPUT_ENCODING,
    )

    evaluation_json = {
        "model_version": MODEL_VERSION,
        "generated_at": datetime.now().isoformat(timespec="seconds"),
        "input_file": str(output_paths.input_path),
        "model_file": str(output_paths.model_path),
        "target_column": TARGET_COLUMN,
        "use_realtime_usage_features": USE_REALTIME_USAGE_FEATURES,
        "random_seed": RANDOM_SEED,
        "test_size": TEST_SIZE,
        "train_row_count": int(len(y_train)),
        "test_row_count": int(len(y_test)),
        "feature_count": int(feature_count),
        "classes": CLASS_ORDER,
        "accuracy": evaluation["accuracy"],
        "macro_f1": evaluation["macro_f1"],
        "weighted_f1": evaluation["weighted_f1"],
        "class_distribution_train": {k: int(v) for k, v in y_train.value_counts().reindex(CLASS_ORDER, fill_value=0).items()},
        "class_distribution_test": {k: int(v) for k, v in y_test.value_counts().reindex(CLASS_ORDER, fill_value=0).items()},
        "classification_report": report,
        "confusion_matrix": matrix.tolist(),
        "notes": "Training uses leakage-safe features by default. Realtime usage features are excluded unless enabled.",
    }
    with output_paths.evaluation_path.open("w", encoding="utf-8") as file:
        json.dump(evaluation_json, file, ensure_ascii=False, indent=2)


def print_overwrite_notice(paths: list[Path]) -> None:
    for path in paths:
        if path.exists():
            print(f"[overwrite] Existing file will be replaced: {path}")


def validate_split_classes(y_train: pd.Series, y_test: pd.Series) -> None:
    missing_train = set(CLASS_ORDER) - set(y_train.unique())
    missing_test = set(CLASS_ORDER) - set(y_test.unique())
    if missing_train or missing_test:
        raise ValueError(f"Class missing after split. train={missing_train}, test={missing_test}")


def main() -> None:
    paths = get_project_paths()
    paths.output_data_dir.mkdir(parents=True, exist_ok=True)
    paths.models_dir.mkdir(parents=True, exist_ok=True)
    validate_input_file(paths.input_path)
    print_overwrite_notice(
        [
            paths.model_path,
            paths.metadata_path,
            paths.evaluation_path,
            paths.classification_report_path,
            paths.confusion_matrix_path,
            paths.feature_importance_path,
        ]
    )

    print("[start] SmartPark AI congestion model training")
    print(f"[input] training_sample={paths.input_path}")
    print(f"[model] model_path={paths.model_path}")
    print(f"[output] evaluation={paths.evaluation_path}")

    df = load_training_sample(paths.input_path)
    validate_training_data(df)
    print(f"[loaded] rows={len(df):,}")
    print(f"[target] distribution={df[TARGET_COLUMN].value_counts().reindex(CLASS_ORDER, fill_value=0).to_dict()}")

    feature_columns, excluded_columns = get_feature_columns(df)
    X, y = split_features_target(df, feature_columns)
    preprocessor, numeric_features, categorical_features = build_preprocessing_pipeline(X)
    print(f"[features] feature_count={len(feature_columns)}")
    print(f"[features] numeric_count={len(numeric_features)}, numeric_features={numeric_features}")
    print(f"[features] categorical_count={len(categorical_features)}, categorical_features={categorical_features}")

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=TEST_SIZE,
        stratify=y,
        random_state=RANDOM_SEED,
    )
    validate_split_classes(y_train, y_test)
    print(f"[split] train_rows={len(X_train):,}, test_rows={len(X_test):,}")
    print(f"[split] train_distribution={y_train.value_counts().reindex(CLASS_ORDER, fill_value=0).to_dict()}")
    print(f"[split] test_distribution={y_test.value_counts().reindex(CLASS_ORDER, fill_value=0).to_dict()}")

    model_pipeline = build_model_pipeline(preprocessor)
    model_pipeline = train_model(model_pipeline, X_train, y_train)
    evaluation = evaluate_model(model_pipeline, X_test, y_test)
    feature_importance_df = extract_feature_importance(model_pipeline, feature_columns)

    save_model(model_pipeline, paths.model_path)
    metadata = {
        "model_version": MODEL_VERSION,
        "trained_at": datetime.now().isoformat(timespec="seconds"),
        "algorithm": "RandomForestClassifier",
        "model_type": "classification_pipeline",
        "input_dataset": str(paths.input_path),
        "target_column": TARGET_COLUMN,
        "feature_columns": feature_columns,
        "excluded_columns": excluded_columns,
        "use_realtime_usage_features": USE_REALTIME_USAGE_FEATURES,
        "random_seed": RANDOM_SEED,
        "test_size": TEST_SIZE,
        "classes": CLASS_ORDER,
        "training_rows": int(len(y_train)),
        "test_rows": int(len(y_test)),
        "output_files": {
            "model": str(paths.model_path),
            "metadata": str(paths.metadata_path),
            "model_evaluation": str(paths.evaluation_path),
            "classification_report": str(paths.classification_report_path),
            "confusion_matrix": str(paths.confusion_matrix_path),
            "feature_importance": str(paths.feature_importance_path),
        },
        "source_dataset_note": "training_sample.csv is generated from training_dataset.csv and is not tracked by Git.",
    }
    save_metadata(metadata, paths.metadata_path)
    save_evaluation_outputs(evaluation, paths, feature_importance_df, y_train, y_test, len(feature_columns))

    print(f"[metrics] accuracy={evaluation['accuracy']:.4f}")
    print(f"[metrics] macro_f1={evaluation['macro_f1']:.4f}")
    print(f"[metrics] weighted_f1={evaluation['weighted_f1']:.4f}")
    print("[classification_report]")
    print(classification_report(y_test, model_pipeline.predict(X_test), labels=CLASS_ORDER, zero_division=0))
    print("[confusion_matrix]")
    print(pd.DataFrame(evaluation["confusion_matrix"], index=CLASS_ORDER, columns=CLASS_ORDER).to_string())
    print("[feature_importance_top_30]")
    print(feature_importance_df.head(30).to_string(index=False))
    print("[saved]")
    for output_path in [
        paths.model_path,
        paths.metadata_path,
        paths.evaluation_path,
        paths.classification_report_path,
        paths.confusion_matrix_path,
        paths.feature_importance_path,
    ]:
        print(f"- {output_path}")
    print("[complete] SmartPark AI 혼잡도 분석 모델 학습 완료")


if __name__ == "__main__":
    main()
