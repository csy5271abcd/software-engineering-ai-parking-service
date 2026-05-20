# CHANGELOG_AI

SmartPark AI 혼잡도 분석 모듈의 변경 이력을 정리한다.

본 문서는 `v3.x.x` 버전 라인에 해당하는 Python 기반 AI 분석 모듈 구현 이력을 관리한다.

---

## 관리 기준

| 버전 라인 | 영역              | 설명                                                         |
| --------- | ----------------- | ------------------------------------------------------------ |
| `v3.0.x`  | AI 모듈 초기 구조 | Python 프로젝트 구조, requirements, README, 기본 script 생성 |
| `v3.1.x`  | AI 데이터 스키마  | Mock 데이터 컬럼 정의, 파일별 데이터 구조 설계               |
| `v3.2.x`  | Mock 데이터 생성  | 주차장 기본 정보, 이용 이력, 외부 요인 데이터 생성           |
| `v3.3.x`  | 전처리            | 학습/분석용 통합 데이터셋 생성                               |
| `v3.4.x`  | 규칙 기반 분석    | 혼잡도 점수, 혼잡도 등급, 추천 점수 산출                     |
| `v3.5.x`  | AI 모델 학습      | 모델 학습, 평가, 모델 파일 저장                              |
| `v3.6.x`  | 예측 결과 생성    | `congestion_predictions.csv` 생성                            |
| `v3.7.x`  | 백엔드 연동 준비  | MySQL 적재용 CSV/SQL, Spring Boot 연동 기준 정리             |

---

## v3.7.0

### AI 예측 결과 MySQL 적재 및 백엔드 연동 준비

#### 생성 파일

- `src/ai/sql/create_congestion_predictions_table.sql` — AI 예측 결과 저장용 MySQL 테이블 생성 SQL
- `src/ai/sql/import_congestion_predictions.sql` — `congestion_predictions.csv` 수동 import 참고 SQL
- `src/ai/scripts/load_predictions_to_mysql.py` — 예측 결과 CSV를 MySQL에 적재하는 Python loader
- `src/ai/docs/MYSQL_INTEGRATION.md` — AI 예측 결과와 MySQL/Spring Boot 연동 기준 문서

#### 수정 파일

- `src/ai/README.md` — AI 예측 결과 MySQL 적재 흐름 추가
- `src/ai/data/output/README.md` — `congestion_predictions.csv`의 MySQL 적재 용도 설명 보완
- `src/ai/requirements.txt` — MySQL loader 실행을 위한 `mysql-connector-python` 의존성 추가
- `.gitignore` — `congestion_predictions.csv`, `models/*.joblib`, `.env` Git 제외 규칙 확인 및 보완

#### 주요 구현 내용

- `congestion_predictions.csv`를 MySQL `congestion_predictions` 테이블에 적재할 수 있는 구조 작성
- `prediction_id`를 Primary Key로 사용하는 테이블 스키마 정의
- `parking_lot_id`, `target_datetime`, `congestion_level`, `recommendation_score` 조회 최적화를 위한 인덱스 정의
- `parking_lot_id`, `target_datetime`, `model_version` 기준 unique key 정의
- `ON DUPLICATE KEY UPDATE` 기반 upsert 적재 방식 구현
- DB 접속 정보는 환경 변수 기반으로 관리하고 코드에 직접 작성하지 않도록 처리
- `congestion_predictions.csv` 검증 후 chunk 단위로 MySQL에 적재하는 Python loader 작성
- Spring Boot `CongestionPrediction` Entity, Repository, API 후보를 문서로 정리
- 실제 백엔드 파일은 수정하지 않고, 이후 `v2.x.x` 백엔드 구현 단계에서 참고할 연동 기준만 작성

#### 검증

- `python -m py_compile scripts\load_predictions_to_mysql.py` 문법 검증 성공
- `requirements.txt`에 `mysql-connector-python` 추가 확인
- `congestion_predictions.csv`, `models/*.joblib`, `.env` Git 제외 확인
- 프론트엔드/백엔드 폴더 미수정 확인

#### DB 연결 여부

