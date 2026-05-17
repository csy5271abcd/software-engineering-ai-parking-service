# SCREEN_STRUCTURE.md

# SmartPark 화면 구조 및 네비게이션 문서

## 1. 문서 개요

### 1.1 문서 목적

본 문서는 SmartPark React Native 모바일 앱의 화면 구조와 네비게이션 구성을 정의하기 위해 작성되었다.

SmartPark는 사용자의 현재 위치와 목적지를 기반으로 주변 주차 가능 공간을 탐색하고, 곧 비워질 주차 공간 정보, 개인 주차장 공유, NFC 기반 간편 결제, AI 기반 혼잡도 분석 기능을 제공하는 AI 기반 스마트 주차 플랫폼이다.

본 문서는 `PRD.md`와 `FEATURE_SPEC.md`에서 정의한 제품 요구사항과 기능 명세를 실제 화면 단위로 변환한 하네스 문서이다. Claude Code가 프론트엔드 화면을 구현할 때 화면 구조, 네비게이션 흐름, 화면별 역할, 주요 컴포넌트, 상태값, API 연결 기준을 일관성 있게 따르도록 하는 것을 목적으로 한다.

---

### 1.2 문서 활용 대상

| 활용 대상         | 활용 내용                                                   |
| ----------------- | ----------------------------------------------------------- |
| Claude Code       | React Native 화면 구현, 컴포넌트 구성, 네비게이션 구조 작성 |
| Codex             | 화면 요구사항과 연결되는 API 구조 및 DTO 설계 참고          |
| 요구사항 정의서   | 화면 단위 기능 요구사항 도출                                |
| 요구사항 분석서   | 사용자 흐름, Use Case, 예외 흐름 분석                       |
| 소프트웨어 설계서 | UI 구조, 화면 흐름, 프론트엔드 모듈 구조 설계               |
| 테스트 결과서     | 화면 이동 및 기능별 테스트 케이스 작성                      |

---

### 1.3 관련 문서

| 문서                  | 관계                                            |
| --------------------- | ----------------------------------------------- |
| `PRD.md`              | 제품 목표, MVP 범위, 주요 화면 요구사항 정의    |
| `FEATURE_SPEC.md`     | 기능별 입력값, 출력값, 예외 상황, API 후보 정의 |
| `PERSONA.md`          | 화면을 사용할 주요 사용자 유형 정의             |
| `USER_JOURNEY.md`     | 사용자 유형별 서비스 이용 흐름 정의             |
| `SERVICE_SCENARIO.md` | 실제 이용 상황 기반 화면 흐름 정의              |
| `PROJECT_RULES.md`    | 파일 구조, 코드 작성 규칙, 네이밍 규칙 정의     |
| `CLAUDE.md`           | Claude Code 프론트엔드 구현 지침                |
| `CODEX.md`            | Codex 백엔드/API 설계 지침                      |

---

## 2. 화면 설계 기본 원칙

### 2.1 모바일 앱 중심 구조

SmartPark의 핵심 사용자 경험은 모바일 앱에서 발생한다. 따라서 화면 구조는 React Native 기반 모바일 앱을 중심으로 설계한다.

| 원칙             | 설명                                                                                                 |
| ---------------- | ---------------------------------------------------------------------------------------------------- |
| 지도 중심 진입   | 앱 실행 후 사용자는 현재 위치 기반 주차장 지도를 먼저 확인한다.                                      |
| 탐색 흐름 단순화 | 주차장 검색, 비교, 선택, 경로 안내, 이용 시작까지의 흐름을 짧게 구성한다.                            |
| 상태 정보 명확화 | 주차 가능, 곧 비워짐, 혼잡, 만차, 이용 중, 결제 실패 등 상태를 명확히 표시한다.                      |
| 공급자 흐름 분리 | 일반 이용자 화면과 공급자 등록/관리 화면을 분리하여 혼란을 줄인다.                                   |
| 관리자 기능 분리 | 서비스 운영 관리자 기능은 모바일 앱의 핵심 흐름과 분리하여 관리자 웹 또는 별도 관리 화면으로 다룬다. |
| 예외 흐름 제공   | 위치 권한 거부, 검색 결과 없음, NFC 실패, 결제 실패 상황에 대한 대체 화면을 제공한다.                |

---

### 2.2 화면 분류 기준

| 구분        | 설명                                                               |
| ----------- | ------------------------------------------------------------------ |
| 공통 화면   | 로그인, 권한 안내, 알림, 마이페이지 등 전체 사용자가 사용하는 화면 |
| 이용자 화면 | 주차장 탐색, 검색, 상세, 경로, NFC 이용, 결제 화면                 |
| 공급자 화면 | 주차 공간 등록, 이용 가능 시간 설정, 요금 설정, 정산 확인 화면     |
| 관리자 화면 | 등록 승인, 신고, 결제 오류, 운영 통계 관리 화면                    |
| 예외 화면   | 오류, 빈 상태, 권한 거부, 결제 실패 등 대체 흐름 화면              |

---

## 3. 전체 네비게이션 구조

### 3.1 네비게이션 계층

```text
RootNavigator
├── AuthStack
├── OnboardingStack
├── MainTabNavigator
│   ├── HomeStack
│   ├── SearchStack
│   ├── ParkingStack
│   ├── ProviderStack
│   └── MyPageStack
├── ParkingSessionStack
├── PaymentStack
└── ModalStack
```

---

### 3.2 RootNavigator

