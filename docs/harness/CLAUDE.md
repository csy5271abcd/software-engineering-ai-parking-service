# CLAUDE.md

# SmartPark Claude Code 작업 지침 문서

## 1. 문서 개요

### 1.1 문서 목적

본 문서는 Claude Code가 SmartPark 프로젝트의 React Native 프론트엔드 구현을 일관성 있게 수행할 수 있도록 작업 기준을 정의하기 위해 작성되었다.

SmartPark는 사용자의 현재 위치와 목적지를 기반으로 주변 주차 가능 공간을 탐색하고, 곧 비워질 주차 공간 정보, 개인 주차장 공유, NFC 기반 간편 결제, AI 또는 규칙 기반 혼잡도 분석 기능을 제공하는 AI 기반 스마트 주차 플랫폼이다.

Claude Code는 본 문서를 기준으로 SmartPark 모바일 앱의 화면, 컴포넌트, 네비게이션, 상태 처리, API 연동 구조를 구현한다. 이 문서는 Claude Code가 임의로 화면 구조나 폴더 구조를 변경하지 않고, 기존 하네스 문서와 일관된 방식으로 프론트엔드 작업을 수행하도록 돕는 기준 문서이다.

---

### 1.2 문서 적용 범위

본 문서는 다음 작업에 적용한다.

| 구분            | 적용 내용                                                 |
| --------------- | --------------------------------------------------------- |
| 화면 구현       | React Native 화면 파일 생성 및 수정                       |
| 컴포넌트 구현   | 공통 컴포넌트, 주차장 컴포넌트, 공급자 컴포넌트 작성      |
| 네비게이션 구현 | Root, Tab, Stack Navigator 구성                           |
| 상태 관리       | 위치, 주차장 목록, 선택 주차장, 이용 세션, 결제 상태 관리 |
| API 연동        | `services/`와 custom hook을 통한 API 호출 구조 작성       |
| Mock 데이터     | 백엔드 구현 전 화면 검증용 mock 데이터 작성               |
| 오류 처리       | 로딩, 빈 상태, 오류 상태, 권한 거부, 결제 실패 화면 처리  |
| UI 일관성       | 색상, 간격, 폰트, 카드, 배지, 버튼 스타일 통일            |

---

### 1.3 관련 문서

Claude Code는 작업 전 다음 문서를 우선 확인한다.

| 문서                               | 확인 목적                                       |
| ---------------------------------- | ----------------------------------------------- |
| `docs/harness/PRD.md`              | 제품 목표, MVP 범위, 핵심 기능 확인             |
| `docs/harness/FEATURE_SPEC.md`     | 기능별 입력값, 출력값, 예외 상황, API 후보 확인 |
| `docs/harness/SCREEN_STRUCTURE.md` | 화면 구조, 네비게이션, 화면별 컴포넌트 확인     |
| `docs/harness/PROJECT_RULES.md`    | 코드 작성 규칙, 폴더 규칙, commit/tag 규칙 확인 |
| `docs/product/PERSONA.md`          | 주요 사용자 유형과 니즈 확인                    |
| `docs/product/USER_JOURNEY.md`     | 사용자 흐름 확인                                |
| `docs/product/SERVICE_SCENARIO.md` | 실제 이용 시나리오와 예외 흐름 확인             |
| `CHANGELOG.md`                     | 버전별 변경 이력 확인                           |

---

## 2. Claude Code의 역할

### 2.1 주요 역할

Claude Code는 SmartPark 프로젝트에서 프론트엔드 구현 보조자 역할을 수행한다.

| 역할              | 설명                                           |
| ----------------- | ---------------------------------------------- |
| 화면 구현자       | React Native 기반 모바일 화면 구현             |
| 컴포넌트 설계자   | 재사용 가능한 UI 컴포넌트 구성                 |
| 네비게이션 구성자 | 화면 이동 구조와 탭/스택 구조 작성             |
| API 연결 보조자   | 백엔드 API 호출을 위한 서비스 함수와 hook 작성 |
| 상태 처리 보조자  | 로딩, 오류, 빈 상태, 권한 상태 처리            |
| UI 정리자         | 화면 간격, 스타일, 정보 계층 정리              |
| 문서 기준 준수자  | 하네스 문서에 맞게 코드 구조 유지              |

---

### 2.2 Claude Code가 우선 담당하는 영역

| 우선순위 | 영역                   | 설명                                             |
| -------- | ---------------------- | ------------------------------------------------ |
| 1        | React Native 화면 구현 | `screens/` 하위 화면 작성                        |
| 2        | 컴포넌트 분리          | `components/` 하위 재사용 컴포넌트 작성          |
| 3        | 네비게이션 구성        | `navigation/` 하위 Navigator 작성                |
| 4        | Mock 데이터 구성       | `data/` 또는 `mocks/` 하위 화면 검증 데이터 작성 |
| 5        | API 호출 구조          | `services/`, `hooks/`, `types/` 구성             |
| 6        | 예외 상태 UI           | 오류, 빈 상태, 권한 거부, 결제 실패 화면 작성    |
| 7        | 프론트엔드 문서 보조   | 구현 결과 요약, 화면 구조 설명 보완              |

