# CHANGELOG

SmartPark 프로젝트의 전체 변경 이력 요약과 Git tag 기준선을 정리한다.

본 프로젝트는 프론트엔드, 백엔드, AI 분석 모듈을 병렬로 개발하므로, 전체 변경 이력은 본 문서에서 요약하고 영역별 상세 변경 이력은 별도 CHANGELOG 파일에서 관리한다.

---

## 변경 이력 관리 기준

| 파일 | 관리 범위 |
|---|---|
| `CHANGELOG.md` | 전체 프로젝트 요약, 버전 관리 기준, 최신 기준선 정리 |
| `CHANGELOG_FRONTEND.md` | 프론트엔드 `v1.x.x` 상세 구현 이력 |
| `CHANGELOG_BACKEND.md` | 백엔드 `v2.x.x` 상세 구현 이력 |
| `CHANGELOG_AI.md` | AI `v3.x.x` 상세 구현 이력 |

---

## 버전 관리 기준

SmartPark 구현 단계부터는 개발 영역별로 Major 버전을 분리하여 관리한다.

| 버전 라인 | 영역 | 설명 |
|---|---|---|
| `v0.x.x` | 문서/기획/하네스 | 소프트웨어공학 산출물, 제품 기획 문서, 하네스 문서, 요구사항 문서 |
| `v1.x.x` | 프론트엔드 | React Native 앱, Naver Map UI, 화면/컴포넌트/네비게이션 구현 |
| `v2.x.x` | 백엔드 | Spring Boot API, MySQL, Swagger/OpenAPI, 외부 API 연동 구현 |
| `v3.x.x` | AI | Python 기반 Mock 데이터 생성, AI 혼잡도 분석, 모델 학습, 예측 결과 생성 |
| `v4.x.x` | 통합/MVP | 프론트엔드-백엔드-AI 연동, 발표 가능한 MVP 시제품 통합 |

각 영역 내부에서는 다음 기준을 따른다.

| 구분 | 의미 |
|---|---|
| Minor | 해당 영역의 주요 기능 추가 또는 구조 확장 |
| Patch | 오류 수정, UI 보정, 문서 보완, 경미한 개선 |

---

## 최신 기준선 요약

| 영역 | 최신 버전 | 상세 문서 | 주요 내용 |
|---|---:|---|---|
| 문서/기획/하네스 | `v0.4.2` | `CHANGELOG.md` | CHANGELOG 영역별 분리 및 형상관리 문서 갱신 |
| 프론트엔드 | `v1.1.15` | `CHANGELOG_FRONTEND.md` | 지도 마커 UI 개선, 성수역 Mock 데이터 확장 |
| 백엔드 | `v2.0.0` 예정 | `CHANGELOG_BACKEND.md` | 백엔드 구현 시작 예정 |
| AI | `v3.7.0` | `CHANGELOG_AI.md` | AI 예측 결과 MySQL 적재 및 백엔드 연동 준비 |
| 통합/MVP | `v4.0.0` 예정 | 추후 작성 | 프론트엔드-백엔드-AI 통합 예정 |

---

## v0.4.2

### CHANGELOG 영역별 분리 및 형상관리 문서 갱신

- 단일 `CHANGELOG.md` 구조를 전체 요약 + 영역별 상세 CHANGELOG 구조로 분리
- `CHANGELOG_FRONTEND.md` 생성 및 기존 프론트엔드 `v1.x.x` 상세 이력 이관
- `CHANGELOG_BACKEND.md` 생성 및 백엔드 `v2.x.x` 기록 기준 마련
- `CHANGELOG_AI.md` 생성 및 AI `v3.x.x` 상세 구현 이력 관리 기준 마련
- `README.md`에 영역별 CHANGELOG 링크와 최신 진행 상태 반영
- `configuration_management_plan.md`에 영역별 변경 이력 관리 기준 반영

---

## v0.4.1

### 영역별 버전 관리 기준 정리

- SmartPark 구현 단계의 버전 관리 기준을 영역별 Major 버전 방식으로 재정리
- `v1.x.x`는 프론트엔드, `v2.x.x`는 백엔드, `v3.x.x`는 AI, `v4.x.x`는 통합/MVP 작업으로 구분
- 프론트엔드, 백엔드, AI 모듈을 병렬로 개발할 때 각 작업 이력이 충돌하지 않도록 기준 정리
- `configuration_management_plan.md`의 버전 규칙과 형상 상태 기록 기준 갱신
- 기존 단일 `CHANGELOG.md` 구조를 전체 요약 + 영역별 상세 CHANGELOG 구조로 분리할 기준 마련

---

## v0.4.0

### 구현 단계 진입 전 문서 전반 보강

- `FOLDER_STRUCTURE.md`에 `src/ai` 구조 추가
- `configuration_management_plan.md`에 프론트엔드/백엔드/AI 형상 항목 세분화
- 하네스 문서에 구현 기준, AI mock 데이터, Android 검증, Swagger/OpenAPI, 배포 기준 보강
- `README.md`에 구현 진행 방향과 `src/ai` 구조 반영

---

## v0.3.9

