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

## 최신 기준선

| 최신 버전 | 주요 내용                          |
| --------: | ---------------------------------- |
|  `v3.0.0` | AI 혼잡도 분석 모듈 초기 구조 생성 |

---

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
