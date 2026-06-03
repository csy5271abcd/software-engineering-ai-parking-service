# software-engineering-ai-parking-service

AI 기반 주차난 해결 서비스를 기획하고, 소프트웨어공학 산출물과 프로젝트 보조 산출물을 함께 관리하는 저장소입니다.

---

# 🚗 SmartPark: AI 기반 주차난 해결 서비스

SmartPark는 도심 및 주거 지역의 주차난 문제를 해결하기 위한 **AI 기반 스마트 주차 플랫폼**입니다.  
사용자의 현재 위치와 목적지를 기반으로 주변 주차 가능 공간을 탐색하고, **곧 비워질 자리 안내**, **개인 주차장 공유 등록**, **NFC 기반 간편 결제**, **AI 혼잡도 분석** 기능을 제공합니다.

본 저장소는 단순히 소스코드만 관리하는 공간이 아니라, 소프트웨어공학 수업의 단계별 산출물과 실제 서비스 기획·설계·구현 과정에서 필요한 추가 문서를 함께 관리합니다.

---

## SmartPark Presentation Preview

<p align="center">
  <img src="./docs/presentation/image/1.%20표지.png" width="100%" alt="SmartPark 표지" />
</p>

<p align="center">
  <img src="./docs/presentation/image/2.%20Overview.png" width="100%" alt="SmartPark Overview" />
</p>

<p align="center">
  <img src="./docs/presentation/image/3.%20Background.png" width="100%" alt="SmartPark Background" />
</p>

<p align="center">
  <img src="./docs/presentation/image/4.%20Desk%20Search.png" width="100%" alt="SmartPark Desk Search" />
</p>

<p align="center">
  <img src="./docs/presentation/image/5.%20Software%20Engineering_1.png" width="100%" alt="Software Engineering 1" />
</p>

<p align="center">
  <img src="./docs/presentation/image/6.%20Software%20Engineering_2.png" width="100%" alt="Software Engineering 2" />
</p>

<p align="center">
  <img src="./docs/presentation/image/7.%20Software%20Engineering_3.png" width="100%" alt="Software Engineering 3" />
</p>

<p align="center">
  <img src="./docs/presentation/image/8.%20CoreFeature.png" width="100%" alt="SmartPark Core Feature" />
</p>

<p align="center">
  <img src="./docs/presentation/image/9.%20docs_product.png" width="100%" alt="SmartPark Product Docs" />
</p>

<p align="center">
  <img src="./docs/presentation/image/10.%20docs_harness.png" width="100%" alt="SmartPark Harness Docs" />
</p>

<p align="center">
  <img src="./docs/presentation/image/11.%20DesignSystem.png" width="100%" alt="SmartPark Design System" />
</p>

<p align="center">
  <img src="./docs/presentation/image/12.%20FigmaMake.png" width="100%" alt="Figma Make" />
</p>

<p align="center">
  <img src="./docs/presentation/image/13.%20FigmaMake_2.png" width="100%" alt="Figma Make 2" />
</p>

<p align="center">
  <img src="./docs/presentation/image/14.%20Frontend%20Overview.png" width="100%" alt="Frontend Overview" />
</p>

<p align="center">
  <img src="./docs/presentation/image/15.%20Frontend%20WorkFlow.png" width="100%" alt="Frontend Workflow" />
</p>

<p align="center">
  <img src="./docs/presentation/image/16.%20Frontend%20Feature.png" width="100%" alt="Frontend Feature" />
</p>

<p align="center">
  <img src="./docs/presentation/image/17.%20AI_Tech.png" width="100%" alt="AI Tech" />
</p>

<p align="center">
  <img src="./docs/presentation/image/18.%20AI_Data.png" width="100%" alt="AI Data" />
</p>

<p align="center">
  <img src="./docs/presentation/image/19.%20AI_Flow.png" width="100%" alt="AI Flow" />
</p>

<p align="center">
  <img src="./docs/presentation/image/20.%20AppDemo.png" width="100%" alt="App Demo" />
</p>

---

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
| 과제5 | 소프트웨어설계서   | `docs/design/`       | 완료 |
| 과제6 | 인스팩션 보고서    | `docs/test/`         | 완료 |
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

현재 저장소에는 소프트웨어공학 과제 산출물, 제품 기획 문서, 하네스 문서, 소프트웨어설계서, 인스팩션 보고서, 프론트엔드 구현 코드, AI 분석 모듈 기준 문서와 구현 이력이 함께 관리되고 있다.

