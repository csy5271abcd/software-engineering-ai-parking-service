# PROMPT_LOG.md

# SmartPark AI 작업 프롬프트 기록 문서

## 1. 문서 개요

### 1.1 문서 목적

본 문서는 SmartPark 프로젝트에서 Claude Code, Codex, ChatGPT 등 AI 개발 보조 도구에 입력한 주요 프롬프트와 그 결과를 기록하기 위해 작성되었다.

SmartPark는 사용자의 현재 위치와 목적지를 기반으로 주변 주차 가능 공간을 탐색하고, 곧 비워질 주차 공간 정보, 개인 주차장 공유, NFC 기반 간편 결제, AI 또는 규칙 기반 혼잡도 분석 기능을 제공하는 AI 기반 스마트 주차 플랫폼이다.

본 문서는 AI 도구를 활용한 작업 과정을 단순한 대화 기록으로 남기기 위한 문서가 아니라, 소프트웨어공학 프로젝트의 형상관리 관점에서 다음 내용을 추적하기 위한 기준 문서이다.

- 어떤 목적의 프롬프트를 사용했는지
- 어떤 문서 또는 코드가 생성되었는지
- 생성 결과를 어떻게 수정했는지
- 어떤 버전 tag와 연결되는지
- 향후 유사 작업에서 어떤 프롬프트를 재사용할 수 있는지

---

### 1.2 문서 작성 배경

SmartPark 프로젝트는 공식 과제 산출물뿐 아니라 실제 서비스 기획, 설계, 구현에 필요한 보조 산출물을 함께 관리한다. 또한 Claude Code와 Codex를 활용한 바이브 코딩 방식을 적용하여 문서 작성, 프론트엔드 구현, 백엔드 설계 작업을 단계적으로 진행한다.

AI 도구를 활용하면 빠르게 산출물을 만들 수 있지만, 입력한 프롬프트와 생성 결과를 기록하지 않으면 다음 문제가 발생할 수 있다.

| 문제             | 설명                                                           |
| ---------------- | -------------------------------------------------------------- |
| 작업 맥락 손실   | 어떤 기준으로 문서와 코드가 생성되었는지 추적하기 어렵다.      |
| 결과 재현 어려움 | 비슷한 작업을 다시 할 때 동일한 수준의 결과를 만들기 어렵다.   |
| 변경 사유 불명확 | 생성된 결과를 왜 수정했는지 확인하기 어렵다.                   |
| 형상관리 약화    | commit, tag, CHANGELOG와 AI 작업 과정이 연결되지 않는다.       |
| 품질 점검 어려움 | AI가 작성한 내용이 프로젝트 기준과 일치하는지 검토하기 어렵다. |

따라서 본 문서는 AI 기반 작업 과정을 기록하고, 프로젝트 산출물의 변경 이력을 설명하는 보조 자료로 활용한다.

---

### 1.3 문서 적용 범위

본 문서는 다음 작업에 적용한다.

| 구분            | 적용 내용                                                        |
| --------------- | ---------------------------------------------------------------- |
| 문서 작성       | PRD, 기능 명세, 화면 구조, 프로젝트 규칙, 개발 지침 문서 작성    |
| 프론트엔드 작업 | React Native 화면, 컴포넌트, 네비게이션 구현 프롬프트 기록       |
| 백엔드 작업     | Spring Boot API, 도메인, DTO, Service, 테스트 구현 프롬프트 기록 |
| 문서 수정       | README, CHANGELOG, 형상관리 문서, 폴더 구조 문서 수정 기록       |
| 오류 수정       | 빌드 오류, API 오류, 문서 구조 오류, 형상관리 오류 해결 기록     |
| 검토 요청       | 문서 품질 검토, 코드 구조 검토, 요구사항 누락 검토 기록          |

---

## 2. 관련 문서

본 문서는 다음 문서와 함께 사용한다.

| 문서                               | 관계                                   |
| ---------------------------------- | -------------------------------------- |
| `docs/harness/PRD.md`              | 제품 요구사항 기준 문서                |
| `docs/harness/FEATURE_SPEC.md`     | 기능별 상세 명세 기준 문서             |
| `docs/harness/SCREEN_STRUCTURE.md` | 화면 구조 및 네비게이션 기준 문서      |
| `docs/harness/PROJECT_RULES.md`    | 코드, 문서, commit, tag 작업 규칙 문서 |
| `docs/harness/CLAUDE.md`           | Claude Code 프론트엔드 작업 지침 문서  |
| `docs/harness/CODEX.md`            | Codex 백엔드 및 문서화 작업 지침 문서  |
| `CHANGELOG.md`                     | 버전별 변경 이력 문서                  |
| `FOLDER_STRUCTURE.md`              | 폴더별 역할 설명 문서                  |
| `configuration_management_plan.md` | 형상관리 기준 문서                     |

---

## 3. 프롬프트 기록 원칙

### 3.1 기록 대상

다음 유형의 프롬프트는 반드시 기록한다.

| 기록 대상           | 설명                                                  |
| ------------------- | ----------------------------------------------------- |
| 주요 문서 생성 요청 | PRD, 기능 명세, 화면 구조, 설계서 등 산출물 생성 요청 |
| 코드 생성 요청      | 화면, API, 도메인, 서비스, 테스트 코드 생성 요청      |
| 구조 변경 요청      | 폴더 구조, 패키지 구조, 네비게이션 구조 변경 요청     |
| 오류 해결 요청      | 빌드 실패, 실행 오류, API 오류, Git 오류 해결 요청    |
| 품질 개선 요청      | 문서 보완, 코드 리팩토링, UI 개선, 테스트 보완 요청   |
| 형상관리 요청       | commit 메시지, tag, CHANGELOG 수정 요청               |