---

### 2.3 Claude Code가 직접 판단하지 말아야 하는 영역

Claude Code는 다음 항목을 사용자 확인 없이 임의로 변경하지 않는다.

| 금지 항목                    | 설명                                                              |
| ---------------------------- | ----------------------------------------------------------------- |
| 프로젝트 전체 폴더 구조 변경 | `docs/`, `src/`의 큰 구조를 임의로 바꾸지 않는다.                 |
| 화면명 변경                  | `SCREEN_STRUCTURE.md`에 정의된 화면명을 임의로 변경하지 않는다.   |
| 상태값 변경                  | `AVAILABLE`, `PAID`, `APPROVED` 등 상태값을 임의로 바꾸지 않는다. |
| API 경로 변경                | `FEATURE_SPEC.md`의 API 후보를 임의로 다른 구조로 바꾸지 않는다.  |
| 백엔드 도메인 구조 변경      | Codex 담당 영역인 Spring Boot 구조를 임의로 변경하지 않는다.      |
| 문서 삭제                    | 기존 하네스 문서 또는 과제 산출물을 삭제하지 않는다.              |
| 민감 정보 추가               | API Key, 결제 Key, 개인정보를 코드에 직접 작성하지 않는다.        |

---

## 3. 기본 작업 흐름

### 3.1 Claude Code 작업 순서

Claude Code는 다음 순서로 작업한다.

```text
요청 내용 확인
→ 관련 하네스 문서 확인
→ 수정할 파일 목록 정리
→ 생성/수정 범위 제한
→ 코드 작성
→ 화면/기능 연결 확인
→ 로딩/오류/빈 상태 확인
→ 변경 파일 목록 요약
→ 실행 및 검증 방법 제시
```

---

### 3.2 한 번에 수행할 작업 범위

한 번의 Claude Code 작업은 가능한 한 작은 단위로 제한한다.

| 권장 작업 단위         | 예시                                  |
| ---------------------- | ------------------------------------- |
| 화면 1개 구현          | `HomeMapScreen.tsx` 작성              |
| 컴포넌트 묶음 1개 구현 | `ParkingCard`, `CongestionBadge` 작성 |
| 네비게이션 1개 구성    | `MainTabNavigator.tsx` 작성           |
| API 모듈 1개 작성      | `parkingApi.ts` 작성                  |
| hook 1개 작성          | `useNearbyParkingLots.ts` 작성        |
| 예외 상태 보완         | 위치 권한 거부 화면 처리              |

큰 작업이 필요한 경우에는 다음과 같이 나누어 진행한다.

```text
1단계: 타입과 mock 데이터 작성
2단계: API service와 hook 작성
3단계: 화면 UI 작성
4단계: 네비게이션 연결
5단계: 오류/빈 상태 처리
6단계: 검증 및 리팩토링
```

---

## 4. 프론트엔드 폴더 구조 기준

### 4.1 기본 구조

Claude Code는 다음 React Native 폴더 구조를 기준으로 작업한다.

```text
src/frontend/
└── src/
    ├── navigation/
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
    ├── types/
    ├── hooks/
    ├── constants/
    └── data/
```

---

### 4.2 폴더별 작업 기준

| 폴더                   | 역할            | 작성 기준                              |
| ---------------------- | --------------- | -------------------------------------- |
| `navigation/`          | 화면 이동 구조  | Navigator, route name 정의             |
| `screens/`             | 실제 화면       | 화면 단위 컴포넌트 작성                |
| `components/common/`   | 공통 UI         | 버튼, 입력창, 헤더, 모달, 상태 화면    |
| `components/parking/`  | 주차장 관련 UI  | 주차장 카드, 마커, 혼잡도 배지         |
| `components/provider/` | 공급자 관련 UI  | 공급자 카드, 정산 카드, 승인 상태 카드 |
| `components/admin/`    | 관리자 관련 UI  | 운영 지표 카드, 승인 목록 항목         |
| `services/`            | API 호출 함수   | 화면에서 직접 fetch하지 않도록 분리    |
| `types/`               | TypeScript 타입 | API 응답, 상태값, 도메인 타입 정의     |
| `hooks/`               | 재사용 로직     | 위치 조회, 주차장 조회, 결제 처리      |
| `constants/`           | 상수            | route, status, colors, spacing         |
| `data/`                | mock 데이터     | 백엔드 연결 전 화면 검증용 데이터      |

---

## 5. 네이밍 규칙

### 5.1 파일명 규칙

| 대상             | 규칙                 | 예시                      |
| ---------------- | -------------------- | ------------------------- |
| 화면 파일        | PascalCase + Screen  | `HomeMapScreen.tsx`       |
| 컴포넌트 파일    | PascalCase           | `ParkingCard.tsx`         |
| API 파일         | camelCase + Api      | `parkingApi.ts`           |
| hook 파일        | use + PascalCase     | `useNearbyParkingLots.ts` |
| type 파일        | 도메인명             | `parking.ts`              |
| constants 파일   | 소문자 또는 도메인명 | `routes.ts`, `status.ts`  |
| mock 데이터 파일 | 도메인명 + Mock      | `parkingMock.ts`          |

