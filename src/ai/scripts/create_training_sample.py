# SmartPark AI 학습 전 단계에서 사용할 균형 샘플 training_sample.csv를 생성한다.
# 대용량 training_dataset.csv는 chunk 단위로 두 번 읽고 전체 원본을 메모리에 올리지 않는다.

from __future__ import annotations

import json
import random
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path

import numpy as np
import pandas as pd


CHUNK_SIZE_ROWS = 500_000
RANDOM_SEED = 42
TEST_MODE = False
TEST_MAX_CHUNKS = 3
SAMPLE_PER_LEVEL = 70_000
EXCLUDE_LEVELS = ["UNKNOWN"]
TARGET_LEVELS = ["LOW", "MEDIUM", "HIGH", "VERY_HIGH"]
OUTPUT_ENCODING = "utf-8-sig"

REQUIRED_COLUMNS = [
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

READ_DTYPES = {
    "record_id": "string",
    "parking_lot_id": "string",
    "name": "string",
    "district": "string",
    "latitude": "float64",
    "longitude": "float64",
    "nearby_poi_type": "string",
    "total_spaces": "int32",
    "price_per_hour": "int32",
    "parking_type": "string",
    "is_public": "bool",
    "is_shared": "bool",
    "has_nfc": "bool",
    "date": "string",
    "year": "int16",
    "month": "int8",
    "day": "int8",
    "day_of_week": "string",
    "hour": "int8",
    "time_slot": "string",
    "is_weekend": "bool",
    "is_holiday": "bool",
    "season": "string",
    "weather": "string",
    "temperature": "float32",
    "rainfall_mm": "float32",
    "event_nearby": "bool",
    "event_scale": "string",
    "traffic_level": "string",
    "occupied_spaces": "int32",
    "available_spaces": "int32",
    "reserved_spaces": "int32",
    "soon_available_spaces": "int32",
    "occupancy_rate": "float32",
    "turnover_rate": "float32",
    "congestion_score": "float32",
    "congestion_level": "string",
    "recommendation_score": "float32",
    "recommendation_reason": "string",
}


@dataclass(frozen=True)
class ProjectPaths:
    project_root: Path
    processed_data_dir: Path
    input_path: Path
    sample_output_path: Path
    summary_output_path: Path


def get_project_paths() -> ProjectPaths:
    project_root = Path(__file__).resolve().parents[1]
    processed_data_dir = project_root / "data" / "processed"
    return ProjectPaths(
        project_root=project_root,
        processed_data_dir=processed_data_dir,
        input_path=processed_data_dir / "training_dataset.csv",
        sample_output_path=processed_data_dir / "training_sample.csv",
        summary_output_path=processed_data_dir / "training_sample_summary.json",
    )


def validate_input_file(input_path: Path) -> None:
    if not input_path.exists():
        raise FileNotFoundError(f"Required input file not found: {input_path}")


def validate_required_columns(columns: pd.Index | list[str]) -> None:
    missing_columns = [column for column in REQUIRED_COLUMNS if column not in columns]
    if missing_columns:
        raise ValueError(f"training_dataset.csv is missing required columns: {missing_columns}")


def read_header(input_path: Path) -> list[str]:
    header_df = pd.read_csv(input_path, encoding=OUTPUT_ENCODING, nrows=0)
    validate_required_columns(header_df.columns)
    return list(header_df.columns)


def count_congestion_levels(input_path: Path) -> dict[str, int]:
    level_counts: dict[str, int] = {}
    total_rows = 0

    reader = pd.read_csv(
        input_path,
        encoding=OUTPUT_ENCODING,
        usecols=["congestion_level"],
        dtype={"congestion_level": "string"},
        chunksize=CHUNK_SIZE_ROWS,
    )
    for chunk_number, chunk_df in enumerate(reader, start=1):
        if TEST_MODE and chunk_number > TEST_MAX_CHUNKS:
            print(f"[test] TEST_MODE enabled; first pass stopped after {TEST_MAX_CHUNKS} chunks")
            break

        chunk_counts = chunk_df["congestion_level"].value_counts(dropna=False)
        for level, count in chunk_counts.items():
            key = str(level)
            level_counts[key] = level_counts.get(key, 0) + int(count)

        total_rows += len(chunk_df)
        print(
            f"[pass1 chunk {chunk_number}] "
            f"rows={len(chunk_df):,}, cumulative_rows={total_rows:,}, counts={level_counts}"
        )
        del chunk_df

    return level_counts


def determine_sample_targets(level_counts: dict[str, int]) -> dict[str, int]:
    targets = {}
    for level in TARGET_LEVELS:
        available_count = int(level_counts.get(level, 0))
        targets[level] = min(SAMPLE_PER_LEVEL, available_count)
    return targets


def collect_balanced_samples(input_path: Path, sample_targets: dict[str, int]) -> pd.DataFrame:
    samples_by_level: dict[str, list[pd.DataFrame]] = {level: [] for level in TARGET_LEVELS}
    sampled_counts = {level: 0 for level in TARGET_LEVELS}

    reader = pd.read_csv(
        input_path,
        encoding=OUTPUT_ENCODING,
        dtype=READ_DTYPES,
        chunksize=CHUNK_SIZE_ROWS,
    )
    for chunk_number, chunk_df in enumerate(reader, start=1):
        if TEST_MODE and chunk_number > TEST_MAX_CHUNKS:
            print(f"[test] TEST_MODE enabled; second pass stopped after {TEST_MAX_CHUNKS} chunks")
            break

        validate_required_columns(chunk_df.columns)
        target_chunk_df = chunk_df[chunk_df["congestion_level"].isin(TARGET_LEVELS)].copy()
        for level in TARGET_LEVELS:
            remaining = sample_targets[level] - sampled_counts[level]
            if remaining <= 0:
                continue

            level_df = target_chunk_df[target_chunk_df["congestion_level"] == level]
            if level_df.empty:
                continue

            take_count = min(remaining, len(level_df))
            sampled_df = level_df.sample(
                n=take_count,
                random_state=RANDOM_SEED + chunk_number + TARGET_LEVELS.index(level),
            )
            samples_by_level[level].append(sampled_df)
            sampled_counts[level] += take_count

        done = all(sampled_counts[level] >= sample_targets[level] for level in TARGET_LEVELS)
        print(
            f"[pass2 chunk {chunk_number}] "
            f"rows={len(chunk_df):,}, sampled_counts={sampled_counts}, target_met={done}"
        )

        del target_chunk_df
        del chunk_df
        if done:
            print(f"[pass2] all sample targets reached at chunk {chunk_number}; stopping early")
            break

    sample_frames = []
    for level in TARGET_LEVELS:
        sample_frames.extend(samples_by_level[level])
    if not sample_frames:
        raise ValueError("No rows were sampled from training_dataset.csv.")

    sample_df = pd.concat(sample_frames, ignore_index=True)
    sample_df = sample_df.sample(frac=1, random_state=RANDOM_SEED).reset_index(drop=True)
    return sample_df[REQUIRED_COLUMNS]


def validate_sample_df(sample_df: pd.DataFrame, sample_targets: dict[str, int]) -> None:
    validate_required_columns(sample_df.columns)
    invalid_levels = set(sample_df["congestion_level"].dropna().unique()) - set(TARGET_LEVELS)
    if invalid_levels:
        raise ValueError(f"training_sample.csv contains invalid congestion_level values: {invalid_levels}")
    if sample_df["congestion_level"].isin(EXCLUDE_LEVELS).any():
        raise ValueError(f"training_sample.csv contains excluded levels: {EXCLUDE_LEVELS}")
    if not sample_df["congestion_score"].between(0, 100).all():
        raise ValueError("congestion_score must be between 0 and 100.")
    if not sample_df["recommendation_score"].between(0, 100).all():
        raise ValueError("recommendation_score must be between 0 and 100.")
    if not sample_df["occupancy_rate"].between(0, 1).all():
        raise ValueError("occupancy_rate must be between 0 and 1.")
    if not ((sample_df["occupied_spaces"] + sample_df["available_spaces"]) == sample_df["total_spaces"]).all():
        raise ValueError("occupied_spaces + available_spaces must equal total_spaces.")

    all_null_columns = [column for column in REQUIRED_COLUMNS if sample_df[column].isna().all()]
    if all_null_columns:
        raise ValueError(f"Required columns have only null values: {all_null_columns}")

    sampled_counts = sample_df["congestion_level"].value_counts().to_dict()
    for level, target_count in sample_targets.items():
        if int(sampled_counts.get(level, 0)) != target_count:
            raise ValueError(
                f"Sample count mismatch for {level}: expected {target_count}, got {sampled_counts.get(level, 0)}"
            )


def save_sample_csv(sample_df: pd.DataFrame, output_path: Path) -> None:
    sample_df.to_csv(output_path, index=False, encoding=OUTPUT_ENCODING, lineterminator="\n")


def save_summary_json(summary: dict[str, object], output_path: Path) -> None:
    with output_path.open("w", encoding="utf-8") as file:
        json.dump(summary, file, ensure_ascii=False, indent=2)


def print_overwrite_notice(paths: list[Path]) -> None:
    for path in paths:
        if path.exists():
            print(f"[overwrite] Existing file will be replaced: {path}")


def main() -> None:
    random.seed(RANDOM_SEED)
    np.random.seed(RANDOM_SEED)

    paths = get_project_paths()
    paths.processed_data_dir.mkdir(parents=True, exist_ok=True)
    validate_input_file(paths.input_path)
    read_header(paths.input_path)
    print_overwrite_notice([paths.sample_output_path, paths.summary_output_path])

    print("[start] SmartPark AI balanced training sample creation")
    print(f"[input] training_dataset={paths.input_path}")
    print(f"[output] training_sample={paths.sample_output_path}")
    print(f"[output] summary={paths.summary_output_path}")
    print(
        f"[config] chunk_size_rows={CHUNK_SIZE_ROWS:,}, sample_per_level={SAMPLE_PER_LEVEL:,}, "
        f"test_mode={TEST_MODE}, random_seed={RANDOM_SEED}"
    )

    original_level_counts = count_congestion_levels(paths.input_path)
    sample_targets = determine_sample_targets(original_level_counts)
    print(f"[pass1 done] original_level_counts={original_level_counts}")
    print(f"[targets] sample_targets={sample_targets}")

    sample_df = collect_balanced_samples(paths.input_path, sample_targets)
    validate_sample_df(sample_df, sample_targets)
    save_sample_csv(sample_df, paths.sample_output_path)

    sampled_level_counts = {
        level: int(count)
        for level, count in sample_df["congestion_level"].value_counts().reindex(TARGET_LEVELS, fill_value=0).items()
    }
    summary = {
        "generated_at": datetime.now().isoformat(timespec="seconds"),
        "input_file": str(paths.input_path),
        "output_file": str(paths.sample_output_path),
        "chunk_size_rows": CHUNK_SIZE_ROWS,
        "random_seed": RANDOM_SEED,
        "sample_per_level": SAMPLE_PER_LEVEL,
        "test_mode": TEST_MODE,
        "target_levels": TARGET_LEVELS,
        "excluded_levels": EXCLUDE_LEVELS,
        "original_level_counts": {key: int(value) for key, value in original_level_counts.items()},
        "sample_targets": {key: int(value) for key, value in sample_targets.items()},
        "sampled_level_counts": sampled_level_counts,
        "total_sample_rows": int(len(sample_df)),
        "source_dataset_note": "training_dataset.csv is a generated large local artifact and is not tracked by Git.",
    }
    save_summary_json(summary, paths.summary_output_path)

    print(f"[done] training_sample.csv path={paths.sample_output_path}")
    print(f"[done] training_sample_summary.json path={paths.summary_output_path}")
    print(f"[summary] original_level_counts={original_level_counts}")
    print(f"[summary] sampled_level_counts={sampled_level_counts}")
    print(f"[summary] total_sample_rows={len(sample_df):,}")
    print("[complete] SmartPark AI 학습용 training_sample 생성 완료")


if __name__ == "__main__":
    main()
