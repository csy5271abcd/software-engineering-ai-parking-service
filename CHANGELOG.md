# CHANGELOG

SmartPark 프로젝트의 주요 변경 사항과 버전 tag 기록을 정리한다.

---

## v0.1.1

- 프로젝트정의서 파일명을 형상관리 규칙에 맞게 정리

---

## v0.2.0

- 프로젝트관리계획서 md 등록
- 프로젝트관리계획서 참고용 PDF 등록

---

## v0.2.1

- CHANGELOG 갱신

---

## v0.2.2

- `FOLDER_STRUCTURE.md` 추가
- 프로젝트 루트, `docs`, `src` 폴더의 역할 정리
- `requirements`, `plan`, `design`, `product`, `harness`, `test` 폴더 설명 추가
- 공식 과제 산출물과 추가 프로젝트 산출물의 관리 기준 정리
- `README.md`에 저장소 구조, 산출물 구성, 주요 문서 링크 추가
- `configuration_management_plan.md`에 추가 산출물 관리 기준과 폴더 구조 관리 항목 보완

---

## v0.2.3

- `docs/product/PERSONA.md` 추가
- SmartPark의 주요 사용자 유형과 대표 페르소나 정리
- 일반 운전자, 일정 기반 방문 운전자, 개인 주차 공간 공급자, 상가 주차장 관리자, 서비스 운영 관리자 정의
- 요구사항 정의와 UI/UX 설계의 근거가 되는 사용자 분석 문서 작성

---

## v0.2.4

- `docs/product/USER_JOURNEY.md` 추가
- SmartPark 사용자 유형별 서비스 이용 흐름 정리
- 일반 이용자, 공급자, 관리자 관점의 사용자 여정 작성
- 사용자 흐름 기반 기능 요구사항 후보, 화면 우선순위, 테스트 케이스 연결 방향 정리

---

## v0.2.5

- `docs/product/COMPETITOR_ANALYSIS.md` 추가
- 모두의주차장, 카카오 T 주차, 아이파킹, TMAP 주차, 공공 주차 정보, 지도 서비스와 SmartPark 비교
- 기존 주차 서비스 대비 SmartPark의 차별성 정리
- AI 혼잡도 분석, 곧 비워질 자리 안내, 개인 주차장 공유, NFC 기반 이용 흐름을 경쟁 전략으로 정리

---

## v0.2.6

- `docs/product/SERVICE_SCENARIO.md` 추가
- SmartPark의 실제 서비스 이용 상황을 시나리오 단위로 정리
- 도심 주차장 탐색, 병원 예약 시간 기반 탐색, 곧 비워질 자리 이용, 개인 주차 공간 등록, 상가 주차장 운영, NFC 결제, 관리자 승인/신고 처리 시나리오 작성
- 서비스 시나리오 기반 요구사항, 화면 흐름, 데이터 흐름, 테스트 케이스 연결 방향 정리

---

## v0.2.7

- `docs/product/BUSINESS_MODEL.md` 추가
- SmartPark의 목표 시장, 고객 세그먼트, 가치 제안, 수익 모델, 비용 구조, 성장 전략 정리
- 이용 건당 중개 수수료, 결제 수수료, 상위 노출, B2B 구독, 멤버십 모델 정리
- 제품 기획 문서를 기반으로 향후 요구사항 정의서, 요구사항 분석서, 화면 설계서 작성 기반 마련

---

## v0.2.8

- `README.md` 갱신
- `CHANGELOG.md` 갱신
- `docs/product/` 폴더의 제품 기획 문서 5종 작성 완료 현황을 README에 반영
- 추가 프로젝트 산출물 목록에 `PERSONA.md`, `USER_JOURNEY.md`, `COMPETITOR_ANALYSIS.md`, `SERVICE_SCENARIO.md`, `BUSINESS_MODEL.md` 완료 상태 반영
- 현재 진행 상태에 SmartPark의 사용자 분석, 사용자 여정, 경쟁 서비스 분석, 서비스 시나리오, 비즈니스 모델 정리 완료 내용 추가
- 제품 기획 문서 작성 이력을 CHANGELOG에 반영

