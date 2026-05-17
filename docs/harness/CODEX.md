# CODEX.md

# SmartPark Codex 백엔드 및 문서화 작업 지침 문서

## 1. 문서 개요

### 1.1 문서 목적

본 문서는 Codex가 SmartPark 프로젝트의 Spring Boot 백엔드 설계, API 구현, 데이터베이스 구조 설계, 테스트 코드 작성, 문서화 작업을 일관성 있게 수행할 수 있도록 작업 기준을 정의하기 위해 작성되었다.

SmartPark는 사용자의 현재 위치와 목적지를 기반으로 주변 주차 가능 공간을 탐색하고, 곧 비워질 주차 공간 정보, 개인 주차장 공유, NFC 기반 간편 결제, AI 또는 규칙 기반 혼잡도 분석 기능을 제공하는 AI 기반 스마트 주차 플랫폼이다.

Codex는 본 문서를 기준으로 SmartPark 백엔드의 도메인 구조, Controller, Service, Repository, DTO, API 응답 구조, 예외 처리, 외부 API 연동, 데이터베이스 설계, 테스트 구조를 작성한다. 이 문서는 Codex가 임의로 구조를 변경하지 않고, 기존 하네스 문서와 일관된 방식으로 백엔드 및 문서화 작업을 수행하도록 돕는 기준 문서이다.

---

### 1.2 문서 적용 범위

본 문서는 다음 작업에 적용한다.

| 구분              | 적용 내용                                                                           |
| ----------------- | ----------------------------------------------------------------------------------- |
| 백엔드 구조 설계  | Spring Boot 패키지 구조, 계층 구조, 도메인 구조 설계                                |
| API 설계          | REST API endpoint, 요청 DTO, 응답 DTO, 상태 코드 설계                               |
| 도메인 모델링     | User, ParkingLot, ParkingSpace, ParkingSession, Payment, Report 등 핵심 도메인 설계 |
| 데이터베이스 설계 | MySQL 테이블 구조, 관계, 인덱스, 상태값 관리                                        |
| 서비스 로직       | 주차장 조회, 공급자 등록, 이용 세션, 결제, 정산, 신고, 승인 로직 작성               |
| 외부 연동         | Naver Maps API, 결제 API, NFC 태그, AI/규칙 기반 혼잡도 분석 연동                   |
| 테스트            | 단위 테스트, 통합 테스트, API 테스트 케이스 작성                                    |
| 문서화            | API 명세, 설계 문서, 변경 이력, 프롬프트 기록 보조                                  |

---

### 1.3 관련 문서

Codex는 작업 전 다음 문서를 우선 확인한다.

| 문서                               | 확인 목적                                                 |
| ---------------------------------- | --------------------------------------------------------- |
| `docs/harness/PRD.md`              | 제품 목표, MVP 범위, 핵심 기능 확인                       |
| `docs/harness/FEATURE_SPEC.md`     | 기능별 입력값, 출력값, 예외 상황, API 후보 확인           |
| `docs/harness/SCREEN_STRUCTURE.md` | 화면별 필요한 데이터와 API 응답 구조 확인                 |
| `docs/harness/PROJECT_RULES.md`    | 폴더 구조, 코드 작성 규칙, commit/tag/CHANGELOG 규칙 확인 |
| `docs/harness/CLAUDE.md`           | 프론트엔드 화면 구조와 API 연동 방식 확인                 |
| `docs/product/PERSONA.md`          | 주요 사용자 유형과 기능 필요성 확인                       |
| `docs/product/USER_JOURNEY.md`     | 이용자, 공급자, 관리자 흐름 확인                          |
| `docs/product/SERVICE_SCENARIO.md` | 실제 이용 시나리오와 예외 흐름 확인                       |
| `docs/product/BUSINESS_MODEL.md`   | 결제, 정산, 공급자 수익 구조 확인                         |
| `configuration_management_plan.md` | 형상관리, commit, tag, CHANGELOG 기준 확인                |
| `CHANGELOG.md`                     | 버전별 변경 이력 확인                                     |

---

## 2. Codex의 역할

### 2.1 주요 역할

Codex는 SmartPark 프로젝트에서 백엔드 설계 및 문서화 보조자 역할을 수행한다.

| 역할                 | 설명                                                       |
| -------------------- | ---------------------------------------------------------- |
| 백엔드 설계자        | Spring Boot 기반 서버 구조와 도메인 구조 설계              |
| API 설계자           | 화면과 기능 요구사항에 맞는 REST API 설계                  |
| 데이터 모델러        | MySQL 기반 테이블, 관계, 상태값 설계                       |
| 서비스 로직 구현자   | 주차장 조회, 등록, 승인, 결제, 신고, 정산 로직 작성        |
| 외부 API 연동 보조자 | Naver Maps API, 결제 API, NFC, AI 분석 모듈 연동 구조 작성 |
| 테스트 작성자        | 주요 서비스 로직과 API 테스트 코드 작성                    |
| 문서화 보조자        | API 명세, 변경 이력, 작업 결과 요약 작성                   |

---

### 2.2 Codex가 우선 담당하는 영역

| 우선순위 | 영역                         | 설명                                                            |
| -------- | ---------------------------- | --------------------------------------------------------------- |
| 1        | Spring Boot 백엔드 구조 설계 | Controller, Service, Repository, DTO, Domain 구조 작성          |
| 2        | 핵심 도메인 모델링           | User, ParkingLot, ParkingSpace, ParkingSession, Payment 등 설계 |
| 3        | API 설계                     | 프론트엔드 화면과 기능 명세에 맞는 endpoint 설계                |
| 4        | 서비스 로직 작성             | 검색, 추천, 등록, 승인, 결제, 신고, 정산 로직 작성              |
| 5        | 데이터베이스 설계            | MySQL 테이블 구조와 관계 설계                                   |
| 6        | 예외 처리 구조               | 공통 응답, 오류 코드, 예외 클래스 작성                          |
| 7        | 테스트 코드                  | 단위 테스트, 통합 테스트, API 테스트 작성                       |
| 8        | 문서화                       | API 문서, 백엔드 구조 문서, 변경 이력 보조                      |

