# software-engineering-ai-parking-service

AI 기반 주차난 해결 서비스를 기획하고, 소프트웨어공학 산출물과 프로젝트 보조 산출물을 함께 관리하는 저장소입니다.

---

# SmartPark: AI 기반 주차난 해결 서비스

SmartPark는 도심 및 주거 지역의 주차난 문제를 해결하기 위한 **AI 기반 스마트 주차 플랫폼**입니다.

사용자의 현재 위치와 목적지를 기반으로 주변 주차 가능 공간을 탐색하고, **곧 비워질 자리 안내**, **개인 주차장 공유 등록**, **NFC 기반 간편 결제**, **AI 혼잡도 분석** 기능을 제공합니다.

본 저장소는 단순히 소스코드만 관리하는 공간이 아니라, 소프트웨어공학 수업의 단계별 산출물과 실제 서비스 기획·설계·구현 과정에서 필요한 추가 문서를 함께 관리합니다.

---

## 1. 프로젝트 개요

기존 주차 서비스는 주차장 위치를 안내하는 데 그치는 경우가 많습니다.  
SmartPark는 현재 위치와 목적지 정보를 기반으로 주변 주차 가능 공간을 탐색하고, 실제 주차 가능성이 높은 공간을 추천하여 운전자의 주차 탐색 시간을 줄이는 것을 목표로 합니다.

또한 개인 또는 건물 소유자가 유휴 주차 공간을 등록하고 공유할 수 있도록 하여, 주차 공간이 필요한 사용자와 주차 공간을 제공할 수 있는 공급자를 연결하는 양면 플랫폼 구조를 지향합니다.

---

## 2. 핵심 기능

| 기능 | 설명 |
|---|---|
| 현재 위치 기반 주차 공간 조회 | 사용자의 현재 위치 또는 목적지를 기준으로 주변 주차장을 지도와 목록으로 조회 |
| 곧 비워질 주차 공간 안내 | 출차 예정 시간이 등록된 주차 공간을 “곧 비워질 자리”로 표시 |
| 개인 주차장 등록 및 공유 | 개인 또는 건물 관리자가 유휴 주차 공간을 등록하고 공유 |
| NFC 기반 간편 결제 | NFC 태그를 활용해 주차 이용 시작, 종료, 결제 흐름을 간편화 |
| AI 기반 혼잡도 분석 | 시간대·지역·과거 이용 데이터 기반 혼잡도 예측, 추천 점수, 추천 이유 제공 |

---

## 3. 목표 사용자

| 사용자 유형 | 설명 |
|---|---|
| 일반 운전자 | 도심, 대학가, 병원, 상가, 행사장 주변에서 주차 공간을 빠르게 찾고 싶은 사용자 |
| 주차장 공급자 | 개인 주차장, 건물 주차장 등 유휴 주차 공간을 공유하고 싶은 소유자 |
| 관리자 | 주차장 정보, 사용자 신고, 결제 내역, 서비스 운영 상태를 관리하는 사용자 |

---

## 4. 차별성

SmartPark는 기존 주차 서비스와 비교했을 때 다음과 같은 차별성을 가진다.

| 기존 주차 서비스 | SmartPark |
|---|---|
| 주차장 위치 안내 중심 | 현재 빈자리와 곧 비워질 자리까지 함께 안내 |
| 공영/민영 주차장 중심 | 개인 소유 주차 공간까지 등록 및 공유 가능 |
| 단순 거리 기반 탐색 | AI 혼잡도 분석을 통한 주차 성공 가능성 중심 추천 |
| 일반 결제 또는 현장 결제 | NFC 기반 간편 이용 시작 및 종료 흐름 지원 |
| 이용자 중심 서비스 | 이용자와 공급자를 연결하는 공유형 플랫폼 구조 |

---

## 5. 기대 효과

- 운전자의 주차 탐색 시간 단축
- 도심 지역의 불법 주차 및 교통 혼잡 완화
- 유휴 주차 공간의 효율적 활용
- 개인 및 민간 주차 공간 공급자의 추가 수익 창출
- 위치 기반 스마트 교통 서비스로의 확장 가능성 확보

---

## 6. 기술 스택