---

### 3.2 기록하지 않아도 되는 항목

다음 항목은 필요할 때만 기록한다.

| 제외 가능 항목      | 이유                                                      |
| ------------------- | --------------------------------------------------------- |
| 단순 오타 수정 요청 | 변경 영향이 작고 commit 메시지로 충분히 추적 가능         |
| 단순 번역 요청      | 프로젝트 산출물 변경과 직접 관련이 없는 경우 제외 가능    |
| 아이디어 단순 질의  | 실제 문서 또는 코드 변경으로 이어지지 않은 경우 제외 가능 |
| 반복 확인 메시지    | `okay`, `다음`, `계속` 등 작업 지시가 아닌 경우 제외 가능 |

---

### 3.3 기록 방식

프롬프트 기록은 다음 기준을 따른다.

1. 원문 프롬프트를 가능한 한 유지한다.
2. 긴 프롬프트는 핵심 지시사항 중심으로 요약할 수 있다.
3. 생성 결과는 파일명과 작업 결과 중심으로 기록한다.
4. 수정 사항은 최초 결과에서 바뀐 부분을 중심으로 기록한다.
5. 관련 commit과 tag가 있으면 함께 기록한다.
6. 실패하거나 수정이 필요했던 작업도 숨기지 않고 기록한다.

---

## 4. 프롬프트 기록 템플릿

아래 템플릿은 새로운 AI 작업을 기록할 때 사용한다.

````md
## PL-번호. 작업 제목

| 항목        | 내용                                                 |
| ----------- | ---------------------------------------------------- |
| 작업일      | YYYY-MM-DD                                           |
| 사용 도구   | ChatGPT / Claude Code / Codex                        |
| 작업 유형   | 문서 작성 / 코드 구현 / 오류 수정 / 문서 수정 / 검토 |
| 관련 파일   | `파일 경로`                                          |
| 관련 버전   | `v0.x.x`                                             |
| 관련 commit | `[DOCS-00] commit 메시지`                            |

### 1. 입력 프롬프트

```text
프롬프트 원문 또는 핵심 지시사항
```
````

### 2. 생성 결과

- 생성된 파일:
  - `파일 경로`
- 주요 결과:
  - 결과 요약 1
  - 결과 요약 2

### 3. 수정 및 검토 사항

- 수정 사항 1
- 수정 사항 2
- 향후 보완 사항

### 4. 연결된 형상관리

```bash
git add ...
git commit -m "..."
git tag -a v0.x.x -m "..."
git push origin main --tags
```

````

---

## 5. 하네스 문서 작성 프롬프트 기록

## PL-01. docs/harness 폴더 작성 흐름 시작

| 항목 | 내용 |
| --- | --- |
| 작업일 | 2026-05-17 |
| 사용 도구 | ChatGPT |
| 작업 유형 | 문서 작성 계획 |
| 관련 파일 | `docs/harness/` |
| 관련 버전 | `v0.3.0` 이후 |
| 관련 commit | 하네스 문서 작성 흐름 시작 전 준비 |

### 1. 입력 프롬프트

```text
docs/harness 폴더의 내용을 먼저 작성하자.
파일 1개 작성 -> 태그 작성 -> Changelog에 반영.
앞의 docs/product와 유사한 과정 진행.
````

### 2. 생성 결과

- `docs/harness` 문서 작성 순서를 다음과 같이 정리하였다.
  - `PRD.md`
  - `FEATURE_SPEC.md`
  - `SCREEN_STRUCTURE.md`
  - `PROJECT_RULES.md`
  - `CLAUDE.md`
  - `CODEX.md`
  - `PROMPT_LOG.md`
- 각 파일을 하나씩 작성하고, 각 문서마다 독립적인 버전 tag를 부여하는 방식으로 진행하기로 하였다.

### 3. 수정 및 검토 사항

- `docs/product` 작성 방식과 동일하게, 문서 1개 작성 후 tag와 CHANGELOG를 갱신하는 흐름을 유지하였다.
- `docs/harness`는 AI 개발 도구가 프로젝트를 일관성 있게 이해하도록 돕는 기준 문서 공간으로 정의하였다.

### 4. 연결된 형상관리

```text
v0.3.0부터 하네스 문서 버전 흐름 시작
```

---

## PL-02. PRD.md 작성

| 항목        | 내용                                |
| ----------- | ----------------------------------- |
| 작업일      | 2026-05-17                          |
| 사용 도구   | ChatGPT                             |
| 작업 유형   | 문서 작성                           |
| 관련 파일   | `docs/harness/PRD.md`               |
| 관련 버전   | `v0.3.0`                            |
| 관련 commit | `[DOCS-13] SmartPark PRD 문서 추가` |

### 1. 입력 프롬프트

```text
docs/harness의 첫 번째 문서로 PRD.md를 작성하고,
파일 하나로 정리해서 다운로드할 수 있게 작성.
태그와 CHANGELOG 반영 내용도 함께 제시.
```

### 2. 생성 결과

- 생성된 파일:
  - `docs/harness/PRD.md`
- 주요 결과:
  - SmartPark의 제품 요구사항 기준 문서를 작성하였다.
  - 제품 목표, 문제 정의, 주요 사용자, MVP 범위, 핵심 기능 요구사항을 정리하였다.
  - 화면 요구사항, 데이터 요구사항, 비기능 요구사항을 포함하였다.
  - 이후 기능 명세, 화면 구조, Claude/Codex 지침 문서의 기준으로 활용할 수 있도록 구성하였다.

### 3. 수정 및 검토 사항

- PRD는 실제 구현 세부사항보다 제품 목표와 요구사항 기준을 중심으로 작성하였다.
- 하네스 문서의 출발점이므로 후속 문서와 연결될 수 있도록 관련 문서 항목을 포함하였다.

### 4. 연결된 형상관리

```bash
git add docs/harness/PRD.md CHANGELOG.md