| 항목      | 내용                                                                          |
| --------- | ----------------------------------------------------------------------------- |
| 역할      | 앱 전체 진입 상태를 관리하는 최상위 네비게이터                                |
| 분기 기준 | 로그인 여부, 권한 설정 여부, 이용 중 세션 여부                                |
| 포함 화면 | AuthStack, OnboardingStack, MainTabNavigator, ParkingSessionStack, ModalStack |

기본 분기 로직은 다음과 같다.

```text
앱 실행
→ 로그인 상태 확인
→ 위치 권한 확인
→ 이용 중인 주차 세션 확인
→ MainTabNavigator 또는 이용 중 화면으로 이동
```

---

### 3.3 MainTabNavigator

| 탭     | 화면 스택     | 역할                                      |
| ------ | ------------- | ----------------------------------------- |
| 홈     | HomeStack     | 현재 위치 기반 주차장 탐색                |
| 검색   | SearchStack   | 목적지 검색 및 추천 주차장 확인           |
| 이용   | ParkingStack  | 이용 중인 주차, 이용 내역, 결제 내역 확인 |
| 공급자 | ProviderStack | 주차 공간 등록 및 공급자 관리             |
| 마이   | MyPageStack   | 사용자 정보, 결제 수단, 알림, 설정 관리   |

---

### 3.4 ModalStack

| 모달 화면               | 설명                |
| ----------------------- | ------------------- |
| LocationPermissionModal | 위치 권한 요청 안내 |
| ParkingFilterModal      | 주차장 필터 설정    |
| SortOptionModal         | 정렬 기준 선택      |
| ExpectedExitTimeModal   | 출차 예정 시간 입력 |
| NfcScanModal            | NFC 태그 인식       |
| PaymentConfirmModal     | 결제 확인           |
| ReportModal             | 신고 접수           |
| ErrorModal              | 오류 안내           |

---

## 4. 전체 화면 목록

### 4.1 공통 화면

| 화면 ID | 화면명                | 역할                         | 우선순위 |
| ------- | --------------------- | ---------------------------- | -------- |
| C-01    | SplashScreen          | 앱 초기 로딩 및 세션 확인    | 중간     |
| C-02    | LoginScreen           | 사용자 로그인                | 중간     |
| C-03    | SignUpScreen          | 회원가입 및 사용자 유형 선택 | 중간     |
| C-04    | PermissionGuideScreen | 위치/NFC/알림 권한 안내      | 높음     |
| C-05    | NotificationScreen    | 알림 목록 확인               | 낮음     |
| C-06    | ErrorScreen           | 공통 오류 안내               | 중간     |

---

### 4.2 이용자 화면

| 화면 ID | 화면명                     | 역할                                        | 우선순위 |
| ------- | -------------------------- | ------------------------------------------- | -------- |
| U-01    | HomeMapScreen              | 현재 위치 기반 주변 주차장 지도 표시        | 높음     |
| U-02    | ParkingListScreen          | 주변 주차장 목록 비교                       | 높음     |
| U-03    | DestinationSearchScreen    | 목적지명 또는 주소 검색                     | 높음     |
| U-04    | RecommendedParkingScreen   | 목적지/도착 예정 시간 기반 추천 주차장 표시 | 높음     |
| U-05    | ParkingDetailScreen        | 주차장 상세 정보 확인                       | 높음     |
| U-06    | RouteGuideScreen           | 선택 주차장까지 경로 안내                   | 중간     |
| U-07    | SoonAvailableScreen        | 곧 비워질 자리 목록 확인                    | 중간     |
| U-08    | ParkingSessionStartScreen  | 주차 이용 시작 처리                         | 중간     |
| U-09    | ActiveParkingSessionScreen | 이용 중 상태, 시간, 예상 요금 표시          | 중간     |
| U-10    | ParkingSessionEndScreen    | 주차 이용 종료 처리                         | 중간     |
| U-11    | PaymentScreen              | 이용 요금 결제                              | 중간     |
| U-12    | PaymentResultScreen        | 결제 결과 확인                              | 중간     |
| U-13    | ParkingHistoryScreen       | 주차 이용 내역 확인                         | 중간     |

---

### 4.3 공급자 화면

| 화면 ID | 화면명                      | 역할                          | 우선순위 |
| ------- | --------------------------- | ----------------------------- | -------- |
| P-01    | ProviderHomeScreen          | 공급자 관리 홈                | 높음     |
| P-02    | ProviderRegisterScreen      | 공급자 유형 등록              | 높음     |
| P-03    | ParkingLotCreateScreen      | 주차 공간 기본 정보 입력      | 높음     |
| P-04    | ParkingLocationSelectScreen | 지도에서 주차 공간 위치 선택  | 높음     |
| P-05    | ParkingPhotoUploadScreen    | 주차 공간 사진 등록           | 중간     |
| P-06    | AvailabilitySettingScreen   | 이용 가능 요일/시간 설정      | 높음     |
| P-07    | PricePolicySettingScreen    | 시간당 요금 및 최대 요금 설정 | 높음     |
| P-08    | ParkingLotPreviewScreen     | 등록 정보 미리보기            | 중간     |
| P-09    | ApprovalStatusScreen        | 승인 대기/승인/반려 상태 확인 | 높음     |
| P-10    | ProviderUsageHistoryScreen  | 공급자 주차 이용 내역 확인    | 중간     |
| P-11    | SettlementScreen            | 정산 내역 확인                | 중간     |

---

### 4.4 관리자 화면

