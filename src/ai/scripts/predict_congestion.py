# 학습된 SmartPark AI 혼잡도 모델로 output 예측 CSV를 생성하기 위한 스크립트이다.
# congestion_predictions.csv는 예측 가능 면수, 예측 점유율, 혼잡도 상태, 추천 점수를 담는다.
# 생성된 output 데이터는 백엔드/MySQL 연동 입력 데이터로 활용할 예정이다.

from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
RAW_DATA_DIR = PROJECT_ROOT / "data" / "raw"
PROCESSED_DATA_DIR = PROJECT_ROOT / "data" / "processed"
OUTPUT_DATA_DIR = PROJECT_ROOT / "data" / "output"
MODELS_DIR = PROJECT_ROOT / "models"

TRAINING_DATASET_FILE = PROCESSED_DATA_DIR / "training_dataset.csv"
MODEL_FILE = MODELS_DIR / "congestion_model.joblib"
PREDICTION_FILE = OUTPUT_DATA_DIR / "congestion_predictions.csv"


def ensure_directories() -> None:
    """스크립트 실행에 필요한 기본 디렉터리를 준비한다."""
    for directory in [RAW_DATA_DIR, PROCESSED_DATA_DIR, OUTPUT_DATA_DIR, MODELS_DIR]:
        directory.mkdir(parents=True, exist_ok=True)


def main() -> None:
    ensure_directories()

    # TODO: MODEL_FILE을 로드하고 예측 대상 데이터를 준비한다.
    # TODO: prediction_id, target_datetime, model_version, created_at, updated_at을 포함한다.
    # TODO: 혼잡도 예측 결과를 PREDICTION_FILE CSV로 저장한다.
    print(f"[TODO] Model will be loaded from: {MODEL_FILE}")
    print(f"[TODO] Prediction input will be loaded from: {TRAINING_DATASET_FILE}")
    print(f"[TODO] Prediction result will be saved to: {PREDICTION_FILE}")


if __name__ == "__main__":
    main()
