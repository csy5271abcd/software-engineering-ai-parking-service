# NAVER MAP STYLE GUIDE

SmartPark 프론트엔드 UI 구현을 위한 Naver Map Design System 기반 스타일 가이드.

---

## 1. 문서 목적

이 문서는 SmartPark 앱의 React Native 화면 및 컴포넌트 구현 시 일관된 UI를 유지하기 위한 디자인 기준서다.
Naver Map Design System의 이미지 파일을 분석하여 디자인 토큰, 컴포넌트 스펙, 화면별 적용 기준을 정리한다.

- 이미지에서 확인되지 않는 수치, 색상값, 폰트값은 임의로 작성하지 않는다.
- 이미지 해상도 문제로 정확히 읽기 어려운 부분은 **이미지에서 확인 가능한 범위 기준**이라고 명시한다.
- API Key, 개인정보, 결제 Key, 민감 정보는 어떤 문서에도 작성하지 않는다.

---

## 2. 참고한 디자인 시스템 이미지

### 2.1 Component reference

원본 경로: `docs/design/reference/naver-map-design-system/Component/`

| 파일 / 폴더 | 내용 |
|---|---|
| `BottomSheet/Bottom Sheet_Controller.png` | 컨트롤러 타입 (Default/Gradient/Badge) |
| `BottomSheet/Bottom Sheet_Default.png` | BottomSheet 전체 레이아웃 |
| `Btn/Btn_CTA.png` | CTA 버튼 해부도 및 스펙 |
| `Btn/Btn_pill.png` | Pill 버튼 사이즈 및 타입 |
| `Card/Card_Location.png` | 위치 카드 레이아웃 |
| `Content/Content_MapMaker.png` | 지도 마커 타입 4종 |
| `Content/Content_Badge.png` | 상태/태그/숫자 배지 |
| `Header/Header_Default.png` | 기본 헤더 타입 |
| `Header/Input Header.png` | 입력형 헤더 타입 |
| `Switch/Switch_Default.png` | 스위치 On/Off 상태 |
| `Tap/Tab.png` | Tab 컴포넌트 타입 (원본 폴더명: Tap) |
| `Chip.png` | Chip 상태 및 사용처 |
| `Drop Down.png` | 드롭다운 해부도 및 상태 |
| `Modal.png` | PopupModal 구조 |
| `Navi Bar.png` | 하단 내비게이션 바 |
| `Pagination.png` | 페이지네이션 타입 |
| `Radio.png` | 라디오 버튼 상태 |
| `Search Bar_완성.png` | 검색바 타입 및 해부도 |
| `TimePicker.png` | 시간 선택 컴포넌트 |

> 파일명이 `Tap`으로 되어 있더라도 문서에서는 일반 UI 용어에 맞춰 **Tab**으로 표기한다.

### 2.2 Foundation reference

원본 경로: `docs/design/reference/naver-map-design-system/Foundation/`

| 파일 / 폴더 | 내용 |
|---|---|
| `Color/Color Tokens_Black & White.png` | Black/White 토큰 |
| `Color/Color Tokens_Warm Gray Scale.png` | Warm Gray 색상 팔레트 |
| `Color/Color Tokens_Cool Gray Scale.png` | Cool Gray 색상 팔레트 |
| `Color/Color Tokens_Green Scale.png` | Primary Green 팔레트 |
| `Color/Color Tokens_Red Scale.png` | Warning/Red 팔레트 |
| `Color/Color Tokens_Orange Scale.png` | Orange 팔레트 |
| `Typo/Foundation_Typo.png` | Typography 전체 개요 |
| `Typo/Foundation_Typo_KR.png` | 한국어 Typography 토큰 |
| `Typo/Foundation_Typo_EN,NUM.png` | 영문/숫자 Typography 토큰 |
| `Foundation_Effect.png` | Elevation (Shadow + Dim) |
| `Foundation_Layout.png` | Grid 레이아웃 |
| `Foundation_Radius.png` | 모서리 반지름 |
| `Foundation_Spacing.png` | 간격 시스템 |
| `Foundation_Ico.png` | 아이콘 타입 및 사이즈 |

