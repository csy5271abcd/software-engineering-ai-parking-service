# 전처리된 주차장 데이터를 사용해 혼잡도 예측 모델을 학습하기 위한 스크립트이다.
# v3.0.0 단계에서는 학습 파이프라인의 진입점과 모델 저장 경로만 준비한다.

from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
RAW_DATA_DIR = PROJECT_ROOT / "data" / "raw"
PROCESSED_DATA_DIR = PROJECT_ROOT / "data" / "processed"
OUTPUT_DATA_DIR = PROJECT_ROOT / "data" / "output"
MODELS_DIR = PROJECT_ROOT / "models"

PROCESSED_DATA_FILE = PROCESSED_DATA_DIR / "processed_parking_data.csv"
MODEL_FILE = MODELS_DIR / "congestion_model.joblib"


def ensure_directories() -> None:
    """스크립트 실행에 필요한 기본 디렉터리를 준비한다."""
    for directory in [RAW_DATA_DIR, PROCESSED_DATA_DIR, OUTPUT_DATA_DIR, MODELS_DIR]:
        directory.mkdir(parents=True, exist_ok=True)


def main() -> None:
    ensure_directories()

    # TODO: PROCESSED_DATA_FILE을 읽어 학습/검증 데이터로 분리한다.
    # TODO: scikit-learn 기반 baseline 모델을 학습하고 MODEL_FILE로 저장한다.
    print(f"[TODO] Training data will be loaded from: {PROCESSED_DATA_FILE}")
    print(f"[TODO] Trained model will be saved to: {MODEL_FILE}")


if __name__ == "__main__":
    main()
