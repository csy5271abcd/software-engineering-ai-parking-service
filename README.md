# software-engineering-ai-parking-service

AI 기반 주차난 해결 서비스를 기획하고, 소프트웨어공학 산출물과 프로젝트 보조 산출물을 함께 관리하는 저장소입니다.

---

# 🚗 SmartPark: AI 기반 주차난 해결 서비스

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

| 기능                          | 설명                                                                         |
| ----------------------------- | ---------------------------------------------------------------------------- |
| 현재 위치 기반 주차 공간 조회 | 사용자의 현재 위치 또는 목적지를 기준으로 주변 주차장을 지도와 목록으로 조회 |
| 곧 비워질 주차 공간 안내      | 출차 예정 시간이 등록된 주차 공간을 “곧 비워질 자리”로 표시                  |
| 개인 주차장 등록 및 공유      | 개인 또는 건물 관리자가 유휴 주차 공간을 등록하고 공유                       |
| NFC 기반 간편 결제            | NFC 태그를 활용해 주차 이용 시작, 종료, 결제 흐름을 간편화                   |
| AI 기반 혼잡도 분석           | 시간대, 지역, 과거 이용 데이터를 기반으로 주차장 혼잡도를 예측하고 추천      |

---

## 3. 목표 사용자

| 사용자 유형   | 설명                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| 일반 운전자   | 도심, 대학가, 병원, 상가, 행사장 주변에서 주차 공간을 빠르게 찾고 싶은 사용자 |
| 주차장 공급자 | 개인 주차장, 건물 주차장 등 유휴 주차 공간을 공유하고 싶은 소유자             |
| 관리자        | 주차장 정보, 사용자 신고, 결제 내역, 서비스 운영 상태를 관리하는 사용자       |

---

## 4. 차별성

SmartPark는 기존 주차 서비스와 비교했을 때 다음과 같은 차별성을 가진다.

| 기존 주차 서비스         | SmartPark                                        |
| ------------------------ | ------------------------------------------------ |
| 주차장 위치 안내 중심    | 현재 빈자리와 곧 비워질 자리까지 함께 안내       |
| 공영/민영 주차장 중심    | 개인 소유 주차 공간까지 등록 및 공유 가능        |
| 단순 거리 기반 탐색      | AI 혼잡도 분석을 통한 주차 성공 가능성 중심 추천 |
| 일반 결제 또는 현장 결제 | NFC 기반 간편 이용 시작 및 종료 흐름 지원        |
| 이용자 중심 서비스       | 이용자와 공급자를 연결하는 공유형 플랫폼 구조    |

---

## 5. 기대 효과

- 운전자의 주차 탐색 시간 단축
- 도심 지역의 불법 주차 및 교통 혼잡 완화
- 유휴 주차 공간의 효율적 활용
- 개인 및 민간 주차 공간 공급자의 추가 수익 창출
- 위치 기반 스마트 교통 서비스로의 확장 가능성 확보

---

## 6. 기술 스택

| 구분                   | 기술                                                  |
| ---------------------- | ----------------------------------------------------- |
| Frontend               | React Native                                          |
| Backend                | Spring Boot, Swagger/OpenAPI                          |
| Database               | MySQL                                                 |
| Map API                | Naver Maps API, Tmap API                              |
| AI/Analysis            | Python, CSV/Excel Mock Data, 규칙 기반/ML 혼잡도 분석 |
| Deployment             | AWS 배포 예정                                         |
| Version Control        | Git, GitHub                                           |
| AI Development Support | Claude Code, Codex                                    |

---

## 7. 저장소 구조