- 실제 MySQL 적재는 실행하지 않음
- `SMARTPARK_DB_USER`, `SMARTPARK_DB_PASSWORD` 환경 변수와 로컬 MySQL 준비 후 실행 필요

#### 후속 백엔드 연동 작업

- Spring Boot `CongestionPrediction` Entity 생성
- `parking_lot_id`, `target_datetime`, `model_version` 기준 조회 Repository 추가
- AI 혼잡도 예측 결과 조회 API 구현
  - `GET /api/congestion/predictions`
  - `GET /api/parking-lots/{parkingLotId}/congestion`
  - `GET /api/parking-lots/nearby-with-congestion`

#### 비고

- `congestion_predictions.csv`는 재생성 가능한 산출물이므로 Git 저장소에 포함하지 않는다.
- DB 비밀번호, `.env` 파일, 로컬 DB 설정 파일은 Git에 포함하지 않는다.
- 이후 백엔드 `v2.x.x` 단계에서 `CongestionPrediction` Entity, Repository, API를 구현한다.

---

## v3.6.0

### AI 혼잡도 예측 결과 생성 로직 구현

#### 수정 파일

- `src/ai/scripts/predict_congestion.py` — 학습된 AI 모델을 사용해 주차장별·시간대별 혼잡도 예측 결과를 생성하는 로직 구현
- `src/ai/README.md` — AI 예측 결과 생성 실행 흐름 보완
- `src/ai/data/output/README.md` — `congestion_predictions.csv`와 요약 파일 설명 보완

#### 생성 파일

다음 파일은 AI 예측 결과 산출물이다.

- `src/ai/data/output/congestion_predictions.csv`
- `src/ai/data/output/congestion_predictions_summary.json`

#### 생성 결과

| 항목                        |                    결과 |
| --------------------------- | ----------------------: |
| 예측 대상                   | 1,000개 주차장 × 24시간 |
| 생성 row 수                 |                  24,000 |
| 외부 요인 매칭 실패 row 수  |                   8,000 |
| `prediction_id` 중복        |                       0 |
| `model_version`             |   `ai-congestion-rf-v1` |
| 평균 `congestion_score`     |                 42.8110 |
| 평균 `recommendation_score` |                 52.5929 |
| 평균 prediction confidence  |                  0.5906 |

#### 혼잡도 분포

| congestion_level | row 수 |
| ---------------- | -----: |
| LOW              | 14,411 |
| MEDIUM           |  5,028 |
| HIGH             |  3,757 |
| VERY_HIGH        |    804 |

#### 상위 추천 예시

| parking_lot_id | target_datetime       | congestion_level | recommendation_score |
| -------------- | --------------------- | ---------------- | -------------------: |
| `PARK-0377`    | `2026-05-21 23:00:00` | LOW              |                75.90 |
| `PARK-0377`    | `2026-05-21 22:00:00` | LOW              |                75.90 |
| `PARK-0668`    | `2026-05-21 22:00:00` | LOW              |                75.82 |

#### 주요 구현 내용

- `models/congestion_model.joblib` 모델 pipeline 로딩
- `models/congestion_model_metadata.json`에서 `model_version`, `feature_columns` 정보 활용
- 모든 주차장에 대해 향후 24시간 기준 예측 대상 데이터 생성
- `parking_lots.csv`와 `external_factors.csv`를 활용해 모델 입력 feature 구성
- 학습 시 사용한 feature 구조와 동일한 컬럼 기준으로 `congestion_level` 예측
- `congestion_level`과 예측 confidence를 기반으로 `congestion_score` 추정
- `predicted_occupancy_rate`, `predicted_available_spaces` 계산
- `recommendation_score`, `recommendation_reason` 생성
- 백엔드/MySQL 적재용 `congestion_predictions.csv` 생성
- 예측 결과 요약을 `congestion_predictions_summary.json`에 저장
- 모델 파일이 없는 경우 `train_congestion_model.py` 실행 안내 출력

#### 검증