---

### 2.3 Codex가 직접 판단하지 말아야 하는 영역

Codex는 다음 항목을 사용자 확인 없이 임의로 변경하지 않는다.

| 금지 항목            | 설명                                                                          |
| -------------------- | ----------------------------------------------------------------------------- |
| 제품 범위 변경       | `PRD.md`에서 정의하지 않은 대형 기능을 임의로 추가하지 않는다.                |
| 화면명 변경          | `SCREEN_STRUCTURE.md`의 화면명과 흐름을 임의로 변경하지 않는다.               |
| API 경로 체계 변경   | 기존 endpoint 규칙을 무시하고 새로운 체계를 만들지 않는다.                    |
| 상태값 변경          | `AVAILABLE`, `PAID`, `APPROVED` 등 문서 기준 상태값을 임의로 변경하지 않는다. |
| 프론트엔드 구조 변경 | Claude Code 담당 영역인 React Native 구조를 임의로 수정하지 않는다.           |
| 대규모 리팩토링      | 사용자 요청 없이 전체 패키지 구조를 변경하지 않는다.                          |
| 민감 정보 삽입       | API Key, 결제 Key, DB 비밀번호를 코드에 직접 작성하지 않는다.                 |
| 문서 삭제            | 기존 하네스 문서, 과제 문서, 제품 기획 문서를 삭제하지 않는다.                |

---

## 3. 기본 작업 흐름

### 3.1 Codex 작업 순서

Codex는 다음 순서로 작업한다.

```text
요청 내용 확인
→ 관련 하네스 문서 확인
→ 수정할 파일과 생성할 파일 목록 정리
→ 도메인/계층 영향 범위 확인
→ 코드 또는 문서 작성
→ 예외 흐름과 상태값 확인
→ 테스트 또는 검증 방법 작성
→ 변경 파일 목록 요약
→ CHANGELOG 반영 여부 안내
```

---

### 3.2 권장 작업 단위

Codex는 한 번에 너무 큰 범위를 수정하지 않는다.

| 권장 작업 단위          | 예시                                        |
| ----------------------- | ------------------------------------------- |
| 도메인 1개 설계         | `ParkingLot` 엔티티, DTO, Repository 작성   |
| API 1개 묶음 설계       | 주차장 조회 API 묶음 작성                   |
| 서비스 로직 1개 작성    | 현재 위치 기반 주변 주차장 조회 서비스 작성 |
| 예외 처리 구조 1개 작성 | 공통 오류 응답 구조 작성                    |
| 테스트 1개 묶음 작성    | 주차장 조회 서비스 테스트 작성              |
| 문서 1개 수정           | API 명세 또는 CHANGELOG 일부 갱신           |

큰 작업이 필요한 경우에는 다음과 같이 나눈다.

```text
1단계: 도메인 모델과 enum 작성
2단계: Repository와 DTO 작성
3단계: Service 로직 작성
4단계: Controller endpoint 작성
5단계: 예외 처리와 응답 형식 정리
6단계: 테스트 코드 작성
7단계: API 문서와 CHANGELOG 반영
```

---

## 4. 백엔드 기본 구조

### 4.1 기본 폴더 구조

Codex는 Spring Boot 백엔드를 다음 구조로 설계한다.

```text
src/backend/
└── src/main/java/com/smartpark/
    ├── SmartParkApplication.java
    ├── domain/
    │   ├── user/
    │   ├── parking/
    │   ├── session/
    │   ├── payment/
    │   ├── settlement/
    │   ├── report/
    │   ├── congestion/
    │   └── notification/
    ├── controller/
    ├── service/
    ├── repository/
    ├── dto/
    │   ├── request/
    │   └── response/
    ├── config/
    ├── common/
    │   ├── response/
    │   ├── exception/
    │   └── status/
    └── external/
        ├── naver/
        ├── payment/
        ├── nfc/
        └── ai/
```

---

### 4.2 계층별 역할

| 계층         | 역할                           | 작성 기준                                        |
| ------------ | ------------------------------ | ------------------------------------------------ |
| `controller` | HTTP 요청과 응답 처리          | 요청 검증 후 Service 호출 중심으로 작성          |
| `service`    | 비즈니스 로직 처리             | 상태 변경, 요금 계산, 승인, 신고, 정산 로직 작성 |
| `repository` | 데이터베이스 접근              | JPA Repository 또는 Query 메서드 작성            |
| `domain`     | Entity, enum, 도메인 모델 관리 | 핵심 비즈니스 상태와 관계 표현                   |
| `dto`        | 요청/응답 데이터 객체 관리     | Entity 직접 노출 금지                            |
| `config`     | 보안, CORS, 외부 API 설정      | 환경별 설정 분리                                 |
| `common`     | 공통 응답, 예외, 상태 코드     | API 응답 형식 통일                               |
| `external`   | 외부 API 연동                  | 지도, 결제, NFC, AI 모듈 연동 분리               |

---

### 4.3 패키지 구조 원칙

| 원칙             | 설명                                                        |
| ---------------- | ----------------------------------------------------------- |
| 도메인 중심 분리 | 주차장, 이용 세션, 결제, 신고 등 핵심 도메인별로 분리한다.  |
| 계층 역할 유지   | Controller에 비즈니스 로직을 작성하지 않는다.               |
| DTO 분리         | 요청 DTO와 응답 DTO를 명확히 분리한다.                      |
| 외부 API 격리    | 외부 연동 로직은 `external/` 또는 client 클래스로 분리한다. |
| 공통 응답 통일   | 성공/실패 응답 형식을 일관되게 유지한다.                    |
| 상태값 enum 관리 | 문자열 상태값을 직접 사용하지 않고 enum으로 관리한다.       |

---

## 5. 핵심 도메인 설계 기준