관리자 기능은 모바일 앱 MVP에서는 후순위로 둘 수 있으며, React 기반 관리자 웹 또는 별도 관리자 화면으로 분리할 수 있다.

| 화면 ID | 화면명                       | 역할                                 | 우선순위 |
| ------- | ---------------------------- | ------------------------------------ | -------- |
| A-01    | AdminLoginScreen             | 관리자 로그인                        | 중간     |
| A-02    | AdminDashboardScreen         | 전체 운영 현황 확인                  | 높음     |
| A-03    | ParkingApprovalListScreen    | 승인 대기 주차장 목록 확인           | 높음     |
| A-04    | ParkingApprovalDetailScreen  | 주차장 등록 정보 검토                | 높음     |
| A-05    | ReportManagementScreen       | 신고 목록 및 처리 상태 관리          | 중간     |
| A-06    | PaymentErrorManagementScreen | 결제 오류 및 환불 관리               | 중간     |
| A-07    | UserManagementScreen         | 이용자/공급자 상태 관리              | 낮음     |
| A-08    | OperationStatisticsScreen    | 이용률, 신고, 결제, 혼잡도 통계 확인 | 낮음     |

---

## 5. 사용자 유형별 주요 화면 흐름

### 5.1 일반 운전자 기본 흐름

```text
SplashScreen
→ PermissionGuideScreen
→ HomeMapScreen
→ ParkingListScreen
→ ParkingDetailScreen
→ RouteGuideScreen
→ ParkingSessionStartScreen
→ ActiveParkingSessionScreen
→ ParkingSessionEndScreen
→ PaymentScreen
→ PaymentResultScreen
→ ParkingHistoryScreen
```

---

### 5.2 목적지 기반 검색 흐름

```text
HomeMapScreen
→ DestinationSearchScreen
→ RecommendedParkingScreen
→ ParkingDetailScreen
→ RouteGuideScreen
→ ParkingSessionStartScreen
```

---

### 5.3 곧 비워질 자리 이용 흐름

```text
HomeMapScreen
→ ParkingFilterModal
→ SoonAvailableScreen
→ ParkingDetailScreen
→ RouteGuideScreen
→ ParkingSessionStartScreen
```

상태 변경 흐름은 다음과 같다.

```text
SOON_AVAILABLE
→ AVAILABLE
→ IN_USE
→ COMPLETED
```

---

### 5.4 NFC 이용 시작/종료 흐름

```text
ParkingDetailScreen
→ ParkingSessionStartScreen
→ NfcScanModal
→ ActiveParkingSessionScreen
→ ParkingSessionEndScreen
→ NfcScanModal
→ PaymentScreen
→ PaymentResultScreen
```

NFC 인식 실패 시 대체 흐름은 다음과 같다.

```text
NfcScanModal
→ ManualCodeInputScreen
→ ParkingSessionStartScreen 또는 ParkingSessionEndScreen
```

---

### 5.5 공급자 등록 흐름

```text
ProviderHomeScreen
→ ProviderRegisterScreen
→ ParkingLotCreateScreen
→ ParkingLocationSelectScreen
→ ParkingPhotoUploadScreen
→ AvailabilitySettingScreen
→ PricePolicySettingScreen
→ ParkingLotPreviewScreen
→ ApprovalStatusScreen
```

---

### 5.6 관리자 승인 흐름

```text
AdminLoginScreen
→ AdminDashboardScreen
→ ParkingApprovalListScreen
→ ParkingApprovalDetailScreen
→ 승인/반려/보완 요청
→ 처리 결과 저장
```

---

## 6. 하단 탭 구조

### 6.1 하단 탭 구성

| 탭 ID | 탭명   | 기본 화면               | 설명                             |
| ----- | ------ | ----------------------- | -------------------------------- |
| T-01  | 홈     | HomeMapScreen           | 현재 위치 기반 주차장 탐색       |
| T-02  | 검색   | DestinationSearchScreen | 목적지 기반 주차장 검색          |
| T-03  | 이용   | ParkingHistoryScreen    | 이용 중 주차 및 이용 내역 확인   |
| T-04  | 공급자 | ProviderHomeScreen      | 주차 공간 등록 및 정산 관리      |
| T-05  | 마이   | MyPageScreen            | 계정, 결제 수단, 알림, 설정 관리 |

---

### 6.2 탭별 주요 화면

| 탭     | 포함 화면                                                                          |
| ------ | ---------------------------------------------------------------------------------- |
| 홈     | HomeMapScreen, ParkingListScreen, ParkingDetailScreen, RouteGuideScreen            |
| 검색   | DestinationSearchScreen, RecommendedParkingScreen, ParkingDetailScreen             |
| 이용   | ActiveParkingSessionScreen, ParkingHistoryScreen, PaymentResultScreen              |
| 공급자 | ProviderHomeScreen, ParkingLotCreateScreen, ApprovalStatusScreen, SettlementScreen |
| 마이   | MyPageScreen, PaymentMethodScreen, NotificationSettingScreen, AppSettingScreen     |

---

### 6.3 탭 노출 조건

| 조건                    | 처리 방식                                     |
| ----------------------- | --------------------------------------------- |
| 일반 사용자             | 홈, 검색, 이용, 공급자, 마이 탭 모두 표시     |
| 공급자 등록 전 사용자   | 공급자 탭 진입 시 ProviderRegisterScreen 표시 |
| 공급자 등록 완료 사용자 | 공급자 탭 진입 시 ProviderHomeScreen 표시     |
| 이용 중인 세션 존재     | 이용 탭에 이용 중 표시 배지 노출              |
| 결제 실패 상태 존재     | 이용 탭 또는 마이 탭에 결제 확인 배지 노출    |