- `python scripts\predict_congestion.py` 실행 성공
- `python -m py_compile scripts\predict_congestion.py` 문법 검증 성공
- `congestion_predictions.csv` 생성 확인
- `congestion_predictions_summary.json` 생성 확인
- `DATA_SCHEMA.md`의 `congestion_predictions.csv` 컬럼 구조와 일치 확인
- 예측 결과의 `prediction_id` 중복 없음 확인
- `predicted_available_spaces`, `predicted_occupancy_rate`, `congestion_score`, `recommendation_score` 값 범위 검증
- `congestion_predictions.csv` Git 제외 확인
- 프론트엔드/백엔드 폴더 미수정 확인

#### 비고

- `congestion_model.joblib`는 로컬에서 재생성 가능한 모델 본체이므로 Git 저장소에 포함하지 않는다.
- `congestion_predictions.csv`는 백엔드/MySQL 연동 테스트에 활용할 수 있으나, 재생성 가능한 산출물이므로 현재는 Git 추적 대상에서 제외한다.
- `congestion_predictions_summary.json`은 크기가 작으므로 예측 결과 기록용으로 Git 포함을 권장한다.
- 외부 요인 매칭 실패 8,000 rows는 미래 시간대가 `external_factors.csv`에 없어 기본값으로 보정된 결과이다.
- 이후 고도화 시 미래 외부 요인 데이터 생성 로직을 별도로 추가할 수 있다.
- 이후 `v3.7.0`에서는 `congestion_predictions.csv`를 MySQL에 적재하거나 백엔드 연동용 SQL/CSV 구조를 정리한다.

---

## v3.5.0

### AI 혼잡도 분석 모델 학습 로직 구현

#### 수정 파일

- `src/ai/scripts/train_congestion_model.py` — `training_sample.csv` 기반 AI 혼잡도 분석 모델 학습 로직 구현
- `src/ai/README.md` — AI 모델 학습 실행 흐름 보완
- `src/ai/data/output/README.md` — 모델 평가 산출물 설명 보완
- `.gitignore` — `models/*.joblib` 제외 규칙 추가

#### 생성 파일

다음 파일은 모델 학습 결과 산출물이다.

- `src/ai/models/congestion_model.joblib`
- `src/ai/models/congestion_model_metadata.json`
- `src/ai/data/output/model_evaluation.json`
- `src/ai/data/output/classification_report.csv`
- `src/ai/data/output/confusion_matrix.csv`
- `src/ai/data/output/feature_importance.csv`

#### Git 관리 기준

- `src/ai/models/congestion_model.joblib`는 재생성 가능한 모델 본체이므로 Git 추적 대상에서 제외한다.
- `src/ai/models/congestion_model_metadata.json`은 모델 재현성 확인을 위한 작은 메타데이터 파일이므로 Git 추적 후보로 유지한다.
- `src/ai/data/output/model_evaluation.json`, `classification_report.csv`, `confusion_matrix.csv`, `feature_importance.csv`는 평가 결과 확인용 작은 산출물이므로 Git 추적 후보로 유지한다.

#### 학습 설정

| 항목        |                                   값 |
| ----------- | -----------------------------------: |
| 입력 데이터 | `data/processed/training_sample.csv` |
| 학습 rows   |                              224,000 |
| 테스트 rows |                               56,000 |
| feature 수  |                                   25 |
| target      |                   `congestion_level` |
| classes     | `LOW`, `MEDIUM`, `HIGH`, `VERY_HIGH` |

#### 주요 평가 지표

| 지표        |     값 |
| ----------- | -----: |
| accuracy    | 0.9466 |
| macro_f1    | 0.9466 |
| weighted_f1 | 0.9466 |

#### 주요 구현 내용

- `training_sample.csv`를 기반으로 `congestion_level` 예측 모델 학습
- `LOW`, `MEDIUM`, `HIGH`, `VERY_HIGH` 4개 혼잡도 등급 분류
- `RandomForestClassifier` 기반 AI 모델 학습 파이프라인 구현
- `ColumnTransformer`, `OneHotEncoder`, `SimpleImputer` 기반 전처리 파이프라인 구성
- `train_test_split`에서 `stratify=y`를 사용하여 클래스 분포 유지
- 데이터 누수 방지를 위해 `congestion_score`, `recommendation_score`, `recommendation_reason` 등 결과 컬럼을 feature에서 제외
- 기본 예측 안전 모드에서 실시간 이용 현황 컬럼도 feature에서 제외
- accuracy, macro F1, weighted F1, classification report, confusion matrix 산출
- feature importance 추출 및 저장
- 학습된 모델 pipeline을 `joblib` 파일로 저장
- 모델 메타데이터와 평가 결과를 JSON/CSV로 저장