| 구분 | 기술 |
|---|---|
| Frontend | React Native |
| Backend | Spring Boot, Swagger/OpenAPI |
| Database | MySQL |
| Map API | Naver Maps API (`@mj-studio/react-native-naver-map`), Tmap API |
| AI/Analysis | Python, pandas, scikit-learn, RandomForest, CSV/JSON, MySQL loader 기반 AI 혼잡도 분석 |
| Deployment | AWS 배포 예정 |
| Version Control | Git, GitHub |
| AI Development Support | Claude Code, Codex |

---

## 7. 저장소 구조

```text
software-engineering-ai-parking-service/
├── README.md
├── CHANGELOG.md
├── CHANGELOG_FRONTEND.md
├── CHANGELOG_BACKEND.md
├── CHANGELOG_AI.md
├── FOLDER_STRUCTURE.md
├── configuration_management_plan.md
├── docs/
│   ├── requirements/
│   ├── plan/
│   ├── design/
│   ├── product/
│   ├── harness/
│   └── test/
└── src/
    ├── frontend/
    ├── backend/
    └── ai/
```

자세한 폴더 설명은 아래 문서를 참고한다.

- [폴더 구조 설명](./FOLDER_STRUCTURE.md)
- [형상관리 계획서](./configuration_management_plan.md)
- [전체 변경 이력](./CHANGELOG.md)
- [프론트엔드 변경 이력](./CHANGELOG_FRONTEND.md)
- [백엔드 변경 이력](./CHANGELOG_BACKEND.md)
- [AI 변경 이력](./CHANGELOG_AI.md)

---

## 8. 산출물 구성

| 구분 | 위치 | 설명 |
|---|---|---|
| 요구사항 문서 | `docs/requirements/` | 프로젝트 정의서, 요구사항 정의서, 요구사항 분석서 |
| 계획 문서 | `docs/plan/` | 프로젝트 관리 계획서, 형상관리 관련 문서 |
| 설계 문서 | `docs/design/` | 소프트웨어 설계서, 화면 흐름, 디자인 시스템 |
| 제품 기획 문서 | `docs/product/` | 페르소나, 사용자 여정, 경쟁 서비스 분석, 비즈니스 모델 |
| 하네스 문서 | `docs/harness/` | PRD, 기능 명세, Claude/Codex 작업 지침, 프롬프트 기록 |
| 테스트 문서 | `docs/test/` | 인스팩션 예제, 테스트 결과서, 결함 기록 |
| 소스코드 | `src/` | React Native 프론트엔드, Spring Boot 백엔드, Python AI 분석 모듈 구현 코드 |
| 변경 이력 | `/` | 전체 변경 이력 및 프론트엔드/백엔드/AI 영역별 변경 이력 |

---

## 9. 소프트웨어공학 과제 산출물

| 과제 | 산출물 | 저장 위치 | 상태 |
|---|---|---|---|
| 과제1 | 프로젝트정의서 | `docs/requirements/` | 완료 |
| 과제2 | 프로젝트관리계획서 | `docs/plan/` | 완료 |
| 과제3 | 요구사항정의서 | `docs/requirements/` | 완료 |
| 과제4 | 요구사항분석서 | `docs/requirements/` | 완료 |
| 과제5 | 소프트웨어설계서 | `docs/design/` | 예정 |
| 과제6 | 인스팩션예제 | `docs/test/` | 예정 |
| 과제7 | 테스트결과서 | `docs/test/` | 예정 |

---

## 10. 추가 프로젝트 산출물

공식 과제 문서 외에도 SmartPark 프로젝트를 실제 서비스처럼 구체화하기 위해 다음과 같은 보조 산출물을 작성한다.