---

## v0.2.9

- `CHANGELOG.md` 갱신
- 제품 기획 문서 작성 이력을 `v0.2.3`부터 `v0.2.7`까지 문서별로 분리하여 정리
- `v0.2.8` 항목에 `README.md`와 `CHANGELOG.md` 갱신 내용을 추가
- 버전 tag 흐름이 실제 작업 순서와 일치하도록 변경 이력 정리
- 향후 요구사항 정의서 작성 전 기준 변경 이력 정리 완료

---

## v0.3.0

- `docs/harness/PRD.md` 추가
- SmartPark의 제품 요구사항, 제품 목표, MVP 범위, 핵심 기능 요구사항 정리
- 주요 사용자, 가치 제안, 화면 요구사항, 데이터 요구사항, 비기능 요구사항 정리
- Claude Code와 Codex가 SmartPark 프로젝트를 일관성 있게 이해하고 작업할 수 있도록 하네스 기준 문서 작성
- 향후 `FEATURE_SPEC.md`, `SCREEN_STRUCTURE.md`, `PROJECT_RULES.md`, `CLAUDE.md`, `CODEX.md`, `PROMPT_LOG.md` 작성 기반 마련

---

## v0.3.1

- `docs/harness/FEATURE_SPEC.md` 추가
- SmartPark의 핵심 기능을 개발 가능한 단위로 분해하여 정리
- 현재 위치 기반 주차장 조회, 목적지 기반 검색, 주차장 상세 조회, 곧 비워질 자리 안내 기능 명세 작성
- 개인/상가 주차 공간 등록, 이용 가능 시간 및 요금 설정, NFC 이용 시작/종료, 결제 내역 저장 기능 명세 작성
- AI/규칙 기반 혼잡도 분석, 관리자 승인/반려, 신고 및 분쟁 관리, 결제 오류 관리, 운영 통계 기능 명세 작성
- 기능별 입력값, 출력값, 예외 상황, API 후보, 완료 기준, 테스트 케이스 연결 방향 정리

---

## v0.3.2

- `docs/harness/SCREEN_STRUCTURE.md` 추가
- SmartPark React Native 앱의 전체 화면 구조와 네비게이션 구성 정리
- RootNavigator, MainTabNavigator, HomeStack, SearchStack, ParkingStack, ProviderStack, MyPageStack 구조 정의
- 일반 이용자, 공급자, 관리자 관점의 주요 화면 흐름 정리
- 메인 지도, 목적지 검색, 추천 주차장, 상세 화면, NFC 이용, 결제, 공급자 등록, 관리자 승인 화면 구조 작성
- 화면별 주요 컴포넌트, 상태값, API 연결 기준, 테스트 케이스 연결 방향 정리

---

## v0.3.3

- `docs/harness/PROJECT_RULES.md` 추가
- SmartPark 프로젝트의 코드 작성 규칙, 폴더 관리 규칙, 문서 작성 규칙 정리
- React Native 프론트엔드와 Spring Boot 백엔드의 기본 파일 구조 및 네이밍 규칙 정의
- 주차장 상태, 주차 세션 상태, 결제 상태, 승인 상태, 신고 상태의 상태값 관리 기준 정리
- Git commit 메시지, tag 생성, CHANGELOG 작성 규칙 정리
- Claude Code와 Codex 작업 시 따라야 할 AI 도구 작업 규칙 및 프롬프트 작성 기준 정리
- 문서, 프론트엔드, 백엔드 검토 체크리스트와 금지 사항 정리

---

## v0.3.4