git commit -m "[DOCS-13] SmartPark PRD 문서 추가"

git tag -a v0.3.0 -m "SmartPark PRD 문서 추가"

git push origin main --tags
```

---

## PL-03. FEATURE_SPEC.md 작성

| 항목        | 내용                                   |
| ----------- | -------------------------------------- |
| 작업일      | 2026-05-17                             |
| 사용 도구   | ChatGPT                                |
| 작업 유형   | 문서 작성                              |
| 관련 파일   | `docs/harness/FEATURE_SPEC.md`         |
| 관련 버전   | `v0.3.1`                               |
| 관련 commit | `[DOCS-14] SmartPark 기능 명세서 추가` |

### 1. 입력 프롬프트

```text
FEATURE_SPEC.md를 작성하고 v0.3.1 태그 작성
```

### 2. 생성 결과

- 생성된 파일:
  - `docs/harness/FEATURE_SPEC.md`
- 주요 결과:
  - SmartPark의 핵심 기능을 개발 가능한 단위로 분해하였다.
  - 현재 위치 기반 주차장 조회, 목적지 기반 검색, 주차장 상세 조회, 곧 비워질 자리 안내 기능을 명세하였다.
  - 개인/상가 주차 공간 등록, 이용 가능 시간 및 요금 설정, NFC 이용 시작/종료, 결제 내역 저장 기능을 정리하였다.
  - AI/규칙 기반 혼잡도 분석, 관리자 승인/반려, 신고 및 분쟁 관리, 결제 오류 관리, 운영 통계 기능을 명세하였다.
  - 기능별 입력값, 출력값, 예외 상황, API 후보, 완료 기준, 테스트 케이스 연결 방향을 정리하였다.

### 3. 수정 및 검토 사항

- 기능을 단순 설명이 아니라 구현 가능한 명세 단위로 나누었다.
- 프론트엔드 화면과 백엔드 API 설계가 모두 참조할 수 있도록 입력값, 출력값, 예외 상황을 함께 포함하였다.

### 4. 연결된 형상관리

```bash
git add docs/harness/FEATURE_SPEC.md CHANGELOG.md

git commit -m "[DOCS-14] SmartPark 기능 명세서 추가"

git tag -a v0.3.1 -m "SmartPark 기능 명세서 추가"

git push origin main --tags
```

---

## PL-04. SCREEN_STRUCTURE.md 작성

| 항목        | 내용                                      |
| ----------- | ----------------------------------------- |
| 작업일      | 2026-05-17                                |
| 사용 도구   | ChatGPT                                   |
| 작업 유형   | 문서 작성                                 |
| 관련 파일   | `docs/harness/SCREEN_STRUCTURE.md`        |
| 관련 버전   | `v0.3.2`                                  |
| 관련 commit | `[DOCS-15] SmartPark 화면 구조 문서 추가` |

### 1. 입력 프롬프트

```text
SCREEN_STRUCTURE.md를 작성하고 v0.3.2 태그
```

### 2. 생성 결과

- 생성된 파일:
  - `docs/harness/SCREEN_STRUCTURE.md`
- 주요 결과:
  - SmartPark React Native 앱의 전체 화면 구조와 네비게이션 구성을 정리하였다.
  - RootNavigator, MainTabNavigator, HomeStack, SearchStack, ParkingStack, ProviderStack, MyPageStack 구조를 정의하였다.
  - 일반 이용자, 공급자, 관리자 관점의 주요 화면 흐름을 정리하였다.
  - 메인 지도, 목적지 검색, 추천 주차장, 상세 화면, NFC 이용, 결제, 공급자 등록, 관리자 승인 화면 구조를 작성하였다.
  - 화면별 주요 컴포넌트, 상태값, API 연결 기준, 테스트 케이스 연결 방향을 정리하였다.

### 3. 수정 및 검토 사항

- Claude Code가 화면 구현 시 참고할 수 있도록 화면명과 네비게이션 구조를 명확히 작성하였다.
- Codex가 API 응답 구조를 설계할 때 화면에서 필요한 데이터 항목을 확인할 수 있도록 화면별 데이터 연결 기준을 포함하였다.

### 4. 연결된 형상관리

```bash
git add docs/harness/SCREEN_STRUCTURE.md CHANGELOG.md

git commit -m "[DOCS-15] SmartPark 화면 구조 문서 추가"

git tag -a v0.3.2 -m "SmartPark 화면 구조 문서 추가"

