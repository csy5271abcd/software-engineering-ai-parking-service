# CHANGELOG

SmartPark 프로젝트의 주요 변경 사항과 Git tag 기준선을 정리한다.

---

## 정리 기준

- `v0.x.x`: 소프트웨어공학 산출물, 제품 기획 문서, 하네스 문서, 요구사항 문서 중심
- `v1.0.x`: React Native 프론트엔드 프로젝트 설정, 네비게이션, 기본 UI 구조 구축
- `v1.1.x`: Figma Make reference 기반 화면 정합성 개선, Home/Search/Parking/Session 플로우 구현
- 기존 임시 항목으로 작성된 `v1.2.0`, `v1.3.0`, `v1.4.0` 내용은 프론트엔드 구현 흐름에 맞춰 `v1.1.6`~`v1.1.8` 구간으로 재정리하였다.

---

## v1.1.10

### 공급자 기능 구현 — 대시보드 및 주차장 등록 Wizard

#### 참고 이미지

- `Provider_Default.png` / `Provider_Default_2.png` — 공급자 대시보드
- `Provider_ParkingLot_Register_1~5.png` — 5단계 등록 Wizard

#### 주요 변경

- `ProviderDashboardScreen.tsx` 신규 작성
  - 헤더: 뒤로가기 + "공급자" 제목 + "+ 주차장 등록" 파란 pill 버튼
  - 정산 요약 카드: 이번 달 정산 예정 금액, 이용건수·평균이용·활성주차장 3열 통계
  - 주황 알림 배너: 보완 요청 건수 표시
  - 등록된 주차 공간 카드 목록: 승인완료/승인대기/보완요청 상태 badge
  - 오늘의 이용 현황: 이용자별 행 (아바타, 이름, 시간, 요금)
- `ProviderRegisterWizardScreen.tsx` 신규 작성 (5단계 Wizard)
  - STEP 1: 기본 정보 (이름, 면수, 유형, 설명)
  - STEP 2: 위치 선택 (지도 placeholder + 주소 입력)
  - STEP 3: 사진 등록 (photo slot 3개 + 출입 방식 2×2 선택)
  - STEP 4: 시간·요금 (요일 선택, 시간, 요금 + 예상 수익 계산)
  - STEP 5: 미리보기 (등록 정보 요약 카드 + 안내 박스)
  - 하단 고정 버튼: 이전/다음 (마지막 단계는 "등록 신청")
- `MyPageScreen.tsx` "공급자" 섹션 추가 → `ProviderDashboardScreen`으로 이동
- `MyPageStackNavigator.tsx`: `ProviderDashboardScreen`, `ProviderRegisterWizardScreen` 스택 추가
- `MainTabNavigator.tsx` SESSION_SCREENS에 provider 화면 2개 추가 (탭바 숨김)
- `types/provider.ts`, `mocks/provider.mock.ts` 신규 작성
- `AppIcon.tsx`: `qrCode`, `keyRound`, `smartphoneNfc` 아이콘 추가

---

## v1.1.9

### 하단 탭 화면 구현 — 이용 내역, 저장한 주차장, MY

#### 참고 이미지

- `UsedHistory_Default.png` — 이용 내역 화면
- `Saved_Default.png` — 저장한 주차장 화면
- `My_Default.png` / `My_Default2.png` — 마이페이지 화면

#### 주요 변경

- `UsedHistoryScreen.tsx` 신규 작성 (이용 탭 메인 화면)
  - 요약 통계 카드 3개 (이번 달 12회, 결제 총액 ₩48k, 평균 시간 1.4시간)
  - 필터 chip 수평 스크롤 (전체/결제완료/확인필요/환불/이번 달/지난달)
  - 이용 내역 카드: 결제완료(초록), 확인필요(주황+경고박스), 환불(회색) 상태 badge
- `SavedParkingScreen.tsx` 신규 작성 (저장 탭 메인 화면)
  - 필터 탭 3개 (전체 12 / 즐겨찾기 5 / 최근 7)
  - 기존 `ParkingCard` 컴포넌트 재사용
  - 카드 클릭 시 `ParkingDetailScreen`으로 이동
- `MyPageScreen.tsx` 아이콘 업데이트
  - 메뉴 항목 아이콘을 reference 이미지 기준으로 보정
  - 버전 표기를 v1.1.9로 갱신