---

### 12.1 문서 산출물 진행 현황

#### 소프트웨어공학 과제 산출물

- `docs/requirements/과제1.프로젝트정의서.md`
- `docs/plan/과제2.프로젝트관리계획서.md`
- `docs/requirements/과제3.요구사항정의서.md`
- `docs/requirements/과제3.요구사항정의서.pdf`
- `docs/requirements/과제4.요구사항분석서.md`
- `docs/requirements/과제4.요구사항분석서.pdf`
- `docs/design/과제5.소프트웨어설계서.md`
- `docs/design/과제5.소프트웨어설계서.pdf`

#### 제품 기획 문서

- `docs/product/PERSONA.md`
- `docs/product/USER_JOURNEY.md`
- `docs/product/COMPETITOR_ANALYSIS.md`
- `docs/product/SERVICE_SCENARIO.md`
- `docs/product/BUSINESS_MODEL.md`

#### 하네스 문서

- `docs/harness/PRD.md`
- `docs/harness/FEATURE_SPEC.md`
- `docs/harness/SCREEN_STRUCTURE.md`
- `docs/harness/PROJECT_RULES.md`
- `docs/harness/CLAUDE.md`
- `docs/harness/CODEX.md`
- `docs/harness/PROMPT_LOG.md`

#### 디자인 기준 문서

- `docs/design/NAVER_MAP_STYLE_GUIDE.md`
- `docs/design/reference/naver-map-design-system/`
- `docs/design/reference/figma-make-design/`

이를 통해 Naver Map 스타일 UI, Figma Make 기반 화면 reference, SmartPark 화면별 디자인 기준을 프론트엔드 구현에 반영하고 있다.

#### 소프트웨어 설계서

- `docs/design/과제5.소프트웨어설계서.md`
- `docs/design/과제5.소프트웨어설계서.pdf`

과제5 소프트웨어설계서는 SmartPark의 전체 소프트웨어 아키텍처, 모듈/패키지 설계, 인터페이스 설계, 데이터 설계, 구현 기술 설계, 요구사항 추적표, 참고문헌 및 부록을 포함한다.

#### 인스팩션 보고서

- `docs/test/과제6.인스팩션보고서.md`
- `docs/test/과제6.인스팩션보고서.pdf`

과제6 인스팩션 보고서는 과제5 소프트웨어설계서를 중심으로 과제1~4 선행 문서, 프론트엔드 구현 이력, AI 구현 이력, 백엔드 예정 범위, 형상관리 문서를 함께 검토한 결과를 정리한다. 결함 유형별 집계, Major/Minor 심각도 구분, 결함 목록 36건, 수정 계획, 최종 판정(`Conditionally accept`)을 포함한다.

---

### 12.2 프론트엔드 기본 환경

`src/frontend/` 폴더에는 React Native 기반 SmartPark 프론트엔드 프로젝트가 구성되어 있다.

- React Native 0.85.3 + TypeScript 기반 프로젝트 설정
- Android 실기기 실행 환경 구성
- Windows + NDK + CMake 환경에서 발생한 `c++_shared` 링킹 문제 보정
- React Navigation 기반 화면 구조 구성
- `lucide-react-native`, `react-native-svg` 기반 아이콘 시스템 구축
- `AppIcon` 공통 컴포넌트 추가
- Android 실기기에서 `npm run android` 실행 검증

`src/frontend/src/` 하위에는 다음 구조가 구성되어 있다.

- `navigation/`
- `screens/`
- `components/`
- `types/`
- `mocks/`
- `theme/`
- `constants/`
- `utils/`

주차장, 사용자, 결제, 이용 세션 관련 타입을 정의하고, 화면 검증용 mock 데이터를 구성하였다.

---

### 12.3 현재 구현된 주요 화면

현재 프론트엔드는 Figma Make reference 이미지와 Naver Map Design System 기준을 바탕으로 주요 사용자 흐름을 mock 데이터 기반으로 구현하였다.

#### Home 화면