- `docs/harness/CLAUDE.md` 추가
- Claude Code가 SmartPark React Native 프론트엔드 구현 시 참고할 작업 지침 정리
- Claude Code의 역할, 작업 범위, 금지 사항, 기본 작업 흐름 정의
- 프론트엔드 폴더 구조, 화면 구현 규칙, 컴포넌트 구현 규칙, 네이밍 규칙 정리
- HomeMapScreen, DestinationSearchScreen, RecommendedParkingScreen, ParkingDetailScreen, ActiveParkingSessionScreen, PaymentScreen, ProviderHomeScreen 등 주요 화면별 구현 기준 작성
- API 연동, mock 데이터, 상태값, 네비게이션, Prompt 작성 기준 정리
- Claude Code 작업 결과 보고 형식과 검증 기준 정리

---

## v0.3.5

- `docs/harness/CODEX.md` 추가
- Codex가 SmartPark Spring Boot 백엔드 설계 및 문서화 작업 시 참고할 작업 지침 정리
- Codex의 역할, 작업 범위, 금지 사항, 기본 작업 흐름 정의
- 백엔드 폴더 구조, 도메인 설계 기준, Entity/DTO/API 작성 규칙 정리
- User, Provider, ParkingLot, ParkingSpace, ParkingSession, Payment, Settlement, Report, CongestionPrediction, NfcTag 등 핵심 도메인 기준 작성
- 주차장 조회, 목적지 기반 검색, 공급자 등록, 관리자 승인, NFC 이용 시작/종료, 결제 및 정산, 신고 처리, 혼잡도 분석 로직 기준 정리
- 공통 응답, 예외 처리, 외부 API 연동, 데이터베이스 설계, 보안/권한, 테스트 작성 기준 정리
- Codex Prompt 작성 기준과 작업 결과 보고 형식 정리

---

## v0.3.6

- `docs/harness/PROMPT_LOG.md` 추가
- SmartPark 프로젝트에서 AI 도구에 입력한 프롬프트와 생성 결과, 수정 사항을 기록하기 위한 문서 작성
- 프롬프트 기록 대상, 제외 가능 항목, 기록 방식, 기록 템플릿 정리
- PRD, FEATURE_SPEC, SCREEN_STRUCTURE, PROJECT_RULES, CLAUDE, CODEX 문서 작성 과정의 주요 프롬프트 기록 정리
- Claude Code와 Codex 작업 프롬프트 예시, 문서 수정 프롬프트 예시, 오류 수정 기록 양식 작성
- AI 기반 작업 결과를 commit, tag, CHANGELOG와 연결하기 위한 형상관리 기준 정리

---

## v0.3.7

- `README.md` 갱신
- `CHANGELOG.md` 갱신
- `docs/harness/` 폴더의 하네스 문서 7종 작성 완료 현황을 README에 반영
- 추가 프로젝트 산출물 목록에 `PRD.md`, `FEATURE_SPEC.md`, `SCREEN_STRUCTURE.md`, `PROJECT_RULES.md`, `CLAUDE.md`, `CODEX.md`, `PROMPT_LOG.md` 완료 상태 반영
- 현재 진행 상태에 SmartPark의 제품 요구사항, 기능 명세, 화면 구조, 프로젝트 작업 규칙, Claude Code/Codex 작업 지침, 프롬프트 기록 기준 정리 완료 내용 추가
- 하네스 문서 작성 이력을 CHANGELOG에 `v0.3.0`부터 `v0.3.6`까지 문서별로 분리하여 정리

---

## v0.3.8

- `docs/requirements/과제3.요구사항정의서.md` 추가
- `docs/requirements/과제3.요구사항정의서.pdf` 추가
- SmartPark의 기능적 요구사항, 비기능적 요구사항, 외부 인터페이스 요구사항, 데이터 요구사항 정리
- 일반 이용자, 공급자, 운영 관리자 관점의 요구사항 분리
- 위치 기반 주차장 조회, 목적지 기반 검색, 곧 비워질 자리 안내, 개인/상가 주차 공간 등록, NFC 이용, 결제, 혼잡도 분석, 관리자 승인/신고 관리 요구사항 작성
- 운영 정책, 제약사항, 가정사항, 향후 확장사항, 특이사항을 기타 요구사항으로 보강
- `README.md`의 과제3 요구사항정의서 상태를 완료로 갱신
- 향후 요구사항 분석서, 소프트웨어 설계서, 테스트 결과서 작성 기준 마련