---

### 5.2 컴포넌트명 규칙

| 대상          | 규칙            | 예시                 |
| ------------- | --------------- | -------------------- |
| 화면 컴포넌트 | 파일명과 동일   | `HomeMapScreen`      |
| 카드 컴포넌트 | 대상 + Card     | `ParkingCard`        |
| 배지 컴포넌트 | 대상 + Badge    | `CongestionBadge`    |
| 모달 컴포넌트 | 대상 + Modal    | `ParkingFilterModal` |
| 리스트 항목   | 대상 + ListItem | `ReportListItem`     |
| hook          | use + 동작      | `useParkingSession`  |

---

### 5.3 변수와 함수명 규칙

| 대상          | 규칙              | 예시                                       |
| ------------- | ----------------- | ------------------------------------------ |
| 변수          | camelCase         | `selectedParkingLot`                       |
| 함수          | 동사 + 대상       | `fetchNearbyParkingLots`                   |
| 이벤트 핸들러 | handle + 동작     | `handleSelectParkingLot`                   |
| boolean       | is/has/can 접두사 | `isLoading`, `hasError`, `canStartSession` |
| 배열          | 복수형            | `parkingLots`, `reports`                   |
| ID            | 도메인 + Id       | `parkingLotId`, `sessionId`                |

---

## 6. 화면 구현 규칙

### 6.1 화면 구현 기본 원칙

| 원칙                | 설명                                                             |
| ------------------- | ---------------------------------------------------------------- |
| 화면 목적 명확화    | 화면 상단 또는 구조에서 사용자가 무엇을 해야 하는지 명확히 한다. |
| 정보 우선순위 유지  | 주차장명, 상태, 거리, 요금, 혼잡도를 우선 표시한다.              |
| 주요 행동 버튼 제공 | 경로 안내, 이용 시작, 결제하기 등 다음 행동을 명확히 제공한다.   |
| 빈 상태 처리        | 검색 결과 없음, 이용 내역 없음, 등록 주차장 없음을 표시한다.     |
| 오류 상태 처리      | 네트워크 오류, API 실패, 권한 거부를 별도 UI로 처리한다.         |
| 로딩 상태 처리      | 데이터 요청 중에는 로딩 인디케이터 또는 skeleton을 표시한다.     |

---

### 6.2 화면 파일 기본 구조

화면 파일은 다음 구조를 따른다.

```tsx
import React from "react";
import { View, Text } from "react-native";

export function HomeMapScreen() {
  // 1. hook 및 상태 선언
  // 2. 이벤트 핸들러 정의
  // 3. 로딩/오류/빈 상태 처리
  // 4. 화면 UI 반환

  return (
    <View>
      <Text>HomeMapScreen</Text>
    </View>
  );
}
```

---

### 6.3 화면에서 직접 처리하지 말아야 할 것

화면 컴포넌트는 다음 로직을 직접 포함하지 않는 것을 원칙으로 한다.

| 금지 항목                  | 대체 위치                     |
| -------------------------- | ----------------------------- |
| API fetch 직접 작성        | `services/` 또는 `hooks/`     |
| 복잡한 데이터 가공         | `hooks/` 또는 utility 함수    |
| 상태 문자열 직접 비교 반복 | `constants/status.ts`         |
| 공통 스타일 중복 작성      | `theme` 또는 공통 컴포넌트    |
| 결제 금액 계산 로직        | 백엔드 또는 별도 utility/hook |

---

## 7. 주요 화면별 구현 지침

### 7.1 HomeMapScreen

| 항목          | 기준                                                            |
| ------------- | --------------------------------------------------------------- |
| 목적          | 현재 위치 기준 주변 주차장 지도 표시                            |
| 주요 컴포넌트 | `MapView`, `ParkingMarker`, `ParkingBottomSheet`, `ParkingCard` |
| 연결 기능     | 현재 위치 기반 주차장 조회, 혼잡도 표시                         |
| API 후보      | `GET /api/parking-lots/nearby`                                  |
| 예외 처리     | 위치 권한 거부, 지도 로딩 실패, 주변 주차장 없음                |

구현 시 고려 사항은 다음과 같다.

1. 앱 진입 후 가장 먼저 사용자가 주변 주차장을 확인할 수 있어야 한다.
2. 지도 마커와 하단 카드 목록은 같은 데이터를 사용해야 한다.
3. 주차장 상태는 마커와 카드에서 동일하게 표시해야 한다.
4. 현재 위치 버튼, 필터 버튼, 목적지 검색 진입 버튼을 제공한다.
5. 지도 API 연동 전에는 mock 데이터 기반 UI를 먼저 구성할 수 있다.

---

### 7.2 DestinationSearchScreen