- `usageHistory.mock.ts` 신규 작성 (이용 내역 목업 데이터 5건)
- `ParkingStackNavigator.tsx`: `UsedHistoryScreen`을 첫 화면으로 변경
- `SearchStackNavigator.tsx`: `SavedParkingScreen`을 첫 화면으로 변경, 전체 세션 플로우 화면 포함
- `navigationTypes.ts`: `SearchStackParamList`, `ParkingStackParamList` 업데이트

#### 검증

- `npx tsc --noEmit` 통과
- `npm run android` 성공

---

## v1.1.8

### 검색 화면 이미지 기준 재구현

#### 참고 이미지

- `SearchScreen.png` — 검색 초기 화면
- `SearchScreen_Click_Place_Parking_List.png` — 장소 선택 후 추천 주차장 리스트

#### 주요 변경

- Home 상단 검색 박스 클릭 시 `DestinationSearchScreen`으로 이동하도록 연결
- 검색 화면에서 하단 탭바가 보이지 않도록 처리
- `SearchHeader.tsx` 신규 작성
  - editable 모드: 검색 입력 화면
  - non-editable 모드: 추천 주차장 리스트 화면에서 검색 복귀용 header
- `DestinationSearchScreen.tsx` 전면 재구현
  - 최근 검색 5개 항목 표시
  - 주차 수요 급증 지역 LIVE 리스트 표시
  - 검색어 입력 시 mock 기반 검색 결과 표시
- `RecommendedParkingScreen.tsx` 전면 재구현
  - 선택 목적지 카드
  - 도착 예정 시간 chip
  - AI 분석 배너
  - 추천 주차장 카드 리스트
- 추천 주차장 카드 클릭 시 `ParkingDetailScreen`으로 이동
- `AppIcon.tsx`에 `ChevronUp`, `Train` 아이콘 추가
- `KeyboardAvoidingView`와 `ScrollView` 하단 padding으로 키보드/리스트 겹침 보정

#### 검증

- `npx tsc --noEmit` 통과
- `npm run android` 성공

---

## v1.1.7

### 경로 안내, NFC 이용 시작, 이용 중 세션, 결제 플로우 구현

#### 참고 이미지

- `Home_ParkingDetail_Route_Click_UI.png` — 경로 안내 화면
- `Home_ParkingDetail_NFC_Click_1.png` — NFC 스캔 안내 모달
- `Home_ParkingDetail_NFC_Click_2.png` — NFC 인식 완료 모달
- `Payment_UI.png` — 이용 중 세션 화면
- `Payment_UI_2.png` — 결제 화면
- `Payment_UI_3.png` — 결제 완료 화면

#### 주요 변경

- `RouteScreen.tsx` 신규 구현
  - View 기반 지도 preview
  - 출발/도착 지점 표시
  - 파란 route line
  - 이동 수단 chip
  - 추천/무료도로/최단 경로 카드
- `NFCScanModal.tsx` 신규 구현
  - 어두운 dim overlay
  - scanning → success mock 상태 전환
  - NFC 태그 안내 및 인식 완료 UI
- `ActiveSessionScreen.tsx` 신규 구현
  - 파란 hero 영역
  - 이용 시간 타이머
  - 예상 결제 금액 카드
  - 출차 예정 시간 알림 chip
  - NFC 이용 종료·결제 CTA
- `PaymentScreen.tsx` 신규 구현
  - 주차 이용 요약
  - 최종 결제 금액
  - 결제 수단 선택 카드
  - 쿠폰 영역
- `PaymentResultScreen.tsx` 신규 구현
  - 결제 완료 check UI
  - 결제 금액/수단/승인번호 요약
  - 영수증 보기/완료 버튼
- `ParkingDetailScreen` 하단 CTA 연결
  - `경로 안내` → `RouteScreen`
  - `NFC 이용 시작` → `NFCScanModal` → `ActiveSessionScreen`
  - `결제하기` → `PaymentScreen` → `PaymentResultScreen`
- 실제 GPS, NFC, 결제 SDK 없이 mock UI flow로 구현

#### 검증

- `npx tsc --noEmit` 통과
- `npm run android` 성공

---

## v1.1.6

### 곧 비워질 자리, 마커 요약 BottomSheet, 주차장 상세 5탭 이미지 기준 재구현

#### 참고 이미지

- `Home_Empty_Seat_Soon.png` — 곧 비워질 자리 화면
- `Home_Click_Marker_ParkingSummary.png` — 마커 클릭 ParkingSummary BottomSheet
- `ParkingDetail1.png`~`ParkingDetail5.png` — 주차장 상세 5탭 화면