---

## v0.3.9

- `docs/requirements/과제4.요구사항분석서.md` 추가
- `docs/requirements/과제4.요구사항분석서.pdf` 추가
- SmartPark 요구사항 분석서 작성 완료
- 서론, 시스템 개요, 요구사항 명세, 인터페이스 분석, 제약사항, 요구사항 추적표, 참고문헌 및 부록 구성
- Use Case Diagram, Use Case Description, 정적 분석 클래스 다이어그램, CRC 카드, 동적 분석 시퀀스 다이어그램 반영
- SmartPark의 현재 위치 기반 주차장 조회, 목적지 기반 검색, 곧 비워질 자리 확인, 공급자 등록, NFC 이용, 결제, 관리자 승인/신고 처리 흐름을 분석 모델로 구체화
- 일반 표 스타일을 정리하고, UseCase Description 및 CRC 카드 표 형식은 샘플 문서 형식에 맞게 유지
- `README.md`의 과제4 요구사항분석서 상태를 완료로 갱신
- 향후 과제5 소프트웨어설계서, 과제6 인스펙션예제, 과제7 테스트결과서 작성 기준 마련

---

## v0.4.0

- 구현 단계 진입을 위한 문서 전반 보강
- `FOLDER_STRUCTURE.md`에 `src/ai` 폴더와 AI 데이터/모델/스크립트 구조 추가
- `configuration_management_plan.md`에 프론트엔드, 백엔드, AI 분석 모듈 형상 항목 세분화
- `docs/harness/PROJECT_RULES.md`에 Python AI 분석 모듈 규칙, 데이터 관리 규칙, 모델링 규칙 추가
- `docs/harness/FEATURE_SPEC.md`의 F-09 AI/규칙 기반 혼잡도 분석 기능을 Mock 데이터 생성, 예측 결과, MySQL 적재, API 연동 기준으로 보강
- `docs/harness/SCREEN_STRUCTURE.md`에 1차 MVP 화면 범위와 ParkingBottomSheet 중심 흐름 추가
- `docs/harness/CLAUDE.md`에 Android 실기기 USB 검증, NaverMaps 스타일 UI 구현 기준, 1차 MVP Prompt 예시 추가
- `docs/harness/CODEX.md`에 Swagger/OpenAPI, AWS 배포 설정, Tmap API, AI 예측 결과 CSV 적재 기준 추가
- `docs/harness/PRD.md`에 1차 MVP 범위와 AI Mock 데이터 요구사항 보강
- `docs/harness/PROMPT_LOG.md`에 구현 방향 수립 및 문서 보강 프롬프트 기록 추가
- `docs/product/SERVICE_SCENARIO.md`의 SS-09를 AI Mock 데이터 생성 및 혼잡도 예측 흐름 중심으로 보강
- `README.md`에 구현 진행 방향과 `src/ai` 구조 반영

---

## v1.0.0

- SmartPark 프론트엔드 구현 단계 시작
- `docs/design/reference/naver-map-design-system/` 하위에 Naver Map Design System 이미지 reference 추가
- `docs/design/NAVER_MAP_STYLE_GUIDE.md` 추가
- Component 기준 정리: BottomSheet, SearchBar, Chip, Button(CTA/Pill), Header, NaviBar, Modal, Tab, Card, MapMarker, Pagination, Radio, Switch, TimePicker, Drop Down
- Foundation 기준 정리: Color(Black&White/Warm Gray/Cool Gray/Green/Red/Orange), Typography(KR/EN,NUM), Radius, Spacing, Layout, Elevation, Icon
- 프론트엔드 구현은 `v1.x.x` 버전 체계로 관리 시작