#### 검증

- `python scripts\train_congestion_model.py` 실행 성공
- `python -m py_compile scripts\train_congestion_model.py` 문법 검증 성공
- `models/congestion_model.joblib` 생성 확인
- `models/congestion_model_metadata.json` 생성 확인
- `data/output/model_evaluation.json` 생성 확인
- `data/output/classification_report.csv` 생성 확인
- `data/output/confusion_matrix.csv` 생성 확인
- `data/output/feature_importance.csv` 생성 확인
- `models/*.joblib` Git 제외 규칙 확인
- 프론트엔드/백엔드 폴더 미수정 확인

#### 비고

- `training_sample.csv`는 로컬에서 재생성 가능한 산출물이므로 Git 저장소에 포함하지 않는다.
- `congestion_model.joblib`도 재생성 가능한 모델 본체이므로 Git 저장소에 포함하지 않는다.
- 메타데이터와 평가 결과 파일은 크기가 작으므로 실험 재현성을 위해 Git 포함을 권장한다.
- 전역 ignore 접근 권한 경고가 있었으나 프로젝트 `.gitignore` 기준으로 모델 본체 제외는 확인했다.
- 이후 `v3.6.0`에서는 학습된 모델을 사용해 `congestion_predictions.csv`를 생성하는 예측 로직을 구현한다.

---

## v3.4.0

### AI 학습용 샘플 데이터셋 생성 로직 구현

#### 생성 파일

- `src/ai/scripts/create_training_sample.py` — 대용량 `training_dataset.csv`를 chunk 단위로 읽어 AI 학습용 균형 샘플 데이터셋을 생성하는 스크립트

#### 수정 파일

- `src/ai/README.md` — AI 학습용 샘플 데이터셋 생성 흐름 보완
- `src/ai/data/processed/README.md` — `training_sample.csv`와 `training_sample_summary.json` 설명 및 실행 명령 보완

#### 생성 데이터

다음 CSV 파일은 로컬에서 생성되는 산출물이므로 Git 추적 대상에서 제외한다.

- `src/ai/data/processed/training_sample.csv`

다음 요약 파일은 크기가 작아 필요 시 Git에 포함할 수 있다.

- `src/ai/data/processed/training_sample_summary.json`

#### 생성 결과

| 항목                                |      결과 |
| ----------------------------------- | --------: |
| 최종 sample row 수                  |   280,000 |
| `training_sample.csv` 크기          |  약 110MB |
| `training_sample_summary.json` 크기 | 937 bytes |

#### 원본 분포

| congestion_level |     row 수 |
| ---------------- | ---------: |
| LOW              | 27,828,146 |
| MEDIUM           | 14,992,958 |
| HIGH             |    929,935 |
| VERY_HIGH        |     72,961 |

#### 샘플 분포

| congestion_level | row 수 |
| ---------------- | -----: |
| LOW              | 70,000 |
| MEDIUM           | 70,000 |
| HIGH             | 70,000 |
| VERY_HIGH        | 70,000 |
| UNKNOWN          |      0 |

#### 주요 구현 내용

- 대용량 `training_dataset.csv`를 전체 로딩하지 않고 chunk 단위로 읽는 샘플링 구조 구현
- 1차 pass에서 `congestion_level`별 원본 분포 계산
- 2차 pass에서 `LOW`, `MEDIUM`, `HIGH`, `VERY_HIGH` 기준 균형 샘플링 수행
- `UNKNOWN` level은 학습용 샘플에서 제외
- level별 70,000 rows, 총 280,000 rows 규모의 AI 학습용 샘플 생성
- `training_sample.csv`가 `training_dataset.csv`와 동일한 컬럼 구조를 유지하도록 처리
- 샘플 생성 설정, 원본 분포, 샘플 분포를 `training_sample_summary.json`에 저장
- 이후 `train_congestion_model.py`에서 전체 대용량 데이터 대신 `training_sample.csv`를 사용할 수 있는 기반 마련

