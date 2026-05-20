# CHANGELOG_BACKEND

SmartPark 백엔드 구현 변경 이력을 정리한다.

본 문서는 `v2.x.x` 버전 라인에 해당하는 Spring Boot 백엔드 구현 이력을 관리한다.

---

## 관리 기준

| 버전 라인 | 영역 | 설명 |
|---|---|---|
| `v2.0.x` | 백엔드 초기 설정 | Spring Boot 프로젝트 설정, MySQL 연결, 기본 패키지 구조 |
| `v2.1.x` | 공통 기반 | 공통 응답, 예외 처리, Swagger/OpenAPI 설정 |
| `v2.2.x` | 주차장 도메인 | ParkingLot, ParkingSpace, 주차장 조회 API |
| `v2.3.x` | 위치/지도 연동 | Naver Maps API, Geocoding, Directions5 연동 |
| `v2.4.x` | AI 결과 연동 | AI 혼잡도 분석 결과 조회 API, MySQL 적재 데이터 연동 |
| `v2.5.x` | 공급자/이용/결제 | 공급자 등록, 이용 세션, 결제 mock API |
| `v2.6.x` | 테스트/배포 | 테스트 코드, Swagger 문서 보완, AWS 배포 준비 |

---

## 최신 기준선

| 최신 버전 | 주요 내용 |
|---:|---|
| `v2.0.0` 예정 | 백엔드 구현 시작 기준선 |

---

## 예정 기준선

## v2.0.0

### 백엔드 구현 시작 기준선

#### 예정 작업

- `src/backend` 하위 Spring Boot 프로젝트 구조 생성
- Java 17, Gradle 기반 프로젝트 구성
- 기본 package를 `com.smartpark`로 설정
- 필수 의존성 추가
  - `spring-boot-starter-web`
  - `spring-boot-starter-validation`
  - `spring-boot-starter-data-jpa`
  - `mysql-connector-j`
  - `springdoc-openapi-starter-webmvc-ui`
  - `spring-boot-starter-test`
- 기본 실행 확인
- 프론트엔드와 AI 폴더는 수정하지 않음

#### 완료 조건

- `src/backend`에서 Spring Boot 애플리케이션 실행 가능
- 기본 서버 실행 확인
- 생성/수정 파일 목록 정리
- `CHANGELOG_BACKEND.md`에 구현 결과 반영