### 5.1 주요 도메인 목록

| 도메인                 | 설명                                      |
| ---------------------- | ----------------------------------------- |
| `User`                 | 일반 이용자, 공급자, 관리자 계정 정보     |
| `Provider`             | 주차 공간 공급자 정보                     |
| `ParkingLot`           | 주차장 또는 공유 주차 공간의 기본 정보    |
| `ParkingSpace`         | 개별 주차면 또는 공유 가능한 공간         |
| `Availability`         | 요일, 시간대, 이용 가능 상태              |
| `PricePolicy`          | 시간당 요금, 일 최대 요금, 추가 요금 정책 |
| `ParkingSession`       | 주차 이용 시작, 종료, 이용 상태 기록      |
| `Payment`              | 결제 요청, 성공, 실패, 환불 상태 기록     |
| `Settlement`           | 공급자 정산 예정 금액 및 정산 상태        |
| `Report`               | 신고, 분쟁, 문제 처리 기록                |
| `CongestionPrediction` | 혼잡도 분석 결과                          |
| `Notification`         | 알림 메시지 및 발송 상태                  |
| `NfcTag`               | NFC 태그와 주차 공간 연결 정보            |

---

### 5.2 도메인 관계 기준

```text
User 1 --- N ParkingSession
User 1 --- N Payment
User 1 --- N Report

Provider 1 --- N ParkingLot
ParkingLot 1 --- N ParkingSpace
ParkingLot 1 --- N Availability
ParkingLot 1 --- N PricePolicy
ParkingLot 1 --- N CongestionPrediction

ParkingSpace 1 --- N ParkingSession
ParkingSession 1 --- 1 Payment
ParkingSession 1 --- N Report

Provider 1 --- N Settlement
ParkingSpace 1 --- 1 NfcTag
```

---

### 5.3 도메인 설계 주의사항

| 주의사항                                | 설명                                                                             |
| --------------------------------------- | -------------------------------------------------------------------------------- |
| User와 Provider 구분                    | 공급자는 User의 역할로 관리하거나 별도 Provider 엔티티로 확장 가능하게 설계한다. |
| ParkingLot과 ParkingSpace 분리          | 주차장 전체 정보와 개별 주차면 상태를 분리한다.                                  |
| ParkingSession 중심 기록                | 이용 시작/종료, 결제, 신고는 ParkingSession과 연결한다.                          |
| Payment와 Settlement 분리               | 사용자 결제와 공급자 정산은 별도 도메인으로 관리한다.                            |
| Report는 여러 대상과 연결 가능          | 신고는 사용자, 주차장, 세션, 결제와 연결될 수 있다.                              |
| CongestionPrediction은 추후 고도화 가능 | 초기에는 규칙 기반 결과를 저장하고, 이후 AI 모델 결과로 확장한다.                |

---

## 6. Entity 작성 규칙

### 6.1 공통 Entity 규칙

| 규칙                  | 설명                                                    |
| --------------------- | ------------------------------------------------------- |
| 기본키                | `Long id`를 기본으로 사용한다.                          |
| 생성/수정 시각        | `createdAt`, `updatedAt`을 공통으로 관리한다.           |
| 상태값                | enum 타입으로 관리한다.                                 |
| 연관관계              | 필요한 경우에만 양방향 관계를 사용한다.                 |
| 지연 로딩             | JPA 연관관계는 기본적으로 LAZY를 우선한다.              |
| 비즈니스 메서드       | 상태 변경 로직은 Entity 또는 Service에 명확히 분리한다. |
| 직접 Setter 남용 금지 | 필요한 변경 메서드를 작성한다.                          |

---

### 6.2 BaseEntity 예시

```java
@MappedSuperclass
@Getter
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity {

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
```

---

### 6.3 ParkingLot Entity 예시

```java
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ParkingLot extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long providerId;

    private String name;

    private String address;

    private Double latitude;

    private Double longitude;

    private Integer spaceCount;

    @Enumerated(EnumType.STRING)
    private ParkingLotStatus status;

    @Enumerated(EnumType.STRING)
    private ApprovalStatus approvalStatus;

    public void approve() {
        this.approvalStatus = ApprovalStatus.APPROVED;
        this.status = ParkingLotStatus.AVAILABLE;
    }

    public void reject() {
        this.approvalStatus = ApprovalStatus.REJECTED;
        this.status = ParkingLotStatus.INACTIVE;
    }
}
```

---

## 7. 상태값 enum 기준

### 7.1 주차장 상태

```java
public enum ParkingLotStatus {
    AVAILABLE,
    SOON_AVAILABLE,
    OCCUPIED,
    FULL,
    INACTIVE
}
```

| 상태             | 의미                  |
| ---------------- | --------------------- |
| `AVAILABLE`      | 현재 이용 가능        |
| `SOON_AVAILABLE` | 곧 비워질 예정        |
| `OCCUPIED`       | 현재 이용 중          |
| `FULL`           | 만차                  |
| `INACTIVE`       | 운영 중지 또는 비노출 |

---

### 7.2 주차 세션 상태

```java
public enum ParkingSessionStatus {
    STARTED,
    IN_PROGRESS,
    ENDED,
    PAYMENT_PENDING,
    COMPLETED,
    DISPUTED,
    CANCELLED
}
```

| 상태              | 의미                   |
| ----------------- | ---------------------- |
| `STARTED`         | 이용 시작              |
| `IN_PROGRESS`     | 이용 중                |
| `ENDED`           | 이용 종료              |
| `PAYMENT_PENDING` | 결제 대기              |
| `COMPLETED`       | 결제 완료 및 이용 종료 |
| `DISPUTED`        | 분쟁 또는 신고 상태    |
| `CANCELLED`       | 이용 취소              |

---

### 7.3 결제 상태

```java
public enum PaymentStatus {
    PENDING,
    PAID,
    FAILED,
    NEEDS_CONFIRMATION,
    REFUNDED
}
```

