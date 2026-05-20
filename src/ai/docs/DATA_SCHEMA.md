# SmartPark AI Data Schema

## 1. 문서 목적

이 문서는 SmartPark AI 혼잡도 분석 모듈 v3.1.0에서 사용할 Mock 데이터 CSV의 컬럼 구조와 역할을 정의한다. 실제 개인정보나 실제 차량 데이터는 사용하지 않으며, 모든 데이터는 개발과 검증을 위한 Mock 데이터로 생성한다.

## 2. AI 혼잡도 분석 데이터 흐름

1. `data/raw/parking_lots.csv`에 주차장 기본 정보를 저장한다.
2. `data/raw/parking_usage_history.csv`에 시간대별 이용 이력을 저장한다.
3. `data/raw/external_factors.csv`에 날씨, 이벤트, 교통 등 외부 요인을 저장한다.
4. 전처리 단계에서 raw CSV를 결합해 `data/processed/training_dataset.csv`를 생성한다.
5. AI 학습 단계에서 `training_dataset.csv`를 사용해 혼잡도 예측 모델을 만든다.
6. 예측 단계에서 `data/output/congestion_predictions.csv`를 생성한다.
7. 백엔드는 예측 결과 CSV를 MySQL 적재 또는 API 응답 데이터로 활용한다.

## 3. 생성 예정 CSV 파일 목록

| 경로 | 설명 |
| --- | --- |
| `data/raw/parking_lots.csv` | 주차장 기본 정보 |
| `data/raw/parking_usage_history.csv` | 주차장 시간대별 이용 이력 |
| `data/raw/external_factors.csv` | 날씨, 이벤트, 교통 등 외부 요인 |
| `data/processed/training_dataset.csv` | AI 학습/검증용 통합 데이터 |
| `data/output/congestion_predictions.csv` | AI 혼잡도 예측 결과 |

## 4. parking_lots.csv 스키마

| 컬럼 | 설명 |
| --- | --- |
| `parking_lot_id` | 주차장 식별자 |
| `name` | 주차장 이름 |
| `district` | 행정구 또는 권역 |
| `address` | 주차장 주소 |
| `latitude` | 위도 |
| `longitude` | 경도 |
| `nearby_place` | 인근 주요 장소 |
| `nearby_poi_type` | 인근 장소 유형 |
| `total_spaces` | 전체 주차 면수 |
| `price_per_hour` | 시간당 주차 요금 |
| `parking_type` | 주차장 유형 |
| `is_public` | 공영 주차장 여부 |
| `is_shared` | 공유 주차장 여부 |
| `has_nfc` | NFC 지원 여부 |
| `operation_start_hour` | 운영 시작 시간 |
| `operation_end_hour` | 운영 종료 시간 |

## 5. parking_usage_history.csv 스키마

| 컬럼 | 설명 |
| --- | --- |
| `record_id` | 이용 이력 식별자 |
| `parking_lot_id` | 주차장 식별자 |
| `date` | 기준 날짜 |
| `year` | 연도 |
| `month` | 월 |
| `day` | 일 |
| `day_of_week` | 요일 |
| `hour` | 기준 시간 |
| `time_slot` | 시간대 구간 |
| `is_weekend` | 주말 여부 |
| `is_holiday` | 공휴일 여부 |
| `occupied_spaces` | 사용 중인 주차 면수 |
| `available_spaces` | 사용 가능한 주차 면수 |
| `reserved_spaces` | 예약된 주차 면수 |
| `soon_available_spaces` | 곧 출차 예정인 주차 면수 |
| `occupancy_rate` | 점유율 |
| `turnover_rate` | 회전율 |

## 6. external_factors.csv 스키마

| 컬럼 | 설명 |
| --- | --- |
| `factor_id` | 외부 요인 식별자 |
| `district` | 행정구 또는 권역 |
| `date` | 기준 날짜 |
| `hour` | 기준 시간 |
| `weather` | 날씨 상태 |
| `temperature` | 기온 |
| `rainfall_mm` | 강수량(mm) |
| `event_nearby` | 인근 이벤트 여부 |
| `event_name` | 이벤트 이름 |
| `event_scale` | 이벤트 규모 |
| `traffic_level` | 교통 혼잡 수준 |
| `season` | 계절 |

## 7. training_dataset.csv 스키마