#### 주요 변경

- `SoonAvailableScreen.tsx` 재구현
  - 상단 header
  - mini map preview
  - 출차 예정 안내 banner
  - 곧 비워질 자리 카드 2개
- `SoonAvailableCard.tsx` 개선
  - 카드 전체 Pressable 처리
  - `react-native-svg` 기반 arc progress ring 적용
  - `8분 후`, `12분 후` 형식으로 표시
- `SelectedLotPreview.tsx` 재구현
  - badge row
  - 주차장명/주소/도보 거리
  - 3분할 stat card
  - 출발/도착/공유/신고 action row
  - 상세 정보 열기 버튼
- `ParkingDetailScreen.tsx` 재구현
  - hero map 영역
  - 주차장 badge/title block
  - 탭: 홈 / 요금·시간 / 혼잡도 / 주변 / 리뷰
  - 하단 고정 CTA: 경로 안내 / NFC 이용 시작
- 상세 탭별 구현
  - `DetailHomeTab`: 2x2 정보 카드, 주차장 사진, 이용 안내
  - `DetailPricingTab`: 요금 계산기, View 기반 slider, 요금 정책
  - `DetailCongestionTab`: 시간대별 혼잡도 bar chart, AI 분석 카드, 요일별 패턴
  - `DetailAroundTab`: 주변 주차장 리스트
  - `DetailReviewsTab`: 평점 요약, 리뷰 리스트
- 마커 클릭, 곧 비워질 자리, 주차장 카드 클릭에서 상세 화면으로 이동 연결

#### 검증

- `npx tsc --noEmit` 통과
- `npm run android` 성공

---

## v1.1.5

### Home 화면 Figma Make 이미지 기준 재보정 및 아이콘 적용

#### 참고 이미지

- `Home_Default.png`
- `Home_BottomSheet_Swipe_0.png`~`Home_BottomSheet_Swipe_3.png`
- `Home_Click_Marker_ParkingSummary.png`
- `Home_Empty_Seat_Soon.png`

#### 주요 변경

- Home 지도 영역을 Figma Make 이미지 기준으로 재보정
- `CategoryChips.tsx` 개선
  - `전체`, `이용가능`, `곧 비워짐`, `저렴` chip 디자인 보정
  - active/inactive 상태 정리
- `HomeWeatherBadge` 추가
  - 구름 아이콘, `20°`, `미세` 표시
- `ParkingMarker.tsx` 개선
  - P teardrop marker
  - 공유 주차장 Home marker
  - 곧 비워질 자리 시간 badge
- `FABStack.tsx`, `CurrentLocationButton.tsx`를 AppIcon 기반으로 교체
- `DefaultSheetContent.tsx` 개선
  - default: QuickShortcuts + 곧 비워질 자리 banner
  - half: 주변 주차장 2개 카드 표시
  - full: 주변 주차장 전체 목록 표시
- `MainTabNavigator.tsx` 조정
  - 하단 탭: 주변 / 저장 / 이용 / 스마트패스 / MY
  - active tab border 스타일 보정
- `AppIcon.tsx` 확장
  - `cloud`, `layers`, `cpu`, `flag`, `chevronRight`, `crosshair`, `shield`, `fileText` 등 추가

#### 검증

- `npx tsc --noEmit` 통과
- `npm run android` 성공

---

## v1.1.4

### SmartParkReDesign imports 기반 디자인 토큰 및 MyPage 재보정

#### 주요 변경

- `imports/tokens.jsx`, `Chrome.jsx`, `HomeScreen.jsx`, `OtherScreens.jsx`, `SearchDetail.jsx` 분석
- `src/theme/tokens.ts` 보정
  - `brandOrange`를 `#F5683C`로 변경
  - `bgCool`, `bgCoolSecondary`, `bgCoolWeak`, `borderWeak` 추가
  - `iconPrimary`, `iconTertiary`, `iconWeak` 추가
  - `textPrimary`~`textQuaternary` 추가
- `MainTabNavigator.tsx` 비활성 탭 색상 보정
- `SearchBar.tsx` placeholder 색상, fontWeight, fontSize 보정
- `DefaultSheetContent.tsx` soon banner 이모지를 `AppIcon name="clock"`으로 교체
- `RecommendedParkingScreen.tsx` 뒤로가기 버튼을 `AppIcon name="chevronLeft"`로 교체
- `MyPageScreen.tsx` 전면 재설계
  - mock 로그인 프로필
  - 통계 그리드
  - 결제·차량 / 알림·설정 / AI 투명성 / 고객 지원 메뉴 섹션

