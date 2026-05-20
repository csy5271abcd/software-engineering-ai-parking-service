# data/output

이 폴더는 SmartPark AI 분석 결과와 평가 산출물을 저장하는 위치이다.

## 생성 파일

- `congestion_predictions.csv`: 주차장별 예측 가능 면수, 예측 점유율, 혼잡도 상태, 추천 점수, 추천 사유를 담은 결과 CSV
- `model_evaluation.json`: 학습된 AI 혼잡도 모델의 주요 평가 지표와 설정 요약
- `classification_report.csv`: 클래스별 precision, recall, f1-score, support
- `confusion_matrix.csv`: `LOW`, `MEDIUM`, `HIGH`, `VERY_HIGH` 기준 혼동 행렬
- `feature_importance.csv`: RandomForest 기반 feature importance 순위

백엔드는 `congestion_predictions.csv`를 MySQL 적재 또는 API 응답 데이터 생성에 활용할 예정이다. 모델 평가 산출물은 AI 모델 품질 확인과 후속 개선 기준으로 사용한다.