| 컬럼 | 설명 |
| --- | --- |
| `record_id` | 이용 이력 식별자 |
| `parking_lot_id` | 주차장 식별자 |
| `name` | 주차장 이름 |
| `district` | 행정구 또는 권역 |
| `latitude` | 위도 |
| `longitude` | 경도 |
| `nearby_poi_type` | 인근 장소 유형 |
| `total_spaces` | 전체 주차 면수 |
| `price_per_hour` | 시간당 주차 요금 |
| `parking_type` | 주차장 유형 |
| `is_public` | 공영 주차장 여부 |
| `is_shared` | 공유 주차장 여부 |
| `has_nfc` | NFC 지원 여부 |
| `date` | 기준 날짜 |
| `year` | 연도 |
| `month` | 월 |
| `day` | 일 |
| `day_of_week` | 요일 |
| `hour` | 기준 시간 |
| `time_slot` | 시간대 구간 |
| `is_weekend` | 주말 여부 |
| `is_holiday` | 공휴일 여부 |
| `season` | 계절 |
| `weather` | 날씨 상태 |
| `temperature` | 기온 |
| `rainfall_mm` | 강수량(mm) |
| `event_nearby` | 인근 이벤트 여부 |
| `event_scale` | 이벤트 규모 |
| `traffic_level` | 교통 혼잡 수준 |
| `occupied_spaces` | 사용 중인 주차 면수 |
| `available_spaces` | 사용 가능한 주차 면수 |
| `reserved_spaces` | 예약된 주차 면수 |
| `soon_available_spaces` | 곧 출차 예정인 주차 면수 |
| `occupancy_rate` | 점유율 |
| `turnover_rate` | 회전율 |
| `congestion_score` | 혼잡도 점수 |
| `congestion_level` | 혼잡도 상태값 |
| `recommendation_score` | 추천 점수 |
| `recommendation_reason` | 추천 사유 |

## 8. congestion_predictions.csv 스키마

| 컬럼 | 설명 |
| --- | --- |
| `prediction_id` | 예측 결과 식별자 |
| `parking_lot_id` | 주차장 식별자 |
| `target_datetime` | 예측 대상 일시 |
| `predicted_available_spaces` | 예측 사용 가능 주차 면수 |
| `predicted_occupancy_rate` | 예측 점유율 |
| `congestion_score` | 예측 혼잡도 점수 |
| `congestion_level` | 예측 혼잡도 상태값 |
| `recommendation_score` | 추천 점수 |
| `recommendation_reason` | 추천 사유 |
| `model_version` | AI 모델 버전 |
| `created_at` | 결과 생성 일시 |
| `updated_at` | 결과 수정 일시 |

## 9. congestion_level 상태값 정의

| 값 | 의미 |
| --- | --- |
| `LOW` | 여유 상태 |
| `MEDIUM` | 보통 상태 |
| `HIGH` | 혼잡 상태 |
| `VERY_HIGH` | 매우 혼잡한 상태 |
| `UNKNOWN` | 데이터 부족 또는 예측 불가 상태 |

## 10. recommendation_score 산출 기준 초안

`recommendation_score`는 사용자가 주차장을 선택할 때 참고할 수 있는 0~100 범위의 추천 점수로 설계한다.

초기 기준은 다음 요소를 조합한다.

- 사용 가능 주차 면수가 많을수록 점수를 높인다.
- `occupancy_rate` 또는 `predicted_occupancy_rate`가 낮을수록 점수를 높인다.
- 시간당 요금이 낮을수록 점수를 높인다.
- `has_nfc`가 true이면 결제 편의성 가중치를 부여한다.
- `is_public` 또는 `is_shared`가 true이면 서비스 정책에 따라 가중치를 부여할 수 있다.
- 이벤트, 강수, 교통 혼잡이 강할수록 점수를 낮출 수 있다.

정확한 가중치는 v3.x.x 후속 버전에서 데이터 분포와 서비스 정책을 기준으로 조정한다.

## 11. 백엔드/MySQL 연동 시 활용 기준

- 백엔드는 `data/output/congestion_predictions.csv`를 예측 결과 입력 파일로 사용할 수 있다.
- `parking_lot_id`는 백엔드 주차장 테이블과 매핑되는 핵심 키로 사용한다.
- `target_datetime`은 예측 기준 시간이며, API 응답과 MySQL 적재 시 시간 기준으로 사용한다.
- `congestion_level`, `recommendation_score`, `recommendation_reason`은 프론트엔드 화면 표시와 추천 정렬에 활용할 수 있다.
- `model_version`, `created_at`, `updated_at`은 예측 결과 이력 관리와 재처리 판단에 활용한다.

## 12. 향후 확장 가능 컬럼

- `distance_to_user`: 사용자 현재 위치와 주차장 간 거리
- `walking_time_minutes`: 목적지까지 예상 도보 시간
- `payment_methods`: 지원 결제 수단
- `ev_charging_available`: 전기차 충전 가능 여부
- `cctv_available`: CCTV 설치 여부
- `accessibility_support`: 교통약자 편의 지원 여부
- `prediction_confidence`: 예측 신뢰도
- `data_quality_status`: 입력 데이터 품질 상태