#### 검증

- `npx tsc --noEmit` 통과

---

## v1.1.3

### components/ui 분석 기반 React Native 공통 컴포넌트 구축

#### 주요 변경

- SmartParkReDesign `components/ui` 48개 파일 분석
- `src/theme/tokens.ts` 추가
  - `background`, `muted`, `surfaceMuted`, `accent`, `foreground`, `border`, `radius` 계열 토큰 구성
- 공통 컴포넌트 12종 추가
  - `AppButton`
  - `AppCard`
  - `AppBadge`
  - `AppChip`
  - `AppTextInput`
  - `AppTabs`
  - `AppSeparator`
  - `AppProgress`
  - `AppSwitch`
  - `AppSectionHeader`
  - `AppSurface`
  - `AppSheet`
- 주요 화면에 공통 컴포넌트 적용
  - ParkingDetail 탭바 → `AppTabs`
  - Search input → `AppTextInput` 계열 스타일
  - Recommendation 카드/배너 → `AppCard`, `AppBadge`, `AppChip`
  - MyPage 기본 구조 → profile card, menu section
- ScrollView 하단 padding 보정으로 하단 탭바/CTA 겹침 완화

#### 검증

- `npx tsc --noEmit` 통과
- `npm run android` 성공

---

## v1.1.2

### SmartParkReDesign 기준 주요 화면 디자인 폴리시 및 추천 탭 추가

#### 주요 변경

- 하단 탭 구조 변경
  - 공급자 탭 제거
  - 추천 탭 추가
  - 탭 구성: 주변 / 저장 / 이용 / 추천 / MY
- `RecommendStackNavigator.tsx` 추가
- `RecommendationScreen.tsx` 추가
  - 상황별 chip
  - AI 추천 주차장
  - 추천 이유 chip
  - 곧 비워질 자리
  - 목적지 주차 찾기 CTA
- `SearchBar` pill 스타일 보정
- `SectionHeader`, `CategoryChips` 스타일 정합성 개선

#### 검증

- `npx tsc --noEmit` 통과
- `npm run android` 성공

---

## v1.1.1

### lucide-react-native 아이콘 기반 구축 및 AppIcon 추가

#### 주요 변경

- `lucide-react-native@1.16.0` 설치
- `react-native-svg@15.15.5` 설치
- `AppIcon.tsx` 추가
  - `name`, `size`, `color`, `strokeWidth` props 지원
  - TypeScript union type으로 icon name 관리
- 하단 탭 아이콘을 View/Text 기반 구현에서 AppIcon 기반으로 교체
- `RecommendedParkingScreen`, `ParkingDetailScreen`의 일부 타입/불필요 import 정리

#### 검증

- `npx tsc --noEmit` 통과
- `npm run android` 성공

---

## v1.1.0

### SearchDetail.jsx 기준 검색, 추천, 상세, 곧 비워질 자리 화면 최초 구현

#### 주요 변경

- `DestinationSearchScreen.tsx` 전면 재작성
- 검색 관련 컴포넌트 추가
  - `SearchResultItem`
  - `SearchInitialState`
  - `SearchLiveResults`
  - `ArrivalTimeSelector`
  - `SearchFilterModal`
- `RecommendedParkingScreen.tsx` 추가
- `ParkingDetailScreen.tsx` 전면 재작성
  - hero map
  - 5탭 구조
  - 하단 CTA
- 상세 탭 컴포넌트 추가
  - `StatBlock`
  - `DetailActionBar`
  - `DetailHomeTab`
  - `DetailPricingTab`
  - `DetailCongestionTab`
  - `DetailAroundTab`
  - `DetailReviewsTab`
- `SoonAvailableScreen.tsx`, `SoonAvailableCard.tsx` 추가
- Home BottomSheet 곧 비워짐 banner에서 SoonAvailableScreen으로 이동 연결

#### 검증

- `npx tsc --noEmit` 통과
- `npm run android` 성공

---

## v1.0.11

### Home 화면 컴포넌트 분리 및 Claude Design 정합성 개선

#### 주요 변경