| 구분 | 문서 | 목적 | 상태 |
|---|---|---|---|
| 제품 기획 | `PERSONA.md` | SmartPark의 주요 사용자 유형과 페르소나 정의 | 완료 |
| 제품 기획 | `USER_JOURNEY.md` | 사용자 유형별 서비스 이용 흐름과 문제 해결 과정 정리 | 완료 |
| 제품 기획 | `COMPETITOR_ANALYSIS.md` | 기존 주차 서비스와 SmartPark의 차별성 비교 분석 | 완료 |
| 제품 기획 | `SERVICE_SCENARIO.md` | 실제 이용 상황 기반 서비스 시나리오 정리 | 완료 |
| 제품 기획 | `BUSINESS_MODEL.md` | 목표 시장, 수익 모델, 확장 가능성 정리 | 완료 |
| 하네스 | `PRD.md` | SmartPark의 제품 요구사항, 제품 목표, MVP 범위 정리 | 완료 |
| 하네스 | `FEATURE_SPEC.md` | 기능별 상세 동작, 입력값, 출력값, 예외 상황 정리 | 완료 |
| 하네스 | `SCREEN_STRUCTURE.md` | React Native 앱의 화면 구조와 네비게이션 구성 정리 | 완료 |
| 하네스 | `PROJECT_RULES.md` | 코드 작성 규칙, 폴더 규칙, 문서 작성 규칙, commit/tag 규칙 정리 | 완료 |
| 하네스 | `CLAUDE.md` | Claude Code가 프론트엔드 구현 시 참고할 작업 지침 정리 | 완료 |
| 하네스 | `CODEX.md` | Codex가 백엔드 설계 및 문서화 작업 시 참고할 작업 지침 정리 | 완료 |
| 하네스 | `PROMPT_LOG.md` | AI 도구에 입력한 프롬프트, 결과, 수정 사항 기록 기준 정리 | 완료 |
| 디자인 | `NAVER_MAP_STYLE_GUIDE.md` | Naver Map Design System 기반 SmartPark UI 스타일 기준 정리 | 완료 |
| 디자인 | `SCREEN_FLOW.md`, `UI_DESIGN_GUIDE.md`, `DESIGN_SYSTEM.md` | 앱 화면 구조와 UI 기준 정의 | 예정 |
| 변경 이력 | `CHANGELOG.md` | 전체 프로젝트 변경 이력 요약 및 기준선 정리 | 완료 |
| 변경 이력 | `CHANGELOG_FRONTEND.md` | 프론트엔드 `v1.x.x` 상세 구현 이력 정리 | 완료 |
| 변경 이력 | `CHANGELOG_BACKEND.md` | 백엔드 `v2.x.x` 상세 구현 이력 정리 | 예정 |
| 변경 이력 | `CHANGELOG_AI.md` | AI `v3.x.x` 상세 구현 이력 정리 | 완료 |

---

## 11. 형상관리 및 버전 규칙

본 프로젝트는 Git과 GitHub를 활용하여 산출물과 소스코드의 변경 이력을 관리한다.

| 항목 | 규칙 |
|---|---|
| commit 메시지 | `[구분자-번호] 변경 내용` 형식 사용 |
| 문서 수정 | `[DOCS-번호]` 사용 |
| 기능 추가 | `[FEAT-번호]` 사용 |
| 오류 수정 | `[FIX-번호]` 사용 |
| 변경 요청 | `[CR-번호]` 사용 |
| 버전 형식 | `vMajor.Minor.Patch` |
| 변경 이력 | `CHANGELOG.md`에 전체 요약 기록, 영역별 상세 이력은 `CHANGELOG_FRONTEND.md`, `CHANGELOG_BACKEND.md`, `CHANGELOG_AI.md`에 분리 기록 |
| 기준선 관리 | 주요 단계마다 Git tag 생성 |

SmartPark 구현 단계부터는 개발 영역별로 Major 버전을 분리하여 관리한다.

| 버전 라인 | 영역 | 설명 |
|---|---|---|
| `v0.x.x` | 문서/기획/하네스 | 소프트웨어공학 산출물, 제품 기획 문서, 하네스 문서, 요구사항 문서 |
| `v1.x.x` | 프론트엔드 | React Native 앱, Naver Map UI, 화면/컴포넌트/네비게이션 구현 |
| `v2.x.x` | 백엔드 | Spring Boot API, MySQL, Swagger/OpenAPI, 외부 API 연동 구현 |
| `v3.x.x` | AI | Python 기반 Mock 데이터 생성, AI 혼잡도 분석, 모델 학습, 예측 결과 생성 |
| `v4.x.x` | 통합/MVP | 프론트엔드-백엔드-AI 연동, 발표 가능한 MVP 시제품 통합 |

예시:

```bash
git add .
git commit -m "[DOCS-05] 폴더 구조 설명 문서 추가"
git tag -a v0.2.2 -m "폴더 구조 설명 문서 추가"
git push origin main --tags
```

---

## 12. 현재 진행 상태

현재 SmartPark 프로젝트는 소프트웨어공학 산출물 작성과 React Native 기반 프론트엔드 MVP 구현, Python 기반 AI 혼잡도 분석 모듈 구현을 병행하여 진행 중이다.

---

### 12.1 문서 산출물 진행 현황

현재까지 다음 소프트웨어공학 산출물과 프로젝트 보조 문서가 정리되었다.