- Naver Maps SDK 실지도(`@mj-studio/react-native-naver-map`) 연동 — mock 현재 위치(성수역) 기준 지도 표시
- 주차장 상태별 Lucide 아이콘 기반 커스텀 마커 표시
- 마커는 Category Chip과 유사한 compact pill/badge 구조로 구성하고, 하단에 pointer 형태 적용
- 마커 색상은 고정하지 않고 현재 theme와 주차장 상태값 기준으로 적용
- 주차장 상태별 아이콘, 배경색, 테두리 색상 구분
- 클러스터링은 제거하고 주차장별 개별 마커 표시
- 성수역 중심 `mockParkingLots` 확장 및 지도 마커와 ParkingBottomSheet 동일 데이터 사용
- 검색바, 카테고리 chip, 날씨 badge, 지도 FAB 구성
- BottomSheet 4단계 swipe 구조 구현
  - hidden
  - default
  - half
  - full
- QuickShortcuts, 곧 비워질 자리 banner, 주변 주차장 카드 구성
- 마커 클릭 시 ParkingSummary BottomSheet 표시

#### 검색 화면

- Home 상단 검색바 클릭 시 전체 검색 화면으로 이동
- 최근 검색 리스트와 주차 수요 급증 지역 LIVE 리스트 표시
- 장소 선택 시 추천 주차장 리스트 화면 표시
- 추천 주차장 카드 클릭 시 ParkingDetail 화면으로 이동
- 검색 화면에서는 하단 탭바가 보이지 않도록 처리

#### 추천 화면

- 추천 탭을 AI 혼잡도 분석 대시보드로 확장
- 오늘의 AI 추천 요약, 상황별 추천 chip, AI BEST 추천 카드 구성
- 시간대별 혼잡도 예측, AI 점수 분해, 추천 이유, 영향 요인 카드 구성
- AI 추천순 주차장 리스트와 후보 비교 카드 구성
- 추천 카드 클릭 시 ParkingDetail 화면으로 이동

#### 곧 비워질 자리 화면

- Home BottomSheet의 “근처에 곧 비워질 자리” 클릭 시 SoonAvailableScreen으로 이동
- 미니맵 preview, 안내 banner, 곧 비워질 주차장 카드 구성
- SoonAvailableCard 클릭 시 ParkingDetail 화면으로 이동

#### 주차장 상세 화면

- ParkingDetailScreen 5탭 구조 구현
  - 홈
  - 요금·시간
  - 혼잡도
  - 주변
  - 리뷰
- 상단 지도 hero, 주차장 정보, badge, tab bar, 하단 CTA 구성
- 경로 안내 / NFC 이용 시작 버튼 구성
- 상세 화면 내부 ScrollView와 하단 CTA가 겹치지 않도록 padding 보정

#### 경로 안내, NFC 이용, 결제 플로우

- ParkingDetail의 경로 안내 버튼 클릭 시 RouteScreen 이동
- ParkingDetail의 NFC 이용 시작 버튼 클릭 시 NFCScanModal(mode='START') 표시
- NFC START mock 성공 후 ActiveSessionScreen으로 이동
- ActiveSessionScreen에서 입차 시각 기준 이용 시간과 예상 요금 표시
- NFC 이용 종료 CTA 클릭 시 NFCScanModal(mode='END') 표시
- NFC END mock 성공 후 최종 이용 시간과 최종 금액 계산
- PaymentScreen에서 입차/출차 시각, 이용 시간, 최종 금액, 결제 수단 표시
- PaymentResultScreen에서 결제 금액, 결제 수단, 승인 번호, 영수증 모달 표시
- 결제 완료 후 이용 내역 화면으로 이동

#### 이용 내역 화면

- 하단 탭의 이용 화면에서 이용 내역 리스트 표시
- 이번 달 이용 횟수, 결제 총액, 평균 시간 요약 카드 구성
- 결제완료, 확인필요, 환불 등 상태별 filter chip 구성
- 이용 내역 카드 및 결제 상태 안내 박스 구성

#### 저장한 주차장 화면

- 하단 탭의 저장 화면에서 저장한 주차장 리스트 표시
- 전체 / 즐겨찾기 / 최근 filter 카드 구성
- 저장한 주차장 카드 클릭 시 ParkingDetail 화면으로 이동
- `mockParkingLots` 기반 주차장 정보 재사용

#### MY 화면

- mock 로그인 상태 기반 MyPage 화면 구성
- 프로필, 통계 카드, 결제·차량, 알림·설정, AI 투명성, 고객 지원 섹션 구성
- 공급자 section을 통해 공급자 대시보드로 이동
- 하단 탭의 MY active 상태 보정

#### 공급자 화면

