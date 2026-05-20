# data/processed

이 폴더는 raw Mock 데이터를 전처리한 SmartPark AI 학습/검증용 데이터를 저장하는 위치이다.

## 생성 파일

- `training_dataset.csv`: `parking_lots.csv`, `parking_usage_history.csv`, `external_factors.csv`를 병합하고 `congestion_score`, `congestion_level`, `recommendation_score`, `recommendation_reason`을 추가한 대용량 통합 데이터
- `training_sample.csv`: `training_dataset.csv`에서 `congestion_level` 기준으로 균형 샘플링한 AI 학습용 샘플 데이터
- `training_sample_summary.json`: 원본 분포, 샘플 분포, 샘플링 설정값을 기록한 요약 파일

## 입력 데이터

- `../raw/parking_lots.csv`
- `../raw/parking_usage_history.csv`
- `../raw/external_factors.csv`
- `training_dataset.csv`

## 실행 명령

전처리 데이터셋 생성:

```bash
python scripts/preprocess_parking_data.py
```

균형 학습 샘플 생성:

```bash
python scripts/create_training_sample.py
```

`training_dataset.csv`와 `training_sample.csv`는 생성 산출물이므로 Git에 포함하지 않는다. `training_sample_summary.json`은 크기가 작고 샘플링 재현 정보를 담기 때문에 추적 가능한 요약 산출물로 유지할 수 있다.

자세한 컬럼 정의는 `../../docs/DATA_SCHEMA.md`를 참고한다.
