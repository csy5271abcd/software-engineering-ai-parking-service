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

---

## v1.0.1

- `src/frontend/` 하위에 React Native TypeScript 프로젝트 설정 완료
- React Native 0.85.3 + TypeScript 기반 CLI 프로젝트 생성 (`@react-native-community/cli` 사용)
- `App.tsx`를 SmartPark 기본 앱 화면으로 정리 (예제 문구 제거)
- `package.json`, `tsconfig.json`, `android/`, `ios/`, `index.js` 구조 확인
- `npm install` 완료 및 Android 실행을 위한 기본 프로젝트 구조 준비
- 이후 Android 실기기 실행 확인 단계로 연결 예정

---

## v1.0.2

- Android 실기기 실행 검증 중 발생한 CMake/NDK 링크 오류 수정
- `android/app/src/main/jni/CMakeLists.txt` 추가 또는 수정
- `c++_shared` 링크 설정을 명시하여 React Native Android Native 빌드 오류 보완
- `android/app/build.gradle`의 CMake 설정 확인 및 보완
- Gradle/CMake 캐시 정리 후 재빌드 수행
- `npm run android` 실행 결과 Android 실기기 `SM-S911N`에 APK 설치 및 앱 실행 성공
- 이후 Naver Map 스타일 UI, 지도 화면, 바텀시트, 주차장 카드, 네비게이션 구현 단계로 연결 예정

---

## v1.0.3

- `src/frontend/src/` 하위 기본 폴더 구조 설정
- `app`, `navigation`, `screens`, `components`, `services`, `hooks`, `types`, `mocks`, `theme`, `constants`, `utils`, `assets` 폴더 생성
- `screens` 하위: `common`, `auth`, `home`, `search`, `parking`, `provider`, `mypage`, `admin` 분리
- `components` 하위: `common`, `map`, `parking`, `bottomSheet`, `provider`, `admin` 분리
- 빈 폴더 Git 추적을 위해 각 폴더에 `.gitkeep` 추가
- 이후 디자인 토큰 구현, 네비게이션 구성, 지도 화면 구현 단계로 연결 예정

---

## v1.0.4

- `src/frontend/src/theme/colors.ts` 추가 — Naver Map 스타일 색상 토큰 (Primary Green, Warm Gray, Red, semantic/status/congestion 색상)
- `src/frontend/src/theme/spacing.ts` 추가 — 2px 단위 간격 토큰 (2~22px, Layout margin alias)
- `src/frontend/src/theme/radius.ts` 추가 — 모서리 반지름 토큰 (4~20px, component alias 포함)
- `src/frontend/src/theme/typography.ts` 추가 — title/body/caption/label/numeric 타이포그래피 토큰
- `src/frontend/src/theme/shadow.ts` 추가 — small/medium/large shadow 토큰 (Android/iOS 대응)
- `src/frontend/src/theme/index.ts` 추가 — theme 객체로 통합 export
- `src/frontend/src/constants/routes.ts` 추가 — SCREEN_STRUCTURE.md 기준 전체 화면 route 이름 상수
- `src/frontend/src/constants/status.ts` 추가 — 주차장/혼잡도/결제/승인/세션 상태값 상수 및 TypeScript union type
- `npx tsc --noEmit` 검증 통과 (오류 없음)
- 이후 React Navigation 설치, 타입 정의, mock 데이터, 화면 구현 단계로 연결 예정

---

## v1.0.5