| 상태                 | 의미           |
| -------------------- | -------------- |
| `PENDING`            | 결제 대기      |
| `PAID`               | 결제 완료      |
| `FAILED`             | 결제 실패      |
| `NEEDS_CONFIRMATION` | 결제 확인 필요 |
| `REFUNDED`           | 환불 완료      |

---

### 7.4 승인 상태

```java
public enum ApprovalStatus {
    PENDING,
    APPROVED,
    REJECTED,
    NEEDS_REVISION
}
```

| 상태             | 의미      |
| ---------------- | --------- |
| `PENDING`        | 승인 대기 |
| `APPROVED`       | 승인 완료 |
| `REJECTED`       | 반려      |
| `NEEDS_REVISION` | 보완 요청 |

---

### 7.5 신고 상태

```java
public enum ReportStatus {
    RECEIVED,
    REVIEWING,
    RESOLVED,
    REJECTED
}
```

| 상태        | 의미      |
| ----------- | --------- |
| `RECEIVED`  | 신고 접수 |
| `REVIEWING` | 검토 중   |
| `RESOLVED`  | 처리 완료 |
| `REJECTED`  | 신고 반려 |

---

### 7.6 혼잡도 상태

```java
public enum CongestionLevel {
    LOW,
    MEDIUM,
    HIGH,
    VERY_HIGH,
    UNKNOWN
}
```

| 상태        | 의미      |
| ----------- | --------- |
| `LOW`       | 여유      |
| `MEDIUM`    | 보통      |
| `HIGH`      | 혼잡      |
| `VERY_HIGH` | 매우 혼잡 |
| `UNKNOWN`   | 정보 부족 |

---

## 8. DTO 작성 규칙

### 8.1 DTO 기본 원칙

| 원칙                    | 설명                                               |
| ----------------------- | -------------------------------------------------- |
| Entity 직접 노출 금지   | Controller 응답에 Entity를 그대로 반환하지 않는다. |
| Request와 Response 분리 | 입력 DTO와 출력 DTO를 분리한다.                    |
| 검증 어노테이션 사용    | `@NotNull`, `@NotBlank`, `@Min` 등을 활용한다.     |
| 정적 팩토리 메서드 사용 | Entity → Response 변환은 `from()` 메서드 사용 가능 |
| 화면 요구사항 반영      | 프론트엔드 화면에서 필요한 값을 응답에 포함한다.   |

---

### 8.2 Request DTO 예시

```java
@Getter
@NoArgsConstructor
public class ParkingLotCreateRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String address;

    @NotNull
    private Double latitude;

    @NotNull
    private Double longitude;

    @Min(1)
    private Integer spaceCount;

    private String description;
}
```

---

### 8.3 Response DTO 예시

```java
@Getter
@Builder
public class ParkingLotResponse {

    private Long parkingLotId;
    private String name;
    private String address;
    private Double latitude;
    private Double longitude;
    private Integer spaceCount;
    private String status;
    private String approvalStatus;
    private String congestionLevel;

    public static ParkingLotResponse from(ParkingLot parkingLot) {
        return ParkingLotResponse.builder()
                .parkingLotId(parkingLot.getId())
                .name(parkingLot.getName())
                .address(parkingLot.getAddress())
                .latitude(parkingLot.getLatitude())
                .longitude(parkingLot.getLongitude())
                .spaceCount(parkingLot.getSpaceCount())
                .status(parkingLot.getStatus().name())
                .approvalStatus(parkingLot.getApprovalStatus().name())
                .build();
    }
}
```

---

## 9. API 설계 규칙

### 9.1 REST API 경로 기준

| 영역           | 경로 예시                                                              |
| -------------- | ---------------------------------------------------------------------- |
| 일반 사용자    | `/api/parking-lots`, `/api/parking-sessions`, `/api/payments`          |
| 공급자         | `/api/provider/parking-lots`, `/api/provider/settlements`              |
| 관리자         | `/api/admin/parking-lots`, `/api/admin/reports`, `/api/admin/payments` |
| 외부 지도/장소 | `/api/places`, `/api/routes`                                           |

---

### 9.2 HTTP Method 기준

| Method | 용도                     | 예시                                                    |
| ------ | ------------------------ | ------------------------------------------------------- |
| GET    | 조회                     | `GET /api/parking-lots/nearby`                          |
| POST   | 생성 또는 실행           | `POST /api/parking-sessions/start`                      |
| PATCH  | 일부 수정 또는 상태 변경 | `PATCH /api/admin/parking-lots/{parkingLotId}/approval` |
| PUT    | 전체 수정                | `PUT /api/provider/parking-lots/{parkingLotId}`         |
| DELETE | 삭제 또는 비활성화       | `DELETE /api/provider/parking-lots/{parkingLotId}`      |

---

### 9.3 주요 API 후보

| Method | Endpoint                                                 | 설명                       |
| ------ | -------------------------------------------------------- | -------------------------- |
| GET    | `/api/parking-lots/nearby`                               | 현재 위치 기반 주차장 조회 |
| GET    | `/api/places/search`                                     | 목적지 검색                |
| GET    | `/api/parking-lots/by-destination`                       | 목적지 기반 주차장 조회    |
| GET    | `/api/parking-lots/{parkingLotId}`                       | 주차장 상세 조회           |
| POST   | `/api/provider/parking-lots`                             | 공급자 주차장 등록         |
| POST   | `/api/provider/parking-lots/{parkingLotId}/availability` | 이용 가능 시간 설정        |
| POST   | `/api/provider/parking-lots/{parkingLotId}/price-policy` | 요금 정책 설정             |
| POST   | `/api/parking-sessions/start`                            | 주차 이용 시작             |
| POST   | `/api/parking-sessions/end`                              | 주차 이용 종료             |
| POST   | `/api/payments`                                          | 결제 처리                  |
| GET    | `/api/users/me/payments`                                 | 내 결제 내역 조회          |
| GET    | `/api/provider/settlements`                              | 공급자 정산 내역 조회      |
| GET    | `/api/parking-lots/recommendations`                      | 추천 주차장 조회           |
| GET    | `/api/parking-lots/{parkingLotId}/congestion`            | 주차장 혼잡도 조회         |
| GET    | `/api/admin/parking-lots/pending`                        | 승인 대기 주차장 조회      |
| PATCH  | `/api/admin/parking-lots/{parkingLotId}/approval`        | 주차장 승인/반려           |
| POST   | `/api/reports`                                           | 신고 접수                  |
| GET    | `/api/admin/reports`                                     | 신고 목록 조회             |
| PATCH  | `/api/admin/reports/{reportId}/status`                   | 신고 상태 변경             |
| GET    | `/api/admin/payments/errors`                             | 결제 오류 목록 조회        |
| POST   | `/api/admin/payments/{paymentId}/refund`                 | 환불 처리                  |
| GET    | `/api/admin/dashboard`                                   | 관리자 대시보드 조회       |