git push origin main --tags
```

---

## PL-05. PROJECT_RULES.md 작성

| 항목        | 내용                                               |
| ----------- | -------------------------------------------------- |
| 작업일      | 2026-05-17                                         |
| 사용 도구   | ChatGPT                                            |
| 작업 유형   | 문서 작성                                          |
| 관련 파일   | `docs/harness/PROJECT_RULES.md`                    |
| 관련 버전   | `v0.3.3`                                           |
| 관련 commit | `[DOCS-16] SmartPark 프로젝트 작업 규칙 문서 추가` |

### 1. 입력 프롬프트

```text
PROJECT_RULES.md를 작성하고 v0.3.3 태그 작성
```

### 2. 생성 결과

- 생성된 파일:
  - `docs/harness/PROJECT_RULES.md`
- 주요 결과:
  - SmartPark 프로젝트의 코드 작성 규칙, 폴더 관리 규칙, 문서 작성 규칙을 정리하였다.
  - React Native 프론트엔드와 Spring Boot 백엔드의 기본 파일 구조 및 네이밍 규칙을 정의하였다.
  - 주차장 상태, 주차 세션 상태, 결제 상태, 승인 상태, 신고 상태의 상태값 관리 기준을 정리하였다.
  - Git commit 메시지, tag 생성, CHANGELOG 작성 규칙을 정리하였다.
  - Claude Code와 Codex 작업 시 따라야 할 AI 도구 작업 규칙 및 프롬프트 작성 기준을 포함하였다.
  - 문서, 프론트엔드, 백엔드 검토 체크리스트와 금지 사항을 정리하였다.

### 3. 수정 및 검토 사항

- 프로젝트 규칙 문서는 코드와 문서 모두에 적용되는 공통 기준으로 작성하였다.
- 이후 `CLAUDE.md`, `CODEX.md`가 이 문서를 기준으로 세부 작업 지침을 확장하도록 구성하였다.

### 4. 연결된 형상관리

```bash
git add docs/harness/PROJECT_RULES.md CHANGELOG.md

git commit -m "[DOCS-16] SmartPark 프로젝트 작업 규칙 문서 추가"

git tag -a v0.3.3 -m "SmartPark 프로젝트 작업 규칙 문서 추가"

git push origin main --tags
```

---

## PL-06. CLAUDE.md 작성

| 항목        | 내용                                              |
| ----------- | ------------------------------------------------- |
| 작업일      | 2026-05-17                                        |
| 사용 도구   | ChatGPT                                           |
| 작업 유형   | 문서 작성                                         |
| 관련 파일   | `docs/harness/CLAUDE.md`                          |
| 관련 버전   | `v0.3.4`                                          |
| 관련 commit | `[DOCS-17] Claude Code 프론트엔드 작업 지침 추가` |

### 1. 입력 프롬프트

```text
CLAUDE.md를 작성하고 v0.3.4 태그
```

### 2. 생성 결과

- 생성된 파일:
  - `docs/harness/CLAUDE.md`
- 주요 결과:
  - Claude Code가 SmartPark React Native 프론트엔드 구현 시 참고할 작업 지침을 정리하였다.
  - Claude Code의 역할, 작업 범위, 금지 사항, 기본 작업 흐름을 정의하였다.
  - 프론트엔드 폴더 구조, 화면 구현 규칙, 컴포넌트 구현 규칙, 네이밍 규칙을 정리하였다.
  - HomeMapScreen, DestinationSearchScreen, RecommendedParkingScreen, ParkingDetailScreen, ActiveParkingSessionScreen, PaymentScreen, ProviderHomeScreen 등 주요 화면별 구현 기준을 작성하였다.
  - API 연동, mock 데이터, 상태값, 네비게이션, Prompt 작성 기준을 정리하였다.
  - Claude Code 작업 결과 보고 형식과 검증 기준을 정리하였다.

### 3. 수정 및 검토 사항

- Claude Code가 화면 구현 중심의 역할을 수행하도록 프론트엔드 중심으로 작성하였다.
- 백엔드 작업과 충돌하지 않도록 백엔드 도메인 구조 변경은 금지 사항에 포함하였다.

### 4. 연결된 형상관리

```bash
git add docs/harness/CLAUDE.md CHANGELOG.md

git commit -m "[DOCS-17] Claude Code 프론트엔드 작업 지침 추가"

git tag -a v0.3.4 -m "Claude Code 프론트엔드 작업 지침 추가"

git push origin main --tags
```

---

## PL-07. CODEX.md 작성

| 항목        | 내용                                    |
| ----------- | --------------------------------------- |
| 작업일      | 2026-05-17                              |
| 사용 도구   | ChatGPT                                 |
| 작업 유형   | 문서 작성                               |
| 관련 파일   | `docs/harness/CODEX.md`                 |
| 관련 버전   | `v0.3.5`                                |
| 관련 commit | `[DOCS-18] Codex 백엔드 작업 지침 추가` |

### 1. 입력 프롬프트

```text
CODEX.md를 작성하고 v0.3.5 태그
```

### 2. 생성 결과

- 생성된 파일:
  - `docs/harness/CODEX.md`
- 주요 결과:
  - Codex가 SmartPark Spring Boot 백엔드 설계 및 문서화 작업 시 참고할 작업 지침을 정리하였다.
  - Codex의 역할, 작업 범위, 금지 사항, 기본 작업 흐름을 정의하였다.
  - 백엔드 폴더 구조, 도메인 설계 기준, Entity/DTO/API 작성 규칙을 정리하였다.
  - User, Provider, ParkingLot, ParkingSpace, ParkingSession, Payment, Settlement, Report, CongestionPrediction, NfcTag 등 핵심 도메인 기준을 작성하였다.
  - 주차장 조회, 목적지 기반 검색, 공급자 등록, 관리자 승인, NFC 이용 시작/종료, 결제 및 정산, 신고 처리, 혼잡도 분석 로직 기준을 정리하였다.
  - 공통 응답, 예외 처리, 외부 API 연동, 데이터베이스 설계, 보안/권한, 테스트 작성 기준을 정리하였다.
  - Codex Prompt 작성 기준과 작업 결과 보고 형식을 정리하였다.

### 3. 수정 및 검토 사항

- Codex가 백엔드와 문서화를 담당하도록 Spring Boot, MySQL, API, 테스트 중심으로 작성하였다.
- Claude Code와 역할이 겹치지 않도록 프론트엔드 화면 구현은 직접 수정하지 않는 기준을 포함하였다.

### 4. 연결된 형상관리

```bash
git add docs/harness/CODEX.md CHANGELOG.md