#### 검증

- `python scripts\create_training_sample.py` 실행 성공
- `python -m py_compile scripts\create_training_sample.py` 문법 검증 성공
- `training_sample.csv`와 `training_dataset.csv` 컬럼 구조 일치 확인
- `UNKNOWN` level 제외 확인
- `congestion_score`, `recommendation_score`, `occupancy_rate` 범위 검증 완료
- `git check-ignore`로 `training_sample.csv` 제외 확인
- 프론트엔드/백엔드 폴더 미수정 확인

#### 비고

- `training_dataset.csv`는 약 16.7GB 규모의 대용량 산출물이므로 Git 저장소에 포함하지 않는다.
- `training_sample.csv`도 로컬에서 재생성 가능한 산출물이므로 Git 저장소에 포함하지 않는다.
- `training_sample_summary.json`은 크기가 작으므로 실험 재현성을 위해 Git에 포함할 수 있다.
- 이후 `v3.5.0`에서는 `training_sample.csv`를 기반으로 AI 혼잡도 분석 모델 학습 로직을 구현한다.

---

## v3.3.0

### AI 데이터 전처리 로직 구현

#### 수정 파일

- `src/ai/scripts/preprocess_parking_data.py` — 대용량 raw CSV를 chunk 단위로 읽어 AI 분석용 `training_dataset.csv`를 생성하는 전처리 로직 구현
- `src/ai/README.md` — AI 데이터 전처리 실행 흐름 보완
- `src/ai/data/processed/README.md` — 전처리 산출물 설명 및 실행 명령 보완
- `.gitignore` — 대용량 전처리 산출물 Git 제외 규칙 확인 및 보완

#### 생성 데이터

다음 CSV 파일은 로컬에서 생성되는 대용량 산출물이므로 Git 추적 대상에서 제외한다.

- `src/ai/data/processed/training_dataset.csv`

#### 생성 결과

| 항목                        |       결과 |
| --------------------------- | ---------: |
| 생성 row 수                 | 43,824,000 |
| 처리 chunk 수               |         88 |
| 평균 `congestion_score`     |      29.28 |
| 평균 `recommendation_score` |      62.72 |
| 파일 크기                   |  약 16.7GB |

#### 혼잡도 분포

| congestion_level |     row 수 |
| ---------------- | ---------: |
| LOW              | 27,828,146 |
| MEDIUM           | 14,992,958 |
| HIGH             |    929,935 |
| VERY_HIGH        |     72,961 |
| UNKNOWN          |          0 |

#### 주요 구현 내용

- `parking_usage_history.csv`를 `chunksize=500,000` 기준으로 읽는 대용량 전처리 구조 구현
- `parking_lots.csv`와 `parking_usage_history.csv`를 `parking_lot_id` 기준으로 병합
- `external_factors.csv`를 `district`, `date`, `hour` 기준으로 병합
- AI 분석용 통합 데이터셋 `training_dataset.csv` 생성
- `congestion_score`, `congestion_level`, `recommendation_score`, `recommendation_reason` 파생 컬럼 생성
- chunk별 병합, 파생변수 생성, 품질 검증, append 저장 구조 구현
- 전체 대용량 파일을 한 번에 메모리에 올리지 않는 방식 적용
- 대용량 산출물인 `training_dataset.csv`는 Git 추적 대상에서 제외

#### 검증

- `python scripts\preprocess_parking_data.py` 실행 성공
- `python -m py_compile scripts\preprocess_parking_data.py` 문법 검증 성공
- output CSV 헤더가 `DATA_SCHEMA.md`의 `training_dataset.csv` 컬럼 구조와 일치함 확인
- 샘플 5 rows 로딩 확인
- chunk 단위 병합/파생변수/품질 검증 수행
- `git check-ignore`로 `data/processed/training_dataset.csv` 제외 확인
- 프론트엔드/백엔드 폴더 미수정 확인

#### 비고

