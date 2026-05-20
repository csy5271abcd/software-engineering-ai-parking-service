# data/output

이 폴더는 SmartPark AI 예측 결과와 모델 평가 산출물을 저장하는 위치이다.

## 생성 파일

- `congestion_predictions.csv`: 학습된 AI 모델이 생성한 주차장별·시간대별 혼잡도 예측 결과이며 MySQL 적재 대상이다.
- `congestion_predictions_summary.json`: 예측 row 수, 혼잡도 분포, 평균 점수, 상위 추천 주차장 요약 파일이다.
- `model_evaluation.json`: 학습된 AI 혼잡도 모델의 주요 평가 지표와 설정 요약이다.
- `classification_report.csv`: 클래스별 precision, recall, f1-score, support이다.
- `confusion_matrix.csv`: `LOW`, `MEDIUM`, `HIGH`, `VERY_HIGH` 기준 혼동 행렬이다.
- `feature_importance.csv`: RandomForest 기반 feature importance 순위이다.

## 실행 명령

백엔드/MySQL 연동용 예측 결과 생성:

```bash
python scripts/predict_congestion.py
```

예측 결과 MySQL 적재:

```bash
python scripts/load_predictions_to_mysql.py
```

`congestion_predictions.csv`는 재생성 가능한 산출물이므로 Git 제외 상태를 유지한다. MySQL 적재 방법은 `../../docs/MYSQL_INTEGRATION.md`를 참고한다.