git commit -m "[DOCS-18] Codex 백엔드 작업 지침 추가"

git tag -a v0.3.5 -m "Codex 백엔드 작업 지침 추가"

git push origin main --tags
```

---

## PL-08. PROMPT_LOG.md 작성

| 항목        | 내용                                        |
| ----------- | ------------------------------------------- |
| 작업일      | 2026-05-17                                  |
| 사용 도구   | ChatGPT                                     |
| 작업 유형   | 문서 작성                                   |
| 관련 파일   | `docs/harness/PROMPT_LOG.md`                |
| 관련 버전   | `v0.3.6`                                    |
| 관련 commit | `[DOCS-19] AI 작업 프롬프트 기록 문서 추가` |

### 1. 입력 프롬프트

```text
PROMPT_LOG.md를 작성하고 v0.3.6 태그
```

### 2. 생성 결과

- 생성된 파일:
  - `docs/harness/PROMPT_LOG.md`
- 주요 결과:
  - AI 도구에 입력한 프롬프트와 생성 결과, 수정 사항을 기록하는 기준 문서를 작성하였다.
  - 프롬프트 기록 대상, 제외 가능 항목, 기록 방식, 기록 템플릿을 정의하였다.
  - `PRD.md`부터 `CODEX.md`까지 하네스 문서 작성 과정의 주요 프롬프트 기록을 정리하였다.
  - 향후 Claude Code와 Codex 작업 시 사용할 수 있는 프롬프트 예시와 검토 기준을 포함하였다.
  - 형상관리와 연결할 수 있도록 commit, tag, CHANGELOG 반영 기준을 포함하였다.

### 3. 수정 및 검토 사항

- 단순 대화 기록이 아니라 프로젝트 산출물과 연결되는 작업 로그 형태로 구성하였다.
- 실제 코드 구현 단계에서도 계속 확장할 수 있도록 템플릿과 추후 기록 영역을 포함하였다.

### 4. 연결된 형상관리

```bash
git add docs/harness/PROMPT_LOG.md CHANGELOG.md

git commit -m "[DOCS-19] AI 작업 프롬프트 기록 문서 추가"

git tag -a v0.3.6 -m "AI 작업 프롬프트 기록 문서 추가"

git push origin main --tags
```

---

## PL-09. 구현 방향 수립 및 문서 보강

| 항목        | 내용 |
| ----------- | ---- |
| 작업일      | 2026-05-18 |
| 사용 도구   | ChatGPT |
| 작업 유형   | 문서 수정 / 구현 방향 정리 |
| 관련 파일   | `FOLDER_STRUCTURE.md`, `PROJECT_RULES.md`, `FEATURE_SPEC.md`, `SCREEN_STRUCTURE.md`, `CLAUDE.md`, `CODEX.md`, `PRD.md`, `README.md`, `CHANGELOG.md`, `configuration_management_plan.md`, `SERVICE_SCENARIO.md` |
| 관련 버전   | v0.4.0 후보 |

### 1. 입력 프롬프트

```text
이제 본격적으로 프론트엔드, 백엔드, ai 혼잡도 분석 구현을 진행하자. 일단 어떻게 진행할지 방향을 제시해줘.
프론트엔드: ReactNative 사용, 안드로이드 실기기를 usb로 연결해서 진행 예정, claude 바이브 코딩, NaverMaps 스타일로 화면 구성 예정
백엔드: NaverMaps API, Tmap API, Mysql, AWS 배포, SpringBoot, Swagger 사용, codex 바이브 코딩
AI 주차장 혼잡도 예측: 약 5년 치의 주차장 MockUp Data를 CSV/Excel 파일로 생성하고, 이를 분석하는 AI 프로그램을 생성하여 혼잡도를 예측
```

### 2. 생성 결과

- 프론트엔드, 백엔드, AI 분석 모듈을 병렬로 준비하되 1차 MVP 흐름을 먼저 고정하는 방향을 정리하였다.
- 1차 MVP를 `HomeMapScreen`, `ParkingBottomSheet`, `DestinationSearchScreen`, `ParkingDetailScreen`, `ParkingFilterModal` 중심으로 제한하였다.
- `src/ai` 폴더와 Python 기반 데이터 생성, 전처리, 학습, 예측 스크립트 구조를 추가하였다.
- AI 예측 결과는 초기에는 CSV/Excel 파일로 생성하고, MySQL에 적재하여 Spring Boot API가 조회하는 방식으로 정리하였다.

### 3. 수정 및 검토 사항

- `src/frontend`, `src/backend` 중심이던 문서 구조에 `src/ai`를 추가하였다.
- `FEATURE_SPEC.md`의 F-09를 Mock 데이터 생성, 혼잡도 예측, 백엔드 연동 기준까지 보강하였다.
- `CLAUDE.md`에는 Android 실기기 USB 검증과 NaverMaps 스타일 UI 구현 기준을 추가하였다.
- `CODEX.md`에는 Swagger, AWS 배포 설정, Tmap API, AI 결과 MySQL 적재 기준을 추가하였다.

### 4. 연결된 형상관리

```bash
git add FOLDER_STRUCTURE.md configuration_management_plan.md README.md CHANGELOG.md   docs/harness/PRD.md docs/harness/FEATURE_SPEC.md docs/harness/SCREEN_STRUCTURE.md   docs/harness/PROJECT_RULES.md docs/harness/CLAUDE.md docs/harness/CODEX.md   docs/harness/PROMPT_LOG.md docs/product/SERVICE_SCENARIO.md

