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

`HomeMapScreen` UI를 Claude Design 기준으로 개선하였다 (v1.0.9 Phase 1).

- `MainTabNavigator`: SmartParkTabBar 커스텀 탭바로 전환 — 탭 레이블(주변/저장/이용/공급자/MY), View 기반 아이콘 5종, 활성 탭 파란 테두리, 공급자 탭 빨간 뱃지
- `ParkingMarker`: CSS 삼각형 꼬리 방식으로 진짜 눈물방울 핀 형태 구현, SOON_AVAILABLE "곧" 뱃지 추가
- `HomeMapScreen`: CategoryChips(전체/이용가능/곧 비워짐/저렴/NFC/개인공유/공영/24시간) 추가, 카테고리별 필터링 적용, safe area 기준 레이아웃 정렬
- `HomeParkingSummary`: 기본 뷰를 QuickShortcuts(집/회사/병원) + 곧 비워짐 배너로 변경, 주차장 카드 목록 제거

`HomeMapScreen` 화면 컴포넌트를 분리하고 Claude Design 기준으로 디자인 정합성을 개선하였다 (v1.0.11).

- `CategoryChips`, `FABStack`, `CurrentLocationButton` 컴포넌트를 `src/components/home/` 하위로 분리
- `SectionHeader`, `QuickShortcuts`, `SelectedLotPreview`, `DefaultSheetContent` 컴포넌트를 `src/components/parking/` 하위로 분리
- 카테고리 칩: 필 형태(borderRadius 100), 비활성 테두리 `#CAD1DB`, 활성 배경 `#222225`
- zIndex 레이어 재정의: chips(29) < search(30) < FABStack(35) < locFab(36) < sheet(40)
- `ParkingMarker` SOON_AVAILABLE 상태 뱃지에 "N분" 또는 "곧" 표시 개선
- `ParkingBottomSheet` borderRadius 24 적용, SelectedLotPreview/DefaultSheetContent 분리

`ParkingDetailScreen` 기본 UI를 구현하고 HomeMapScreen에서 이동할 수 있도록 연결하였다 (이전 v1.1.0 준비 단계).

- `ParkingDetailHeader`: 뒤로가기·타이틀·즐겨찾기 헤더, safe area top 처리
- `ParkingInfoSection`: 운영시간·유형·출입방식·결제 안내 rows + 태그 chips
- `ParkingFeeSection`: 요금 테이블(기본/추가/시간당/일최대) + NFC 배너
- `ParkingActionBar`: 길찾기 + 이용 시작 CTA, safe area bottom 처리, 만차 시 대체 표시

`SearchDetail.jsx` 기준 검색·추천·상세·곧비워짐 화면을 구현하고 내비게이션을 연결하였다 (v1.1.0).

- `DestinationSearchScreen`: embedded search header, 실시간 검색/초기 상태 전환, 필터 모달, KeyboardAvoidingView
- `SearchInitialState`: 최근 검색 + 주차 수요 급증 지역 LIVE 순위
- `SearchLiveResults`: query 기반 실시간 필터링, Text 중첩 highlight
- `ArrivalTimeSelector`: 지금/15분 후/30분 후/1시간 후 pill 선택
- `SearchFilterModal`: 하단 슬라이드 Modal, 정렬·요금·유형·추가 옵션 필터
- `RecommendedParkingScreen`: 목적지 카드 + AI banner + 정렬 chip + ParkingCard 목록
- `ParkingDetailScreen`: Hero 맵 + floating 버튼 + 5탭(홈/요금·시간/혼잡도/주변/리뷰) + DetailActionBar CTA
- `DetailHomeTab`: 2×2 stat grid, 곧비워짐 banner, 사진 placeholder, 이용 안내
- `DetailPricingTab`: +/- 스테퍼, 예상 결제 금액, 요금 정책 리스트
- `DetailCongestionTab`: View 기반 bar chart(시간대별/요일별), AI 분석 banner
- `DetailAroundTab`: 주변 4곳 ParkingCard
- `DetailReviewsTab`: 평점 요약, 마스킹 사용자 리뷰 3개
- `SoonAvailableScreen`: 미니맵 + 안내 banner + SoonAvailableCard 목록
- `SoonAvailableCard`: View 기반 원형 progress ring, 대기 버튼
- Home BottomSheet 곧 비워짐 banner → SoonAvailableScreen 연결
- 미적용: Naver Map SDK, 실제 길찾기 API, 결제, NFC, GPS 권한