---

## 3. SmartPark 적용 원칙

1. **디자인 토큰 우선**: 색상, 타이포그래피, 간격, 반지름은 `src/frontend/src/theme/` 내 토큰 파일에서 관리한다.
2. **이미지에서 확인된 값만 사용**: 이미지에서 확인되지 않는 수치는 임의로 추가하지 않는다.
3. **화면 이름 준수**: 화면 이름은 `docs/harness/SCREEN_STRUCTURE.md`를 기준으로 한다.
4. **컴포넌트 구조 일관성**: Naver Map Design System의 해부도(Anatomy) 기준을 따른다.
5. **한국어 우선 폰트**: 본문/UI 텍스트는 Noto Sans KR, 숫자/영문은 Pretendard를 사용한다.

---

## 4. 핵심 디자인 토큰

### 4.1 Color

이미지에서 확인 가능한 범위 기준.

#### Black & White

| 토큰명 | 값 |
|---|---|
| White | `#FFFFFF` |

#### Warm Gray Scale

| 이미지에서 확인된 값 | 용도 추정 |
|---|---|
| `#222225` | 가장 어두운 Warm Gray (텍스트) |
| `#373737` | 진한 Gray |
| `#656565` | 중간 Gray |
| `#939396` | 연한 Gray |
| `#EDEDED` | 가장 밝은 Warm Gray (배경/구분선) |

> Cool Gray Scale 정확한 hex값은 이미지에서 확인 가능한 범위 기준 (해상도 제한으로 일부 값 불명확).

#### Green Scale (Primary)

| 토큰명 | 값 | 용도 |
|---|---|---|
| Primary Green | `#03AA5A` | 주요 액션 버튼, 선택 상태 |
| Transport Green (lighter) | 이미지에서 확인 가능한 범위 기준 | 대중교통 관련 |

#### Red Scale

| 토큰명 | 값 | 용도 |
|---|---|---|
| Warning Red | `#F61024` | 경고, 오류 |
| Highlight Red | `#FF4043` | 강조, 알림 |

> Orange Scale 정확한 hex값은 이미지에서 확인 가능한 범위 기준.

### 4.2 Typography

폰트: **Noto Sans KR** (한국어), **Pretendard** (영문/숫자)
단위: **pt** (모바일 기준)

#### 한국어 (Noto Sans KR)

이미지에서 확인 가능한 범위 기준 — 정확한 weight/line-height 수치는 이미지 해상도 제한으로 일부 불명확.

| 계층 | 크기 범위 |
|---|---|
| Title | 20pt → 12pt (단계별) |
| Body | 16pt → 11pt (단계별) |
| Caption | 이미지에서 확인 가능한 범위 기준 |

#### 영문/숫자 (Pretendard)

| 토큰명 | 크기 |
|---|---|
| `$num-title-30` | 30pt |
| `$num-caption-12` | 12pt |

> 중간 단계의 정확한 토큰명 및 수치는 이미지에서 확인 가능한 범위 기준.

### 4.3 Radius

`Foundation_Radius.png` 기준.

| 값 | 적용 컴포넌트 (이미지 기준) |
|---|---|
| 4px | 소형 요소 |
| 6px | 소형 버튼, 입력 필드 일부 |
| 8px | Chip, 버튼, 카드 일부 |
| 12px | 카드, Modal |
| 14px | 중간 크기 컴포넌트 |
| 18px | Pill 버튼 |
| 20px | BottomSheet 상단, SearchBar |

### 4.4 Spacing

`Foundation_Spacing.png` 기준 — 2px 단위 증가.

| 값 | 범위 |
|---|---|
| 최솟값 | 2px |
| 최댓값 | 22px |
| 증가 단위 | 2px 씩 |

사용 가능한 값: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22px

### 4.5 Layout

`Foundation_Layout.png` 기준.

| 속성 | 값 |
|---|---|
| 컬럼 수 | 4 column |
| Gutter | 8px |
| Margin (좁음) | 12px |
| Margin (기본) | 16px |
| Margin (넓음) | 18px |

### 4.6 Elevation

`Foundation_Effect.png` 기준.