- MY 화면의 공급자 section에서 ProviderDashboardScreen으로 이동
- 공급자 대시보드에서 정산 요약, 등록 주차 공간, 보완 요청, 오늘의 이용 현황 표시
- 주차장 등록 5단계 Wizard 구현
  - 기본 정보
  - 위치 선택
  - 사진 등록
  - 시간·요금
  - 미리보기
- 공급자 화면과 등록 Wizard에서는 하단 탭바가 보이지 않도록 처리

---

### 12.4 최신 프론트엔드 기준선

현재 프론트엔드 구현 흐름은 `v1.1.15` 기준으로 정리한다.

| 버전      | 주요 내용                                                                                                 |
| --------- | --------------------------------------------------------------------------------------------------------- |
| `v1.0.x`  | React Native 프로젝트 설정, Android 실행, 기본 폴더 구조, 디자인 토큰, 타입, mock 데이터, 네비게이션 구성 |
| `v1.1.0`  | 검색, 추천 주차장, 상세 화면, 곧 비워질 자리 화면의 기본 흐름 구현                                        |
| `v1.1.1`  | lucide-react-native 기반 AppIcon 시스템 구축                                                              |
| `v1.1.2`  | 공급자 탭 제거 및 추천 탭 추가                                                                            |
| `v1.1.3`  | Figma Make UI primitive 기반 공통 컴포넌트 구축                                                           |
| `v1.1.4`  | imports 폴더 기준 디자인 토큰 및 MyPage 일부 보정                                                         |
| `v1.1.5`  | Home 화면 Figma Make 이미지 기준 재보정 및 아이콘 적용                                                    |
| `v1.1.6`  | 곧 비워질 자리, ParkingSummary, ParkingDetail 5탭 화면 보정                                               |
| `v1.1.7`  | 경로 안내, NFC 이용 시작, 이용 중 세션, 결제 플로우 구현                                                  |
| `v1.1.8`  | 검색 화면 및 장소 선택 후 추천 주차장 리스트 화면 보정                                                    |
| `v1.1.9`  | 이용 내역, 저장한 주차장, MY 화면 이미지 기준 재구현                                                      |
| `v1.1.10` | 공급자 대시보드 및 주차장 등록 5단계 Wizard 구현                                                          |
| `v1.1.11` | 추천 탭 AI 혼잡도 분석 대시보드 확장 및 시나리오별 추천 로직 보완                                         |
| `v1.1.12` | NFC 이용 종료 인식 단계 추가 및 결제 플로우 실데이터 연결                                                 |
| `v1.1.13` | 프론트엔드 코드베이스 도메인 기반 구조 리팩토링                                                           |
| `v1.1.14` | Naver Maps SDK 연동 — Home 화면 실제 지도 적용 (`@mj-studio/react-native-naver-map@2.8.0`)                |
| `v1.1.15` | 클러스터링 제거, Category Chip 스타일 커스텀 마커 적용, 성수역 Mock 데이터 확장                           |

---

### 12.5 백엔드 구현 현황

백엔드는 `src/backend` 하위에서 Spring Boot 기반 API 서버로 구현할 예정이다.

현재 백엔드는 구현 시작 전 기준선인 `v2.0.0`을 준비하는 단계이며, 이후 다음 흐름으로 진행한다.

| 단계     | 내용                                                    |
| -------- | ------------------------------------------------------- |
| `v2.0.0` | Spring Boot 프로젝트 초기 설정                          |
| `v2.1.x` | 공통 응답, 예외 처리, Swagger/OpenAPI 설정              |
| `v2.2.x` | ParkingLot, ParkingSpace 도메인 및 주차장 조회 API 구현 |
| `v2.3.x` | Naver Maps API, Geocoding, Directions5 연동             |
| `v2.4.x` | AI 혼잡도 예측 결과 조회 API 구현                       |
| `v2.5.x` | 공급자, 이용 세션, 결제 mock API 구현                   |
| `v2.6.x` | 테스트 코드, Swagger 문서 보완, AWS 배포 준비           |

백엔드 상세 변경 이력은 `CHANGELOG_BACKEND.md`에서 관리한다.

---

### 12.6 AI 분석 모듈 구현 현황

AI 분석 모듈은 `src/ai` 하위에서 Python 기반으로 구현하고 있다.

현재 AI 모듈은 `v3.7.0` 기준으로 예측 결과 MySQL 적재 및 백엔드 연동 준비 단계까지 정리되었다.