```text
software-engineering-ai-parking-service/
├── README.md
├── CHANGELOG.md
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
- [변경 이력](./CHANGELOG.md)

---

## 8. 산출물 구성

| 구분           | 위치                 | 설명                                                                       |
| -------------- | -------------------- | -------------------------------------------------------------------------- |
| 요구사항 문서  | `docs/requirements/` | 프로젝트 정의서, 요구사항 정의서, 요구사항 분석서                          |
| 계획 문서      | `docs/plan/`         | 프로젝트 관리 계획서, 형상관리 관련 문서                                   |
| 설계 문서      | `docs/design/`       | 소프트웨어 설계서, 화면 흐름, 디자인 시스템                                |
| 제품 기획 문서 | `docs/product/`      | 페르소나, 사용자 여정, 경쟁 서비스 분석, 비즈니스 모델                     |
| 하네스 문서    | `docs/harness/`      | PRD, 기능 명세, Claude/Codex 작업 지침, 프롬프트 기록                      |
| 테스트 문서    | `docs/test/`         | 인스팩션 예제, 테스트 결과서, 결함 기록                                    |
| 소스코드       | `src/`               | React Native 프론트엔드, Spring Boot 백엔드, Python AI 분석 모듈 구현 코드 |

---

## 9. 소프트웨어공학 과제 산출물

| 과제  | 산출물             | 저장 위치            | 상태 |
| ----- | ------------------ | -------------------- | ---- |
| 과제1 | 프로젝트정의서     | `docs/requirements/` | 완료 |
| 과제2 | 프로젝트관리계획서 | `docs/plan/`         | 완료 |
| 과제3 | 요구사항정의서     | `docs/requirements/` | 완료 |
| 과제4 | 요구사항분석서     | `docs/requirements/` | 완료 |
| 과제5 | 소프트웨어설계서   | `docs/design/`       | 예정 |
| 과제6 | 인스팩션예제       | `docs/test/`         | 예정 |
| 과제7 | 테스트결과서       | `docs/test/`         | 예정 |

---

## 10. 추가 프로젝트 산출물

공식 과제 문서 외에도 SmartPark 프로젝트를 실제 서비스처럼 구체화하기 위해 다음과 같은 보조 산출물을 작성한다.

| 구분      | 문서                                                       | 목적                                                            | 상태 |
| --------- | ---------------------------------------------------------- | --------------------------------------------------------------- | ---- |
| 제품 기획 | `PERSONA.md`                                               | SmartPark의 주요 사용자 유형과 페르소나 정의                    | 완료 |
| 제품 기획 | `USER_JOURNEY.md`                                          | 사용자 유형별 서비스 이용 흐름과 문제 해결 과정 정리            | 완료 |
| 제품 기획 | `COMPETITOR_ANALYSIS.md`                                   | 기존 주차 서비스와 SmartPark의 차별성 비교 분석                 | 완료 |
| 제품 기획 | `SERVICE_SCENARIO.md`                                      | 실제 이용 상황 기반 서비스 시나리오 정리                        | 완료 |
| 제품 기획 | `BUSINESS_MODEL.md`                                        | 목표 시장, 수익 모델, 확장 가능성 정리                          | 완료 |
| 하네스    | `PRD.md`                                                   | SmartPark의 제품 요구사항, 제품 목표, MVP 범위 정리             | 완료 |
| 하네스    | `FEATURE_SPEC.md`                                          | 기능별 상세 동작, 입력값, 출력값, 예외 상황 정리                | 완료 |
| 하네스    | `SCREEN_STRUCTURE.md`                                      | React Native 앱의 화면 구조와 네비게이션 구성 정리              | 완료 |
| 하네스    | `PROJECT_RULES.md`                                         | 코드 작성 규칙, 폴더 규칙, 문서 작성 규칙, commit/tag 규칙 정리 | 완료 |
| 하네스    | `CLAUDE.md`                                                | Claude Code가 프론트엔드 구현 시 참고할 작업 지침 정리          | 완료 |
| 하네스    | `CODEX.md`                                                 | Codex가 백엔드 설계 및 문서화 작업 시 참고할 작업 지침 정리     | 완료 |
| 하네스    | `PROMPT_LOG.md`                                            | AI 도구에 입력한 프롬프트, 결과, 수정 사항 기록 기준 정리       | 완료 |
| 디자인    | `NAVER_MAP_STYLE_GUIDE.md`                                 | Naver Map Design System 기반 SmartPark UI 스타일 기준 정리      | 완료 |
| 디자인    | `SCREEN_FLOW.md`, `UI_DESIGN_GUIDE.md`, `DESIGN_SYSTEM.md` | 앱 화면 구조와 UI 기준 정의                                     | 예정 |

---

## 11. 형상관리 및 버전 규칙

본 프로젝트는 Git과 GitHub를 활용하여 산출물과 소스코드의 변경 이력을 관리한다.

| 항목          | 규칙                                |
| ------------- | ----------------------------------- |
| commit 메시지 | `[구분자-번호] 변경 내용` 형식 사용 |
| 문서 수정     | `[DOCS-번호]` 사용                  |
| 기능 추가     | `[FEAT-번호]` 사용                  |
| 오류 수정     | `[FIX-번호]` 사용                   |
| 변경 요청     | `[CR-번호]` 사용                    |
| 버전 형식     | `vMajor.Minor.Patch`                |
| 변경 이력     | `CHANGELOG.md`에 기록               |
| 기준선 관리   | 주요 단계마다 Git tag 생성          |

예시:

```bash
git add .
git commit -m "[DOCS-05] 폴더 구조 설명 문서 추가"
git tag -a v0.2.2 -m "폴더 구조 설명 문서 추가"
git push origin main --tags
```

---

## 12. 현재 진행 상태

현재 저장소에는 프로젝트 정의서, 프로젝트 관리 계획서, 요구사항 정의서, 요구사항 분석서, 형상관리 계획서, CHANGELOG, 폴더 구조 설명 문서가 포함되어 있다.

또한 `docs/product/` 폴더에는 SmartPark의 제품 기획을 구체화하기 위한 다음 문서 5종이 추가되었다.

- `PERSONA.md`
- `USER_JOURNEY.md`
- `COMPETITOR_ANALYSIS.md`
- `SERVICE_SCENARIO.md`
- `BUSINESS_MODEL.md`

이를 통해 SmartPark의 주요 사용자, 사용자 여정, 경쟁 서비스 대비 차별성, 실제 서비스 시나리오, 비즈니스 모델을 정리하였다.

`docs/harness/` 폴더에는 Claude Code, Codex 등 AI 개발 도구가 SmartPark 프로젝트를 일관성 있게 이해하고 작업할 수 있도록 다음 하네스 문서 7종이 추가되었다.

- `PRD.md`
- `FEATURE_SPEC.md`
- `SCREEN_STRUCTURE.md`
- `PROJECT_RULES.md`
- `CLAUDE.md`
- `CODEX.md`
- `PROMPT_LOG.md`

이를 통해 SmartPark의 제품 요구사항, 기능 명세, 화면 구조, 프로젝트 작업 규칙, Claude Code 프론트엔드 작업 기준, Codex 백엔드 작업 기준, AI 프롬프트 기록 기준을 정리하였다.

`docs/requirements/` 폴더에는 소프트웨어공학 과제 산출물인 요구사항 정의서와 요구사항 분석서가 추가되었다.

- `과제3.요구사항정의서.md`
- `과제3.요구사항정의서.pdf`
- `과제4.요구사항분석서.md`
- `과제4.요구사항분석서.pdf`

과제3 요구사항 정의서를 통해 SmartPark의 기능적 요구사항, 비기능적 요구사항, 외부 인터페이스 요구사항, 데이터 요구사항을 정리하였다.
과제4 요구사항 분석서를 통해 SmartPark의 소프트웨어 문맥, Use Case Description, 정적 분석, CRC 카드, 동적 분석, 인터페이스 분석, 제약사항, 요구사항 추적표를 구체화하였다.

현재까지 과제1 프로젝트정의서, 과제2 프로젝트관리계획서, 과제3 요구사항정의서, 과제4 요구사항분석서, 제품 기획 문서, 하네스 문서 작성이 완료되었으며, 이후 단계에서는 소프트웨어 설계서, 인스팩션 예제, 테스트 결과서를 순차적으로 작성한다.

`docs/design/` 폴더에는 SmartPark 프론트엔드 구현을 위한 UI 스타일 기준 문서가 추가되었다.

- `NAVER_MAP_STYLE_GUIDE.md`: Naver Map Design System 이미지를 분석하여 색상, 타이포그래피, 간격, 반지름, 레이아웃, 아이콘 토큰과 컴포넌트별 적용 기준 정리

이를 통해 SmartPark의 React Native 화면 및 컴포넌트 구현에 필요한 디자인 토큰, 컴포넌트 스펙, 화면별 적용 기준을 정리하였다. v1.0.0부터 프론트엔드 구현 단계를 시작한다.

`src/frontend/` 폴더에는 React Native TypeScript 프로젝트가 설정되었다.

- React Native 0.85.3 + TypeScript 기반 CLI 프로젝트
- `App.tsx`, `index.js`, `tsconfig.json`, `package.json`, `android/`, `ios/` 구조 포함
- `npm install` 완료 및 Android 실행을 위한 기본 프로젝트 구조 구성
- Android 실기기 실행 검증 중 발생한 CMake/NDK 링크 오류를 수정하였다.
- `android/app/src/main/jni/CMakeLists.txt`와 `android/app/build.gradle` 설정을 보완하여 `c++_shared` 링크 문제를 해결하였다.
- `npm run android` 실행 결과 Android 실기기에서 SmartPark 기본 앱 실행을 확인하였다.
- 이후 단계에서 Naver Map 스타일 UI, 지도 화면, 바텀시트, 주차장 카드, 네비게이션을 순차적으로 구현한다.

`src/frontend/src/` 하위 기본 폴더 구조가 설정되었다.

- `navigation`, `screens`, `components`, `services`, `hooks`, `types`, `mocks`, `theme`, `constants`, `utils`, `assets` 폴더 구성
- `screens` 하위: `common`, `auth`, `home`, `search`, `parking`, `provider`, `mypage`, `admin` 분리
- `components` 하위: `common`, `map`, `parking`, `bottomSheet`, `provider`, `admin` 분리
- 이후 디자인 토큰 구현, 네비게이션 구성, 지도 화면 구현 단계로 연결한다.

`src/frontend/src/theme/`과 `src/frontend/src/constants/`에 공통 디자인 토큰과 상수 파일이 구현되었다.

- `theme/colors.ts`: Naver Map 스타일 기준 색상 토큰 (Primary Green `#03AA5A`, Warm Gray, Red, semantic 색상)
- `theme/spacing.ts`: 2px 단위 간격 토큰 (2~22px, Layout margin alias 포함)
- `theme/radius.ts`: 모서리 반지름 토큰 (4~20px, bottomSheet/searchBar/card/pill alias 포함)
- `theme/typography.ts`: title/body/caption/label/numeric 타이포그래피 토큰
- `theme/shadow.ts`: small/medium/large shadow 토큰 (Android elevation + iOS shadow 대응)
- `theme/index.ts`: `theme` 객체로 통합 export
- `constants/routes.ts`: SCREEN_STRUCTURE.md 기준 전체 화면 route 이름 상수
- `constants/status.ts`: 주차장/혼잡도/결제/승인/세션 상태값 상수 및 TypeScript union type
- 이후 네비게이션 구성, 타입 정의, mock 데이터, 화면 구현에서 이 기준을 사용한다.