**Elevation via Color (지도 위 UI 요소)**
- 지도 요소 위에 올라오는 SearchBar, FAB 등에 Shadow 적용
- Dim overlay: 모달, 바텀시트 뒤 어두운 배경에 사용

**Shadow (이미지에서 확인된 적용 대상)**
- BottomSheet
- SearchBar
- FAB (Floating Action Button)

> 정확한 shadow 수치(offset, blur, spread, color)는 이미지에서 확인 가능한 범위 기준.

### 4.7 Icon

`Foundation_Ico.png` 기준.

| 타입 | 설명 |
|---|---|
| Fill Icon | 채워진 아이콘 |
| Line Icon | 외곽선 아이콘 |

> 아이콘 사이즈 규격의 정확한 수치는 이미지에서 확인 가능한 범위 기준.

---

## 5. 컴포넌트별 적용 기준

### 5.1 BottomSheet

**참고 이미지**: `Component/BottomSheet/Bottom Sheet_Controller.png`, `Bottom Sheet_Default.png`

**컨트롤러 타입**

| 타입 | 설명 |
|---|---|
| Default | 기본 핸들바, 상단 중앙 고정 |
| Gradient | 그라데이션 배경의 컨트롤러 |
| Badge | 배지가 포함된 컨트롤러 |

**구조**
- 핸들바: 상단 중앙 고정
- Radius: 상단 모서리 20px (이미지 기준)
- Shadow 적용 (Elevation 참고)
- 내부 콘텐츠 타입: 텍스트, 리스트, 카드 등 다양한 형태 지원

**SmartPark 사용처**: `ParkingBottomSheet`

---

### 5.2 SearchBar

**참고 이미지**: `Component/Search Bar_완성.png`

**타입**

| 타입 | 설명 |
|---|---|
| Default | 기본 검색바 |
| LeadOnly | 앞쪽 아이콘만 있는 검색바 |
| List | 검색 결과 목록이 포함된 검색바 |

**해부도 (Anatomy)**

| 영역명 | 설명 |
|---|---|
| 서치바영역 | 전체 검색바 컨테이너 |
| 취소영역 | 입력 취소 버튼 영역 |
| 인풋창영역 | 텍스트 입력 영역 |

**적용 기준**
- Radius: 20px (이미지 기준)
- Shadow 적용
- **SmartPark 사용처**: `DestinationSearchScreen`, `HomeMapScreen` 상단 검색 진입

---

### 5.3 Chip

**참고 이미지**: `Component/Chip.png`

**상태**

| 상태 | 값 |
|---|---|
| False (미선택) | 기본 상태 |
| True (선택됨) | 강조 상태 |

**용도**
- 멀티셀렉트 필터링
- 카테고리 분류

**SmartPark 사용처**: `ParkingFilterModal` 필터 옵션 선택

---

### 5.4 Button — CTA

**참고 이미지**: `Component/Btn/Btn_CTA.png`

**해부도 (Anatomy)**

| 구성 요소 | 설명 |
|---|---|
| 컨테이너 | 버튼 외곽 영역 |
| 아이콘 | 선택적 아이콘 (좌측 또는 우측) |
| 텍스트 | 버튼 레이블 |

**적용 기준**
- Primary 색상: `#03AA5A`
- 전체 너비 사용 (full-width) 가능
- **SmartPark 사용처**: 주요 액션 버튼 (예약, 확인, 검색)

---

### 5.5 Button — Pill

**참고 이미지**: `Component/Btn/Btn_pill.png`

**사이즈**

| 사이즈 | 설명 |
|---|---|
| L | 대형 |
| M | 중형 |
| S | 소형 |
| XS | 극소형 |
| XXS | 최소형 |

**타입**

| 타입 | 설명 |
|---|---|
| Default | 기본 Pill 버튼 |
| InfoEx | 정보 확장형 |
| MyPlacesFilter | 내 장소 필터용 |
| CategoryFilter | 카테고리 필터용 |

**적용 기준**
- Radius: 18px (Pill 형태)
- **SmartPark 사용처**: 지도 위 카테고리 필터, 정렬 옵션

---

### 5.6 Header

