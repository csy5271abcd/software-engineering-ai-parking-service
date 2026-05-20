-- SmartPark AI congestion_predictions 테이블 생성 SQL
-- 사용 방법:
--   mysql -u <user> -p <database> < sql/create_congestion_predictions_table.sql
--
-- 주의:
--   이 파일은 기본적으로 DROP TABLE을 수행하지 않는다.
--   초기화가 필요한 경우 아래 명령을 사용자가 직접 판단해 실행한다.
--   TRUNCATE TABLE congestion_predictions;

CREATE TABLE IF NOT EXISTS congestion_predictions (
    prediction_id VARCHAR(30) NOT NULL,
    parking_lot_id VARCHAR(30) NOT NULL,
    target_datetime DATETIME NOT NULL,
    predicted_available_spaces INT NOT NULL,
    predicted_occupancy_rate DECIMAL(6,4) NOT NULL,
    congestion_score DECIMAL(5,2) NOT NULL,
    congestion_level VARCHAR(20) NOT NULL,
    recommendation_score DECIMAL(5,2) NOT NULL,
    recommendation_reason TEXT NOT NULL,
    model_version VARCHAR(50) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    db_created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    db_updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (prediction_id),
    INDEX idx_congestion_predictions_parking_lot_id (parking_lot_id),
    INDEX idx_congestion_predictions_target_datetime (target_datetime),
    INDEX idx_congestion_predictions_congestion_level (congestion_level),
    INDEX idx_congestion_predictions_recommendation_score (recommendation_score),
    UNIQUE KEY uk_congestion_prediction_lot_time_model (parking_lot_id, target_datetime, model_version)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
