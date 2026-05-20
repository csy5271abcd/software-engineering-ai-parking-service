# SmartPark AI raw Mock 데이터를 processed 학습 데이터로 전처리하기 위한 스크립트이다.
# raw의 parking_lots, parking_usage_history, external_factors를 결합해 training_dataset.csv를 만든다.
# 결합 과정에서 congestion_score, congestion_level, recommendation_score 같은 파생 컬럼을 준비한다.

from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
RAW_DATA_DIR = PROJECT_ROOT / "data" / "raw"
PROCESSED_DATA_DIR = PROJECT_ROOT / "data" / "processed"
OUTPUT_DATA_DIR = PROJECT_ROOT / "data" / "output"
MODELS_DIR = PROJECT_ROOT / "models"

PARKING_LOTS_FILE = RAW_DATA_DIR / "parking_lots.csv"
USAGE_HISTORY_FILE = RAW_DATA_DIR / "parking_usage_history.csv"
EXTERNAL_FACTORS_FILE = RAW_DATA_DIR / "external_factors.csv"
TRAINING_DATASET_FILE = PROCESSED_DATA_DIR / "training_dataset.csv"


def ensure_directories() -> None:
    """스크립트 실행에 필요한 기본 디렉터리를 준비한다."""
    for directory in [RAW_DATA_DIR, PROCESSED_DATA_DIR, OUTPUT_DATA_DIR, MODELS_DIR]:
        directory.mkdir(parents=True, exist_ok=True)


def main() -> None:
    ensure_directories()

    # TODO: raw CSV 파일의 존재 여부와 컬럼 스키마를 검증한다.
    # TODO: parking_lot_id, district, date, hour 기준으로 raw 데이터를 결합한다.
    # TODO: AI 학습에 필요한 feature와 label을 생성해 TRAINING_DATASET_FILE로 저장한다.
    print(f"[TODO] Parking lot data will be loaded from: {PARKING_LOTS_FILE}")
    print(f"[TODO] Usage history data will be loaded from: {USAGE_HISTORY_FILE}")
    print(f"[TODO] External factor data will be loaded from: {EXTERNAL_FACTORS_FILE}")
    print(f"[TODO] Training dataset will be saved to: {TRAINING_DATASET_FILE}")


if __name__ == "__main__":
    main()