---

## 7. 화면별 상세 구조

### 7.1 C-01 SplashScreen

| 항목      | 내용                                                                                                                                             |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 화면 목적 | 앱 실행 시 로그인 상태, 권한 상태, 이용 중인 주차 세션을 확인하고 적절한 화면으로 이동한다.                                                      |
| 주요 요소 | 앱 로고, 로딩 인디케이터, 앱 버전 정보                                                                                                           |
| 이동 조건 | 로그인 필요 시 LoginScreen, 권한 안내 필요 시 PermissionGuideScreen, 이용 중 세션 존재 시 ActiveParkingSessionScreen, 정상 진입 시 HomeMapScreen |

처리 로직은 다음과 같다.

```text
앱 실행
→ 저장된 로그인 토큰 확인
→ 위치 권한 상태 확인
→ 이용 중 세션 여부 확인
→ 적절한 화면으로 이동
```

---

### 7.2 C-04 PermissionGuideScreen

| 항목      | 내용                                                                                |
| --------- | ----------------------------------------------------------------------------------- |
| 화면 목적 | SmartPark의 핵심 기능 사용에 필요한 위치 권한, 알림 권한, NFC 사용 안내를 제공한다. |
| 주요 요소 | 위치 권한 안내, 알림 권한 안내, NFC 안내, 권한 허용 버튼, 나중에 하기 버튼          |
| 예외 처리 | 위치 권한 거부 시 수동 위치 입력 안내, NFC 미지원 기기에서는 QR/수동 코드 입력 안내 |

---

### 7.3 U-01 HomeMapScreen

| 항목          | 내용                                                                                         |
| ------------- | -------------------------------------------------------------------------------------------- |
| 화면 목적     | 사용자의 현재 위치를 기준으로 주변 주차장을 지도에 표시한다.                                 |
| 주요 기능     | 현재 위치 표시, 주차장 마커 표시, 하단 주차장 카드, 필터, 목적지 검색 진입                   |
| 주요 컴포넌트 | MapView, ParkingMarker, ParkingBottomSheet, ParkingCard, FilterButton, CurrentLocationButton |
| API 연결      | `GET /api/parking-lots/nearby`, `GET /api/parking-lots/recommendations`                      |

상태값은 다음과 같다.

| 상태               | 설명                |
| ------------------ | ------------------- |
| currentLocation    | 사용자 현재 위치    |
| selectedParkingLot | 선택된 주차장       |
| parkingLots        | 주변 주차장 목록    |
| mapRegion          | 현재 지도 표시 영역 |
| isLoading          | 데이터 로딩 여부    |
| error              | 오류 상태           |

예외 처리는 다음과 같다.

| 예외             | 처리                                      |
| ---------------- | ----------------------------------------- |
| 위치 권한 거부   | PermissionGuideScreen 또는 수동 위치 입력 |
| 주변 주차장 없음 | 검색 반경 확대 안내                       |
| 지도 로딩 실패   | 목록 화면 우선 제공                       |
| 네트워크 오류    | 재시도 버튼 제공                          |

---

### 7.4 U-02 ParkingListScreen

| 항목      | 내용                                                                                                      |
| --------- | --------------------------------------------------------------------------------------------------------- |
| 화면 목적 | 현재 위치 또는 목적지 기준 주차장 목록을 거리, 요금, 혼잡도, 이용 가능 여부 기준으로 비교한다.            |
| 주요 요소 | 정렬 탭, 필터 영역, 주차장 카드 목록, 빈 상태 화면                                                        |
| 이동 경로 | 주차장 카드 선택 시 ParkingDetailScreen, 필터 선택 시 ParkingFilterModal, 지도 보기 선택 시 HomeMapScreen |

주차장 카드 표시 정보는 다음과 같다.

| 정보      | 설명                             |
| --------- | -------------------------------- |
| 주차장명  | 주차장 이름                      |
| 거리      | 현재 위치 또는 목적지 기준 거리  |
| 요금      | 시간당 요금                      |
| 운영 시간 | 현재 운영 여부                   |
| 상태      | 이용 가능, 곧 비워짐, 혼잡, 만차 |
| 혼잡도    | 낮음, 보통, 높음, 매우 높음      |
| 태그      | 개인 공유, 공영, 민영, NFC 가능  |

---

### 7.5 U-03 DestinationSearchScreen

| 항목      | 내용                                                                       |
| --------- | -------------------------------------------------------------------------- |
| 화면 목적 | 사용자가 목적지명 또는 주소를 입력하여 목적지 주변 주차장을 검색한다.      |
| 주요 요소 | 검색 입력창, 최근 검색어, 추천 목적지, 검색 결과 목록, 도착 예정 시간 설정 |
| API 연결  | `GET /api/places/search`, `GET /api/parking-lots/by-destination`           |
| 이동 경로 | 목적지 선택 시 RecommendedParkingScreen, 뒤로가기 시 HomeMapScreen         |

---

### 7.6 U-04 RecommendedParkingScreen

| 항목      | 내용                                                                        |
| --------- | --------------------------------------------------------------------------- |
| 화면 목적 | 목적지와 도착 예정 시간을 기준으로 주차 가능성이 높은 주차장을 추천한다.    |
| 주요 요소 | 목적지 요약 카드, 추천 기준 안내, 추천 주차장 목록, 대체 주차장 영역        |
| 이동 경로 | 추천 주차장 선택 시 ParkingDetailScreen, 경로 안내 선택 시 RouteGuideScreen |