| 항목          | 기준                                                       |
| ------------- | ---------------------------------------------------------- |
| 목적          | 목적지명 또는 주소 검색                                    |
| 주요 컴포넌트 | `SearchInput`, `RecentSearchList`, `DestinationResultItem` |
| 연결 기능     | 목적지 기반 주차장 검색                                    |
| API 후보      | `GET /api/places/search`                                   |
| 예외 처리     | 검색 결과 없음, 입력값 없음, 네트워크 오류                 |

구현 시 고려 사항은 다음과 같다.

1. 검색 입력창은 화면 상단에 고정한다.
2. 최근 검색어와 검색 결과를 구분한다.
3. 목적지 선택 시 `RecommendedParkingScreen`으로 이동한다.
4. 도착 예정 시간 설정이 필요한 경우 별도 입력 영역 또는 모달로 처리한다.

---

### 7.3 RecommendedParkingScreen

| 항목          | 기준                                                                  |
| ------------- | --------------------------------------------------------------------- |
| 목적          | 목적지와 도착 예정 시간 기준 추천 주차장 표시                         |
| 주요 컴포넌트 | `DestinationSummaryCard`, `RecommendedParkingCard`, `CongestionBadge` |
| 연결 기능     | 추천 주차장 조회, 혼잡도 분석                                         |
| API 후보      | `GET /api/parking-lots/recommendations`                               |
| 예외 처리     | 추천 결과 없음, 혼잡도 정보 부족                                      |

구현 시 고려 사항은 다음과 같다.

1. 추천 기준을 사용자에게 간단히 설명한다.
2. 추천 카드에는 추천 사유를 표시한다.
3. 추천 주차장 외에 대체 후보를 함께 표시할 수 있다.
4. 혼잡도 정보가 없으면 `UNKNOWN` 상태를 표시한다.

---

### 7.4 ParkingDetailScreen

| 항목          | 기준                                                                           |
| ------------- | ------------------------------------------------------------------------------ |
| 목적          | 주차장 상세 정보 확인 및 경로/이용 시작 연결                                   |
| 주요 컴포넌트 | `ParkingImageHeader`, `ParkingStatusBadge`, `PriceInfoBox`, `OperationTimeBox` |
| 연결 기능     | 주차장 상세 조회, 경로 안내, NFC 이용 시작                                     |
| API 후보      | `GET /api/parking-lots/{parkingLotId}`                                         |
| 예외 처리     | 상세 조회 실패, 운영 시간 아님, 만차, 사진 없음                                |

구현 시 고려 사항은 다음과 같다.

1. 주차장명, 주소, 상태, 요금, 운영 시간, 혼잡도를 한 화면에서 확인할 수 있어야 한다.
2. 이용 불가 상태에서는 이용 시작 버튼을 비활성화한다.
3. 곧 비워질 자리 정보가 있으면 예상 출차 시간을 표시한다.
4. 경로 안내 버튼과 이용 시작 버튼을 명확히 구분한다.

---

### 7.5 ActiveParkingSessionScreen

| 항목          | 기준                                                        |
| ------------- | ----------------------------------------------------------- |
| 목적          | 이용 중인 주차 세션 정보 표시                               |
| 주요 컴포넌트 | `SessionTimer`, `EstimatedFeeBox`, `ExpectedExitTimeButton` |
| 연결 기능     | 이용 중 세션 조회, 출차 예정 시간 등록                      |
| API 후보      | `GET /api/parking-sessions/active`                          |
| 예외 처리     | 활성 세션 없음, 세션 조회 실패                              |

구현 시 고려 사항은 다음과 같다.

1. 이용 시작 시간과 경과 시간을 명확히 표시한다.
2. 예상 요금을 표시하되, 최종 금액은 결제 단계에서 확정한다.
3. 출차 예정 시간 등록 기능을 제공한다.
4. 이용 종료 버튼은 실수 방지를 위해 확인 단계를 둔다.

---

### 7.6 PaymentScreen

| 항목          | 기준                                                   |
| ------------- | ------------------------------------------------------ |
| 목적          | 주차 이용 요금 확인 및 결제 진행                       |
| 주요 컴포넌트 | `PaymentSummaryCard`, `PaymentMethodCard`, `PayButton` |
| 연결 기능     | 결제 요청, 결제 내역 저장                              |
| API 후보      | `POST /api/payments`                                   |
| 예외 처리     | 결제 실패, 결제 수단 없음, 응답 지연                   |

구현 시 고려 사항은 다음과 같다.

1. 결제 금액, 이용 시간, 주차장명을 명확히 표시한다.
2. 결제 수단이 없으면 결제 수단 등록 화면으로 안내한다.
3. 결제 실패 시 재시도 버튼을 제공한다.
4. 결제 확인 필요 상태는 사용자에게 명확히 안내한다.

---

### 7.7 ProviderHomeScreen