#### 소프트웨어공학 과제 산출물

- 과제1 프로젝트정의서 작성 완료
- 과제2 프로젝트관리계획서 작성 완료
- 과제3 요구사항정의서 작성 완료
- 과제4 요구사항분석서 작성 완료
- 과제5 소프트웨어설계서 작성 예정
- 과제6 인스팩션예제 작성 예정
- 과제7 테스트결과서 작성 예정

#### 제품 기획 문서

`docs/product/` 폴더에는 SmartPark의 서비스 기획을 구체화하기 위한 문서가 작성되었다.

- `PERSONA.md`
- `USER_JOURNEY.md`
- `COMPETITOR_ANALYSIS.md`
- `SERVICE_SCENARIO.md`
- `BUSINESS_MODEL.md`

이를 통해 SmartPark의 주요 사용자, 사용자 여정, 경쟁 서비스 대비 차별성, 실제 서비스 시나리오, 비즈니스 모델을 정리하였다.

#### 하네스 문서

`docs/harness/` 폴더에는 Claude Code와 Codex가 SmartPark 프로젝트를 일관성 있게 이해하고 작업할 수 있도록 기준 문서를 작성하였다.

- `PRD.md`
- `FEATURE_SPEC.md`
- `SCREEN_STRUCTURE.md`
- `PROJECT_RULES.md`
- `CLAUDE.md`
- `CODEX.md`
- `PROMPT_LOG.md`

---

### 12.2 프론트엔드 구현 현황

프론트엔드는 `src/frontend` 하위에서 React Native 기반 모바일 앱으로 구현하고 있다.

현재 프론트엔드는 `v1.1.15` 기준으로 mock 기반 주요 화면 구현, Figma Make reference 기반 화면 정합성 보정, Naver Map SDK 실제 연동, 지도 마커 UI 개선까지 진행되었다.

주요 구현 내용은 다음과 같다.

| 구분 | 구현 내용 |
|---|---|
| 기본 구조 | React Native + TypeScript 기반 앱 구조 구성 |
| 화면 구현 | Home, Search, ParkingDetail, Recommendation, Session, Payment, Saved, My, Provider 화면 구현 |
| 지도 연동 | `@mj-studio/react-native-naver-map` 기반 실제 Naver Map 표시 |
| 지도 마커 | Lucide 아이콘 기반 Category Chip 스타일 마커 적용 |
| BottomSheet | Home 화면 4단계 swipe 구조 구현 |
| AI 추천 화면 | 추천 탭을 AI 혼잡도 분석 대시보드 형태로 확장 |
| NFC/결제 | NFC 시작/종료 및 결제 흐름 mock 기반 구현 |
| 공급자 기능 | 공급자 대시보드 및 주차장 등록 5단계 wizard 구현 |
| 코드 구조 | 도메인 기반 리팩토링 진행 |
| 검증 | `npx tsc --noEmit`, `npm run android` 기준 유지 |

프론트엔드 상세 변경 이력은 `CHANGELOG_FRONTEND.md`에서 관리한다.

---

### 12.3 백엔드 구현 현황

백엔드는 `src/backend` 하위에서 Spring Boot 기반 API 서버로 구현할 예정이다.

현재 백엔드는 구현 시작 전 기준선인 `v2.0.0`을 준비하는 단계이며, 이후 다음 흐름으로 진행한다.

| 단계 | 내용 |
|---|---|
| `v2.0.0` | Spring Boot 프로젝트 초기 설정 |
| `v2.1.x` | 공통 응답, 예외 처리, Swagger/OpenAPI 설정 |
| `v2.2.x` | ParkingLot, ParkingSpace 도메인 및 주차장 조회 API 구현 |
| `v2.3.x` | Naver Maps API, Geocoding, Directions5 연동 |
| `v2.4.x` | AI 혼잡도 예측 결과 조회 API 구현 |
| `v2.5.x` | 공급자, 이용 세션, 결제 mock API 구현 |
| `v2.6.x` | 테스트 코드, Swagger 문서 보완, AWS 배포 준비 |

백엔드 상세 변경 이력은 `CHANGELOG_BACKEND.md`에서 관리한다.

---

### 12.4 AI 분석 모듈 구현 현황

`src/ai/` 폴더에는 Python 기반 SmartPark AI 혼잡도 분석 모듈이 구현되어 있다.