### 과제4 요구사항분석서 추가

- `docs/requirements/과제4.요구사항분석서.md` 추가
- `docs/requirements/과제4.요구사항분석서.pdf` 추가
- Use Case Diagram, Use Case Description, 클래스 다이어그램, CRC 카드, 시퀀스 다이어그램 반영
- SmartPark 주요 기능 흐름을 분석 모델로 구체화

---

## v0.3.8

### 과제3 요구사항정의서 추가

- `docs/requirements/과제3.요구사항정의서.md` 추가
- `docs/requirements/과제3.요구사항정의서.pdf` 추가
- 기능적 요구사항, 비기능적 요구사항, 외부 인터페이스 요구사항, 데이터 요구사항 정리

---

## v0.3.7

### 하네스 문서 7종 작성 완료 반영

- `README.md` 갱신
- `CHANGELOG.md` 갱신
- `docs/harness/` 문서 7종 완료 현황 반영

---

## v0.3.6

### PROMPT_LOG 작성

- `docs/harness/PROMPT_LOG.md` 추가
- AI 도구 프롬프트 기록 기준, 템플릿, 예시 작성

---

## v0.3.5

### CODEX 작업 지침 작성

- `docs/harness/CODEX.md` 추가
- Spring Boot 백엔드 설계 및 문서화 작업 기준 정리

---

## v0.3.4

### CLAUDE 작업 지침 작성

- `docs/harness/CLAUDE.md` 추가
- React Native 프론트엔드 구현 작업 기준 정리

---

## v0.3.3

### 프로젝트 작업 규칙 작성

- `docs/harness/PROJECT_RULES.md` 추가
- 코드 작성 규칙, 폴더 규칙, 문서 규칙, commit/tag 규칙 정리

---

## v0.3.2

### 화면 구조 문서 작성

- `docs/harness/SCREEN_STRUCTURE.md` 추가
- React Native 앱 화면 구조와 네비게이션 구성 정리

---

## v0.3.1

### 기능 명세 문서 작성

- `docs/harness/FEATURE_SPEC.md` 추가
- 핵심 기능별 입력값, 출력값, 예외 상황, API 후보, 완료 기준 정리

---

## v0.3.0

### PRD 작성

- `docs/harness/PRD.md` 추가
- SmartPark 제품 목표, 핵심 기능, MVP 범위, 사용자 유형, 개발 기준 정리
- Claude Code와 Codex가 참고할 제품 요구사항 기준 문서 작성

---

## v0.2.9

### README 및 CHANGELOG 갱신

- `README.md` 갱신
- `CHANGELOG.md` 갱신
- 제품 기획 문서 작성 이력을 문서별로 분리하여 정리
- 버전 tag 흐름이 실제 작업 순서와 일치하도록 변경 이력 정리

---

## v0.2.8

### 제품 기획 문서 완료 현황 반영

- `README.md`에 제품 기획 문서 목록 반영
- `CHANGELOG.md`에 제품 기획 문서 작성 이력 반영
- `docs/product/` 문서 체계 정리

---

## v0.2.7

### 서비스 시나리오 문서 작성

- `docs/product/SERVICE_SCENARIO.md` 추가
- 이용자, 공급자, 관리자 관점의 실제 서비스 이용 시나리오 작성

---

## v0.2.6

### 비즈니스 모델 문서 작성

- `docs/product/BUSINESS_MODEL.md` 추가
- 목표 시장, 가치 제안, 수익 모델, 확장 가능성 정리

---

## v0.2.5

### 경쟁 서비스 분석 문서 작성

- `docs/product/COMPETITOR_ANALYSIS.md` 추가
- 모두의주차장, 카카오 T 주차, TMAP 주차 등 경쟁 서비스와 SmartPark 차별성 정리

---

## v0.2.4

### 사용자 여정 문서 작성

- `docs/product/USER_JOURNEY.md` 추가
- 일반 운전자, 공급자, 관리자 관점의 사용자 흐름 정리

---

## v0.2.3

### 페르소나 문서 작성

- `docs/product/PERSONA.md` 추가
- 일반 운전자, 일정 기반 방문 운전자, 공급자, 관리자 페르소나 정리

---

## v0.2.2

### 폴더 구조 설명 문서 추가

- `FOLDER_STRUCTURE.md` 추가
- `docs/`, `src/`, `docs/harness`, `docs/product` 등 폴더별 역할 설명

---

## v0.2.1

### 형상관리 계획서 정리

- `configuration_management_plan.md` 정리
- 형상 항목, 버전 규칙, commit/tag 기준, 변경 이력 관리 방식 정의

---

## v0.2.0

### 프로젝트 문서 구조 확장

- 공식 과제 산출물 외 추가 프로젝트 문서 관리 구조 정리
- `docs/product`, `docs/harness`, `docs/design`, `docs/test` 구조 확장 기준 마련

---

## v0.1.0

### 초기 프로젝트 문서 등록

- SmartPark 프로젝트 초기 문서 등록
- 프로젝트 정의, 요구사항, 계획 문서 작성 기반 마련
- Git 기반 산출물 관리 시작