- `src/frontend/src/types/common.ts` 추가 — `Coordinates`, `AddressInfo`, `ApiResponse<T>` 공통 타입
- `src/frontend/src/types/parking.ts` 추가 — `ParkingLotSummary`(목록), `ParkingLotDetail`(상세), `ParkingFee`, `OperationHours`, `ParkingSpace` 타입
- `src/frontend/src/types/user.ts` 추가 — `UserRole`, `User`, `ProviderProfile` 타입
- `src/frontend/src/types/payment.ts` 추가 — `ParkingSession`, `Payment`, `PaymentMethod` 타입
- `src/frontend/src/types/index.ts` 추가 — 전체 타입 통합 export
- `src/frontend/src/mocks/parkingLots.mock.ts` 추가 — 9개 가상 주차장 Mock 데이터 (AVAILABLE/FULL/SOON_AVAILABLE/OCCUPIED/INACTIVE 상태 혼합, LOW~VERY_HIGH/UNKNOWN 혼잡도 혼합)
- `src/frontend/src/mocks/index.ts` 추가 — mock 데이터 통합 export
- FEATURE_SPEC.md 상태값과 SCREEN_STRUCTURE.md 화면 흐름 기준 반영
- `npx tsc --noEmit` 검증 통과 (오류 없음)
- 이후 서비스/훅 구조 또는 React Navigation 설치 및 화면 구현 단계로 연결 예정

---

## v1.0.6

- 프론트엔드 소스코드 Git 추적 상태 점검 및 오류 수정
- `src/frontend`가 GitHub에서 하위 저장소처럼 표시되는 문제를 확인
- `git ls-files -s src/frontend` 명령으로 `src/frontend` 하위 파일이 부모 저장소에서 실제 파일로 추적되는지 검증
- `App.tsx`, Android 설정 파일, `theme`, `constants`, `types`, `mocks` 파일이 Git에서 정상 추적되는 것을 확인
- 원격 `origin/main`에 최신 프론트엔드 소스코드 반영 완료
- 이후 React Navigation 설치 및 기본 네비게이터 구성 단계로 연결 예정

---

## v1.0.7

- `@react-navigation/native-stack` 제거 및 `@react-navigation/stack` 기반으로 네비게이션 구조 전환
- NaverMapClone 구동 기준 의존성으로 재설정
  - `@react-navigation/native 7.1.14`
  - `@react-navigation/stack 7.4.2`
  - `@react-navigation/bottom-tabs 7.2.0`
  - `react-native-gesture-handler 2.31.2`
  - `react-native-safe-area-context 5.5.1`
  - `react-native-screens 4.14.0`
- `RootNavigator`, `HomeStackNavigator`, `SearchStackNavigator`, `ParkingStackNavigator`, `ProviderStackNavigator`, `MyPageStackNavigator`에서 `createNativeStackNavigator` 제거 및 `createStackNavigator`로 전환
- `MainTabNavigator`는 `@react-navigation/bottom-tabs` 기반으로 유지
- `android/gradle.properties`에 `newArchEnabled=true` 추가
- Windows + NDK 27.1 + CMake 3.18.1 환경의 `c++_shared` 링킹 누락 문제 해결
  - `react-native-gesture-handler`, `react-native-screens`, `react-native-safe-area-context` CMakeLists.txt에 `target_link_libraries(..., c++_shared)` 추가
- `npx tsc --noEmit` 검증 통과
- `npm run android` 실행 결과 Android 실기기에서 하단 탭 5개 정상 표시 확인

## v1.0.8

- Claude Design 기준 Home 화면 UI 및 인터랙션 개선
- `MainTabNavigator.tsx`를 커스텀 하단바 구조로 재작성
- 하단 탭 라벨을 주변, 저장, 이용, 공급자, MY로 구성
- View/Text 기반 아이콘을 적용하여 Claude Design과 유사한 탭바 스타일 구현
- 공급자 탭에 red badge 표시 추가
- `ParkingMarker.tsx`를 teardrop marker 형태로 수정
- `SOON_AVAILABLE` 상태에 “곧” badge 표시 추가
- `HomeMapScreen.tsx`에 카테고리 칩 8종 추가
- 카테고리 필터 변경 시 selected marker 초기화 처리
- `HomeParkingSummary.tsx`에 QuickShortcuts와 곧 비워짐 banner 중심의 하단 패널 구성
- 검색바, 카테고리 칩, FAB, 하단 패널, 하단 탭바 간 화면 겹침 문제 보정
- `npx tsc --noEmit` 검증 통과
- `npm run android` 기준 Android 실기기 실행 확인

---

## v1.0.11

