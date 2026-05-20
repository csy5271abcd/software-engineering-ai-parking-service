# SmartPark AI raw Mock CSV를 생성하기 위한 스크립트이다.
# 생성 예정 파일은 parking_lots.csv, parking_usage_history.csv, external_factors.csv이다.
# 주요 컬럼은 주차장 정보, 시간대별 이용 이력, 날씨/이벤트/교통 외부 요인으로 구성한다.

from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
RAW_DATA_DIR = PROJECT_ROOT / "data" / "raw"
PROCESSED_DATA_DIR = PROJECT_ROOT / "data" / "processed"
OUTPUT_DATA_DIR = PROJECT_ROOT / "data" / "output"
MODELS_DIR = PROJECT_ROOT / "models"

PARKING_LOTS_FILE = RAW_DATA_DIR / "parking_lots.csv"
USAGE_HISTORY_FILE = RAW_DATA_DIR / "parking_usage_history.csv"
EXTERNAL_FACTORS_FILE = RAW_DATA_DIR / "external_factors.csv"


def ensure_directories() -> None:
    """스크립트 실행에 필요한 기본 디렉터리를 준비한다."""
    for directory in [RAW_DATA_DIR, PROCESSED_DATA_DIR, OUTPUT_DATA_DIR, MODELS_DIR]:
        directory.mkdir(parents=True, exist_ok=True)


def main() -> None:
    ensure_directories()

    # TODO: parking_lots.csv 컬럼을 기준으로 주차장 기본 정보 Mock 데이터를 생성한다.
    # TODO: parking_usage_history.csv 컬럼을 기준으로 시간대별 이용 이력 Mock 데이터를 생성한다.
    # TODO: external_factors.csv 컬럼을 기준으로 날씨, 이벤트, 교통 Mock 데이터를 생성한다.
    # TODO: pandas/numpy 기반으로 반복 가능한 소규모 샘플 생성 로직을 구현한다.
    print(f"[TODO] Parking lot data will be generated at: {PARKING_LOTS_FILE}")
    print(f"[TODO] Usage history data will be generated at: {USAGE_HISTORY_FILE}")
    print(f"[TODO] External factor data will be generated at: {EXTERNAL_FACTORS_FILE}")


if __name__ == "__main__":
    main()