|     버전 | 주요 내용                                   |
| -------: | ------------------------------------------- |
| `v3.0.0` | AI 모듈 기본 구조 생성                      |
| `v3.1.0` | AI 데이터 스키마 설계                       |
| `v3.2.0` | Mock 주차장 데이터 생성                     |
| `v3.3.0` | 전처리 데이터셋 생성                        |
| `v3.4.0` | 규칙 기반 혼잡도 분석 구현                  |
| `v3.5.0` | RandomForest 기반 모델 학습 및 평가         |
| `v3.6.0` | 혼잡도 예측 결과 생성                       |
| `v3.7.0` | AI 예측 결과 MySQL 적재 및 백엔드 연동 준비 |

AI 상세 변경 이력은 `CHANGELOG_AI.md`에서 관리한다.

---

### 12.7 미적용 및 향후 구현 예정

현재 프론트엔드는 mock 데이터 기반 UI 구현 단계이며, 다음 기능은 아직 실제 연동 전이다.

- 실제 GPS 위치 권한 및 현재 위치 추적
- 실제 경로 안내 API 연동
- 실제 NFC 태그 인식
- 실제 결제 SDK 연동
- 백엔드 API 연동
- AI 혼잡도 예측 API 연동
- 공급자 주차 공간 등록/승인/정산 API 연동
- 관리자 승인/신고 관리 기능 구현

---

### 12.8 과제6 인스팩션 보고서 작성 결과

과제6에서는 SmartPark의 설계 산출물과 구현 이력의 품질을 점검하기 위해 인스팩션 보고서를 작성하였다.

| 항목           | 내용                                                                      |
| -------------- | ------------------------------------------------------------------------- |
| 주 검토 문서   | `docs/design/과제5.소프트웨어설계서.md`                                   |
| 보조 검토 문서 | 과제1~4 문서, README, CHANGELOG, 프론트엔드/백엔드/AI 변경 이력 문서      |
| 결함 총계      | 36건                                                                      |
| 심각도 구분    | Major 13건, Minor 23건                                                    |
| 최종 판정      | Conditionally accept                                                      |
| 산출물 위치    | `docs/test/과제6.인스팩션보고서.md`, `docs/test/과제6.인스팩션보고서.pdf` |

인스팩션 결과, SmartPark 산출물은 전체 구조와 요구사항-설계 연결성이 확보되어 있으나, 문서 간 기능 ID 표기 체계, 백엔드 구현 예정 상태, AI MySQL 적재 상태, Mock/실제 구현 구분, README/CHANGELOG 최신화 항목을 보완 대상으로 정리하였다.

---

## 13. 향후 구현 방향

현재 구현 단계는 프론트엔드, 백엔드, AI 혼잡도 분석 모듈을 다음 기준으로 진행한다.

| 영역       | 구현 방향                                                                      | 주요 도구                               |
| ---------- | ------------------------------------------------------------------------------ | --------------------------------------- |
| 프론트엔드 | Naver Maps 스타일의 지도 중심 React Native 앱 구현                             | Claude Code, Android 실기기 USB 테스트  |
| 백엔드     | 주차장 조회, 목적지 검색, 혼잡도 조회 API 구현                                 | Spring Boot, MySQL, Swagger, Codex      |
| AI 분석    | AI 예측 결과를 MySQL에 적재하고 Spring Boot API에서 조회할 수 있도록 연동 준비 | Python, CSV/JSON, MySQL loader, ML 모델 |

다음 구현 단계에서는 mock UI 흐름을 실제 서비스 구조로 확장한다.

```text
실제 GPS 위치 권한 및 현재 위치 추적
→ 현재 위치 기반 지도 카메라 이동 고도화
→ 백엔드 주차장 조회 API 연결
→ 목적지 검색 API 연결
→ AI 혼잡도 예측 API 연결
→ 경로 안내 API 연결
→ 실제 NFC 태그 인식 고도화
→ 결제 SDK 연동
→ 공급자 주차 공간 등록/관리 API 연결
→ 관리자 승인/신고 관리 기능 구현
```

---

## 14. 프로젝트 목표

본 프로젝트의 최종 목표는 SmartPark 서비스를 대상으로 소프트웨어공학의 주요 활동인 **요구사항 정의, 분석, 설계, 구현, 테스트, 형상관리**를 실제 프로젝트 흐름에 맞게 수행하고 기록하는 것이다.

이를 통해 단순한 아이디어 문서가 아니라, 소프트웨어 개발 생명주기를 기반으로 체계적으로 관리되는 프로젝트 저장소를 구축한다.