git commit -m "[DOCS-22] SmartPark 구현 준비 문서 보강"

git tag -a v0.4.0 -m "SmartPark 구현 준비 문서 보강"
```

---

## 6. Claude Code 작업 프롬프트 예시

### 6.1 화면 구현 프롬프트 예시

```text
목표:
- SmartPark의 HomeMapScreen 기본 UI를 구현한다.

참고 문서:
- docs/harness/PRD.md
- docs/harness/FEATURE_SPEC.md
- docs/harness/SCREEN_STRUCTURE.md
- docs/harness/PROJECT_RULES.md
- docs/harness/CLAUDE.md

작업 범위:
- src/frontend/src/screens/home/HomeMapScreen.tsx 생성
- src/frontend/src/components/parking/ParkingCard.tsx 생성
- src/frontend/src/components/parking/ParkingStatusBadge.tsx 생성
- src/frontend/src/data/parkingMock.ts 생성

구현 기준:
- 현재 위치 기반 주변 주차장 목록을 mock 데이터로 표시한다.
- 지도 영역은 임시 View로 구성하되, 추후 Naver Map으로 교체 가능하게 작성한다.
- 주차장 카드에는 이름, 거리, 요금, 운영 시간, 상태, 혼잡도를 표시한다.
- 상태값은 AVAILABLE, SOON_AVAILABLE, FULL, INACTIVE를 사용한다.
- 로딩, 오류, 빈 상태 UI를 포함한다.

완료 조건:
- HomeMapScreen에서 mock 주차장 목록이 정상 표시된다.
- 주요 컴포넌트가 분리되어 있다.
- 변경 파일 목록과 실행 방법을 요약한다.
```

---

### 6.2 네비게이션 구현 프롬프트 예시

```text
목표:
- SmartPark React Native 앱의 기본 네비게이션 구조를 구현한다.

참고 문서:
- docs/harness/SCREEN_STRUCTURE.md
- docs/harness/CLAUDE.md
- docs/harness/PROJECT_RULES.md

작업 범위:
- src/frontend/src/navigation/RootNavigator.tsx
- src/frontend/src/navigation/MainTabNavigator.tsx
- src/frontend/src/navigation/HomeStackNavigator.tsx
- src/frontend/src/constants/routes.ts

구현 기준:
- RootNavigator, MainTabNavigator, HomeStackNavigator 구조를 분리한다.
- route 이름은 constants/routes.ts에서 관리한다.
- 화면 파일명과 route 이름은 SCREEN_STRUCTURE.md 기준을 따른다.
- 아직 구현되지 않은 화면은 임시 Placeholder Screen으로 연결한다.

완료 조건:
- 앱 실행 시 MainTabNavigator가 정상 표시된다.
- Home, Search, Parking, Provider, MyPage 탭이 구성된다.
- 변경 파일과 검증 방법을 요약한다.
```

---

## 7. Codex 작업 프롬프트 예시

### 7.1 주차장 조회 API 구현 프롬프트 예시

```text
목표:
- 현재 위치 기반 주변 주차장 조회 API를 구현한다.

참고 문서:
- docs/harness/PRD.md
- docs/harness/FEATURE_SPEC.md
- docs/harness/SCREEN_STRUCTURE.md
- docs/harness/PROJECT_RULES.md
- docs/harness/CODEX.md

작업 범위:
- src/backend/src/main/java/com/smartpark/domain/parking/
- src/backend/src/main/java/com/smartpark/controller/ParkingLotController.java
- src/backend/src/main/java/com/smartpark/service/ParkingLotService.java
- src/backend/src/main/java/com/smartpark/repository/ParkingLotRepository.java
- src/backend/src/main/java/com/smartpark/dto/response/ParkingLotResponse.java

구현 기준:
- GET /api/parking-lots/nearby endpoint를 작성한다.
- lat, lng, radius를 query parameter로 받는다.
- 승인된 주차장만 조회한다.
- 응답에는 주차장명, 주소, 거리, 요금, 상태, 혼잡도를 포함한다.
- Entity를 직접 반환하지 말고 Response DTO를 사용한다.
- 데이터가 없으면 빈 배열을 반환한다.

완료 조건:
- Controller, Service, Repository, DTO가 분리되어 있다.
- 기본 단위 테스트 또는 테스트 가능 구조가 포함되어 있다.
- 변경 파일과 검증 방법을 요약한다.
```

---

### 7.2 NFC 이용 시작/종료 API 구현 프롬프트 예시

```text
목표:
- NFC 기반 주차 이용 시작 및 종료 API를 구현한다.