| 항목          | 기준                                                                 |
| ------------- | -------------------------------------------------------------------- |
| 목적          | 공급자 주차 공간과 정산 현황 확인                                    |
| 주요 컴포넌트 | `ProviderParkingCard`, `SettlementSummaryCard`, `ApprovalStatusCard` |
| 연결 기능     | 등록 주차장 조회, 정산 조회                                          |
| API 후보      | `GET /api/provider/parking-lots`, `GET /api/provider/settlements`    |
| 예외 처리     | 등록 주차장 없음, 승인 대기 상태, 반려 상태                          |

구현 시 고려 사항은 다음과 같다.

1. 공급자 등록 전 사용자는 `ProviderRegisterScreen`으로 안내한다.
2. 등록 주차장이 없으면 신규 등록 버튼을 강조한다.
3. 승인 상태를 명확히 표시한다.
4. 정산 예정 금액과 이용 내역을 요약한다.

---

### 7.8 ParkingLotCreateScreen

| 항목          | 기준                                                        |
| ------------- | ----------------------------------------------------------- |
| 목적          | 공급자가 주차 공간 기본 정보 입력                           |
| 주요 컴포넌트 | `AppTextInput`, `AddressSearchInput`, `ParkingTypeSelector` |
| 연결 기능     | 주차 공간 등록                                              |
| API 후보      | `POST /api/provider/parking-lots`                           |
| 예외 처리     | 필수 입력 누락, 주소 오류, 중복 등록 가능성                 |

구현 시 고려 사항은 다음과 같다.

1. 입력 단계가 길어지면 단계형 UI로 분리한다.
2. 위치 선택, 사진 등록, 시간 설정, 요금 설정으로 자연스럽게 이어지게 한다.
3. 최종 등록 전 `ParkingLotPreviewScreen`에서 미리보기를 제공한다.

---

## 8. 컴포넌트 구현 규칙

### 8.1 공통 컴포넌트

| 컴포넌트           | 역할           | 위치                                     |
| ------------------ | -------------- | ---------------------------------------- |
| `AppButton`        | 공통 버튼      | `components/common/AppButton.tsx`        |
| `AppTextInput`     | 공통 입력창    | `components/common/AppTextInput.tsx`     |
| `AppHeader`        | 화면 상단 헤더 | `components/common/AppHeader.tsx`        |
| `StatusBadge`      | 상태 배지      | `components/common/StatusBadge.tsx`      |
| `EmptyState`       | 빈 상태 표시   | `components/common/EmptyState.tsx`       |
| `ErrorState`       | 오류 상태 표시 | `components/common/ErrorState.tsx`       |
| `LoadingIndicator` | 로딩 표시      | `components/common/LoadingIndicator.tsx` |
| `ConfirmModal`     | 확인 모달      | `components/common/ConfirmModal.tsx`     |

---

### 8.2 주차장 컴포넌트

| 컴포넌트             | 역할                | 위치                                        |
| -------------------- | ------------------- | ------------------------------------------- |
| `ParkingCard`        | 주차장 요약 카드    | `components/parking/ParkingCard.tsx`        |
| `ParkingMarker`      | 지도 마커           | `components/parking/ParkingMarker.tsx`      |
| `ParkingBottomSheet` | 지도 하단 목록      | `components/parking/ParkingBottomSheet.tsx` |
| `CongestionBadge`    | 혼잡도 표시         | `components/parking/CongestionBadge.tsx`    |
| `ParkingStatusBadge` | 주차장 상태 표시    | `components/parking/ParkingStatusBadge.tsx` |
| `PriceInfoBox`       | 요금 정보           | `components/parking/PriceInfoBox.tsx`       |
| `SoonAvailableChip`  | 곧 비워질 자리 표시 | `components/parking/SoonAvailableChip.tsx`  |

---

### 8.3 공급자 컴포넌트

| 컴포넌트                 | 역할                | 위치                                             |
| ------------------------ | ------------------- | ------------------------------------------------ |
| `ProviderParkingCard`    | 공급자 주차장 카드  | `components/provider/ProviderParkingCard.tsx`    |
| `AvailabilityTimePicker` | 이용 가능 시간 설정 | `components/provider/AvailabilityTimePicker.tsx` |
| `PricePolicyForm`        | 요금 정책 입력      | `components/provider/PricePolicyForm.tsx`        |
| `ApprovalStatusCard`     | 승인 상태 표시      | `components/provider/ApprovalStatusCard.tsx`     |
| `SettlementSummaryCard`  | 정산 요약           | `components/provider/SettlementSummaryCard.tsx`  |

---

## 9. 상태값 사용 규칙

### 9.1 주차장 상태

| 상태값           | 화면 표시  |
| ---------------- | ---------- |
| `AVAILABLE`      | 이용 가능  |
| `SOON_AVAILABLE` | 곧 비워짐  |
| `OCCUPIED`       | 이용 중    |
| `FULL`           | 만차       |
| `INACTIVE`       | 운영 안 함 |

---

### 9.2 혼잡도 상태

| 상태값      | 화면 표시 |
| ----------- | --------- |
| `LOW`       | 여유      |
| `MEDIUM`    | 보통      |
| `HIGH`      | 혼잡      |
| `VERY_HIGH` | 매우 혼잡 |
| `UNKNOWN`   | 정보 부족 |

