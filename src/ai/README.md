# SmartPark AI Module

SmartPark AI 모듈은 주차장 Mock 데이터 생성, 전처리, AI 학습, 혼잡도 예측, MySQL 적재 준비를 담당하는 v3.x.x 구현 영역이다. 실제 개인정보나 실제 차량 데이터는 사용하지 않으며 개발/검증용 Mock 데이터만 사용한다.

## 버전 관리 기준

- `v1.x.x`: 프론트엔드 구현 버전
- `v2.x.x`: 백엔드 구현 버전
- `v3.x.x`: AI 구현 버전
- `v4.x.x`: 통합/MVP 버전
- `v3.7.0`: `congestion_predictions.csv` MySQL 적재용 SQL, Python loader, 백엔드 연동 문서 기준선

## 실행 흐름

1. Mock 원본 데이터 생성

   ```bash
   python scripts/generate_mock_parking_data.py
   ```

2. AI 분석용 통합 데이터 생성

   ```bash
   python scripts/preprocess_parking_data.py
   ```

3. AI 학습용 균형 샘플 생성

   ```bash
   python scripts/create_training_sample.py
   ```

4. AI 혼잡도 모델 학습

   ```bash
   python scripts/train_congestion_model.py
   ```

5. 혼잡도 예측 결과 생성

   ```bash
   python scripts/predict_congestion.py
   ```

6. 예측 결과 MySQL 적재

   ```bash
   python scripts/load_predictions_to_mysql.py
   ```

자세한 DB 연동 기준은 [docs/MYSQL_INTEGRATION.md](docs/MYSQL_INTEGRATION.md)를 참고한다.

## 주요 폴더

```text
ai/
  data/
    raw/          # Mock 원본 데이터
    processed/    # 전처리 및 학습 샘플 데이터
    output/       # 예측 결과 및 평가 산출물
  docs/           # 데이터 스키마 및 DB 연동 문서
  models/         # 학습된 AI 모델과 메타데이터
  notebooks/      # 실험용 노트북
  scripts/        # 데이터 생성, 전처리, 학습, 예측, DB 적재 스크립트
  sql/            # MySQL 테이블 생성 및 import 참고 SQL
```

## 주요 산출물

- `data/raw/parking_lots.csv`
- `data/raw/parking_usage_history.csv`
- `data/raw/external_factors.csv`
- `data/processed/training_dataset.csv`
- `data/processed/training_sample.csv`
- `models/congestion_model.joblib`
- `models/congestion_model_metadata.json`
- `data/output/congestion_predictions.csv`
- `data/output/congestion_predictions_summary.json`

대용량 CSV와 모델 본체는 재생성 가능한 산출물이므로 Git에 포함하지 않는다.

## 설치

Python 가상환경을 생성한 뒤 아래 명령으로 의존성을 설치한다.

```bash
pip install -r requirements.txt
```