---

## v1.0.1

- `src/frontend/` 하위에 React Native TypeScript 프로젝트 설정 완료
- React Native 0.85.3 + TypeScript 기반 CLI 프로젝트 생성 (`@react-native-community/cli` 사용)
- `App.tsx`를 SmartPark 기본 앱 화면으로 정리 (예제 문구 제거)
- `package.json`, `tsconfig.json`, `android/`, `ios/`, `index.js` 구조 확인
- `npm install` 완료 및 Android 실행을 위한 기본 프로젝트 구조 준비
- 이후 Android 실기기 실행 확인 단계로 연결

---

## v1.0.2

- Android 실기기 실행 검증 중 발생한 CMake/NDK 링크 오류 수정
- `android/app/src/main/jni/CMakeLists.txt` 추가 또는 수정
- `c++_shared` 링크 설정을 명시하여 React Native Android Native 빌드 오류 보완
- `android/app/build.gradle`의 CMake 설정 확인 및 보완
- Gradle/CMake 캐시 정리 후 재빌드 수행
- `npm run android` 실행 결과 Android 실기기 설치 및 앱 실행 성공

---

## v1.0.3

- SmartPark 프론트엔드 기본 폴더 구조 설정
- `src/frontend/src` 하위에 화면, 컴포넌트, 서비스, 훅, 타입, mock 데이터, theme, constants 구조 준비
- `screens/` 하위에 `common`, `auth`, `home`, `search`, `parking`, `provider`, `mypage`, `admin` 영역 분리
- `components/` 하위에 `common`, `map`, `parking`, `bottomSheet`, `provider`, `admin` 영역 분리
- 빈 폴더 추적을 위한 `.gitkeep` 추가
- 이후 디자인 토큰 구현 단계로 연결

---

## v1.0.4

- SmartPark 디자인 토큰 구현
- `theme/` 하위에 색상, 간격, 반지름, 타이포그래피 기준 분리
- `NAVER_MAP_STYLE_GUIDE.md`의 Naver Map Design System 기준을 React Native UI 토큰으로 변환
- SearchBar, Chip, BottomSheet, Card, FAB 구현에 재사용 가능한 theme 기반 마련

---

## v1.0.5

- React Navigation 기반 기본 네비게이션 구조 구현
- RootNavigator, MainTabNavigator, Home/Search/Parking/Provider/MyPage Stack 구조 준비
- route name과 navigation param 타입 분리
- 이후 화면 단위 구현을 위한 이동 구조 기준 마련

---

## v1.0.6

- 주차장 도메인 타입 및 mock 데이터 구조 구성
- `ParkingLot`, `ParkingStatus`, `CongestionLevel`, `ParkingType` 등 핵심 타입 정의
- Home 화면, 주차장 카드, 바텀시트, 상세 화면에서 공통으로 사용할 mock 데이터 작성
- 지도 마커와 목록 카드가 같은 데이터 구조를 사용할 수 있도록 정리

---

## v1.0.7

- 주차장 데이터 접근을 위한 service/hook 구조 준비
- mock 데이터 기반 `parkingService`와 `useNearbyParkingLots` 구조 작성
- 이후 백엔드 API 연동 시 mock → API 교체가 쉽도록 호출 계층 분리
- 화면 내부에서 직접 데이터를 가공하지 않도록 기본 구조 정리

---

## v1.1.0

- Figma Make reference 기반 주요 이용자 화면 1차 구현
- HomeMapScreen, DestinationSearchScreen, RecommendedParkingScreen, ParkingDetailScreen 기본 흐름 구성
- 현재 위치 기반 지도 placeholder, 검색 진입, 추천 주차장 목록, 상세 화면 연결
- mock 데이터 기반으로 주차장 상태, 요금, 거리, 혼잡도 정보 표시

---

## v1.1.1