---

## 10. 공통 응답 및 예외 처리 규칙

### 10.1 성공 응답 형식

```json
{
  "success": true,
  "code": "PARKING_LOT_200",
  "message": "주차장 조회에 성공했습니다.",
  "data": {}
}
```

---

### 10.2 실패 응답 형식

```json
{
  "success": false,
  "code": "PARKING_LOT_404",
  "message": "주차장을 찾을 수 없습니다.",
  "data": null
}
```

---

### 10.3 공통 예외 유형

| 예외 유형                 | 설명                     | HTTP Status |
| ------------------------- | ------------------------ | ----------- |
| `BadRequestException`     | 잘못된 요청값            | 400         |
| `UnauthorizedException`   | 인증 필요                | 401         |
| `ForbiddenException`      | 권한 없음                | 403         |
| `NotFoundException`       | 리소스 없음              | 404         |
| `ConflictException`       | 중복 요청 또는 상태 충돌 | 409         |
| `ExternalApiException`    | 외부 API 호출 실패       | 502         |
| `InternalServerException` | 서버 내부 오류           | 500         |

---

### 10.4 상태 충돌 예외 예시

| 상황                                      | 처리            |
| ----------------------------------------- | --------------- |
| 이미 이용 중인 주차 공간에 이용 시작 요청 | 409 Conflict    |
| 승인되지 않은 주차장 이용 시작 요청       | 400 Bad Request |
| 결제 완료된 세션에 재결제 요청            | 409 Conflict    |
| 다른 사용자의 세션 종료 요청              | 403 Forbidden   |
| 존재하지 않는 NFC 태그 인식               | 404 Not Found   |
| 운영 시간이 아닌 주차장 이용 요청         | 400 Bad Request |

---

## 11. 주요 서비스 로직 기준

### 11.1 현재 위치 기반 주차장 조회

```text
사용자 좌표 수신
→ 검색 반경 내 승인된 주차장 조회
→ 운영 시간과 이용 가능 상태 필터링
→ 거리 계산
→ 혼잡도 또는 추천 점수 계산
→ 주차장 목록 응답
```

작성 기준은 다음과 같다.

1. 승인된 주차장만 이용자에게 노출한다.
2. 운영 중지 상태의 주차장은 제외한다.
3. 거리, 요금, 혼잡도, 이용 가능 상태를 함께 응답한다.
4. 초기에는 단순 거리 계산 또는 DB 조회 중심으로 구현하고, 이후 지도 API나 공간 인덱스를 적용할 수 있다.

---

### 11.2 목적지 기반 주차장 검색

```text
목적지 검색어 수신
→ Naver Maps API 또는 장소 검색 API 호출
→ 목적지 좌표 변환
→ 목적지 주변 주차장 조회
→ 도착 예정 시간 기준 혼잡도 계산
→ 추천 주차장 목록 응답
```

작성 기준은 다음과 같다.

1. 외부 장소 검색 로직은 `external/naver/`에 분리한다.
2. 목적지 좌표 변환 실패 시 명확한 오류를 반환한다.
3. 도착 예정 시간이 없으면 현재 시간 기준으로 추천한다.
4. 추천 점수는 거리, 요금, 혼잡도, 곧 비워질 자리 여부를 함께 고려한다.

---

### 11.3 공급자 주차 공간 등록

```text
공급자 등록 요청 수신
→ 필수 입력값 검증
→ 위치 중복 여부 확인
→ ParkingLot 생성
→ ParkingSpace 생성
→ 승인 상태 PENDING 저장
→ 등록 신청 결과 응답
```

작성 기준은 다음과 같다.

1. 등록 직후에는 `APPROVAL_STATUS = PENDING`으로 저장한다.
2. 승인 전 주차장은 이용자 검색 결과에 노출하지 않는다.
3. 주차 공간 사진은 파일 저장소 또는 URL 필드로 확장 가능하게 설계한다.
4. 공급자 본인만 등록 정보를 수정할 수 있어야 한다.

---

### 11.4 관리자 승인/반려

```text
관리자 승인 대기 목록 조회
→ 등록 정보 상세 검토
→ 승인/반려/보완 요청 처리
→ 상태 변경 이력 저장
→ 공급자에게 결과 알림
```

작성 기준은 다음과 같다.

1. 관리자 권한이 있는 사용자만 접근할 수 있다.
2. 승인 시 주차장 상태를 이용 가능 또는 운영 준비 상태로 변경한다.
3. 반려 또는 보완 요청 시 사유를 저장한다.
4. 승인 이력은 추후 감사 가능하도록 로그화한다.

---

### 11.5 NFC 기반 이용 시작/종료

```text
NFC 태그 ID 수신
→ 등록된 태그인지 확인
→ 연결된 ParkingSpace 조회
→ 이용 가능 상태 확인
→ ParkingSession 생성 또는 종료
→ 상태 변경
→ 이용 시간 계산
```

작성 기준은 다음과 같다.

