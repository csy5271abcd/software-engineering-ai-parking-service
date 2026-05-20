# data/processed

이 폴더는 raw Mock 데이터를 전처리한 SmartPark AI 학습/검증용 데이터를 저장하는 위치이다.

## 생성 파일

- `training_dataset.csv`: `parking_lots.csv`, `parking_usage_history.csv`, `external_factors.csv`를 병합하고 `congestion_score`, `congestion_level`, `recommendation_score`, `recommendation_reason`을 추가한 통합 데이터

## 입력 데이터

- `../raw/parking_lots.csv`
- `../raw/parking_usage_history.csv`
- `../raw/external_factors.csv`

## 실행 명령

```bash
python scripts/preprocess_parking_data.py
```

`training_dataset.csv`는 대용량 산출물이므로 Git에 포함하지 않는다. 저장소 `.gitignore`에는 다음 항목이 필요하다.

```gitignore
src/ai/data/processed/*.csv
!src/ai/data/processed/README.md
```

자세한 컬럼 정의는 `../../docs/DATA_SCHEMA.md`를 참고한다.
