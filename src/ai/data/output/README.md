# data/output

이 폴더는 SmartPark AI 분석 결과와 백엔드 연동 후보 산출물을 저장하는 위치이다.

## 생성 예정 파일

- `congestion_predictions.csv`: 주차장별 예측 가능 면수, 예측 점유율, 혼잡도 상태, 추천 점수, 추천 사유를 담은 결과 CSV

백엔드는 이 파일을 MySQL 적재 또는 API 응답 데이터 생성에 활용할 예정이다. 자세한 컬럼 정의는 `../../docs/DATA_SCHEMA.md`를 참고한다.