### Home 화면 Claude Design 정합성 개선 및 컴포넌트 분리

- `src/components/home/CategoryChips.tsx` 추가
  - 전체/이용가능/곧 비워짐/저렴/NFC/개인공유/공영/24시간 카테고리 칩 8종
  - 필 형태(borderRadius 100), 비활성 테두리 `#CAD1DB`, 활성 배경 `#222225`
- `src/components/home/FABStack.tsx` 추가
  - 북마크/레이어/필터 FAB 3종, View 기반 아이콘 구현
  - position absolute, right 12, zIndex 35
- `src/components/home/CurrentLocationButton.tsx` 추가
  - 파란색 primary FAB, BottomSheet 높이에 따라 `bottom` prop으로 동적 위치 지정
- `src/components/parking/SectionHeader.tsx` 추가
  - title(fontSize 17/fontWeight 700) + sub + 오른쪽 action 버튼 구조
- `src/components/parking/QuickShortcuts.tsx` 추가
  - 집/회사/병원 3종 단축 버튼, 가로 row 배치, 색상 아이콘 원형
- `src/components/parking/SelectedLotPreview.tsx` 추가
  - 선택 주차장 미리보기 — 상태/혼잡도/NFC 뱃지, 이름, 주소, 닫기 버튼
  - 3칸 통계 그리드(시간당/거리/운영), 4종 액션 버튼, 상세 정보 버튼
- `src/components/parking/DefaultSheetContent.tsx` 추가
  - ParkingBottomSheet 기본 콘텐츠 분리
  - mode별 카드 수 조절(default/half: 3장, full: 전체), AI 추천 섹션
- `src/components/parking/ParkingBottomSheet.tsx` 수정
  - SelectedLotPreview, DefaultSheetContent 컴포넌트 사용으로 리팩터링
  - borderTopLeftRadius/Right 24으로 개선
- `src/screens/home/HomeMapScreen.tsx` 수정
  - CategoryChips, FABStack, CurrentLocationButton 컴포넌트로 분리
  - zIndex 재정의: chips(29) < search(30) < FABStack(35) < locFab(36) < sheet(40)
  - locFabBottom = SHEET_SNAP[sheetMode] + 14로 동적 배치
- `src/components/map/ParkingMarker.tsx` 수정
  - `soonMin` prop 추가 — SOON_AVAILABLE 상태 뱃지에 "N분" 또는 "곧" 표시
- `npx tsc --noEmit` 검증 통과
- `npm run android` 기준 Android 실기기 실행 확인

---

## v1.1.0

### ParkingDetailScreen 기본 UI 구현

- `src/components/parking/ParkingDetailHeader.tsx` 추가
  - 뒤로가기(‹) + 중앙 타이틀 + 즐겨찾기(♡) 버튼
  - `useSafeAreaInsets` 기반 상단 safe area 처리
- `src/components/parking/ParkingInfoSection.tsx` 추가
  - 주차장 유형, 운영시간, 운영요일, 출입방식, 결제 안내 행 목록
  - 태그 칩 표시
- `src/components/parking/ParkingFeeSection.tsx` 추가
  - 기본 요금, 추가 요금, 시간당 환산(파란색 강조), 일 최대 요금
  - NFC 지원 배너
- `src/components/parking/ParkingActionBar.tsx` 추가
  - 길찾기(outline) + 이용 시작(primary) CTA
  - 만차 시 "만차 — 목록 보기" 대체 표시
  - `useSafeAreaInsets` 기반 하단 safe area 처리
- `src/screens/parking/ParkingDetailScreen.tsx` 추가
  - Header + ScrollView(미니맵 + 요약카드 + AI배너 + 곧비워짐배너 + InfoSection + FeeSection + 사진placeholder) + ActionBar 레이아웃
  - `MapPlaceholder` 재사용, 중앙 파란 P 마커 오버레이
  - 상태/혼잡도/NFC/유형 뱃지, 2×2 stats grid (시간당/거리/이용가능/운영)
  - AI 추천 배너: recommendationScore 기반 색상·문구 (85+녹색/70+파랑/else주황)
  - SOON_AVAILABLE 출차 예정 배너
  - `getMockParkingLotById` 기반 데이터 연결, 없을 시 fallback 표시