- `lucide-react-native` 기반 AppIcon 시스템 구축
- 화면 및 컴포넌트에서 사용하는 주요 아이콘을 공통 컴포넌트로 래핑
- 지도, 검색, 주차장 카드, 추천, 결제, 마이페이지 영역에서 아이콘 사용 기준 통일
- 이후 Lucide 아이콘 기반 마커와 상태 UI 확장 기반 마련

---

## v1.1.2

- 하단 탭 구조 보정
- 공급자 탭을 기본 하단 탭에서 제거하고 추천 탭 중심 구조로 재정리
- 일반 이용자 중심 MVP 흐름에 맞춰 Home, Search/Recommend, Parking, Saved, MyPage 구조 보정
- 공급자 화면은 MyPage 내부 진입 흐름으로 분리

---

## v1.1.3

- Figma Make UI primitive 기반 공통 컴포넌트 구축
- Button, Card, Badge, Chip, Section Header 등 반복 UI 요소 정리
- Home/Search/Parking 화면에서 재사용할 수 있는 공통 스타일 기준 마련
- Naver Map Design System과 Figma Make reference를 함께 반영할 수 있도록 UI 구조 정리

---

## v1.1.4

- imports 폴더 기준 디자인 토큰 및 MyPage 일부 보정
- theme, constants, AppIcon 사용 기준을 화면 구현에 맞게 조정
- MyPage의 프로필, 통계, 메뉴 섹션 UI 정리
- 하단 탭 active 상태와 화면별 spacing 일부 보정

---

## v1.1.5

- Home 화면 Figma Make 이미지 기준 재보정 및 아이콘 적용
- 지도 영역, 상단 검색바, 카테고리 chip, 날씨 badge, FAB, QuickShortcuts 배치 보정
- BottomSheet 진입 전 Home 화면의 정보 계층 정리
- 지도 위 overlay UI가 실제 앱 화면에서 자연스럽게 보이도록 간격과 레이어 정리

---

## v1.1.6

- 곧 비워질 자리, ParkingSummary, ParkingDetail 5탭 화면 보정
- Home BottomSheet에서 곧 비워질 자리 banner와 주변 주차장 카드 연결
- ParkingSummary BottomSheet와 ParkingDetailScreen 이동 흐름 정리
- ParkingDetailScreen에 홈, 요금·시간, 혼잡도, 주변, 리뷰 탭 구조 반영

---

## v1.1.7

- 경로 안내, NFC 이용 시작, 이용 중 세션, 결제 플로우 구현
- ParkingDetail의 경로 안내 버튼을 RouteScreen과 연결
- NFC START mock 성공 후 ActiveSessionScreen으로 이동
- 이용 중 화면에서 시간과 예상 요금 표시
- PaymentScreen, PaymentResultScreen까지 기본 결제 mock 흐름 연결

---

## v1.1.8

- 검색 화면 및 장소 선택 후 추천 주차장 리스트 화면 보정
- Home 상단 검색바 클릭 시 DestinationSearchScreen으로 이동
- 최근 검색어, 주차 수요 급증 지역 LIVE 리스트 구성
- 장소 선택 후 RecommendedParkingScreen에서 추천 주차장 리스트 표시
- 추천 주차장 카드 클릭 시 ParkingDetailScreen으로 이동

---

## v1.1.9

- 이용 내역, 저장한 주차장, MY 화면 이미지 기준 재구현
- Parking 탭에서 이용 내역 리스트, 결제 상태, 월간 요약 카드 구성
- Saved 화면에서 즐겨찾기/최근 저장 주차장 리스트 구성
- MyPage 화면에서 프로필, 통계, 결제·차량, 알림·설정, 고객 지원 섹션 구성

---

## v1.1.10