**참고 이미지**: `Component/Header/Header_Default.png`, `Input Header.png`

**Default Header 타입**

| 타입 | 설명 |
|---|---|
| RG_White | 흰 배경 헤더 |
| RG_Image | 이미지 배경 헤더 |

**레이아웃 변형**

| 변형 | 설명 |
|---|---|
| Centerline | 중앙 정렬 타이틀 |
| Leftbtns | 좌측 버튼 포함 |
| UpperCase | 대문자 타이틀 |

**Input Header 타입**

| 타입 | 설명 |
|---|---|
| SearchBar+Btn | 검색바 + 버튼 조합 |
| Input+Txt | 입력창 + 텍스트 버튼 |
| Input+IC+TxtBtn | 입력창 + 아이콘 + 텍스트 버튼 |

**SmartPark 사용처**: `DestinationSearchScreen` 상단, `ParkingDetailScreen` 헤더

---

### 5.7 NaviBar (하단 내비게이션)

**참고 이미지**: `Component/Navi Bar.png`

**해부도 (Anatomy)**

| 구성 요소 | 설명 |
|---|---|
| Container | 전체 바 컨테이너 |
| Icon | 각 탭 아이콘 |
| Label | 각 탭 레이블 텍스트 |

**규격**
- Tab 수: 3~5개 지원
- 상태: Unselected / Selected

**SmartPark 사용처**: `MainTabNavigator`

---

### 5.8 Modal

**참고 이미지**: `Component/Modal.png`

**타입**: PopupModal

**해부도 (5-part structure)**
1. 컨테이너 (배경 + Radius)
2. 타이틀 영역
3. 본문 텍스트 영역
4. 구분선 (선택)
5. 버튼 영역 (단일 또는 2개)

**적용 기준**
- Radius: 12px (이미지 기준)
- Dim overlay 사용
- **SmartPark 사용처**: `ParkingFilterModal`, 확인/취소 다이얼로그

---

### 5.9 Tab

**참고 이미지**: `Component/Tap/Tab.png` (원본 폴더명: Tap)

**타입 (a~h, TabC)**

| 타입 | 설명 |
|---|---|
| a~h | 기본 Tab 변형 8종 |
| TabC | 특수 Tab 타입 |

**규격**
- Tab 수: 2~6개

**SmartPark 사용처**: `ParkingDetailScreen` 상세 정보 탭 전환

---

### 5.10 Card

**참고 이미지**: `Component/Card/Card_Location.png`

**구성 요소**
- 썸네일 이미지
- 장소명 (타이틀)
- 메타데이터 (거리, 주소 등)

**SmartPark 사용처**: `ParkingCard`, 주차장 목록 항목

---

### 5.11 MapMarker

**참고 이미지**: `Component/Content/Content_MapMaker.png`

**타입**

| 타입 | 설명 |
|---|---|
| Default | 기본 마커 |
| Pin | 핀 형태 마커 |
| Spot_2 | 2종 스팟 마커 |
| Spot_3 | 3종 스팟 마커 |

**SmartPark 사용처**: `HomeMapScreen` 지도 위 주차장 위치 표시

---

### 5.12 Pagination

**참고 이미지**: `Component/Pagination.png`

**상태**

| 상태 | 설명 |
|---|---|
| Start | 첫 페이지 상태 |
| Middle | 중간 페이지 상태 |
| End | 마지막 페이지 상태 |

**서브 타입**: num (숫자), arrow (화살표), tab (탭 형태)

**SmartPark 사용처**: 목록 페이지 이동 (필요 시)

---

### 5.13 Radio

**참고 이미지**: `Component/Radio.png`

**해부도**

| 구성 요소 | 설명 |
|---|---|
| 컨테이너 영역 | 전체 라디오 버튼 영역 |
| 텍스트 영역 | 옵션 레이블 |
| 라디오 영역 | 선택 표시 원형 요소 |

**상태**: True (선택) / False (미선택)

**사용 규칙 (이미지 기준)**
- 단일 선택 옵션에 사용
- 동일한 그룹 내 옵션 2개 이상 시 사용
- 선택 즉시 반영 (추가 확인 단계 없음)