현재 AI 모듈은 `v3.7.0` 기준으로 Mock 데이터 생성, 대용량 전처리, 학습용 균형 샘플 생성, AI 혼잡도 모델 학습, 향후 24시간 예측 결과 생성, MySQL 적재 및 백엔드 연동 준비까지 완료되었다.

AI 모듈의 전체 실행 흐름은 다음과 같다.

```text
Mock 데이터 생성
→ 대용량 전처리
→ 학습용 균형 샘플 생성
→ AI 혼잡도 모델 학습
→ 향후 24시간 예측 결과 생성
→ MySQL 적재 및 백엔드 연동 준비
```

AI 모듈 구조는 다음과 같다.

```text
src/ai/
├── data/
│   ├── raw/
│   ├── processed/
│   └── output/
├── docs/
├── models/
├── notebooks/
├── scripts/
├── sql/
├── requirements.txt
└── README.md
```

주요 구현 결과는 다음과 같다.

| 항목 | 상태 |
|---|---|
| 주차장 Mock 데이터 | 1,000개 생성 |
| 이용 이력 데이터 | 5년치 시간대별 데이터 생성 |
| 외부 요인 데이터 | 지역, 날짜, 시간 기준 날씨/행사/교통 데이터 생성 |
| 전처리 데이터 | `training_dataset.csv` 생성 |
| 학습용 샘플 | 혼잡도 등급별 70,000개씩 총 280,000 rows 생성 |
| AI 모델 | RandomForest 기반 혼잡도 분류 모델 학습 완료 |
| 모델 성능 | accuracy, macro_f1, weighted_f1 모두 0.9466 |
| 예측 결과 | 1,000개 주차장 × 향후 24시간 = 24,000 rows 생성 |
| MySQL 연동 | DDL SQL, import SQL, Python loader, 연동 문서 작성 완료 |
| 실제 DB 적재 | 환경 변수 및 로컬 MySQL 준비 후 실행 예정 |

AI 모듈의 주요 스크립트는 다음과 같다.

| 스크립트 | 역할 |
|---|---|
| `generate_mock_parking_data.py` | 주차장, 이용 이력, 외부 요인 raw Mock 데이터 생성 |
| `preprocess_parking_data.py` | 대용량 raw CSV를 chunk 단위로 읽어 `training_dataset.csv` 생성 |
| `create_training_sample.py` | `training_dataset.csv`에서 혼잡도 등급별 균형 샘플 생성 |
| `train_congestion_model.py` | `training_sample.csv` 기반 AI 혼잡도 모델 학습 |
| `predict_congestion.py` | 학습된 모델로 향후 24시간 예측 결과 생성 |
| `load_predictions_to_mysql.py` | `congestion_predictions.csv`를 MySQL에 적재 |

AI 상세 변경 이력은 `CHANGELOG_AI.md`에서 관리한다.

---

### 12.5 미적용 및 향후 구현 예정

현재 프론트엔드는 mock 데이터 기반 UI 구현 단계이며, AI 모듈은 독립 실행 가능한 예측 파이프라인까지 완료되었다. 다음 기능은 아직 실제 연동 전이다.

- 실제 GPS 위치 권한 및 현재 위치 추적
- 실제 경로 안내 API 연동
- 실제 NFC 태그 인식
- 실제 결제 SDK 연동
- 백엔드 API 연동
- AI 혼잡도 예측 API 연동
- MySQL 실제 적재 실행
- 공급자 주차 공간 등록/승인/정산 API 연동
- 관리자 승인/신고 관리 기능 구현

---

## 13. 향후 구현 방향

현재 구현 단계는 프론트엔드, 백엔드, AI 혼잡도 분석 모듈을 다음 기준으로 진행한다.

| 영역 | 구현 방향 | 주요 도구 |
|---|---|---|
| 프론트엔드 | Naver Maps 스타일의 지도 중심 React Native 앱 구현 및 실제 위치/API 연동 | Claude Code, Android 실기기 USB 테스트 |
| 백엔드 | 주차장 조회, 목적지 검색, 혼잡도 조회 API 구현 | Spring Boot, MySQL, Swagger, Codex |
| AI 분석 | Mock 데이터 기반 AI 혼잡도 예측 결과 생성 및 MySQL 적재 준비 | Python, pandas, scikit-learn, MySQL loader |

다음 구현 단계에서는 mock UI 흐름을 실제 서비스 구조로 확장한다.