---

### 9.3 결제 상태

| 상태값               | 화면 표시 |
| -------------------- | --------- |
| `PENDING`            | 결제 대기 |
| `PAID`               | 결제 완료 |
| `FAILED`             | 결제 실패 |
| `NEEDS_CONFIRMATION` | 확인 필요 |
| `REFUNDED`           | 환불 완료 |

---

### 9.4 승인 상태

| 상태값           | 화면 표시 |
| ---------------- | --------- |
| `PENDING`        | 승인 대기 |
| `APPROVED`       | 승인 완료 |
| `REJECTED`       | 반려      |
| `NEEDS_REVISION` | 보완 요청 |

---

## 10. TypeScript 타입 작성 규칙

### 10.1 주요 타입 예시

```ts
export type ParkingStatus =
  | "AVAILABLE"
  | "SOON_AVAILABLE"
  | "OCCUPIED"
  | "FULL"
  | "INACTIVE";

export type CongestionLevel =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "VERY_HIGH"
  | "UNKNOWN";

export interface ParkingLot {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distanceMeters?: number;
  pricePerHour: number;
  status: ParkingStatus;
  congestionLevel: CongestionLevel;
}
```

---

### 10.2 타입 작성 기준

| 기준                   | 설명                                                    |
| ---------------------- | ------------------------------------------------------- |
| API 응답 타입 분리     | 서버 응답 구조를 명확히 표현한다.                       |
| 화면 props 타입 명시   | 컴포넌트 props는 interface로 정의한다.                  |
| 상태값 union type 사용 | 상태 문자열은 union type 또는 enum으로 관리한다.        |
| nullable 명확화        | 선택값은 `?` 또는 `null` 가능성을 명확히 표현한다.      |
| 도메인별 파일 분리     | `parking.ts`, `payment.ts`, `provider.ts`처럼 분리한다. |

---

## 11. API 연동 규칙

### 11.1 services 작성 기준

API 함수는 화면 파일에 직접 작성하지 않고 `services/`에 분리한다.

```ts
// services/parkingApi.ts
import type { ParkingLot } from "../types/parking";

export async function fetchNearbyParkingLots(params: {
  lat: number;
  lng: number;
  radius?: number;
}): Promise<ParkingLot[]> {
  // 실제 API 연동 전에는 mock 데이터 또는 fetch 구조를 사용한다.
  return [];
}
```

---

### 11.2 hooks 작성 기준

화면에서는 API 함수를 직접 호출하기보다 hook을 통해 사용한다.

```ts
// hooks/useNearbyParkingLots.ts
export function useNearbyParkingLots() {
  // loading, error, data 상태를 함께 반환한다.
}
```

---

### 11.3 API 오류 처리 기준

| 오류 유형     | 화면 처리                              |
| ------------- | -------------------------------------- |
| 네트워크 오류 | 재시도 버튼 제공                       |
| 권한 오류     | 로그인 또는 권한 안내 화면 이동        |
| 데이터 없음   | EmptyState 표시                        |
| 서버 오류     | ErrorState 표시                        |
| 결제 오류     | PaymentResultScreen에서 실패 상태 표시 |

---

## 12. Mock 데이터 사용 규칙

### 12.1 Mock 데이터 사용 목적

백엔드 API가 완성되기 전에도 화면 구조와 사용자 흐름을 검증하기 위해 mock 데이터를 사용할 수 있다.

---

### 12.2 Mock 데이터 위치

```text
src/frontend/src/data/
또는
src/frontend/src/mocks/
```

---

### 12.3 Mock 데이터 작성 기준

| 기준                          | 설명                                              |
| ----------------------------- | ------------------------------------------------- |
| 실제 API 응답과 유사하게 작성 | 추후 API 연결 시 수정 범위 최소화                 |
| 상태값 문서 기준 유지         | `AVAILABLE`, `FULL`, `LOW` 등 동일하게 사용       |
| 여러 상태 포함                | 이용 가능, 만차, 곧 비워짐, 혼잡 상태를 모두 포함 |
| 화면 검증 목적 명확화         | 테스트용 데이터임을 주석 또는 파일명으로 구분     |

---

## 13. UI 스타일 규칙

### 13.1 스타일 기본 원칙

| 원칙             | 설명                                                    |
| ---------------- | ------------------------------------------------------- |
| 지도 중심 UI     | 홈 화면은 지도와 하단 주차장 카드를 중심으로 구성한다.  |
| 카드형 정보 제공 | 주차장 정보는 카드 형태로 비교 가능하게 제공한다.       |
| 상태 배지 활용   | 주차 가능 여부와 혼잡도는 배지로 빠르게 인식하게 한다.  |
| 명확한 CTA       | 경로 안내, 이용 시작, 결제하기 등 주요 버튼을 강조한다. |
| 과도한 장식 지양 | 기능 이해를 방해하는 장식 요소를 줄인다.                |

---