`src/frontend/src/types/`와 `src/frontend/src/mocks/`에 타입 정의와 화면 검증용 Mock 데이터가 구현되었다.

- `types/common.ts`: `Coordinates`, `AddressInfo`, `ApiResponse<T>` 공통 타입
- `types/parking.ts`: `ParkingLotSummary`(목록), `ParkingLotDetail`(상세), `ParkingFee`, `OperationHours` 등
- `types/user.ts`: `UserRole`, `User`, `ProviderProfile` 타입
- `types/payment.ts`: `ParkingSession`, `Payment`, `PaymentMethod` 타입
- `mocks/parkingLots.mock.ts`: 9개 가상 주차장 데이터 (AVAILABLE/FULL/SOON_AVAILABLE/OCCUPIED/INACTIVE 상태, LOW~VERY_HIGH/UNKNOWN 혼잡도 포함)
- 이후 서비스/훅 구조, 네비게이션, 화면 구현에서 이 데이터를 사용한다.

프론트엔드 소스코드 Git 추적 상태를 점검하였다.

- `src/frontend` 하위 React Native 프로젝트 파일이 부모 Git 저장소에서 정상 추적되는 것을 확인하였다.
- `git ls-files -s src/frontend` 명령을 통해 `App.tsx`, Android 설정 파일, `theme`, `constants`, `types`, `mocks` 파일이 일반 파일로 추적되는 것을 확인하였다.
- GitHub 원격 저장소의 `origin/main`에 최신 프론트엔드 소스코드가 반영된 상태를 확인하였다.
- 현재 최신 안정 기준선은 `v1.0.6`이다.