- `src/navigation/navigationTypes.ts` 업데이트
  - `HomeStackParamList`에 `ParkingDetailScreen: {parkingLotId: string}` 추가
  - `ParkingStackParamList`에 동일 추가
- `src/navigation/HomeStackNavigator.tsx` 업데이트 — ParkingDetailScreen 등록
- `src/navigation/ParkingStackNavigator.tsx` 업데이트 — ParkingDetailScreen 등록
- `src/components/parking/ParkingCard.tsx` 업데이트
  - `onPressDetail?: () => void` prop 추가 → "상세 정보 ›" 링크 표시
- `src/components/parking/ParkingBottomSheet.tsx` 업데이트
  - `onOpenDetail?: (id: string) => void` prop 추가
  - SelectedPreview "상세 정보 열기" 버튼, 카드 목록 "상세 정보 ›" 링크 연결
- `src/screens/home/HomeMapScreen.tsx` 업데이트
  - `useNavigation<HomeNavProp>()` 추가
  - `onOpenDetail={(id) => navigation.navigate('ParkingDetailScreen', {parkingLotId: id})}` 연결
- 화면 겹침 보정: Header/ScrollView/ActionBar flex:1 레이아웃, overlap 없음
- `npx tsc --noEmit` 검증 통과
- `npm run android` BUILD SUCCESSFUL, SM-S911N 실기기 설치 완료
- 미적용: Naver Map SDK, 실제 길찾기 API, 결제, NFC, GPS 권한

---

## v1.0.10

### ParkingBottomSheet 4단계 Swipe 전환 (Animated + PanResponder)

- `ParkingBottomSheet` 완전 재구성
  - SheetMode: `hidden` / `default` / `half` / `full` 4단계
  - SHEET_SNAP: `hidden`=0, `default`=화면 30%, `half`=화면 50%, `full`=화면 100%
  - 시트 높이를 고정(SCREEN_H)으로 렌더링 후 translateY로 위치 제어 (Animated.Value)
  - PanResponder를 handle 영역에만 적용 — 리스트 영역과 gesture 충돌 없음
  - `onPanResponderMove`: translateY 실시간 반영, min/max 클램프
  - `onPanResponderRelease`: dy 방향 + threshold(50px) 기반 단계 결정, 저속 시 nearestMode 스냅
  - `Animated.spring` (bounciness:4, speed:14)으로 단계 전환 애니메이션
  - handle 영역 짧게 탭 → 다음 단계로 순환 (nextMode)
  - `full` 모드에서만 내부 ScrollView 스크롤 활성화
  - `hidden` 상태: "주변 주차장 N곳 ▲" 재오픈 탭바 표시 (absolute 오버레이)
- `HomeMapScreen` 연결 업데이트
  - `SHEET_HEIGHTS` → `SHEET_SNAP` import 변경
  - 초기 sheetMode: `'half'` → `'default'`
  - 마커 탭 시 `hidden` 상태이면 `default`로 자동 전환
  - 카테고리 칩 변경 시 selectedLot 초기화 + sheetMode → `'default'` 리셋
  - locFabBottom = `SHEET_SNAP[sheetMode] + 12` 동적 계산
- `npx tsc --noEmit` 검증 통과
- `npm run android` BUILD SUCCESSFUL, SM-S911N 실기기 설치 완료

---

## v1.0.9

### Phase 2 — ParkingBottomSheet + ParkingCard + HomeMapScreen 연결

- `src/utils/parkingStatus.ts` 보강
  - `CONGESTION_DISPLAY`: CongestionStatus → label/color/bg 매핑 추가
  - `STATUS_DISPLAY`: 기존 ParkingStatus 매핑 유지
- `src/components/parking/ParkingStatusBadge.tsx` 추가
  - `ParkingStatusBadge`: 상태 컬러 점(dot) + 레이블 뱃지
  - `CongestionBadge`: 혼잡도 레이블 뱃지
