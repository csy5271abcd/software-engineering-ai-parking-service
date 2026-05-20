# SmartPark AI Module

SmartPark AI 모듈은 주차장 이용 흐름과 외부 요인을 기반으로 주차장 혼잡도를 분석하고 예측 결과를 생성하기 위한 v3.x.x 구현 영역이다. v3.0.0에서는 기본 실행 구조를 만들었고, v3.1.0에서는 Mock 데이터 스키마와 데이터 흐름을 설계한다.

이 모듈은 실제 개인정보나 실제 차량 데이터를 사용하지 않는다. 초기 개발과 테스트에는 Mock 주차장 데이터만 사용한다.

## 버전 관리 기준

- `v1.x.x`: 프론트엔드 구현 버전
- `v2.x.x`: 백엔드 구현 버전
- `v3.x.x`: AI 구현 버전
- `v4.x.x`: 통합/MVP 버전
- `v3.0.0`: AI 혼잡도 분석 모듈의 초기 폴더 구조 및 실행 스크립트 기준선
- `v3.1.0`: AI Mock 데이터 스키마 및 데이터 흐름 문서화 기준선

## AI 데이터 흐름

SmartPark AI 모듈의 기본 데이터 흐름은 다음 순서를 따른다.

1. `data/raw`에 Mock 원본 CSV를 준비한다.
2. `scripts/preprocess_parking_data.py`에서 원본 CSV를 결합하고 AI 학습용 데이터셋으로 변환한다.
3. `scripts/train_congestion_model.py`에서 전처리 데이터를 기반으로 혼잡도 예측 모델을 학습한다.
4. `scripts/predict_congestion.py`에서 예측 결과 CSV를 생성한다.
5. 백엔드가 `data/output/congestion_predictions.csv`를 MySQL 적재 또는 API 응답 데이터로 활용한다.

자세한 컬럼 정의와 상태값 기준은 [docs/DATA_SCHEMA.md](docs/DATA_SCHEMA.md)를 참고한다.

## 폴더 구조

```text
ai/
  data/
    raw/          # Mock 원본 데이터 저장
    processed/    # 전처리 완료 데이터 저장
    output/       # AI 분석 결과 CSV 저장
  docs/           # AI 데이터 스키마 및 설계 문서
  models/         # 학습된 모델 파일 저장
  notebooks/      # 실험용 노트북 저장
  scripts/        # 데이터 생성, 전처리, 학습, 예측 실행 스크립트
  requirements.txt
  README.md
```

## 파일별 역할

- `requirements.txt`: AI 모듈 실행에 필요한 Python 패키지 목록
- `docs/DATA_SCHEMA.md`: v3.1.0 Mock 데이터 스키마와 백엔드 연동 기준
- `scripts/generate_mock_parking_data.py`: Mock 원본 CSV 생성 진입점
- `scripts/preprocess_parking_data.py`: 원본 CSV를 AI 학습용 데이터셋으로 전처리하는 진입점
- `scripts/train_congestion_model.py`: 전처리 데이터를 기반으로 혼잡도 모델을 학습하는 진입점
- `scripts/predict_congestion.py`: 학습된 모델과 입력 데이터를 사용해 혼잡도 예측 결과를 생성하는 진입점

## 실행 순서

1. Mock 주차장 데이터 생성

   ```bash
   python scripts/generate_mock_parking_data.py
   ```

2. 데이터 전처리

   ```bash
   python scripts/preprocess_parking_data.py
   ```

3. 혼잡도 모델 학습

   ```bash
   python scripts/train_congestion_model.py
   ```

4. 혼잡도 예측 결과 생성

   ```bash
   python scripts/predict_congestion.py
   ```

5. 예측 결과 CSV를 백엔드/MySQL 연동에 활용

## 생성 예정 데이터 파일

- `data/raw/parking_lots.csv`: 주차장 기본 정보 Mock 데이터
- `data/raw/parking_usage_history.csv`: 시간대별 주차장 이용 이력 Mock 데이터
- `data/raw/external_factors.csv`: 날씨, 이벤트, 교통 등 외부 요인 Mock 데이터
- `data/processed/training_dataset.csv`: AI 학습/검증용 통합 데이터
- `data/output/congestion_predictions.csv`: 백엔드 연동 후보 예측 결과

## 백엔드 연동 예정 방식

AI 모듈은 예측 결과를 `data/output/congestion_predictions.csv` 형태로 생성하고, 백엔드 모듈은 해당 CSV를 읽어 MySQL 테이블에 적재하는 방식으로 연동할 예정이다. 이후 API 연동이나 배치 실행 방식이 확정되면 README와 스크립트 실행 방식도 함께 갱신한다.

## 설치

Python 가상환경을 생성한 뒤 아래 명령으로 의존성을 설치한다.

```bash
pip install -r requirements.txt
```