React Navigation 구조를 NaverMapClone 기준으로 전환하였다.

- `@react-navigation/native-stack` 및 `react-native-screens` C++ 빌드 오류로 인해 `@react-navigation/stack` 기반으로 전환하였다.
- NaverMapClone 구동 기준(`@react-navigation/native 7.1.14`, `@react-navigation/stack 7.4.2`, `react-native-gesture-handler 2.31.2`, `react-native-safe-area-context 5.5.1`, `react-native-screens 4.14.0`)으로 의존성을 재설정하였다.
- `RootNavigator`, `HomeStackNavigator`, `SearchStackNavigator`, `ParkingStackNavigator`, `ProviderStackNavigator`, `MyPageStackNavigator`에서 `createNativeStackNavigator` 임포트를 제거하고 `@react-navigation/stack`의 `createStackNavigator`로 전환하였다.
- `MainTabNavigator`는 `@react-navigation/bottom-tabs` 기반으로 유지하였다.
- Windows + NDK 27.1 + CMake 3.18.1 환경에서 발생하는 `c++_shared` 링킹 누락 문제를 각 네이티브 모듈 CMakeLists.txt에 `target_link_libraries(..., c++_shared)` 를 추가하여 해결하였다.
- `npm run android` 실행 결과 Android 실기기에서 하단 탭 5개가 정상 표시됨을 확인하였다.

`HomeMapScreen` 1차 UI를 SmartParkDesign 참고 디자인 기반으로 구현하였다.