추천 카드 표시 정보는 다음과 같다.

| 정보        | 설명                       |
| ----------- | -------------------------- |
| 추천 점수   | 주차 성공 가능성 기반 점수 |
| 예상 혼잡도 | 도착 예정 시간 기준 혼잡도 |
| 도보 거리   | 주차장과 목적지 간 거리    |
| 요금        | 시간당 요금                |
| 상태        | 이용 가능 또는 곧 비워짐   |

---

### 7.7 U-05 ParkingDetailScreen

| 항목      | 내용                                                                                       |
| --------- | ------------------------------------------------------------------------------------------ |
| 화면 목적 | 선택한 주차장의 상세 정보를 제공하고, 경로 안내 또는 이용 시작으로 연결한다.               |
| 주요 요소 | 주차장 이미지, 주차장명/주소, 상태 배지, 혼잡도, 요금, 운영 시간, 출입 방식, NFC 가능 여부 |
| 주요 버튼 | 경로 안내 버튼, 이용 시작 버튼, 신고 버튼                                                  |
| API 연결  | `GET /api/parking-lots/{parkingLotId}`, `GET /api/parking-lots/{parkingLotId}/congestion`  |

예외 처리는 다음과 같다.

| 예외                | 처리                       |
| ------------------- | -------------------------- |
| 만차                | 대체 주차장 추천 버튼 표시 |
| 운영 시간 아님      | 이용 불가 안내             |
| 상세 정보 조회 실패 | 재조회 버튼 표시           |
| 사진 없음           | 기본 이미지 표시           |

---

### 7.8 U-06 RouteGuideScreen

| 항목      | 내용                                                                       |
| --------- | -------------------------------------------------------------------------- |
| 화면 목적 | 사용자가 선택한 주차장까지 이동할 수 있도록 경로 정보를 제공한다.          |
| 주요 요소 | 경로 지도, 예상 소요 시간, 거리, 목적지 도보 거리, 주차장 상태 요약        |
| API 연결  | `GET /api/routes` 또는 Naver Maps Directions API 연동                      |
| 예외 처리 | 경로 조회 실패 시 외부 지도 앱 열기 제공, 이동 중 만차 시 대체 주차장 추천 |

---

### 7.9 U-07 SoonAvailableScreen

| 항목      | 내용                                                                      |
| --------- | ------------------------------------------------------------------------- |
| 화면 목적 | 출차 예정 시간이 등록된 곧 비워질 주차 공간을 확인한다.                   |
| 주요 요소 | 곧 비워질 자리 목록, 남은 시간 표시, 거리 정보, 상태 변경 알림, 대체 후보 |
| API 연결  | `GET /api/parking-lots/nearby?status=SOON_AVAILABLE`                      |

---

### 7.10 U-08 ParkingSessionStartScreen

| 항목      | 내용                                                                            |
| --------- | ------------------------------------------------------------------------------- |
| 화면 목적 | 사용자가 선택한 주차장에서 실제 주차 이용을 시작한다.                           |
| 주요 요소 | 주차장 요약, 이용 시작 안내, NFC 스캔 버튼, 수동 코드 입력, 이용 시작 확인 버튼 |
| API 연결  | `POST /api/parking-sessions/start`                                              |
| 예외 처리 | NFC 인식 실패 시 수동 코드 입력, 이미 이용 중인 공간이면 이용 불가 안내         |

---

### 7.11 U-09 ActiveParkingSessionScreen

| 항목      | 내용                                                                                       |
| --------- | ------------------------------------------------------------------------------------------ |
| 화면 목적 | 현재 이용 중인 주차 세션 정보를 표시한다.                                                  |
| 주요 요소 | 이용 중 상태, 이용 시간, 예상 요금, 출차 예정 시간 설정, 이용 종료 버튼, 주차장 정보       |
| API 연결  | `GET /api/parking-sessions/active`, `POST /api/parking-sessions/{sessionId}/expected-exit` |

---

### 7.12 U-10 ParkingSessionEndScreen

| 항목      | 내용                                                                          |
| --------- | ----------------------------------------------------------------------------- |
| 화면 목적 | 주차 이용 종료를 처리하고 결제로 연결한다.                                    |
| 주요 요소 | NFC 종료 안내, 수동 종료 입력, 이용 시간 요약, 예상 결제 금액, 결제 진행 버튼 |
| API 연결  | `POST /api/parking-sessions/end`                                              |

---

### 7.13 U-11 PaymentScreen

| 항목      | 내용                                                                                                      |
| --------- | --------------------------------------------------------------------------------------------------------- |
| 화면 목적 | 주차 이용 요금을 확인하고 결제를 진행한다.                                                                |
| 주요 요소 | 결제 금액, 이용 시간, 결제 수단, 결제하기 버튼, 약관/동의 영역                                            |
| API 연결  | `POST /api/payments`                                                                                      |
| 예외 처리 | 결제 실패 시 실패 상태 표시, 결제 수단 없음 시 PaymentMethodScreen 이동, 응답 지연 시 확인 필요 상태 저장 |

---

### 7.14 U-12 PaymentResultScreen

| 상태               | 표시 내용                      |
| ------------------ | ------------------------------ |
| PAID               | 결제 완료, 이용 내역 저장      |
| FAILED             | 결제 실패, 재시도 버튼         |
| NEEDS_CONFIRMATION | 결제 확인 중, 관리자 확인 안내 |
| REFUNDED           | 환불 완료                      |