참고 문서:
- docs/harness/FEATURE_SPEC.md
- docs/harness/CODEX.md
- docs/product/SERVICE_SCENARIO.md

작업 범위:
- domain/session/
- domain/parking/
- domain/payment/
- controller/ParkingSessionController.java
- service/ParkingSessionService.java
- dto/request/ParkingSessionStartRequest.java
- dto/request/ParkingSessionEndRequest.java
- dto/response/ParkingSessionResponse.java

구현 기준:
- POST /api/parking-sessions/start API를 작성한다.
- POST /api/parking-sessions/end API를 작성한다.
- nfcTagId를 기준으로 ParkingSpace를 조회한다.
- 승인되지 않았거나 운영 중지 상태인 주차 공간은 이용 시작을 막는다.
- 이미 이용 중인 공간은 중복 시작을 허용하지 않는다.
- 종료 시 이용 시간을 계산하고 결제 대기 상태로 변경한다.
- 모든 상태값은 enum으로 관리한다.

완료 조건:
- 이용 시작, 이용 종료, 예외 상황이 Service에 분리되어 있다.
- 중복 시작, 미등록 NFC 태그, 권한 오류가 처리된다.
- 테스트 가능 구조와 검증 방법을 요약한다.
```

---

## 8. 문서 수정 프롬프트 예시

### 8.1 README 갱신 프롬프트 예시

```text
목표:
- SmartPark README.md에 현재 작성된 하네스 문서 현황을 반영한다.

참고 문서:
- FOLDER_STRUCTURE.md
- CHANGELOG.md
- docs/harness/PRD.md
- docs/harness/FEATURE_SPEC.md
- docs/harness/SCREEN_STRUCTURE.md
- docs/harness/PROJECT_RULES.md
- docs/harness/CLAUDE.md
- docs/harness/CODEX.md
- docs/harness/PROMPT_LOG.md

작업 범위:
- README.md만 수정한다.

수정 기준:
- 추가 프로젝트 산출물 표에서 하네스 문서 상태를 완료로 변경한다.
- PRD, FEATURE_SPEC, SCREEN_STRUCTURE, PROJECT_RULES, CLAUDE, CODEX, PROMPT_LOG의 역할을 간단히 요약한다.
- 기존 문서 구조와 문체는 유지한다.

완료 조건:
- README에서 docs/harness 문서 현황을 한눈에 확인할 수 있다.
- 변경 내용과 commit/tag 명령어를 함께 제시한다.
```

---

### 8.2 CHANGELOG 갱신 프롬프트 예시

```text
목표:
- CHANGELOG.md에 v0.3.6 변경 이력을 추가한다.

작업 범위:
- CHANGELOG.md만 수정한다.

수정 기준:
- v0.3.6 항목을 추가한다.
- docs/harness/PROMPT_LOG.md 추가 내용을 정리한다.
- AI 작업 프롬프트 기록, 생성 결과, 수정 사항, 형상관리 연결 기준을 포함한다.
- 기존 CHANGELOG 형식과 문체를 유지한다.

완료 조건:
- v0.3.6 항목이 기존 버전 흐름과 자연스럽게 이어진다.
- commit/tag 명령어를 함께 제시한다.
```

---

## 9. 오류 수정 프롬프트 기록 양식

오류 해결 작업은 다음 양식으로 기록한다.

````md
## PL-ERROR-번호. 오류 제목

| 항목      | 내용                          |
| --------- | ----------------------------- |
| 작업일    | YYYY-MM-DD                    |
| 사용 도구 | Claude Code / Codex / ChatGPT |
| 작업 유형 | 오류 수정                     |
| 관련 파일 | `파일 경로`                   |
| 관련 버전 | `v0.x.x`                      |

### 1. 오류 상황

```text
오류 메시지 또는 문제 상황
```
````

### 2. 입력 프롬프트

```text
AI 도구에 입력한 오류 해결 요청
```

### 3. 원인 분석

- 원인 1
- 원인 2

### 4. 수정 결과

- 수정 파일:
  - `파일 경로`
- 수정 내용:
  - 내용 1
  - 내용 2

### 5. 재발 방지 기준

- 기준 1
- 기준 2

````

---

## 10. 프롬프트 품질 점검 기준

### 10.1 좋은 프롬프트 기준

| 기준 | 설명 |
| --- | --- |
| 목표가 명확하다 | 어떤 문서 또는 기능을 만들지 분명하다. |
| 참고 문서가 포함되어 있다 | PRD, FEATURE_SPEC, SCREEN_STRUCTURE 등 기준 문서를 명시한다. |
| 작업 범위가 제한되어 있다 | 생성/수정할 파일을 구체적으로 지정한다. |
| 금지 사항이 포함되어 있다 | 수정하지 말아야 할 파일이나 구조를 명확히 한다. |
| 완료 조건이 있다 | 어떤 상태가 되면 작업 완료인지 확인할 수 있다. |
| 검증 방법을 요구한다 | 실행 명령, 테스트 방법, 확인 화면을 요청한다. |

---

### 10.2 피해야 할 프롬프트

| 나쁜 프롬프트 | 문제점 |
| --- | --- |
| `앱 전체 만들어줘` | 범위가 너무 넓어 구조가 무너질 수 있다. |
| `백엔드 전부 구현해줘` | 도메인, API, 테스트가 한 번에 섞여 품질 점검이 어렵다. |
| `대충 보기 좋게 해줘` | UI 기준이 모호하여 결과가 일관되지 않다. |
| `알아서 수정해줘` | 변경 범위가 불명확하여 기존 구조를 훼손할 수 있다. |
| `오류 고쳐줘` | 오류 메시지와 실행 환경이 없어 원인 분석이 어렵다. |

---

### 10.3 권장 프롬프트 구조

```text
목표:
- 무엇을 할 것인지 작성