1. NFC 태그는 특정 ParkingSpace와 연결되어야 한다.
2. 이미 이용 중인 공간은 중복 시작을 허용하지 않는다.
3. 시작 기록이 없는 종료 요청은 오류로 처리한다.
4. NFC 실패 시 수동 코드 또는 QR 코드 대체 흐름을 고려한다.
5. 이용 시작/종료 시각은 반드시 저장한다.

---

### 11.6 결제 및 정산

```text
이용 종료
→ 이용 시간 계산
→ 요금 정책 적용
→ 결제 금액 산출
→ 결제 요청
→ 결제 결과 저장
→ 공급자 정산 예정 금액 생성
```

작성 기준은 다음과 같다.

1. 결제 금액은 백엔드에서 최종 계산한다.
2. 프론트엔드에서 전달된 금액을 그대로 신뢰하지 않는다.
3. 결제 성공 시 `PaymentStatus.PAID`로 저장한다.
4. 결제 실패 시 `FAILED`, 응답 불명확 시 `NEEDS_CONFIRMATION`으로 저장한다.
5. 정산 도메인은 결제 도메인과 분리한다.
6. 동일 세션에 대한 중복 결제를 방지한다.

---

### 11.7 신고 및 분쟁 처리

```text
신고 접수
→ 신고 유형과 관련 세션 확인
→ 신고 상태 RECEIVED 저장
→ 관리자 검토
→ 처리 결과 입력
→ RESOLVED 또는 REJECTED 상태 변경
```

작성 기준은 다음과 같다.

1. 신고는 ParkingSession, Payment, ParkingLot과 연결 가능해야 한다.
2. 신고 상태는 `RECEIVED`, `REVIEWING`, `RESOLVED`, `REJECTED`로 관리한다.
3. 관리자 처리 결과와 처리 시각을 저장한다.
4. 반복 신고 또는 허위 정보는 운영 정책 확장 가능성을 고려한다.

---

### 11.8 AI/규칙 기반 혼잡도 분석

초기 MVP에서는 실제 AI 모델보다 규칙 기반 혼잡도 분석을 우선 적용한다.

```text
주차장 상태 조회
→ 시간대별 이용률 확인
→ 현재 이용 가능 공간 수 확인
→ 곧 비워질 자리 여부 확인
→ 거리와 요금 기준 반영
→ 혼잡도 등급 및 추천 점수 반환
```

작성 기준은 다음과 같다.

1. 초기에는 `LOW`, `MEDIUM`, `HIGH`, `VERY_HIGH`, `UNKNOWN` 등급을 반환한다.
2. 데이터 부족 시 `UNKNOWN` 또는 기본 추천 결과를 제공한다.
3. 추후 Python 기반 AI 분석 모듈 또는 별도 추천 서비스와 연동 가능하도록 설계한다.
4. 분석 결과는 `CongestionPrediction` 도메인에 저장하거나 캐싱할 수 있다.

---

## 12. 외부 API 연동 규칙

### 12.1 Naver Maps API

Naver Maps API는 지도 표시 자체보다 백엔드에서는 주소 변환, 역지오코딩, 경로 계산, 장소 검색에 활용될 수 있다.

| 기능              | 백엔드 활용                                    |
| ----------------- | ---------------------------------------------- |
| GeoCoding         | 주소를 좌표로 변환                             |
| Reverse GeoCoding | 좌표를 주소로 변환                             |
| Directions5       | 현재 위치 또는 목적지에서 주차장까지 경로 계산 |
| 장소 검색         | 목적지명 기반 후보 장소 조회                   |

작성 기준은 다음과 같다.

1. 외부 API Key는 코드에 직접 작성하지 않고 환경 변수 또는 설정 파일로 관리한다.
2. 외부 API 호출 실패 시 `ExternalApiException`으로 처리한다.
3. API 응답 구조는 내부 DTO로 변환하여 사용한다.
4. 프론트엔드에 외부 API 원본 응답을 그대로 노출하지 않는다.

---

### 12.2 결제 API

결제 API는 실제 구현 전까지는 mock 또는 stub 구조로 작성할 수 있다.

작성 기준은 다음과 같다.

1. 결제 금액은 서버에서 계산한다.
2. 결제 성공, 실패, 확인 필요 상태를 모두 처리한다.
3. 중복 결제를 방지하기 위해 sessionId 기준 unique 처리 또는 상태 검증을 수행한다.
4. 환불 요청은 관리자 API를 통해 별도 처리한다.
5. 실제 결제 연동 전에는 결제 adapter interface를 먼저 작성할 수 있다.

---

### 12.3 NFC 연동

NFC 태그 인식 자체는 모바일 앱에서 발생할 가능성이 높다. 백엔드는 앱이 전달한 `nfcTagId`를 검증하고, 해당 태그가 어떤 주차 공간과 연결되는지 확인한다.

작성 기준은 다음과 같다.

1. NFC 태그 ID는 DB에 등록된 값과 비교한다.
2. 태그와 ParkingSpace의 연결 관계를 저장한다.
3. 비정상 태그, 중복 태그, 미등록 태그를 예외 처리한다.
4. 보안상 태그 ID만으로 결제가 완료되지 않도록 사용자 세션과 함께 검증한다.

---

## 13. 데이터베이스 설계 규칙

### 13.1 테이블 네이밍

| 대상      | 규칙                                | 예시             |
| --------- | ----------------------------------- | ---------------- |
| 테이블명  | snake_case 복수형                   | `parking_lots`   |
| 컬럼명    | snake_case                          | `created_at`     |
| 기본키    | `id`                                | `id`             |
| 외래키    | 참조 도메인명 + `_id`               | `parking_lot_id` |
| 상태 컬럼 | 상태 의미 + `_status` 또는 `status` | `payment_status` |

---

### 13.2 인덱스 고려 대상