**SmartPark 사용처**: 정렬 기준 선택, 단일 옵션 필터

---

### 5.14 Switch

**참고 이미지**: `Component/Switch/Switch_Default.png`

**해부도**

| 구성 요소 | 설명 |
|---|---|
| 컨테이너 영역 | On/Off 상태를 색상으로 표현 |
| 텍스트 영역 | 켜짐/꺼짐 상태 텍스트 |
| 핸들 영역 | 터치/클릭으로 조작하는 원형 핸들 |

**상태**: On (Default/Pressed) / Off (Default/Pressed)

**사용 규칙 (이미지 기준)**
- 설정을 켜거나 끄는 용도로만 사용
- 텍스트를 스위치 오른쪽에 배치 (왼쪽 배치 금지)
- On 상태에서 출발 시각 및 도착 시간 입력 활성화
- Off 상태에서 시간 입력 비활성화

**SmartPark 사용처**: 출발 시각 설정 토글 (`ParkingDetailScreen` 또는 필터)

---

### 5.15 TimePicker

**참고 이미지**: `Component/TimePicker.png`

**해부도**

| 구성 요소 | 설명 |
|---|---|
| 시간 선택 영역 | 시/분 스크롤 선택 |
| 날짜 선택 영역 | 날짜 스크롤 선택 |
| 단위, 오전/오후 영역 | AM/PM 및 단위 표시 |
| 선택 인디케이터 영역 | 현재 선택값 강조 표시 |

**상태**: Selected / Unselected

**사용 규칙 (이미지 기준)**
- 스크롤로 시간 선택 조작
- Switch와 연동: Switch On 시 활성화, Off 시 비활성화

**SmartPark 사용처**: 출발 시각 설정 (Switch와 연동)

---

### 5.16 Drop Down

**참고 이미지**: `Component/Drop Down.png`

**해부도**

| 구성 요소 | 설명 |
|---|---|
| 플레이스홀더 영역 | 드롭다운 활성화 트리거, 플레이스홀더 텍스트 포함 |
| 아이콘 영역 | 버튼 내용 및 특성 표시 |
| 드롭다운 필드 | 아이콘 버튼 기능을 보조하는 정보 제공 |

**상태**: False (닫힘) / True (열림, 옵션 목록 표시)

**사용 규칙 (이미지 기준)**
- 옵션명은 2줄로 노출하지 않음
- 옵션명이 영역을 초과할 경우 말줄임표(...) 허용
- 옵션명은 좌측 정렬 기본
- 옵션 선택 시 추가 확인 절차 없이 즉시 반영

**SmartPark 사용처**: 목록 정렬 방식 선택, 필터 기준 선택

---

## 6. SmartPark 화면별 적용 기준

화면 이름 기준: `docs/harness/SCREEN_STRUCTURE.md`

### 6.1 HomeMapScreen (U-01)

| 요소 | 컴포넌트 | 적용 기준 |
|---|---|---|
| 지도 위 검색 진입 | SearchBar (Default 또는 LeadOnly) | Shadow 적용, Radius 20px |
| 주차장 위치 표시 | MapMarker (Default/Pin) | 상태별 타입 구분 |
| 지도 위 필터 | Pill Button (CategoryFilter) | 지도 상단 수평 배열 |
| 하단 내비게이션 | NaviBar | 3~5탭, Selected 상태 표시 |

### 6.2 ParkingBottomSheet

| 요소 | 컴포넌트 | 적용 기준 |
|---|---|---|
| 시트 컨트롤러 | BottomSheet Controller (Default) | 상단 중앙 핸들바 |
| 주차장 목록 항목 | Card (Location) | 이미지, 타이틀, 메타데이터 |
| 상태 표시 | Badge (Status) | AVAILABLE/FULL 상태 구분 |

### 6.3 DestinationSearchScreen (U-03)

| 요소 | 컴포넌트 | 적용 기준 |
|---|---|---|
| 검색 헤더 | Input Header (SearchBar+Btn) | 취소 버튼 포함 |
| 검색 결과 목록 | SearchBar (List 타입) | 결과 항목 리스트 |

