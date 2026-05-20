-- SmartPark AI congestion_predictions.csv 수동 import 참고 SQL
--
-- 권장 방식:
--   UTF-8-SIG CSV, 중복 upsert, 날짜 변환을 안정적으로 처리하기 위해
--   scripts/load_predictions_to_mysql.py 사용을 우선 권장한다.
--
-- LOAD DATA LOCAL INFILE 사용 시 주의:
--   1. MySQL 서버와 클라이언트 모두 LOCAL INFILE 옵션이 허용되어야 한다.
--   2. Windows 경로는 슬래시(/) 또는 이스케이프된 백슬래시(\\)를 사용한다.
--      예: C:/sp/src/ai/data/output/congestion_predictions.csv
--   3. 상대 경로는 mysql client 실행 위치 기준이므로 혼동을 피하려면 절대 경로를 권장한다.
--   4. LOAD DATA LOCAL INFILE에서 ON DUPLICATE KEY UPDATE를 직접 처리하기는 까다롭다.
--      중복 처리가 필요하면 staging table 방식 또는 Python loader 방식을 사용한다.

-- 참고용 직접 import 예시이다. 실제 운영 적재는 Python loader를 사용한다.
LOAD DATA LOCAL INFILE 'C:/sp/src/ai/data/output/congestion_predictions.csv'
INTO TABLE congestion_predictions
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(
    prediction_id,
    parking_lot_id,
    @target_datetime,
    predicted_available_spaces,
    predicted_occupancy_rate,
    congestion_score,
    congestion_level,
    recommendation_score,
    recommendation_reason,
    model_version,
    @created_at,
    @updated_at
)
SET
    target_datetime = STR_TO_DATE(@target_datetime, '%Y-%m-%d %H:%i:%s'),
    created_at = STR_TO_DATE(@created_at, '%Y-%m-%d %H:%i:%s'),
    updated_at = STR_TO_DATE(@updated_at, '%Y-%m-%d %H:%i:%s');

-- 중복 upsert가 필요한 운영 적재에서는 다음 흐름을 권장한다.
--   1. staging_congestion_predictions 테이블 생성
--   2. LOAD DATA LOCAL INFILE로 staging 테이블 적재
--   3. INSERT INTO congestion_predictions (...) SELECT ... FROM staging ...
--      ON DUPLICATE KEY UPDATE ...
--   4. staging 테이블 정리