```text
프론트엔드 mock 데이터
→ 백엔드 Parking API 응답으로 교체
→ AI congestion_predictions 테이블 연동
→ 주차장 카드/상세/추천 화면에 실제 혼잡도 표시
→ 통합 MVP 검증
```

---

## 14. AI 모듈 실행 순서

AI 모듈을 처음부터 다시 실행할 경우의 순서는 다음과 같다.

```powershell
cd C:\sp\src\ai

python scripts\generate_mock_parking_data.py
python scripts\preprocess_parking_data.py
python scripts\create_training_sample.py
python scripts\train_congestion_model.py
python scripts\predict_congestion.py
```

MySQL 적재까지 진행하려면 로컬 DB와 환경 변수가 필요하다.

```powershell
$env:SMARTPARK_DB_HOST="localhost"
$env:SMARTPARK_DB_PORT="3306"
$env:SMARTPARK_DB_NAME="smartpark_local"
$env:SMARTPARK_DB_USER="your_user"
$env:SMARTPARK_DB_PASSWORD="your_password"
$env:SMARTPARK_DB_CHARSET="utf8mb4"

python scripts\load_predictions_to_mysql.py
```

---

## 15. Git 관리 기준

AI 모듈에서는 생성 파일 중 일부가 매우 크기 때문에 Git 추적 대상을 구분한다.

| 파일/폴더 | Git 포함 여부 | 이유 |
|---|---|---|
| `scripts/*.py` | 포함 | 재현 가능한 실행 로직 |
| `docs/*.md` | 포함 | 데이터/연동 기준 문서 |
| `sql/*.sql` | 포함 | DB 연동 기준 파일 |
| `requirements.txt` | 포함 | 실행 환경 재현 |
| `training_sample_summary.json` | 포함 가능 | 작은 요약 산출물 |
| `congestion_predictions_summary.json` | 포함 가능 | 작은 요약 산출물 |
| `model_evaluation.json` | 포함 가능 | 모델 평가 결과 |
| `classification_report.csv` | 포함 가능 | 모델 평가 결과 |
| `confusion_matrix.csv` | 포함 가능 | 모델 평가 결과 |
| `feature_importance.csv` | 포함 가능 | 모델 평가 결과 |
| `*.csv` 대용량 데이터 | 제외 | 재생성 가능한 산출물, 용량 문제 |
| `models/*.joblib` | 제외 | 재생성 가능한 모델 본체 |
| `.env` | 제외 | DB 비밀번호 등 민감 정보 |

---

## 16. 다음 단계

다음 단계는 백엔드에서 AI 예측 결과를 조회할 수 있도록 `CongestionPrediction` 도메인을 구현하는 것이다.

백엔드 연동 흐름은 다음과 같다.

```text
AI 모듈
→ congestion_predictions.csv 생성
→ MySQL congestion_predictions 테이블 적재
→ Spring Boot CongestionPrediction Entity 생성
→ Repository 조회 메서드 작성
→ Service에서 최신 예측 결과 조회
→ Controller API 구현
→ 프론트엔드에서 주차장별 혼잡도 표시
```

후보 API는 다음과 같다.

| API | 목적 |
|---|---|
| `GET /api/congestion/predictions` | 조건별 혼잡도 예측 결과 조회 |
| `GET /api/parking-lots/{parkingLotId}/congestion` | 특정 주차장의 최신 혼잡도 조회 |
| `GET /api/parking-lots/nearby-with-congestion` | 주변 주차장 목록과 혼잡도 결과를 함께 조회 |

---

# 최종 요약

SmartPark는 현재 **문서/기획/하네스 정리 + 프론트엔드 mock 기반 MVP UI 구현 + AI 혼잡도 분석 파이프라인 구현**이 병행 완료된 상태이다.

핵심 성과는 다음과 같다.

| 구분 | 결과 |
|---|---|
| 문서 | 요구사항, 계획, 제품 기획, 하네스 문서 정리 완료 |
| 프론트엔드 | 주요 화면 mock 구현, Naver Map SDK 실제 연동, 지도 마커 UI 보정 완료 |
| AI 분석 | Mock 데이터 생성, 대용량 전처리, 샘플링, 모델 학습, 예측 결과 생성, MySQL 적재 준비 완료 |
| 백엔드 | 구현 시작 예정 |
| 다음 작업 | 백엔드 `CongestionPrediction` Entity/Repository/API 구현 및 프론트엔드 연동 |