### 6.4 ParkingDetailScreen (U-05)

| 요소 | 컴포넌트 | 적용 기준 |
|---|---|---|
| 상단 헤더 | Header (RG_White, Leftbtns) | 뒤로가기 버튼 포함 |
| 정보 탭 전환 | Tab (타입 a~h 중 적절한 것) | 2~6개 탭 규칙 준수 |
| 주요 액션 | CTA Button | Primary Green, 하단 고정 |
| 출발 시각 설정 | Switch + TimePicker | Switch On 시 TimePicker 활성화 |

### 6.5 ParkingFilterModal

| 요소 | 컴포넌트 | 적용 기준 |
|---|---|---|
| 모달 컨테이너 | Modal (PopupModal) | Radius 12px, Dim overlay |
| 필터 옵션 (멀티) | Chip | False/True 상태 전환 |
| 필터 옵션 (단일) | Radio | 단일 선택 옵션 |
| 정렬 선택 | Drop Down | 옵션 목록 좌측 정렬 |
| 적용 버튼 | CTA Button | Primary Green |

### 6.6 MainTabNavigator

| 요소 | 컴포넌트 | 적용 기준 |
|---|---|---|
| 하단 탭 바 | NaviBar | 3~5탭, Icon + Label |

---

## 7. React Native 구현 연결

| 디자인 토큰 | React Native 파일 위치 |
|---|---|
| Color | `src/frontend/src/theme/colors.ts` |
| Spacing | `src/frontend/src/theme/spacing.ts` |
| Radius | `src/frontend/src/theme/radius.ts` |
| Typography | `src/frontend/src/theme/typography.ts` |

**폰트 설정**
- 한국어: Noto Sans KR
- 영문/숫자: Pretendard
- 단위: React Native에서 pt 기준값을 그대로 사용 (플랫폼별 스케일링은 RN 기본 처리)

**컴포넌트 파일 위치 규칙 (구현 시 적용)**
- 공통 컴포넌트: `src/frontend/src/components/`
- 화면 컴포넌트: `src/frontend/src/screens/`
- 파일명: PascalCase

---

## 8. 구현 시 주의사항

1. **이미지에서 확인되지 않는 값 사용 금지**: 본 문서에 명시되지 않은 수치나 색상값은 임의로 추가하지 않는다.
2. **"이미지에서 확인 가능한 범위 기준" 항목**: 해당 항목의 정확한 값은 원본 이미지를 직접 확인한다.
3. **상태값 네이밍**: `AVAILABLE`, `FULL` 등 `docs/harness/PROJECT_RULES.md` 기준 대문자 사용.
4. **폴더명 원본 유지**: 실제 파일 경로에서 `Tap` 폴더명은 그대로 사용하고, UI 텍스트에서만 `Tab`으로 표기.
5. **Dim overlay**: Modal, BottomSheet 표시 시 지도 및 배경 콘텐츠 위에 Dim 적용.
6. **Shadow vs Elevation**: Shadow는 BottomSheet/SearchBar/FAB에, Dim은 오버레이 배경에 구분하여 적용.
7. **NaviBar 탭 수**: 3~5개 범위 내에서 결정. 현재 SmartPark MVP 기준으로 탭 수를 확정 후 구현.
8. **Tab 컴포넌트 탭 수**: 2~6개 범위 내에서 결정.

---

## 9. 다음 구현 단계 연결

1. **테마 파일 구현**: `src/frontend/src/theme/` 내 색상, 타이포그래피, 간격, 반지름 토큰 파일 작성
2. **공통 컴포넌트 구현**: BottomSheet, SearchBar, Chip, Button, Header, NaviBar, Modal, Tab 순서로 구현
3. **화면 구현**: `SCREEN_STRUCTURE.md` 기준 MVP 화면(U-01, U-03, U-05) 순서로 구현
4. **컴포넌트 연결**: 구현된 컴포넌트를 화면에 배치하고 디자인 토큰 적용 확인
5. **참고 문서**: `docs/harness/CLAUDE.md`, `docs/harness/SCREEN_STRUCTURE.md`, `docs/harness/PROJECT_RULES.md`