---

### 7.15 U-13 ParkingHistoryScreen

| 항목      | 내용                                                               |
| --------- | ------------------------------------------------------------------ |
| 화면 목적 | 사용자가 이전 주차 이용 내역과 결제 내역을 확인할 수 있도록 한다.  |
| 주요 요소 | 이용 내역 목록, 결제 상태, 상세 보기, 신고하기                     |
| API 연결  | `GET /api/users/me/parking-sessions`, `GET /api/users/me/payments` |

---

### 7.16 P-01 ProviderHomeScreen

| 항목      | 내용                                                                           |
| --------- | ------------------------------------------------------------------------------ |
| 화면 목적 | 공급자가 등록한 주차 공간, 승인 상태, 이용 내역, 정산 내역을 확인한다.         |
| 주요 요소 | 등록 주차 공간 카드, 승인 상태, 오늘 이용 현황, 정산 요약, 주차 공간 등록 버튼 |
| API 연결  | `GET /api/provider/parking-lots`, `GET /api/provider/settlements`              |

---

### 7.17 P-03 ParkingLotCreateScreen

| 항목           | 내용                                                   |
| -------------- | ------------------------------------------------------ |
| 화면 목적      | 공급자가 주차 공간의 기본 정보를 입력한다.             |
| 주요 입력 항목 | 주차장명, 주소, 주차 가능 면수, 설명, 주차장 유형      |
| 이동 경로      | ParkingLocationSelectScreen → ParkingPhotoUploadScreen |

---

### 7.18 P-04 ParkingLocationSelectScreen

| 항목      | 내용                                                |
| --------- | --------------------------------------------------- |
| 화면 목적 | 공급자가 지도에서 주차 공간 위치를 정확히 지정한다. |
| 주요 요소 | 지도, 주소 검색, 핀 이동, 현재 선택 위치 표시       |

---

### 7.19 P-06 AvailabilitySettingScreen

| 항목      | 내용                                                            |
| --------- | --------------------------------------------------------------- |
| 화면 목적 | 공급자가 공유 가능한 요일과 시간을 설정한다.                    |
| 주요 요소 | 요일 선택, 시작 시간, 종료 시간, 반복 설정, 시간대 추가         |
| 예외 처리 | 종료 시간이 시작 시간보다 빠르면 오류 표시, 시간대 중복 시 경고 |

---

### 7.20 P-07 PricePolicySettingScreen

| 항목      | 내용                                                |
| --------- | --------------------------------------------------- |
| 화면 목적 | 공급자가 주차 공간의 요금 정책을 설정한다.          |
| 주요 요소 | 시간당 요금, 일 최대 요금, 추가 요금, 요금 미리보기 |

---

### 7.21 P-09 ApprovalStatusScreen

| 상태           | 설명                           |
| -------------- | ------------------------------ |
| PENDING        | 승인 대기 중                   |
| APPROVED       | 승인 완료, 검색 결과 노출      |
| REJECTED       | 반려, 반려 사유 표시           |
| NEEDS_REVISION | 보완 요청, 수정 후 재신청 가능 |

---

### 7.22 A-02 AdminDashboardScreen

| 항목      | 내용                                                                           |
| --------- | ------------------------------------------------------------------------------ |
| 화면 목적 | 운영 관리자가 전체 서비스 상태를 확인한다.                                     |
| 주요 지표 | 승인 대기 건수, 신고 접수 건수, 결제 오류 건수, 활성 주차장 수, 오늘 이용 건수 |

---

### 7.23 A-03 ParkingApprovalListScreen

| 항목      | 내용                                                      |
| --------- | --------------------------------------------------------- |
| 화면 목적 | 운영 관리자가 승인 대기 중인 주차장 등록 건을 확인한다.   |
| 주요 요소 | 승인 대기 목록, 공급자 정보, 위치 정보, 등록일, 상태 필터 |

---

### 7.24 A-04 ParkingApprovalDetailScreen

| 항목      | 내용                                                                      |
| --------- | ------------------------------------------------------------------------- |
| 화면 목적 | 운영 관리자가 주차장 등록 정보를 검토하고 승인/반려/보완 요청을 처리한다. |
| 주요 요소 | 주차장 기본 정보, 사진, 요금/시간, 공급자 정보, 승인/반려/보완 요청 버튼  |

---

## 8. 주요 컴포넌트 구조

### 8.1 공통 컴포넌트

| 컴포넌트         | 설명           |
| ---------------- | -------------- |
| AppButton        | 주요 버튼      |
| AppTextInput     | 입력 필드      |
| AppHeader        | 화면 상단 헤더 |
| StatusBadge      | 상태 표시 배지 |
| EmptyState       | 빈 상태 안내   |
| ErrorState       | 오류 상태 안내 |
| LoadingIndicator | 로딩 표시      |
| ConfirmModal     | 확인 모달      |

---

### 8.2 주차장 관련 컴포넌트

| 컴포넌트           | 설명                   |
| ------------------ | ---------------------- |
| ParkingCard        | 주차장 요약 카드       |
| ParkingMarker      | 지도 마커              |
| ParkingBottomSheet | 지도 하단 주차장 목록  |
| CongestionBadge    | 혼잡도 배지            |
| ParkingStatusBadge | 이용 가능 상태 배지    |
| PriceInfoBox       | 요금 정보 박스         |
| OperationTimeBox   | 운영 시간 정보 박스    |
| SoonAvailableChip  | 곧 비워질 자리 표시 칩 |