- Naver Map 스타일 지도 placeholder (`MapPlaceholder.tsx`): View 레이어로 토지/수계/공원/건물/도로 표현
- 주차장 핀 마커 (`ParkingMarker.tsx`): ParkingStatus별 색상 원형 핀, 선택 시 이름 버블 표시
- 검색바 (`SearchBar.tsx`): 절대 배치 흰색 카드, 메뉴 아이콘/플레이스홀더/마이크 아이콘
- FAB 버튼 (`FloatingButton.tsx`): default(흰색)/primary(파란색) 변형 지원 재사용 컴포넌트
- 하단 요약 패널 (`HomeParkingSummary.tsx`): 추천순 상위 3곳 카드, 곧 비워짐 배너, 선택 미리보기
- `mockParkingLots` 좌표를 선형 투영으로 지도 퍼센트 위치 변환 적용
- `useSafeAreaInsets`로 노치/상태바 영역 처리, 하단 탭바와 겹치지 않는 레이아웃 구성

`HomeMapScreen` UI를 Claude Design 기준으로 개선하였다 (v1.0.9).

- `MainTabNavigator`: SmartParkTabBar 커스텀 탭바로 전환 — 탭 레이블(주변/저장/이용/공급자/MY), View 기반 아이콘 5종, 활성 탭 파란 테두리, 공급자 탭 빨간 뱃지
- `ParkingMarker`: CSS 삼각형 꼬리 방식으로 진짜 눈물방울 핀 형태 구현, SOON_AVAILABLE "곧" 뱃지 추가
- `HomeMapScreen`: CategoryChips(전체/이용가능/곧 비워짐/저렴/NFC/개인공유/공영/24시간) 추가, 카테고리별 필터링 적용, safe area 기준 레이아웃 정렬
- `HomeParkingSummary`: 기본 뷰를 QuickShortcuts(집/회사/병원) + 곧 비워짐 배너로 변경, 주차장 카드 목록 제거

`v1.0.8`에서는 Claude Design 결과물을 기준으로 Home 화면의 하단바, 카테고리 칩, 주차장 마커, 하단 요약 패널의 UI와 인터랙션을 개선하였다.

- 하단바를 주변, 저장, 이용, 공급자, MY 구조로 커스터마이징하였다.
- View/Text 기반 아이콘을 적용해 Claude Design과 유사한 하단 탭 UI를 구현하였다.
- HomeMapScreen에 카테고리 칩을 추가하여 주차장 상태와 조건별 필터링 흐름을 준비하였다.
- ParkingMarker는 teardrop 형태로 수정하고, 곧 비워짐 상태에는 별도 badge를 표시하였다.
- HomeParkingSummary는 QuickShortcuts와 곧 비워짐 banner 중심의 고정형 하단 패널로 정리하였다.
- 검색바, 카테고리 칩, FAB, 하단 패널, 하단 탭바가 서로 겹치지 않도록 배치를 보정하였다.

---

## 12.1 구현 진행 방향

현재 구현 단계는 프론트엔드, 백엔드, AI 혼잡도 분석 모듈을 다음 기준으로 진행한다.

| 영역       | 구현 방향                                             | 주요 도구                              |
| ---------- | ----------------------------------------------------- | -------------------------------------- |
| 프론트엔드 | NaverMaps 스타일의 지도 중심 React Native 앱 구현     | Claude Code, Android 실기기 USB 테스트 |
| 백엔드     | 주차장 조회, 목적지 검색, 혼잡도 조회 API 구현        | Spring Boot, MySQL, Swagger, Codex     |
| AI 분석    | 약 5년 치 가상 주차장 Mock 데이터 생성 및 혼잡도 예측 | Python, CSV/Excel, ML 모델             |

1차 MVP는 다음 흐름을 우선 구현한다.

```text
앱 실행
→ 현재 위치 기반 지도 표시
→ 주차장 마커 표시
→ 하단 바텀시트 목록 확인
→ 주차장 상세 확인
→ 혼잡도/추천 점수 확인
→ 경로 안내 버튼 제공
```

---

## 13. 프로젝트 목표

본 프로젝트의 최종 목표는 SmartPark 서비스를 대상으로 소프트웨어공학의 주요 활동인 **요구사항 정의, 분석, 설계, 구현, 테스트, 형상관리**를 실제 프로젝트 흐름에 맞게 수행하고 기록하는 것이다.

이를 통해 단순한 아이디어 문서가 아니라, 소프트웨어 개발 생명주기를 기반으로 체계적으로 관리되는 프로젝트 저장소를 구축한다.