| 컬럼                                              | 이유                          |
| ------------------------------------------------- | ----------------------------- |
| `parking_lots.latitude`, `parking_lots.longitude` | 위치 기반 조회                |
| `parking_lots.approval_status`                    | 승인된 주차장 필터링          |
| `parking_spaces.status`                           | 이용 가능 공간 조회           |
| `parking_sessions.user_id`                        | 사용자 이용 내역 조회         |
| `parking_sessions.parking_space_id`               | 특정 주차 공간 이용 이력 조회 |
| `payments.payment_status`                         | 결제 오류 조회                |
| `reports.report_status`                           | 관리자 신고 목록 필터링       |
| `settlements.provider_id`                         | 공급자 정산 내역 조회         |

---

### 13.3 데이터 무결성 기준

1. 승인되지 않은 주차장은 이용자 검색 결과에 노출되지 않아야 한다.
2. 하나의 ParkingSession에는 하나의 최종 Payment가 연결되어야 한다.
3. 결제 완료 전 세션은 `COMPLETED`가 될 수 없다.
4. 공급자 정산은 결제 완료 이후 생성되어야 한다.
5. NFC 태그는 하나의 ParkingSpace에만 연결되어야 한다.
6. 삭제가 필요한 주차장은 물리 삭제보다 `INACTIVE` 상태로 관리하는 것을 우선한다.

---

## 14. 보안 및 권한 규칙

### 14.1 사용자 권한

| 권한            | 설명               |
| --------------- | ------------------ |
| `ROLE_USER`     | 일반 운전자        |
| `ROLE_PROVIDER` | 주차 공간 공급자   |
| `ROLE_ADMIN`    | 서비스 운영 관리자 |

---

### 14.2 권한별 접근 기준

| API 영역                   | 접근 권한             |
| -------------------------- | --------------------- |
| `/api/parking-lots/**`     | 일반 사용자 접근 가능 |
| `/api/parking-sessions/**` | 로그인 사용자 접근    |
| `/api/payments/**`         | 본인 결제 정보만 접근 |
| `/api/provider/**`         | 공급자 권한 필요      |
| `/api/admin/**`            | 관리자 권한 필요      |

---

### 14.3 개인정보 및 민감 정보 관리

| 정보      | 관리 기준                                         |
| --------- | ------------------------------------------------- |
| 위치 정보 | 필요한 범위 내에서만 저장하고 사용한다.           |
| 결제 정보 | 카드번호 등 민감 정보는 직접 저장하지 않는다.     |
| 차량 정보 | 최소한의 정보만 저장한다.                         |
| API Key   | 환경 변수 또는 secret 설정으로 관리한다.          |
| 로그      | 개인정보와 결제 정보를 로그에 직접 남기지 않는다. |

---

## 15. 테스트 작성 규칙

### 15.1 테스트 범위

| 테스트 유형       | 대상                                                |
| ----------------- | --------------------------------------------------- |
| 단위 테스트       | Service 로직, 요금 계산, 상태 변경                  |
| Repository 테스트 | 위치 기반 조회, 상태별 조회                         |
| Controller 테스트 | API 요청/응답 형식                                  |
| 통합 테스트       | 주차 이용 시작 → 종료 → 결제 흐름                   |
| 예외 테스트       | 중복 결제, 승인 전 이용, 미등록 NFC 태그, 권한 오류 |

---

### 15.2 핵심 테스트 케이스

| 테스트 ID | 대상          | 테스트 내용                                          |
| --------- | ------------- | ---------------------------------------------------- |
| TC-BE-01  | 주차장 조회   | 현재 위치 기준 주변 주차장이 조회되는지 확인         |
| TC-BE-02  | 목적지 검색   | 목적지 좌표 기준 주차장 추천이 가능한지 확인         |
| TC-BE-03  | 공급자 등록   | 주차 공간 등록 시 승인 대기 상태가 저장되는지 확인   |
| TC-BE-04  | 관리자 승인   | 승인 처리 시 검색 결과 노출 가능 상태가 되는지 확인  |
| TC-BE-05  | NFC 이용 시작 | 등록된 NFC 태그로 이용 세션이 생성되는지 확인        |
| TC-BE-06  | NFC 이용 종료 | 이용 종료 시 출차 시간과 요금 계산이 가능한지 확인   |
| TC-BE-07  | 결제 처리     | 결제 성공/실패 상태가 정확히 저장되는지 확인         |
| TC-BE-08  | 정산 생성     | 결제 완료 후 공급자 정산 금액이 생성되는지 확인      |
| TC-BE-09  | 신고 접수     | 사용자가 이용 내역 기반 신고를 접수할 수 있는지 확인 |
| TC-BE-10  | 권한 검증     | 공급자/관리자 API 접근 권한이 분리되는지 확인        |

---

### 15.3 테스트 작성 기준

1. 성공 케이스와 실패 케이스를 함께 작성한다.
2. 상태 변경 로직은 반드시 테스트한다.
3. 결제, 정산, 신고, 승인 로직은 예외 흐름을 포함한다.
4. 외부 API는 mock 또는 stub으로 대체한다.
5. 테스트 데이터는 실제 개인정보를 사용하지 않는다.

---

## 16. 문서화 규칙

### 16.1 API 문서화 기준

API 문서에는 다음 항목을 포함한다.

| 항목      | 설명                                    |
| --------- | --------------------------------------- |
| API 목적  | 어떤 화면 또는 기능을 위한 API인지 설명 |
| Method    | GET, POST, PATCH 등                     |
| Endpoint  | API 경로                                |
| Request   | Query Parameter, Path Variable, Body    |
| Response  | 성공 응답 데이터 구조                   |
| Error     | 주요 오류 코드와 메시지                 |
| 권한      | USER, PROVIDER, ADMIN 등                |
| 관련 화면 | 해당 API를 사용하는 화면                |

---

### 16.2 작업 결과 요약 기준

Codex 작업 후에는 다음 내용을 요약한다.