---

### 8.3 공급자 관련 컴포넌트

| 컴포넌트               | 설명                    |
| ---------------------- | ----------------------- |
| ProviderParkingCard    | 공급자 등록 주차장 카드 |
| AvailabilityTimePicker | 이용 가능 시간 설정     |
| PricePolicyForm        | 요금 정책 입력 폼       |
| ApprovalStatusCard     | 승인 상태 표시 카드     |
| SettlementSummaryCard  | 정산 요약 카드          |

---

### 8.4 관리자 관련 컴포넌트

| 컴포넌트          | 설명                |
| ----------------- | ------------------- |
| AdminMetricCard   | 운영 지표 카드      |
| ApprovalListItem  | 승인 대기 목록 항목 |
| ReportListItem    | 신고 목록 항목      |
| PaymentErrorItem  | 결제 오류 항목      |
| AdminStatusFilter | 관리자 상태 필터    |

---

## 9. 화면 상태값 기준

### 9.1 주차장 상태

| 상태           | 화면 표시  |
| -------------- | ---------- |
| AVAILABLE      | 이용 가능  |
| SOON_AVAILABLE | 곧 비워짐  |
| OCCUPIED       | 이용 중    |
| FULL           | 만차       |
| INACTIVE       | 운영 안 함 |

---

### 9.2 혼잡도 상태

| 상태      | 화면 표시 |
| --------- | --------- |
| LOW       | 여유      |
| MEDIUM    | 보통      |
| HIGH      | 혼잡      |
| VERY_HIGH | 매우 혼잡 |
| UNKNOWN   | 정보 부족 |

---

### 9.3 결제 상태

| 상태               | 화면 표시 |
| ------------------ | --------- |
| PENDING            | 결제 대기 |
| PAID               | 결제 완료 |
| FAILED             | 결제 실패 |
| NEEDS_CONFIRMATION | 확인 필요 |
| REFUNDED           | 환불 완료 |

---

### 9.4 승인 상태

| 상태           | 화면 표시 |
| -------------- | --------- |
| PENDING        | 승인 대기 |
| APPROVED       | 승인 완료 |
| REJECTED       | 반려      |
| NEEDS_REVISION | 보완 요청 |

---

## 10. 파일 구조 제안

React Native 프론트엔드의 화면 구조는 다음과 같이 구성한다.

```text
src/frontend/
└── src/
    ├── navigation/
    │   ├── RootNavigator.tsx
    │   ├── AuthStackNavigator.tsx
    │   ├── MainTabNavigator.tsx
    │   ├── HomeStackNavigator.tsx
    │   ├── SearchStackNavigator.tsx
    │   ├── ParkingStackNavigator.tsx
    │   ├── ProviderStackNavigator.tsx
    │   └── MyPageStackNavigator.tsx
    ├── screens/
    │   ├── common/
    │   ├── auth/
    │   ├── home/
    │   ├── search/
    │   ├── parking/
    │   ├── provider/
    │   ├── admin/
    │   └── mypage/
    ├── components/
    │   ├── common/
    │   ├── parking/
    │   ├── provider/
    │   └── admin/
    ├── services/
    │   ├── parkingApi.ts
    │   ├── placeApi.ts
    │   ├── sessionApi.ts
    │   ├── paymentApi.ts
    │   ├── providerApi.ts
    │   └── adminApi.ts
    ├── types/
    │   ├── parking.ts
    │   ├── session.ts
    │   ├── payment.ts
    │   ├── provider.ts
    │   └── user.ts
    ├── hooks/
    │   ├── useCurrentLocation.ts
    │   ├── useNearbyParkingLots.ts
    │   ├── useDestinationSearch.ts
    │   ├── useParkingSession.ts
    │   └── usePayment.ts
    └── constants/
        ├── routes.ts
        ├── status.ts
        └── colors.ts
```

---

## 11. API 연결 기준

| 화면                        | API 후보                                                                        |
| --------------------------- | ------------------------------------------------------------------------------- |
| HomeMapScreen               | `GET /api/parking-lots/nearby`                                                  |
| DestinationSearchScreen     | `GET /api/places/search`                                                        |
| RecommendedParkingScreen    | `GET /api/parking-lots/by-destination`, `GET /api/parking-lots/recommendations` |
| ParkingDetailScreen         | `GET /api/parking-lots/{parkingLotId}`                                          |
| SoonAvailableScreen         | `GET /api/parking-lots/nearby?status=SOON_AVAILABLE`                            |
| ParkingSessionStartScreen   | `POST /api/parking-sessions/start`                                              |
| ActiveParkingSessionScreen  | `GET /api/parking-sessions/active`                                              |
| ParkingSessionEndScreen     | `POST /api/parking-sessions/end`                                                |
| PaymentScreen               | `POST /api/payments`                                                            |
| ParkingHistoryScreen        | `GET /api/users/me/parking-sessions`, `GET /api/users/me/payments`              |
| ProviderHomeScreen          | `GET /api/provider/parking-lots`, `GET /api/provider/settlements`               |
| ParkingLotCreateScreen      | `POST /api/provider/parking-lots`                                               |
| AvailabilitySettingScreen   | `POST /api/provider/parking-lots/{parkingLotId}/availability`                   |
| PricePolicySettingScreen    | `POST /api/provider/parking-lots/{parkingLotId}/price-policy`                   |
| AdminDashboardScreen        | `GET /api/admin/dashboard`                                                      |
| ParkingApprovalListScreen   | `GET /api/admin/parking-lots/pending`                                           |
| ParkingApprovalDetailScreen | `PATCH /api/admin/parking-lots/{parkingLotId}/approval`                         |