figma-make-design 이미지를 최우선 기준으로 곧 비워질 자리 화면, 마커 클릭 ParkingSummary, 주차장 상세 5탭 화면을 구현하였다 (v1.1.7). v1.2.0에서 SVG arc progress ring 적용, 화면별 시각 정합 보정, 카드 선택 시 BottomSheet half 자동 전환을 추가하였다.

- `SoonAvailableCard.tsx` — 카드 전체 Pressable로 변경 (기존: 대기 버튼만 탭 가능)
- `ParkingDetailScreen.tsx` — 파란 원형 핀 → `ParkingMarker` 컴포넌트(초록 teardrop) 교체, 우측 버튼 `heart` → `star` (저장 토글), marginTop 보정
- `DetailActionBar.tsx` — 커스텀 navArrow View → `AppIcon name="navigation"` 교체
- `StatBlock.tsx` — `iconNode?: React.ReactNode` prop 추가, 레이블 좌측 아이콘 표시
- `DetailHomeTab.tsx` — 사진 플레이스홀더 🅿 → AppIcon imagePlus, 배너 ⏱ → AppIcon clock, StatBlock 아이콘(circleDollarSign/clock/mapPin/circleParking) 연결
- `DetailPricingTab.tsx` — +/− stepper → View 기반 시각적 슬라이더 (track/fill/handle + 탭 위치 계산)
- `DetailCongestionTab.tsx` — 시간대 범위 6~22시 → 14~02시, x축 14시/18시/22시/02시 4개 레이블
- `DetailAroundTab.tsx` — 카드 수 4→5, detailLink 제거, paddingBottom 100
- `DetailReviewsTab.tsx` — 리뷰 외곽 카드 border 제거, 아바타 크기 개선, paddingBottom 100
- 모든 탭 ScrollView paddingBottom: 100 (DetailActionBar CTA 가림 방지)

figma-make-design 이미지를 최우선 기준으로 Home 화면을 전면 재보정하였다 (v1.1.6).

- `CategoryChips` — 이미지 기준 emoji 접두어(🚙/⚡/🪙) 및 이용가능 초록 dot indicator 추가, 칩 높이 조정
- `ParkingMarker` — PRIVATE 주차장 isShared prop 추가, 초록 teardrop + house 아이콘으로 표시
- `FABStack` — layers/star/navigation 아이콘으로 교체 (이미지 기준)
- `HomeMapScreen` — HomeWeatherBadge (cloud/20°/미세) 좌측 pill 추가, isShared 마커 전달
- `DefaultSheetContent` — mode별 섹션 분리: default(QuickShortcuts+SoonBanner), half(+2 카드), full(전체 카드)
- `SoonAvailableCard` — 원형 타이머 64px, "분후" 내 표시, 파란 oval "대기" 버튼
- `SoonAvailableScreen` — 헤더 개선, blue 계열 인포배너, 배경색 #F8F9FB
- `MainTabNavigator` — '추천' → '스마트패스', sparkles → cpu 아이콘
- `AppIcon` — cloud/layers/cpu/flag 4종 추가

SmartParkReDesign imports/ 폴더 분석 기반 아이콘 전면 교체 및 레이아웃을 재보정하였다 (v1.1.5).