- `CategoryChips.tsx` 추가
- `FABStack.tsx` 추가
- `CurrentLocationButton.tsx` 추가
- `SectionHeader.tsx` 추가
- `QuickShortcuts.tsx` 추가
- `SelectedLotPreview.tsx` 추가
- `DefaultSheetContent.tsx` 추가
- `ParkingBottomSheet.tsx` 리팩터링
- `HomeMapScreen.tsx` zIndex 및 위치 계산 정리
- `ParkingMarker.tsx` SOON_AVAILABLE 시간 badge 개선

#### 검증

- `npx tsc --noEmit` 통과
- `npm run android` 성공

---

## v1.0.10

### ParkingBottomSheet 4단계 swipe 전환 구현

#### 주요 변경

- `ParkingBottomSheet`를 `hidden` / `default` / `half` / `full` 4단계로 재구성
- `SHEET_SNAP` 기준
  - hidden: 0
  - default: 화면 30%
  - half: 화면 50%
  - full: 화면 100%
- `Animated.Value`와 `PanResponder`를 사용해 handle 영역 drag 구현
- full 모드에서만 내부 ScrollView 활성화
- hidden 상태에서 재오픈 탭바 표시
- `HomeMapScreen`에서 sheet 상태별 current location button 위치 동적 계산

#### 검증

- `npx tsc --noEmit` 통과
- `npm run android` 성공

---

## v1.0.9

### ParkingBottomSheet, ParkingCard, HomeMapScreen 연결

#### 주요 변경

- `ParkingStatusBadge`, `CongestionBadge` 추가
- `ParkingCard.tsx` 추가
  - 썸네일, rank badge, AI 점수, 상태/혼잡도/태그, 요금/거리, 출차 예정 banner 표시
- 초기 `ParkingBottomSheet.tsx` 추가
  - collapsed / half / expanded 3모드
  - 선택 주차장 미리보기
  - QuickShortcuts
  - 곧 비워질 자리 banner
  - 카드 목록
- `HomeMapScreen`에서 `HomeParkingSummary`를 `ParkingBottomSheet`로 교체

#### 검증

- `npx tsc --noEmit` 통과
- `npm run android` 성공

---

## v1.0.8

### HomeMapScreen 1차 UI 개선

#### 주요 변경

- `MainTabNavigator`를 custom tab bar로 재구성
- 하단 탭 라벨: 주변 / 저장 / 이용 / 공급자 / MY
- `ParkingMarker`를 teardrop 형태로 개선
- `HomeMapScreen`에 CategoryChips 추가
- 카테고리 필터링 및 selected marker 초기화 처리
- `HomeParkingSummary`를 QuickShortcuts + 곧 비워짐 banner 중심으로 변경
- 검색바, 카테고리 칩, FAB, 하단 패널, 탭바 간 겹침 보정

#### 검증

- `npx tsc --noEmit` 통과
- `npm run android` 성공

---

## v1.0.7

### React Navigation 구성 및 Android Native 빌드 안정화

#### 주요 변경

- `@react-navigation/native-stack` 제거
- `@react-navigation/stack` 기반으로 전환
- 주요 navigator 구성
  - `RootNavigator`
  - `HomeStackNavigator`
  - `SearchStackNavigator`
  - `ParkingStackNavigator`
  - `ProviderStackNavigator`
  - `MyPageStackNavigator`
  - `MainTabNavigator`
- `newArchEnabled=true` 설정
- Windows + NDK + CMake 환경의 `c++_shared` 링킹 문제 보완
- Android 실기기에서 하단 탭 표시 확인

#### 검증

- `npx tsc --noEmit` 통과
- `npm run android` 성공

---

## v1.0.6

### 프론트엔드 소스코드 Git 추적 오류 수정

- `src/frontend`가 하위 저장소처럼 보이는 문제 점검
- `git ls-files -s src/frontend`로 실제 파일 추적 상태 확인
- 프론트엔드 소스코드가 부모 저장소에서 정상 추적되도록 정리
- 원격 `origin/main` 반영 완료

---

## v1.0.5

### 타입 정의 및 mock 데이터 구현

- `types/common.ts` 추가
- `types/parking.ts` 추가
- `types/user.ts` 추가
- `types/payment.ts` 추가
- `types/index.ts` 추가
- `mocks/parkingLots.mock.ts` 추가
- `mocks/index.ts` 추가
- 주차장 상태, 혼잡도, 요금, 위치, 추천 점수 mock 데이터 구성