참고 문서:
- 어떤 문서를 기준으로 삼을지 작성

작업 범위:
- 생성/수정할 파일 작성
- 변경하지 말아야 할 파일 작성

구현 기준:
- 코드, 문서, UI, API 기준 작성

완료 조건:
- 작업 완료 판단 기준 작성

검증 방법:
- 실행 명령 또는 테스트 방법 요청
````

---

## 11. 형상관리 연결 기준

프롬프트 기록은 commit, tag, CHANGELOG와 연결되어야 한다.

### 11.1 commit 연결

| 작업 유형       | commit 메시지 예시                          |
| --------------- | ------------------------------------------- |
| 문서 작성       | `[DOCS-19] AI 작업 프롬프트 기록 문서 추가` |
| 프론트엔드 기능 | `[FEAT-01] 메인 지도 화면 기본 구조 추가`   |
| 백엔드 기능     | `[FEAT-02] 주변 주차장 조회 API 추가`       |
| 오류 수정       | `[FIX-01] 주차장 조회 응답 오류 수정`       |
| 테스트 추가     | `[TEST-01] 주차 세션 서비스 테스트 추가`    |
| 리팩토링        | `[REFACTOR-01] 주차장 도메인 구조 정리`     |

---

### 11.2 tag 연결

| 버전     | 작업                       |
| -------- | -------------------------- |
| `v0.3.0` | `PRD.md` 작성              |
| `v0.3.1` | `FEATURE_SPEC.md` 작성     |
| `v0.3.2` | `SCREEN_STRUCTURE.md` 작성 |
| `v0.3.3` | `PROJECT_RULES.md` 작성    |
| `v0.3.4` | `CLAUDE.md` 작성           |
| `v0.3.5` | `CODEX.md` 작성            |
| `v0.3.6` | `PROMPT_LOG.md` 작성       |

---

### 11.3 CHANGELOG 연결

`PROMPT_LOG.md`가 추가되면 `CHANGELOG.md`에는 다음 내용을 반영한다.

```md
## v0.3.6

- `docs/harness/PROMPT_LOG.md` 추가
- SmartPark 프로젝트에서 AI 도구에 입력한 프롬프트와 생성 결과, 수정 사항을 기록하기 위한 문서 작성
- 프롬프트 기록 대상, 제외 가능 항목, 기록 방식, 기록 템플릿 정리
- PRD, FEATURE_SPEC, SCREEN_STRUCTURE, PROJECT_RULES, CLAUDE, CODEX 문서 작성 과정의 주요 프롬프트 기록 정리
- Claude Code와 Codex 작업 프롬프트 예시, 문서 수정 프롬프트 예시, 오류 수정 기록 양식 작성
- AI 기반 작업 결과를 commit, tag, CHANGELOG와 연결하기 위한 형상관리 기준 정리
```

---

## 12. 향후 프롬프트 기록 예정 항목

향후 개발 단계에서는 다음 항목을 추가로 기록한다.

| 예정 항목 | 설명                                                 |
| --------- | ---------------------------------------------------- |
| FE-PL-01  | React Native 프로젝트 초기 구조 생성 프롬프트        |
| FE-PL-02  | HomeMapScreen 구현 프롬프트                          |
| FE-PL-03  | ParkingDetailScreen 구현 프롬프트                    |
| FE-PL-04  | NFC 이용 시작/종료 화면 구현 프롬프트                |
| BE-PL-01  | Spring Boot 프로젝트 초기 구조 생성 프롬프트         |
| BE-PL-02  | ParkingLot 도메인 및 조회 API 구현 프롬프트          |
| BE-PL-03  | ParkingSession 도메인 및 NFC 이용 흐름 구현 프롬프트 |
| BE-PL-04  | Payment 및 Settlement 도메인 구현 프롬프트           |
| BE-PL-05  | 관리자 승인 및 신고 관리 API 구현 프롬프트           |
| DOC-PL-01 | README 하네스 문서 현황 갱신 프롬프트                |
| DOC-PL-02 | 요구사항 정의서 작성 프롬프트                        |
| DOC-PL-03 | 요구사항 분석서 작성 프롬프트                        |
| DOC-PL-04 | 소프트웨어 설계서 작성 프롬프트                      |

---

## 13. 정리

본 문서는 SmartPark 프로젝트에서 AI 도구를 활용한 작업 과정을 기록하기 위한 기준 문서이다.

SmartPark는 Claude Code, Codex, ChatGPT 등 AI 도구를 활용하여 문서화, 프론트엔드 구현, 백엔드 설계, 오류 수정, 형상관리 작업을 수행한다. 이 과정에서 입력한 프롬프트와 생성 결과, 수정 사항을 기록하면 프로젝트 산출물의 작성 근거와 변경 이력을 더 명확하게 관리할 수 있다.

`PROMPT_LOG.md`는 단순한 대화 기록이 아니라, AI 기반 개발 과정을 소프트웨어공학적으로 관리하기 위한 작업 이력 문서이다. 따라서 향후 새로운 문서나 코드가 생성될 때마다 주요 프롬프트와 결과를 이 문서에 지속적으로 추가해야 한다.