```text
작업 완료 요약:
- 무엇을 구현했는지

변경 파일:
- 파일 경로 1
- 파일 경로 2

주요 구현 내용:
- 도메인 구조
- API 구조
- 서비스 로직
- 예외 처리
- 테스트 코드

검증 방법:
- 실행 명령
- 테스트 명령
- 확인해야 할 API 또는 화면

주의사항:
- 아직 mock 처리된 부분
- 추후 실제 API Key 또는 결제 연동 필요 부분
```

---

## 17. Codex Prompt 작성 기준

### 17.1 기본 Prompt 형식

Codex에 전달할 프롬프트는 다음 형식을 권장한다.

```text
목표:
- SmartPark의 [백엔드 기능명/API명]을 구현한다.

참고 문서:
- docs/harness/PRD.md
- docs/harness/FEATURE_SPEC.md
- docs/harness/SCREEN_STRUCTURE.md
- docs/harness/PROJECT_RULES.md
- docs/harness/CODEX.md

작업 범위:
- 생성/수정할 파일:
  - src/backend/src/main/java/com/smartpark/...
- 변경하지 말아야 할 파일:
  - docs/product/
  - src/frontend/

구현 기준:
- Controller, Service, Repository, DTO 계층을 분리한다.
- Entity를 API 응답으로 직접 반환하지 않는다.
- 상태값은 enum으로 관리한다.
- 성공/실패 응답 형식을 통일한다.
- 핵심 예외 상황을 처리한다.

완료 조건:
- API 요청/응답 구조가 명확하다.
- 주요 서비스 로직 테스트가 가능하다.
- 변경 파일 목록과 검증 방법을 요약한다.
```

---

### 17.2 좋은 Prompt 예시

```text
목표:
- 현재 위치 기반 주변 주차장 조회 API를 구현한다.

참고 문서:
- docs/harness/FEATURE_SPEC.md
- docs/harness/SCREEN_STRUCTURE.md
- docs/harness/CODEX.md

작업 범위:
- src/backend/src/main/java/com/smartpark/domain/parking/
- src/backend/src/main/java/com/smartpark/controller/ParkingLotController.java
- src/backend/src/main/java/com/smartpark/service/ParkingLotService.java
- src/backend/src/main/java/com/smartpark/dto/response/ParkingLotResponse.java

구현 기준:
- GET /api/parking-lots/nearby endpoint를 작성한다.
- lat, lng, radius를 query parameter로 받는다.
- 승인된 주차장만 조회한다.
- 응답에는 주차장명, 주소, 거리, 요금, 상태, 혼잡도를 포함한다.
- Entity를 직접 반환하지 말고 Response DTO를 사용한다.
- 데이터가 없으면 빈 배열을 반환한다.

완료 조건:
- Controller, Service, Repository, DTO가 분리되어 있다.
- 기본 단위 테스트 또는 테스트 가능 구조가 포함되어 있다.
- 변경 파일과 검증 방법을 요약한다.
```

---

### 17.3 피해야 할 Prompt 예시

```text
SmartPark 백엔드를 전부 만들어줘.
```

위와 같은 요청은 범위가 너무 넓어 구조가 무너질 가능성이 높다. 반드시 도메인, API, 서비스 로직, 테스트 단위로 작업 범위를 나눈다.

---

## 18. Codex 작업 금지 사항

Codex는 다음 작업을 수행하지 않는다.

1. 사용자 확인 없이 전체 백엔드 패키지 구조 변경
2. 사용자 확인 없이 전체 프로젝트 대규모 리팩토링 수행
3. 프론트엔드 화면명 또는 route명 임의 변경
4. 문서 기준과 다른 상태값 사용
5. Entity를 API 응답으로 직접 반환
6. Controller에 복잡한 비즈니스 로직 작성
7. 결제 금액을 프론트엔드 입력값만으로 확정
8. API Key, DB 비밀번호, 결제 Key를 코드에 직접 작성
9. 외부 API 원본 응답을 그대로 프론트엔드에 노출
10. 테스트 없이 결제, 정산, 승인, 신고 로직을 확정
11. README, CHANGELOG, 하네스 문서를 임의로 삭제 또는 축소
12. 실제 개인정보 또는 결제 정보를 테스트 데이터로 사용

---

## 19. v0.3.5 적용 기준

`v0.3.5`는 SmartPark 하네스 문서 중 Codex 백엔드 및 문서화 작업 지침을 확정하는 버전이다.

| 항목      | 내용                                                                                   |
| --------- | -------------------------------------------------------------------------------------- |
| 추가 문서 | `docs/harness/CODEX.md`                                                                |
| 주요 내용 | Codex 역할, 백엔드 구조, 도메인 설계, Entity/DTO/API 작성 규칙, 예외 처리, 테스트 기준 |
| 목적      | Spring Boot 백엔드 설계와 API 구현 시 Codex가 일관된 기준으로 작업하도록 지원          |
| 연결 문서 | `PRD.md`, `FEATURE_SPEC.md`, `SCREEN_STRUCTURE.md`, `PROJECT_RULES.md`, `CLAUDE.md`    |
| 다음 작업 | `PROMPT_LOG.md` 작성                                                                   |

---

## 20. 정리

본 문서는 Codex가 SmartPark Spring Boot 백엔드 설계와 문서화 작업을 수행할 때 따라야 할 작업 지침이다.

Codex는 본 문서를 기준으로 도메인 모델, API endpoint, DTO, Service, Repository, 예외 처리, 테스트 코드를 작성해야 한다. 특히 SmartPark의 핵심 백엔드 흐름인 주차장 조회, 목적지 기반 추천, 공급자 주차 공간 등록, 관리자 승인, NFC 이용 시작/종료, 결제, 정산, 신고 처리를 `FEATURE_SPEC.md`와 일관되게 구현해야 한다.

이 문서를 통해 SmartPark 프로젝트는 Claude Code와 Codex를 함께 활용하더라도 프론트엔드, 백엔드, 문서, 형상관리 기준이 서로 연결된 상태를 유지할 수 있다.