- `AppIcon.tsx` — `chevronRight`, `plus`, `crosshair`, `shield`, `fileText` 5종 추가, `fill` prop 추가로 Star 활성 시 채워진 별 표시
- `MainTabNavigator` — 저장 탭(Star) 활성 시 `fill={color}` 적용, 탭 높이 `minHeight: 56` 고정
- `HomeMapScreen` — SearchBar `right: 68` (파란 FAB 공간 확보), 파란 네비게이션 FAB(`FloatingButton variant="primary"`) 추가, SearchBar·FAB 탭 시 SearchTab 이동
- `FABStack`, `CurrentLocationButton`, `SectionHeader` — 커스텀 View 아이콘 전부 → AppIcon 교체
- `SelectedLotPreview`, `ParkingCard` — 닫기/링크/썸네일 이모지/clock 아이콘 전부 AppIcon으로 교체
- `MyPageScreen` — 메뉴 항목 이모지(결제·차량/알림·설정/AI 투명성/고객 지원) 전부 AppIcon으로 교체, rotated chevron 제거 후 `chevronRight` 통일, 버전 SmartPark v1.1.5

SmartParkReDesign imports/ 폴더 참조 기반 디자인 토큰 보정 및 주요 화면을 재정렬하였다 (v1.1.4).

- `src/theme/tokens.ts` 보정 — brandOrange `#F5A623` → `#F5683C` (T.orange500), bgCool/bgCoolSecondary/bgCoolWeak/borderWeak/iconPrimary/iconTertiary/iconWeak/textPrimary~Quaternary 토큰 추가
- `MainTabNavigator` 비활성 탭 아이콘 색상 `#8B99AC` → `#4D5A6A` (T.iconTertiary), 레이블 `#8B99AC` → `#6B7C92` (T.textTertiary)
- `SearchBar` placeholder 색상 `#8B99AC` → `#222225`, fontWeight `'400'` → `'500'`, fontSize `14` → `15` (Chrome.jsx 기준)
- `DefaultSheetContent` soon banner 이모지 ⏱ → `AppIcon name="clock"` 교체
- `RecommendedParkingScreen` 백버튼 커스텀 View → `AppIcon name="chevronLeft"` 교체
- `MyPageScreen` 전면 재설계 — mock 로그인 상태(김민준), 파란 avatar, 통계 그리드(저장한 곳/이용 횟수/신뢰도), 4개 메뉴 섹션(결제·차량/알림·설정/AI 투명성/고객 지원), AppSeparator 구분선, 빨간 badge

SmartParkReDesign components/ui 48개를 분석하고 React Native 공통 컴포넌트 12종을 구축하며 주요 화면을 재보정하였다 (v1.1.3).