### 13.2 주요 색상 방향

구체적인 색상값은 디자인 시스템 문서가 작성되면 그 기준을 따른다. 디자인 시스템 작성 전에는 다음 방향을 기준으로 한다.

| 용도        | 방향                            |
| ----------- | ------------------------------- |
| 기본 배경   | 밝고 깨끗한 배경                |
| 주요 버튼   | 신뢰감 있는 블루 또는 그린 계열 |
| 이용 가능   | 긍정 상태 색상                  |
| 혼잡/만차   | 경고 상태 색상                  |
| 결제 실패   | 오류 상태 색상                  |
| 비활성 상태 | 회색 계열                       |

---

### 13.3 접근성 기준

| 기준                  | 설명                                 |
| --------------------- | ------------------------------------ |
| 텍스트 가독성         | 작은 글씨 남용 금지                  |
| 버튼 터치 영역        | 모바일에서 충분한 터치 영역 확보     |
| 상태 색상 의존 최소화 | 색상뿐 아니라 텍스트로 상태 표시     |
| 오류 메시지 명확화    | 사용자가 다음 행동을 알 수 있게 작성 |
| 폼 입력 안내          | 필수 입력값과 오류 사유 표시         |

---

## 14. 네비게이션 구현 규칙

### 14.1 Navigator 구성 기준

```text
RootNavigator
├── AuthStackNavigator
├── MainTabNavigator
│   ├── HomeStackNavigator
│   ├── SearchStackNavigator
│   ├── ParkingStackNavigator
│   ├── ProviderStackNavigator
│   └── MyPageStackNavigator
└── ModalStack
```

---

### 14.2 Route 이름 관리

Route 이름은 `constants/routes.ts`에 정의한다.

```ts
export const ROUTES = {
  HOME_MAP: "HomeMap",
  PARKING_DETAIL: "ParkingDetail",
  DESTINATION_SEARCH: "DestinationSearch",
  PAYMENT: "Payment",
} as const;
```

화면 파일 내부에서 문자열을 직접 반복 사용하지 않는다.

---

### 14.3 화면 이동 기준

| 출발 화면                  | 이동 화면                 | 조건                       |
| -------------------------- | ------------------------- | -------------------------- |
| HomeMapScreen              | ParkingDetailScreen       | 주차장 카드 또는 마커 선택 |
| HomeMapScreen              | DestinationSearchScreen   | 검색창 선택                |
| DestinationSearchScreen    | RecommendedParkingScreen  | 목적지 선택                |
| ParkingDetailScreen        | RouteGuideScreen          | 경로 안내 선택             |
| ParkingDetailScreen        | ParkingSessionStartScreen | 이용 시작 선택             |
| ActiveParkingSessionScreen | ParkingSessionEndScreen   | 이용 종료 선택             |
| PaymentScreen              | PaymentResultScreen       | 결제 요청 완료             |
| ProviderHomeScreen         | ParkingLotCreateScreen    | 주차 공간 등록 선택        |

---

## 15. Claude Code Prompt 작성 기준

### 15.1 기본 Prompt 형식

Claude Code에 전달할 프롬프트는 다음 형식을 권장한다.

```text
목표:
- SmartPark의 [화면명/기능명]을 구현한다.

참고 문서:
- docs/harness/PRD.md
- docs/harness/FEATURE_SPEC.md
- docs/harness/SCREEN_STRUCTURE.md
- docs/harness/PROJECT_RULES.md
- docs/harness/CLAUDE.md

작업 범위:
- 생성/수정할 파일:
  - src/frontend/src/screens/...
  - src/frontend/src/components/...
  - src/frontend/src/services/...
- 변경하지 말아야 할 파일:
  - docs/
  - backend/

구현 기준:
- 화면명은 SCREEN_STRUCTURE.md 기준을 따른다.
- 상태값은 PROJECT_RULES.md 기준을 따른다.
- API 호출은 services/ 또는 hooks/로 분리한다.
- 로딩/오류/빈 상태를 포함한다.

완료 조건:
- 화면이 정상 렌더링된다.
- mock 데이터로 주요 상태를 확인할 수 있다.
- 변경 파일 목록과 검증 방법을 요약한다.
```

---

### 15.2 좋은 Prompt 예시

```text
목표:
- HomeMapScreen의 기본 UI를 구현한다.

참고 문서:
- docs/harness/SCREEN_STRUCTURE.md
- docs/harness/CLAUDE.md

작업 범위:
- src/frontend/src/screens/home/HomeMapScreen.tsx 생성
- src/frontend/src/components/parking/ParkingCard.tsx 생성
- src/frontend/src/data/parkingMock.ts 생성

구현 기준:
- 현재 위치 기반 주변 주차장 목록을 mock 데이터로 표시한다.
- 지도 영역은 임시 View로 구성하되, 추후 Naver Map으로 교체 가능하게 만든다.
- 주차장 카드에는 이름, 거리, 요금, 상태, 혼잡도를 표시한다.
- 상태값은 AVAILABLE, SOON_AVAILABLE, FULL, INACTIVE를 사용한다.

완료 조건:
- HomeMapScreen에서 mock 주차장 카드 목록이 표시된다.
- EmptyState와 ErrorState 구조가 포함된다.
- 변경 파일과 실행 방법을 요약한다.
```

