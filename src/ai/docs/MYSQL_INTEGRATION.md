# SmartPark AI MySQL Integration

## 1. 문서 목적

이 문서는 SmartPark AI v3.7.0 기준으로 `data/output/congestion_predictions.csv`를 MySQL `congestion_predictions` 테이블에 적재하고, Spring Boot 백엔드에서 조회할 수 있도록 하는 연동 기준을 정리한다.

## 2. 전체 연동 흐름

1. AI 예측 결과 생성

   ```powershell
   python scripts\predict_congestion.py
   ```

2. `data/output/congestion_predictions.csv` 생성 확인
3. MySQL 테이블 생성 SQL 실행
4. Python loader 실행

   ```powershell
   python scripts\load_predictions_to_mysql.py
   ```

5. Spring Boot API에서 `congestion_predictions` 테이블 조회

## 3. 생성/수정 파일 목록

- `sql/create_congestion_predictions_table.sql`
- `sql/import_congestion_predictions.sql`
- `scripts/load_predictions_to_mysql.py`
- `docs/MYSQL_INTEGRATION.md`
- `requirements.txt`
- `README.md`
- `data/output/README.md`

## 4. MySQL 테이블 구조

테이블명은 `congestion_predictions`이다. `prediction_id`를 Primary Key로 사용하고, `parking_lot_id`, `target_datetime`, `congestion_level`, `recommendation_score` 조회를 위한 인덱스를 둔다.

중복 예측 방지를 위해 `(parking_lot_id, target_datetime, model_version)` unique key를 사용한다.

## 5. 컬럼 설명

| 컬럼 | 설명 |
| --- | --- |
| `prediction_id` | 예측 결과 식별자 |
| `parking_lot_id` | 주차장 식별자 |
| `target_datetime` | 예측 대상 시각 |
| `predicted_available_spaces` | 예측 잔여 주차면 수 |
| `predicted_occupancy_rate` | 예측 점유율 |
| `congestion_score` | 추정 혼잡도 점수 |
| `congestion_level` | 예측 혼잡도 등급 |
| `recommendation_score` | 추천 점수 |
| `recommendation_reason` | 추천 사유 |
| `model_version` | AI 모델 버전 |
| `created_at` | CSV 생성 시각 |
| `updated_at` | CSV 수정 시각 |
| `db_created_at` | DB row 생성 시각 |
| `db_updated_at` | DB row 수정 시각 |

## 6. 인덱스 설명

- `PRIMARY KEY (prediction_id)`: 예측 row 고유 식별
- `idx_congestion_predictions_parking_lot_id`: 주차장별 예측 조회
- `idx_congestion_predictions_target_datetime`: 시간대별 예측 조회
- `idx_congestion_predictions_congestion_level`: 혼잡도 등급 필터
- `idx_congestion_predictions_recommendation_score`: 추천 점수 정렬
- `uk_congestion_prediction_lot_time_model`: 동일 모델의 동일 주차장/시간 중복 방지

## 7. 환경 변수 설정 방법

DB 접속 정보는 코드에 직접 작성하지 않는다. loader는 다음 환경 변수를 읽는다.

- `SMARTPARK_DB_HOST`: 기본값 `localhost`
- `SMARTPARK_DB_PORT`: 기본값 `3306`
- `SMARTPARK_DB_NAME`: 기본값 `smartpark_local`
- `SMARTPARK_DB_USER`: 필수
- `SMARTPARK_DB_PASSWORD`: 필수
- `SMARTPARK_DB_CHARSET`: 기본값 `utf8mb4`

## 8. PowerShell 환경 변수 예시

```powershell
$env:SMARTPARK_DB_HOST = "localhost"
$env:SMARTPARK_DB_PORT = "3306"
$env:SMARTPARK_DB_NAME = "smartpark_local"
$env:SMARTPARK_DB_USER = "smartpark_user"
$env:SMARTPARK_DB_PASSWORD = "local_password"
$env:SMARTPARK_DB_CHARSET = "utf8mb4"
```

## 9. SQL 수동 실행 방법

```powershell
mysql -u smartpark_user -p smartpark_local < sql\create_congestion_predictions_table.sql
```

`sql/import_congestion_predictions.sql`은 `LOAD DATA LOCAL INFILE` 참고용 예시이다. UTF-8-SIG CSV와 중복 upsert 처리를 안정적으로 다루기 위해 실제 적재는 Python loader 사용을 기본 방식으로 권장한다.

## 10. Python loader 실행 방법

```powershell
python scripts\load_predictions_to_mysql.py
```

loader는 다음 순서로 동작한다.

1. `congestion_predictions.csv` 존재 및 컬럼 검증
2. 환경 변수 기반 MySQL 연결
3. 테이블 자동 생성
4. CSV chunk 단위 검증
5. `ON DUPLICATE KEY UPDATE` 기반 upsert
6. `SELECT COUNT(*)`로 적재 row 수 확인

## 11. dry-run / truncate 옵션

`scripts/load_predictions_to_mysql.py` 상단 상수로 제어한다.

- `DRY_RUN = True`: DB 연결 없이 CSV 검증만 수행
- `TRUNCATE_BEFORE_LOAD = True`: 적재 전 `congestion_predictions` 테이블 초기화

운영 환경에서는 `TRUNCATE_BEFORE_LOAD` 사용 전 영향 범위를 확인해야 한다.

## 12. Spring Boot 연동 기준

이번 단계에서는 Spring Boot 파일을 생성하지 않는다. 백엔드 구현 단계에서 아래 기준을 참고한다.

## 13. CongestionPrediction Entity 후보 구조

Entity 후보명은 `CongestionPrediction`이다.

주요 필드:

- `predictionId`
- `parkingLotId`
- `targetDatetime`
- `predictedAvailableSpaces`
- `predictedOccupancyRate`
- `congestionScore`
- `congestionLevel`
- `recommendationScore`
- `recommendationReason`
- `modelVersion`
- `createdAt`
- `updatedAt`

JPA 매핑 시 DB 컬럼명은 snake_case를 유지하고, Java 필드는 camelCase를 사용한다.

## 14. Repository 조회 메서드 후보

- `findByParkingLotIdAndTargetDatetimeBetween(...)`
- `findTopByParkingLotIdAndTargetDatetimeGreaterThanEqualOrderByTargetDatetimeAsc(...)`
- `findByParkingLotIdInAndTargetDatetime(...)`

## 15. API 후보

- `GET /api/congestion/predictions`
- `GET /api/parking-lots/{parkingLotId}/congestion`
- `GET /api/parking-lots/nearby-with-congestion`

## 16. 운영 시 주의사항

- `congestion_predictions.csv`는 재생성 가능한 산출물이므로 Git에 포함하지 않는다.
- DB 비밀번호와 `.env` 파일은 Git에 포함하지 않는다.
- 모델 버전별 예측 결과가 혼재될 수 있으므로 `model_version` 조건을 조회 기준에 포함할 수 있다.
- 주기적 재예측 배치에서는 동일 `(parking_lot_id, target_datetime, model_version)` 기준 upsert를 사용한다.
- 운영에서는 CSV 적재 전 row 수와 congestion_level 분포를 확인한다.

## 17. Git 관리 기준

Git 포함 대상:

- SQL 파일
- loader 스크립트
- MySQL 연동 문서
- 작은 JSON 요약/평가 산출물

Git 제외 대상:

- `data/output/congestion_predictions.csv`
- `data/processed/*.csv`
- `models/*.joblib`
- DB 비밀번호, `.env`, 로컬 설정 파일