- `training_dataset.csv`는 약 16.7GB 규모의 대용량 산출물이므로 Git 저장소에는 포함하지 않는다.
- 전처리 결과는 로컬에서 재생성 가능한 산출물로 관리하고, Git에는 전처리 스크립트와 문서만 반영한다.
- 이후 모델 학습 단계에서는 전체 데이터를 바로 사용하기보다, 혼잡도 등급별 균형을 고려한 학습용 샘플 데이터셋을 생성한 뒤 학습에 활용한다.

---

## v3.2.0

### AI Mock 데이터 생성 로직 구현

#### 수정 파일

- `src/ai/scripts/generate_mock_parking_data.py` — SmartPark AI 혼잡도 분석용 원본 Mock 데이터 생성 로직 구현
- `src/ai/README.md` — raw Mock 데이터 생성 흐름 및 실행 기준 보완
- `src/ai/data/raw/README.md` — 생성되는 raw CSV 3종 설명 및 실행 명령 보완

#### 생성 데이터

다음 CSV 파일은 로컬에서 생성되는 대용량 산출물이므로 Git 추적 대상에서 제외한다.

- `src/ai/data/raw/parking_lots.csv`
- `src/ai/data/raw/external_factors.csv`
- `src/ai/data/raw/parking_usage_history.csv`

#### 생성 결과

| 파일                        |     row 수 | 설명                                       |
| --------------------------- | ---------: | ------------------------------------------ |
| `parking_lots.csv`          |      1,000 | 서울 주요 지역 기반 주차장 기본 정보       |
| `external_factors.csv`      |    657,360 | district, date, hour 기준 외부 요인 데이터 |
| `parking_usage_history.csv` | 43,824,000 | 주차장별 5년치 시간대별 이용 이력          |

#### 주요 구현 내용

- 서울 주요 지역 기반 1,000개 주차장 기본 정보 Mock 데이터 생성
- 주차장 유형, 주변 POI 유형, 운영 시간, 요금, 주차면 수 생성 로직 구현
- 최근 5년치 시간대별 주차장 이용 이력 생성
- 대용량 `parking_usage_history.csv` 생성을 위해 50개 주차장 단위 chunk 저장 구조 구현
- 전체 usage history를 한 번에 메모리에 올리지 않고 chunk별 생성, 검증, append 저장 방식 적용
- 요일, 시간대, 주말, 공휴일, 날씨, 행사, 교통 수준을 반영한 점유율 생성 로직 구현
- `parking_lot_id` 기준으로 주차장 정보와 이용 이력을 연결할 수 있는 구조 구현
- `district`, `date`, `hour` 기준으로 이용 이력과 외부 요인 데이터를 병합할 수 있는 구조 구현
- Windows Excel 환경에서 한글이 깨지지 않도록 CSV 인코딩 처리

#### 검증

- `python scripts\generate_mock_parking_data.py` 실행 성공
- `python -m py_compile scripts\generate_mock_parking_data.py` 문법 검증 성공
- `parking_lots.csv`, `external_factors.csv` row 수 및 컬럼 확인 완료
- `parking_usage_history.csv`는 전체 재로딩 없이 생성 중 chunk별 품질 검증 완료
- `parking_usage_history.csv` 헤더 및 샘플 row 확인 완료
- 프론트엔드/백엔드 폴더 미수정 확인

#### 비고

- `parking_usage_history.csv` 파일 크기는 약 4.0GB로, Git 저장소에는 포함하지 않는다.
- 대용량 CSV는 로컬 재생성 가능한 산출물로 관리하고, Git에는 생성 스크립트와 문서만 반영한다.

---

cd C:\sp

git status

## v3.1.0

### AI Mock 데이터 스키마 설계

#### 신규 파일

- `src/ai/docs/DATA_SCHEMA.md` — AI 혼잡도 분석에 사용할 CSV 데이터 구조 정의
- `src/ai/data/raw/README.md` — 원본 Mock 데이터 저장 위치와 파일 설명
- `src/ai/data/processed/README.md` — 전처리 데이터 저장 위치와 파일 설명
- `src/ai/data/output/README.md` — AI 분석 결과 저장 위치와 파일 설명

#### 수정 파일