- 공급자 대시보드 및 주차장 등록 5단계 Wizard 구현
- ProviderDashboardScreen에 정산 요약, 등록 주차 공간, 보완 요청, 오늘의 이용 현황 표시
- 주차장 등록 Wizard를 기본 정보, 위치 선택, 사진 등록, 시간·요금, 미리보기 단계로 구성
- 공급자 화면과 등록 Wizard에서는 하단 탭바가 보이지 않도록 처리

---

## v1.1.11

- 추천 탭 AI 혼잡도 분석 대시보드 확장 및 시나리오별 추천 로직 보완
- 오늘의 AI 추천 요약, 상황별 추천 chip, AI BEST 추천 카드 구성
- 시간대별 혼잡도 예측, AI 점수 분해, 추천 이유, 영향 요인 카드 구성
- AI 추천순 주차장 리스트와 후보 비교 카드 구성
- 시나리오 선택에 따라 BEST 카드, 리스트 정렬, 추천 이유가 연동되도록 보완

---

## v1.1.12

- NFC 이용 종료 인식 단계 추가 및 결제 플로우 실데이터 연결
- NFCScanModal에 START/END 모드 구분 추가
- ActiveSessionScreen에서 실제 입차 시각 기준 경과 시간 계산
- NFC END mock 성공 후 최종 이용 시간과 금액 계산하여 PaymentScreen으로 전달
- PaymentResultScreen에서 결제 금액, 결제 수단, 승인 번호, 영수증 모달 표시

---

## v1.1.13

- 프론트엔드 코드베이스 도메인 기반 구조 리팩토링
- 반복 포맷팅 함수와 주차 요금 계산 로직을 `utils/`로 분리
- 이용 내역, 공급자 대시보드, 공급자 등록 Wizard, MyPage의 인라인 컴포넌트 분리
- 화면 파일 크기를 줄이고 컴포넌트 재사용성을 높이도록 구조 정리
- `npx tsc --noEmit` 기준 타입 검사 통과

---

## v1.1.14

- Naver Map SDK 연동 및 Home 화면 실제 지도 적용
- `@mj-studio/react-native-naver-map@2.8.0` 설치
- `android/build.gradle`에 Naver Maven repository 추가
- `android/app/build.gradle`에서 `android/local.properties`의 `NAVER_MAP_CLIENT_ID`를 읽어 manifest placeholder로 전달
- `AndroidManifest.xml`에 Naver Map Client ID meta-data 연결
- `SmartNaverMapView.tsx` 신규 작성
- `NaverMapView`, `NaverMapMarkerOverlay`, `NaverMapViewRef`, `initialCamera`, `locationOverlay`, `animateCameraTo` 기반 지도 구조 적용
- HomeMapScreen의 기존 MapPlaceholder는 fallback 용도로 유지
- CurrentLocationButton과 mock 현재 위치 카메라 이동 흐름 연결
- Client ID는 코드, README, CHANGELOG, console.log에 노출하지 않도록 관리
- `npx tsc --noEmit` 통과 및 `npm run android` 빌드 성공

---

## v1.1.15

- Home 화면의 Naver Map 구조를 유지한 상태에서 클러스터링 구현 제거
- 개수형 클러스터 마커와 클러스터 클릭 확대 흐름 제거
- Lucide 아이콘 기반 커스텀 주차장 마커는 유지하고 스타일 개선
- Category Chip과 유사한 compact pill/badge형 마커 스타일 적용
- 마커 하단에 뾰족한 pointer 구조 적용
- 마커 색상은 고정하지 않고 현재 theme와 주차장 상태값 기준으로 적용
- 주차장 상태별 아이콘, 배경색, 테두리 색상 구분
- 지도 중심 주변에 표시될 수 있도록 mock 주차장 데이터 확장
- 지도 마커와 ParkingBottomSheet가 동일한 mock 주차장 데이터를 사용하도록 정리
- 기존 SearchBar, CategoryChips, 날씨 badge, FAB, ParkingBottomSheet, 하단 탭 구조 유지
- `npx tsc --noEmit` 통과 및 `npm run android` 빌드/실기기 실행 확인