- `src/theme/tokens.ts` 추가 — Figma Make 디자인 토큰(muted #ECECF0, surfaceMuted #F3F3F5, destructive #D4183D, radius 6/8/10/14px 등) React Native 변환
- 공통 컴포넌트 12종 신규: AppButton(6 variant), AppCard, AppBadge(8 variant), AppChip, AppTextInput(focus border), AppTabs(line/pill), AppSeparator, AppProgress, AppSwitch(Animated), AppSectionHeader, AppSurface(6 variant), AppSheet
- ParkingDetailScreen 탭바 → AppTabs(line/scrollable), 버튼 → AppIcon 교체
- DestinationSearchScreen 검색창 → #F3F3F5 bg, AppIcon(search/slidersHorizontal)
- SoonAvailableCard 링 차트 → AppProgress + urgency 색상 시스템
- RecommendationScreen AppChip/AppBadge/AppSurface/AppCard/AppButton 통일
- MyPageScreen 기본 구조 구현 (프로필카드, 메뉴 섹션, AppIcon 아이콘)
- 모든 화면 paddingBottom: insets.bottom + 24 적용으로 하단 탭바 겹침 해소

SmartParkReDesign 기준으로 주요 화면 디자인을 폴리시하고 추천 탭을 신규 구현하였다 (v1.1.2).

- 하단 탭 구조 변경: 공급자 탭 제거 → 추천(RecommendTab, sparkles 아이콘) 탭 추가, 레이블 fontSize 10.5
- `src/screens/recommend/RecommendationScreen.tsx` 추가 — 상황별 chip(지금/출근/쇼핑/외식/병원), AI 배너, AI 추천 주차장 Top 3, 추천 이유 chip, 곧 비워질 자리, 목적지 찾기 CTA
- `SearchBar` pill 스타일로 개선: borderRadius 24, 좌측 파란 mapPin 아이콘, 그림자 강화
- `SectionHeader` fontSize 17 → 18, fontWeight '700' → '600'
- `CategoryChips` paddingVertical 7 → 8, borderColor/label 색상 정합

`lucide-react-native` 아이콘 기반을 구축하고 `AppIcon` 공통 컴포넌트를 추가하였다 (v1.1.1).

- `lucide-react-native@1.16.0` + `react-native-svg@15.15.5` 설치 — Figma Make 디자인과 동일한 lucide SVG 아이콘 세트, New Architecture 지원
- `src/components/common/AppIcon.tsx` 추가 — `name` / `size` / `color` / `strokeWidth` props, `AppIconName` 유니온 타입으로 27종 아이콘 매핑
- `src/navigation/MainTabNavigator.tsx` 수정 — 하단 탭 아이콘을 View/Text 커스텀 구현에서 AppIcon(mapPin/star/calendarDays/house/user)으로 교체, 활성 탭 strokeWidth 2.2 / 비활성 1.8

`ParkingBottomSheet`를 4단계 스와이프 방식으로 재구현하였다 (v1.0.10).

- BottomSheet 상태를 `hidden` / `default` / `half` / `full` 4단계로 재정의하였다.
- `SHEET_SNAP`: hidden=0, default=화면 30%, half=화면 50%, full=화면 100% 기준으로 스냅 포인트를 계산한다.
- 시트 전체 높이를 `SCREEN_H`로 고정 렌더링한 후 `Animated.Value(translateY)`로 위치를 제어하여 자연스러운 슬라이딩 효과를 구현하였다.
- `PanResponder`를 handle bar 영역에만 적용하여 내부 `ScrollView` 스크롤과 gesture 충돌을 방지하였다.
- 드래그 방향(dy)과 threshold(50px) 기반으로 단계를 결정하고, 저속 드래그 시 `nearestMode`로 자동 스냅한다.
- `Animated.spring`으로 단계 전환 시 부드러운 애니메이션을 적용하였다.
- `full` 모드에서만 내부 `ScrollView` 스크롤이 활성화되며, 다른 모드에서는 sheet drag가 우선한다.
- `hidden` 상태에서는 "주변 주차장 N곳 ▲" 재오픈 탭바가 화면 하단에 표시된다.
- 마커 탭 시 `hidden`이면 `default`로, 카테고리 칩 변경 시 `default`로 자동 복귀한다.

`ParkingBottomSheet`와 `ParkingCard` 컴포넌트를 추가하고 `HomeMapScreen`에 연결하였다 (v1.0.9 Phase 2).

- `ParkingStatusBadge` / `CongestionBadge`: 주차 상태와 혼잡도를 컬러 뱃지로 표시하는 공통 컴포넌트 추가
- `ParkingCard`: 썸네일(공영/개인공유), rank 뱃지, AI 추천 점수, 상태·혼잡도·태그 뱃지, 도보/거리/요금 메타, 출차 예정 배너를 포함한 주차장 카드 컴포넌트 추가
- `ParkingBottomSheet`: 3모드(collapsed/half/expanded) 전환 바텀시트 추가
  - collapsed: "주변 주차장 N곳 ▲" 힌트 표시
  - half/expanded: 마커 선택 시 상세 미리보기(stat/액션), 기본 시 QuickShortcuts + 곧 비워짐 배너 + 카드 목록
  - expanded 모드에서만 스크롤 활성화, 빈 상태(empty state) 처리 포함
- `HomeMapScreen`: `HomeParkingSummary`를 `ParkingBottomSheet`로 교체, 마커 탭 시 collapsed → half 자동 전환, locFab 위치 동적 계산
- `npx tsc --noEmit` 검증 통과, `npm run android` SM-S911N 실기기 설치 완료

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