- `src/ai/README.md` — 데이터 스키마 문서 링크 및 AI 데이터 흐름 추가
- `src/ai/scripts/generate_mock_parking_data.py` — 생성 예정 Mock 데이터 컬럼 주석 추가
- `src/ai/scripts/preprocess_parking_data.py` — raw 데이터와 processed 데이터 관계 주석 추가
- `src/ai/scripts/predict_congestion.py` — 예측 결과 output 데이터 구조 주석 추가

#### 설계한 데이터 파일

- `src/ai/data/raw/parking_lots.csv`
- `src/ai/data/raw/parking_usage_history.csv`
- `src/ai/data/raw/external_factors.csv`
- `src/ai/data/processed/training_dataset.csv`
- `src/ai/data/output/congestion_predictions.csv`

#### 주요 설계 내용

- 주차장 기본 정보, 주차장 속성, 시간 정보, 외부 요인, 이용 데이터, AI 분석 결과를 분리하여 설계
- CSV를 하나로 관리하지 않고, 참조 key를 통해 연결한 뒤 전처리 단계에서 통합하는 구조로 정의
- `parking_lot_id`를 기준으로 주차장 정보와 이용 이력을 연결
- `district`, `date`, `hour`를 기준으로 이용 이력과 외부 요인 데이터를 연결
- 혼잡도 상태값을 `LOW`, `MEDIUM`, `HIGH`, `VERY_HIGH`, `UNKNOWN`으로 정의
- AI 분석 결과가 백엔드/MySQL에 적재될 수 있도록 `congestion_predictions.csv` 구조 정의
- 이후 `v3.2.0`에서 실제 Mock 데이터 생성 로직을 구현할 수 있도록 기반 마련

#### 검증

- `python scripts\generate_mock_parking_data.py` 실행 성공
- `python scripts\preprocess_parking_data.py` 실행 성공
- `python scripts\predict_congestion.py` 실행 성공
- `python -m py_compile` 문법 검증 성공
- 프론트엔드/백엔드 파일 미수정 확인

---

## v3.0.0

### AI 혼잡도 분석 모듈 초기 구조 생성

#### 신규 폴더

- `src/ai/data/raw/` — 원본 Mock 데이터 저장
- `src/ai/data/processed/` — 전처리 완료 데이터 저장
- `src/ai/data/output/` — 혼잡도 예측 결과 저장
- `src/ai/models/` — AI 분석 모델 파일 저장
- `src/ai/notebooks/` — EDA 및 실험 노트북 저장
- `src/ai/scripts/` — 데이터 생성, 전처리, 학습, 예측 스크립트 저장

#### 신규 파일

- `src/ai/requirements.txt` — Python AI 모듈 실행 패키지 정의
- `src/ai/README.md` — AI 혼잡도 분석 모듈의 목적, 폴더 구조, 실행 순서 문서화
- `src/ai/scripts/generate_mock_parking_data.py` — Mock 주차장 데이터 생성 스크립트 기본 구조
- `src/ai/scripts/preprocess_parking_data.py` — AI 분석용 데이터 전처리 스크립트 기본 구조
- `src/ai/scripts/train_congestion_model.py` — 혼잡도 분석 모델 학습 스크립트 기본 구조
- `src/ai/scripts/predict_congestion.py` — 혼잡도 예측 결과 생성 스크립트 기본 구조

#### 검증

- 4개 Python 스크립트 직접 실행 성공
- `python -m py_compile` 문법 검증 성공
- `requirements.txt` 기본 패키지 반영 확인

#### 구현 기준

- 구현 영역별 버전 체계에 따라 AI 모듈은 `v3.x.x`로 관리
- 프론트엔드 `v1.x.x`, 백엔드 `v2.x.x`와 독립적으로 관리
- 초기 흐름은 Mock 데이터 생성 → 전처리 → AI 분석 모델 학습 → 예측 결과 CSV 생성 → 백엔드/MySQL 연동 예정 구조로 정의

#### 비고

- `git status`는 저장소 소유자 차이로 인한 `safe.directory` 오류로 확인하지 못함
- Git 반영 전 아래 명령어로 safe.directory 설정 필요

```powershell
cd C:\sp
git config --global --add safe.directory C:/sp
git status
```