---

### 15.3 피해야 할 Prompt 예시

```text
SmartPark 앱 전체를 한 번에 만들어줘.
```

위와 같은 요청은 범위가 너무 넓어 구조가 무너질 가능성이 높다. 반드시 화면, 기능, 파일 단위로 작업 범위를 나눈다.

---

## 16. 작업 결과 보고 규칙

Claude Code 작업 후 결과 보고는 다음 형식을 따른다.

```text
작업 완료 요약:
- 무엇을 구현했는지

변경 파일:
- 파일 경로 1
- 파일 경로 2

주요 구현 내용:
- 화면 구조
- 컴포넌트 구성
- 상태 처리
- API 또는 mock 데이터 연결

검증 방법:
- 실행 명령
- 확인해야 할 화면
- 기대 결과

주의사항:
- 아직 미구현된 부분
- 추후 백엔드 연결 필요 부분
```

---

## 17. 검증 기준

### 17.1 화면 검증 기준

| 항목        | 확인 내용                                       |
| ----------- | ----------------------------------------------- |
| 화면 렌더링 | 앱 실행 시 오류 없이 화면이 표시되는가          |
| 네비게이션  | 버튼 선택 시 올바른 화면으로 이동하는가         |
| 데이터 표시 | mock 또는 API 응답 데이터가 올바르게 표시되는가 |
| 상태 처리   | 로딩, 오류, 빈 상태가 표시되는가                |
| 상태값 표시 | 문서 기준 상태값이 올바른 텍스트로 변환되는가   |
| CTA 동작    | 주요 버튼이 사용자의 다음 행동과 연결되는가     |

---

### 17.2 코드 검증 기준

| 항목      | 확인 내용                                    |
| --------- | -------------------------------------------- |
| 파일 위치 | 지정된 폴더에 파일이 생성되었는가            |
| 네이밍    | 파일명, 컴포넌트명, 함수명이 규칙에 맞는가   |
| 타입      | TypeScript 타입이 명확한가                   |
| 중복      | 중복 코드가 과도하지 않은가                  |
| 분리      | 화면, 컴포넌트, hook, service가 분리되었는가 |
| 예외 처리 | 실패/빈 상태/권한 거부 처리가 있는가         |

---

## 18. Claude Code 작업 금지 사항

Claude Code는 다음 작업을 수행하지 않는다.

1. 사용자 확인 없이 전체 폴더 구조 변경
2. 사용자 확인 없이 대규모 리팩토링 수행
3. 화면명, route명, 상태값 임의 변경
4. 백엔드 코드를 임의로 대량 수정
5. API Key 또는 민감 정보를 코드에 삽입
6. 문서 기준과 다른 상태값 사용
7. mock 데이터와 실제 API 구조를 완전히 다르게 작성
8. 로딩/오류/빈 상태 없이 화면만 구현
9. 한 번에 앱 전체 기능 구현 시도
10. README, CHANGELOG, 하네스 문서를 임의로 삭제 또는 축소

---

## 19. v0.3.4 적용 기준

`v0.3.4`는 SmartPark 하네스 문서 중 Claude Code 프론트엔드 작업 지침을 확정하는 버전이다.

| 항목      | 내용                                                                                    |
| --------- | --------------------------------------------------------------------------------------- |
| 추가 문서 | `docs/harness/CLAUDE.md`                                                                |
| 주요 내용 | Claude Code 역할, 프론트엔드 폴더 구조, 화면 구현 규칙, 컴포넌트 규칙, Prompt 작성 기준 |
| 목적      | React Native 프론트엔드 구현 시 Claude Code가 일관된 기준으로 작업하도록 지원           |
| 연결 문서 | `PRD.md`, `FEATURE_SPEC.md`, `SCREEN_STRUCTURE.md`, `PROJECT_RULES.md`                  |
| 다음 작업 | `CODEX.md`, `PROMPT_LOG.md` 작성                                                        |

---

## 20. 정리

본 문서는 Claude Code가 SmartPark React Native 프론트엔드 구현을 수행할 때 따라야 할 작업 지침이다.

Claude Code는 본 문서를 기준으로 화면 구조, 컴포넌트 분리, 네비게이션 구성, 상태 처리, API 연동 구조를 작성해야 한다. 특히 SmartPark의 핵심 화면인 현재 위치 기반 주차장 탐색, 목적지 검색, 추천 주차장, 주차장 상세, NFC 이용 시작/종료, 결제, 공급자 등록 흐름을 `SCREEN_STRUCTURE.md`와 일관되게 구현해야 한다.

이 문서를 통해 SmartPark 프로젝트는 AI 개발 도구를 활용하더라도 문서, 화면, 코드, 형상관리 기준이 서로 연결된 상태를 유지할 수 있다.