---

## 12. 테스트 케이스 연결 방향

| 테스트 ID | 화면                        | 테스트 내용                                                          |
| --------- | --------------------------- | -------------------------------------------------------------------- |
| TC-S-01   | SplashScreen                | 로그인/권한/이용 중 세션 상태에 따라 올바른 화면으로 이동하는지 확인 |
| TC-S-02   | HomeMapScreen               | 현재 위치 기준 주차장 마커와 목록이 표시되는지 확인                  |
| TC-S-03   | DestinationSearchScreen     | 목적지 검색 결과가 정상 표시되는지 확인                              |
| TC-S-04   | RecommendedParkingScreen    | 도착 예정 시간 기준 추천 주차장이 표시되는지 확인                    |
| TC-S-05   | ParkingDetailScreen         | 주차장 상세 정보와 상태가 정상 표시되는지 확인                       |
| TC-S-06   | SoonAvailableScreen         | 곧 비워질 자리만 필터링되어 표시되는지 확인                          |
| TC-S-07   | ParkingSessionStartScreen   | NFC 또는 수동 코드로 이용 시작이 가능한지 확인                       |
| TC-S-08   | ActiveParkingSessionScreen  | 이용 시간과 예상 요금이 표시되는지 확인                              |
| TC-S-09   | PaymentScreen               | 이용 시간 기반 요금과 결제 수단이 표시되는지 확인                    |
| TC-S-10   | PaymentResultScreen         | 결제 성공/실패/확인 필요 상태가 구분되어 표시되는지 확인             |
| TC-S-11   | ProviderHomeScreen          | 공급자의 등록 주차장과 정산 요약이 표시되는지 확인                   |
| TC-S-12   | ParkingLotCreateScreen      | 공급자가 주차 공간 기본 정보를 입력할 수 있는지 확인                 |
| TC-S-13   | ApprovalStatusScreen        | 승인 대기/승인/반려/보완 요청 상태가 표시되는지 확인                 |
| TC-S-14   | AdminDashboardScreen        | 승인 대기, 신고, 결제 오류 지표가 표시되는지 확인                    |
| TC-S-15   | ParkingApprovalDetailScreen | 관리자가 승인/반려/보완 요청 처리를 할 수 있는지 확인                |

---

## 13. Claude Code 작업 지침

Claude Code가 본 문서를 기준으로 화면을 구현할 때는 다음 원칙을 따른다.

| 원칙             | 설명                                                                         |
| ---------------- | ---------------------------------------------------------------------------- |
| 화면 단위 구현   | 한 번에 전체 앱을 만들기보다 화면 단위로 구현한다.                           |
| 네비게이션 우선  | Root, Tab, Stack 구조를 먼저 만든 뒤 화면을 채운다.                          |
| 컴포넌트 분리    | 카드, 배지, 버튼, 입력 폼, 모달은 재사용 컴포넌트로 분리한다.                |
| 상태값 통일      | 상태값은 `AVAILABLE`, `SOON_AVAILABLE`, `PAID` 등 문서의 enum 기준을 따른다. |
| API 분리         | API 호출은 화면 내부에 직접 작성하지 않고 `services/`로 분리한다.            |
| 예외 화면 포함   | 빈 상태, 오류 상태, 권한 거부, 결제 실패 화면을 반드시 고려한다.             |
| mock 데이터 허용 | 백엔드 구현 전에는 mock 데이터를 사용하되, API 연결 구조는 미리 분리한다.    |

---

## 14. Codex 작업 지침

Codex가 본 문서를 기준으로 백엔드 또는 API를 설계할 때는 다음 원칙을 따른다.

| 원칙                        | 설명                                                                              |
| --------------------------- | --------------------------------------------------------------------------------- |
| 화면 요구사항 기반 API 설계 | 각 화면에서 필요한 데이터를 기준으로 API 응답 구조를 설계한다.                    |
| 상태값 enum 관리            | 주차장 상태, 결제 상태, 승인 상태, 신고 상태는 enum으로 관리한다.                 |
| 도메인 분리                 | ParkingLot, ParkingSpace, ParkingSession, Payment, Report, Settlement를 분리한다. |
| 관리자 API 분리             | 관리자 기능은 `/api/admin/**` 경로로 분리한다.                                    |
| 공급자 API 분리             | 공급자 기능은 `/api/provider/**` 경로로 분리한다.                                 |
| 테스트 가능 구조            | 화면별 테스트 케이스와 연결될 수 있도록 서비스 로직을 분리한다.                   |

---

## 15. 정리

본 문서는 SmartPark React Native 앱의 화면 구조와 네비게이션 구성을 정의한 하네스 문서이다.

SmartPark의 핵심 화면은 현재 위치 기반 주차장 탐색, 목적지 기반 검색, 추천 주차장 확인, 주차장 상세, NFC 이용 시작/종료, 결제, 이용 내역, 공급자 등록, 승인 상태 확인으로 구성된다.

`SCREEN_STRUCTURE.md`는 Claude Code가 프론트엔드 구현을 시작하기 전에 반드시 참고해야 하는 화면 기준 문서이며, Codex가 API 응답 구조를 설계할 때도 화면별 데이터 요구사항을 확인하는 기준 문서로 활용된다.