#### 검증

- `npx tsc --noEmit` 통과

---

## v1.0.4

### 디자인 토큰 및 공통 상수 구현

- `theme/colors.ts` 추가
- `theme/spacing.ts` 추가
- `theme/radius.ts` 추가
- `theme/typography.ts` 추가
- `theme/shadow.ts` 추가
- `theme/index.ts` 추가
- `constants/routes.ts` 추가
- `constants/status.ts` 추가

#### 검증

- `npx tsc --noEmit` 통과

---

## v1.0.3

### 프론트엔드 기본 폴더 구조 설정

- `src/frontend/src/` 하위 기본 폴더 생성
- `navigation`, `screens`, `components`, `services`, `hooks`, `types`, `mocks`, `theme`, `constants`, `utils`, `assets` 구성
- 화면/컴포넌트 하위 폴더 분리
- 빈 폴더 추적용 `.gitkeep` 추가

---

## v1.0.2

### Android 실기기 실행 및 CMake/NDK 오류 수정

- `android/app/src/main/jni/CMakeLists.txt` 추가/수정
- `c++_shared` 링크 설정 명시
- `android/app/build.gradle` CMake 설정 보완
- Gradle/CMake 캐시 정리 후 재빌드
- Android 실기기 `SM-S911N` 실행 성공

---

## v1.0.1

### React Native TypeScript 프로젝트 설정

- `src/frontend/` 하위 React Native CLI 프로젝트 생성
- React Native 0.85.3 + React 19.2.3 + TypeScript 5.8.3 기반
- `App.tsx`를 SmartPark 기본 화면으로 교체
- `package.json`, `tsconfig.json`, `android/`, `ios/`, `index.js` 구조 확인
- `npm install` 완료

---

## v1.0.0

### 프론트엔드 구현 단계 시작 및 디자인 시스템 reference 추가

- `docs/design/reference/naver-map-design-system/` 하위 이미지 reference 추가
- `docs/design/NAVER_MAP_STYLE_GUIDE.md` 추가
- Naver Map Design System 기반 컴포넌트/토큰 기준 정리
- 색상, 타이포그래피, 반지름, 간격, 레이아웃, elevation, icon 기준 작성

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
- 제품 목표, MVP 범위, 핵심 기능 요구사항 정리

---

## v0.2.9

### 제품 기획 문서 변경 이력 정리

- `CHANGELOG.md` 갱신
- `v0.2.3`~`v0.2.8` 이력을 문서별로 분리 정리

---

## v0.2.8

### 제품 기획 문서 완료 현황 반영

- `README.md` 갱신
- `CHANGELOG.md` 갱신
- `docs/product/` 문서 5종 완료 현황 반영

---

## v0.2.7

### 비즈니스 모델 문서 작성

- `docs/product/BUSINESS_MODEL.md` 추가
- 목표 시장, 수익 모델, 비용 구조, 성장 전략 정리

---

## v0.2.6

### 서비스 시나리오 문서 작성

- `docs/product/SERVICE_SCENARIO.md` 추가
- 서비스 이용 상황을 시나리오 단위로 정리

---

## v0.2.5

### 경쟁 서비스 분석 문서 작성

- `docs/product/COMPETITOR_ANALYSIS.md` 추가
- 모두의주차장, 카카오 T 주차, 아이파킹 등과 SmartPark 비교

---

## v0.2.4

### 사용자 여정 문서 작성

- `docs/product/USER_JOURNEY.md` 추가
- 사용자 유형별 서비스 이용 흐름 정리

---

## v0.2.3

### 페르소나 문서 작성

- `docs/product/PERSONA.md` 추가
- 일반 운전자, 일정 기반 방문 운전자, 공급자, 관리자 페르소나 정의

---

## v0.2.2

### 폴더 구조 설명 문서 추가

- `FOLDER_STRUCTURE.md` 추가
- 저장소 구조와 산출물 폴더 역할 정리
- `README.md`, `configuration_management_plan.md` 보완

---

## v0.2.1

### CHANGELOG 갱신

- 프로젝트 초기 변경 이력 정리

---

## v0.2.0

### 프로젝트관리계획서 등록

- 프로젝트관리계획서 Markdown 등록
- 프로젝트관리계획서 참고용 PDF 등록

---

## v0.1.1

### 프로젝트정의서 파일명 정리

- 프로젝트정의서 파일명을 형상관리 규칙에 맞게 정리