- `src/components/parking/ParkingCard.tsx` 추가
  - 썸네일 64×64 (공영: 파란 "P" / 개인공유: 🏠 이모지)
  - 상위 3위 rank 뱃지 (1위 파란, 2·3위 다크)
  - AI 추천 점수 뱃지 (recommendationScore ≥ 85)
  - 상태 뱃지 + 혼잡도 뱃지 + 추가 태그 (개인공유/NFC/24시간)
  - 메타 행: 도보 N분 · 거리 · ₩요금/시
  - SOON_AVAILABLE 출차 예정 배너 (expectedExitAt 기준 분 계산)
  - 선택 상태: 파란 배경/테두리 강조
- `src/components/parking/ParkingBottomSheet.tsx` 추가
  - 3모드(collapsed/half/expanded) — Pressable 탭으로 전환, 드래그 없음
  - `SHEET_HEIGHTS`: collapsed 52 / half 300 / expanded min(72%, 560px)
  - collapsed: "주변 주차장 N곳 ▲" 힌트
  - half/expanded: 선택된 주차장 상세 미리보기 OR QuickShortcuts + 곧 비워짐 배너
  - 상세 미리보기: stat 격자(시간당/거리/가용) + 출발/도착/공유/신고 액션 행 + 상세 정보 열기
  - 카드 목록: recommendationScore 내림차순, 상위 3곳 rank 뱃지, 빈 상태(empty state) 처리
  - `scrollEnabled`: expanded 모드에서만 스크롤 활성
  - TypeScript `never` narrowing 문제 해결: 카드 목록을 ternary 외부로 분리
- `HomeMapScreen` 연결
  - `HomeParkingSummary` → `ParkingBottomSheet` 교체
  - `sheetMode` 상태 연결, 마커 탭 시 collapsed → half 자동 전환
  - locFab 위치: `SHEET_HEIGHTS[sheetMode] + 12` 동적 계산
  - zIndex 계층: map(0) → markers(10/20) → chips(34) → search(35) → fabStack(30) → locFab(42) → sheet(40)
- `npx tsc --noEmit` 검증 통과
- `npm run android` BUILD SUCCESSFUL (6m 54s), SM-S911N 실기기 설치 완료

### Phase 1 — HomeMapScreen UI 개선 (Claude Design 기준)

- `MainTabNavigator` 완전 재구성 (SmartParkTabBar 커스텀 탭바)
  - 탭 레이블: 주변 / 저장 / 이용 / 공급자 / MY
  - View 기반 아이콘 (IconLocation, IconStar, IconCalendar, IconHouse, IconPerson)
  - 활성 탭: 파란 테두리(#006CFF, 1.5px, borderRadius 10) 적용
  - 공급자 탭: 빨간 뱃지(1) 표시
  - `useSafeAreaInsets` 기반 paddingBottom 처리
- `ParkingMarker` 개선
  - 핀 꼬리: 회전 사각형 → CSS 삼각형(width:0, borderTopWidth) 방식으로 진짜 눈물방울 형태
  - SOON_AVAILABLE 상태: 파란 "곧" 뱃지 추가
  - transform 앵커를 핀 TIP 기준으로 정확히 계산
- `HomeMapScreen`에 CategoryChips 추가
  - 카테고리: 전체/이용가능/곧 비워짐/저렴/NFC/개인공유/공영/24시간
  - 활성: 검은 배경+흰 글자 / 비활성: 흰 배경+테두리
  - 카테고리별 `filterLots` 적용 — 선택 마커 자동 해제
  - SearchBar/CategoryChips/FAB 위치를 safe area 기준 절대 배치 정렬
- `HomeParkingSummary` 기본 뷰 변경
  - 하단 패널 기본 뷰: 주차장 카드 목록 제거 → QuickShortcuts + 곧 비워짐 배너만 표시
  - QuickShortcuts: 집/회사/병원 카드 3개 가로 배열
  - maxHeight 300 → 240으로 축소
- `npx tsc --noEmit` 검증 통과
