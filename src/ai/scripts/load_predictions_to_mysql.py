# SmartPark AI congestion_predictions.csv를 MySQL congestion_predictions 테이블에 적재한다.
# DB 접속 정보는 환경 변수에서만 읽으며 insert/upsert와 dry-run을 지원한다.

from __future__ import annotations

import json
import os
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path

import mysql.connector
import pandas as pd


CSV_FILE_NAME = "congestion_predictions.csv"
TABLE_NAME = "congestion_predictions"
CHUNK_SIZE_ROWS = 5_000
DRY_RUN = False
TRUNCATE_BEFORE_LOAD = False
OUTPUT_ENCODING = "utf-8-sig"

REQUIRED_COLUMNS = [
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

VALID_LEVELS = {"LOW", "MEDIUM", "HIGH", "VERY_HIGH"}


@dataclass(frozen=True)
class ProjectPaths:
    project_root: Path
    output_data_dir: Path
    sql_dir: Path
    csv_path: Path
    create_sql_path: Path


def get_project_paths() -> ProjectPaths:
    project_root = Path(__file__).resolve().parents[1]
    output_data_dir = project_root / "data" / "output"
    sql_dir = project_root / "sql"
    return ProjectPaths(
        project_root=project_root,
        output_data_dir=output_data_dir,
        sql_dir=sql_dir,
        csv_path=output_data_dir / CSV_FILE_NAME,
        create_sql_path=sql_dir / "create_congestion_predictions_table.sql",
    )


def get_db_config_from_env() -> dict[str, object]:
    user = os.environ.get("SMARTPARK_DB_USER")
    password = os.environ.get("SMARTPARK_DB_PASSWORD")
    missing = []
    if not user:
        missing.append("SMARTPARK_DB_USER")
    if not password:
        missing.append("SMARTPARK_DB_PASSWORD")
    if missing:
        raise ValueError(
            "Missing required DB environment variables: "
            + ", ".join(missing)
            + ". Required variables: SMARTPARK_DB_HOST, SMARTPARK_DB_PORT, SMARTPARK_DB_NAME, "
            "SMARTPARK_DB_USER, SMARTPARK_DB_PASSWORD, SMARTPARK_DB_CHARSET"
        )

    return {
        "host": os.environ.get("SMARTPARK_DB_HOST", "localhost"),
        "port": int(os.environ.get("SMARTPARK_DB_PORT", "3306")),
        "database": os.environ.get("SMARTPARK_DB_NAME", "smartpark_local"),
        "user": user,
        "password": password,
        "charset": os.environ.get("SMARTPARK_DB_CHARSET", "utf8mb4"),
    }


def validate_input_csv(csv_path: Path) -> None:
    if not csv_path.exists():
        print("입력 CSV가 없습니다. 먼저 python scripts\\predict_congestion.py를 실행해 congestion_predictions.csv를 생성하세요.")
        raise FileNotFoundError(f"Required input CSV not found: {csv_path}")
    header_df = pd.read_csv(csv_path, encoding=OUTPUT_ENCODING, nrows=0)
    missing_columns = [column for column in REQUIRED_COLUMNS if column not in header_df.columns]
    if missing_columns:
        raise ValueError(f"{csv_path} is missing required columns: {missing_columns}")


def validate_prediction_chunk(df: pd.DataFrame) -> None:
    missing_columns = [column for column in REQUIRED_COLUMNS if column not in df.columns]
    if missing_columns:
        raise ValueError(f"Prediction chunk is missing required columns: {missing_columns}")
    if df["prediction_id"].isna().any() or (df["prediction_id"].astype(str).str.strip() == "").any():
        raise ValueError("prediction_id must not be empty.")
    if df["prediction_id"].duplicated().any():
        raise ValueError("prediction_id must not be duplicated inside a chunk.")
    if df["parking_lot_id"].isna().any() or (df["parking_lot_id"].astype(str).str.strip() == "").any():
        raise ValueError("parking_lot_id must not be empty.")
    if df["target_datetime"].isna().any():
        raise ValueError("target_datetime must not be empty.")
    if (df["predicted_available_spaces"] < 0).any():
        raise ValueError("predicted_available_spaces must be greater than or equal to 0.")
    if not df["predicted_occupancy_rate"].between(0, 1).all():
        raise ValueError("predicted_occupancy_rate must be between 0 and 1.")
    if not df["congestion_score"].between(0, 100).all():
        raise ValueError("congestion_score must be between 0 and 100.")
    if not df["congestion_level"].isin(VALID_LEVELS).all():
        raise ValueError("congestion_level contains invalid values.")
    if not df["recommendation_score"].between(0, 100).all():
        raise ValueError("recommendation_score must be between 0 and 100.")
    for column in ["model_version", "created_at", "updated_at"]:
        if df[column].isna().any() or (df[column].astype(str).str.strip() == "").any():
            raise ValueError(f"{column} must not be empty.")


def connect_mysql(db_config: dict[str, object]):
    try:
        return mysql.connector.connect(**db_config)
    except mysql.connector.Error as exc:
        raise ConnectionError(
            "MySQL connection failed. Check environment variables: SMARTPARK_DB_HOST, SMARTPARK_DB_PORT, "
            "SMARTPARK_DB_NAME, SMARTPARK_DB_USER, SMARTPARK_DB_PASSWORD, SMARTPARK_DB_CHARSET. "
            f"Original error: {exc}"
        ) from exc


def read_sql_statements(sql_path: Path) -> list[str]:
    sql_text = sql_path.read_text(encoding="utf-8")
    cleaned_lines = []
    for line in sql_text.splitlines():
        stripped = line.strip()
        if stripped.startswith("--") or not stripped:
            continue
        cleaned_lines.append(line)
    return [statement.strip() for statement in "\n".join(cleaned_lines).split(";") if statement.strip()]


def ensure_table_exists(connection, create_sql_path: Path) -> None:
    if not create_sql_path.exists():
        raise FileNotFoundError(f"Create table SQL not found: {create_sql_path}")
    cursor = connection.cursor()
    try:
        for statement in read_sql_statements(create_sql_path):
            cursor.execute(statement)
        connection.commit()
    finally:
        cursor.close()


def normalize_datetime_value(value) -> str | None:
    if pd.isna(value):
        return None
    parsed = pd.to_datetime(value, errors="coerce")
    if pd.isna(parsed):
        raise ValueError(f"Invalid datetime value: {value}")
    return parsed.strftime("%Y-%m-%d %H:%M:%S")


def normalize_chunk(df: pd.DataFrame) -> pd.DataFrame:
    normalized = df.copy()
    for column in ["target_datetime", "created_at", "updated_at"]:
        normalized[column] = normalized[column].map(normalize_datetime_value)
    normalized["predicted_available_spaces"] = normalized["predicted_available_spaces"].astype(int)
    for column in ["predicted_occupancy_rate", "congestion_score", "recommendation_score"]:
        normalized[column] = normalized[column].astype(float)
    normalized = normalized.where(pd.notna(normalized), None)
    return normalized


def upsert_prediction_chunk(connection, df: pd.DataFrame) -> int:
    sql = f"""
        INSERT INTO {TABLE_NAME} (
            prediction_id,
            parking_lot_id,
            target_datetime,
            predicted_available_spaces,
            predicted_occupancy_rate,
            congestion_score,
            congestion_level,
            recommendation_score,
            recommendation_reason,
            model_version,
            created_at,
            updated_at
        ) VALUES (
            %(prediction_id)s,
            %(parking_lot_id)s,
            %(target_datetime)s,
            %(predicted_available_spaces)s,
            %(predicted_occupancy_rate)s,
            %(congestion_score)s,
            %(congestion_level)s,
            %(recommendation_score)s,
            %(recommendation_reason)s,
            %(model_version)s,
            %(created_at)s,
            %(updated_at)s
        )
        ON DUPLICATE KEY UPDATE
            predicted_available_spaces = VALUES(predicted_available_spaces),
            predicted_occupancy_rate = VALUES(predicted_occupancy_rate),
            congestion_score = VALUES(congestion_score),
            congestion_level = VALUES(congestion_level),
            recommendation_score = VALUES(recommendation_score),
            recommendation_reason = VALUES(recommendation_reason),
            updated_at = VALUES(updated_at)
    """
    records = df[REQUIRED_COLUMNS].to_dict(orient="records")
    cursor = connection.cursor()
    try:
        cursor.executemany(sql, records)
        connection.commit()
        return len(records)
    finally:
        cursor.close()


def count_loaded_rows(connection) -> int:
    cursor = connection.cursor()
    try:
        cursor.execute(f"SELECT COUNT(*) FROM {TABLE_NAME}")
        return int(cursor.fetchone()[0])
    finally:
        cursor.close()


def load_predictions(paths: ProjectPaths, db_config: dict[str, object]) -> dict[str, object]:
    validate_input_csv(paths.csv_path)
    total_rows = 0
    chunk_count = 0

    if DRY_RUN:
        print("[dry-run] DB connection and write operations will be skipped.")
        for chunk_df in pd.read_csv(paths.csv_path, encoding=OUTPUT_ENCODING, chunksize=CHUNK_SIZE_ROWS):
            validate_prediction_chunk(chunk_df)
            normalize_chunk(chunk_df)
            chunk_count += 1
            total_rows += len(chunk_df)
            print(f"[dry-run chunk {chunk_count}] rows={len(chunk_df):,}, cumulative_rows={total_rows:,}")
        return {"chunks": chunk_count, "processed_rows": total_rows, "db_row_count": None}

    connection = connect_mysql(db_config)
    try:
        ensure_table_exists(connection, paths.create_sql_path)
        if TRUNCATE_BEFORE_LOAD:
            cursor = connection.cursor()
            try:
                cursor.execute(f"TRUNCATE TABLE {TABLE_NAME}")
                connection.commit()
                print(f"[db] truncated table: {TABLE_NAME}")
            finally:
                cursor.close()

        for chunk_df in pd.read_csv(paths.csv_path, encoding=OUTPUT_ENCODING, chunksize=CHUNK_SIZE_ROWS):
            validate_prediction_chunk(chunk_df)
            normalized_df = normalize_chunk(chunk_df)
            inserted_rows = upsert_prediction_chunk(connection, normalized_df)
            chunk_count += 1
            total_rows += inserted_rows
            print(f"[load chunk {chunk_count}] rows={inserted_rows:,}, cumulative_rows={total_rows:,}")

        db_row_count = count_loaded_rows(connection)
        return {"chunks": chunk_count, "processed_rows": total_rows, "db_row_count": db_row_count}
    finally:
        connection.close()


def main() -> None:
    paths = get_project_paths()
    print("[start] SmartPark AI congestion prediction MySQL loader")
    print(f"[input] csv={paths.csv_path}")
    print(f"[sql] create_table={paths.create_sql_path}")
    print(f"[config] table={TABLE_NAME}, chunk_size={CHUNK_SIZE_ROWS:,}, dry_run={DRY_RUN}, truncate={TRUNCATE_BEFORE_LOAD}")

    db_config = get_db_config_from_env()
    safe_config = {key: value for key, value in db_config.items() if key != "password"}
    print(f"[db] config={json.dumps(safe_config, ensure_ascii=False)}")

    result = load_predictions(paths, db_config)
    print(f"[done] chunks={result['chunks']:,}, processed_rows={result['processed_rows']:,}")
    if result["db_row_count"] is not None:
        print(f"[db] {TABLE_NAME} row_count={result['db_row_count']:,}")
    print(f"[complete] SmartPark AI 예측 결과 MySQL 적재 완료 at {datetime.now().isoformat(timespec='seconds')}")


if __name__ == "__main__":
    main()
