// FEATURE_SPEC.md / PROJECT_RULES.md 기준 상태값 상수

// ── 주차장 상태 ──────────────────────────────────────────────
export const PARKING_STATUS = {
  AVAILABLE: 'AVAILABLE',
  SOON_AVAILABLE: 'SOON_AVAILABLE',
  OCCUPIED: 'OCCUPIED',
  FULL: 'FULL',
  INACTIVE: 'INACTIVE',
} as const;

export type ParkingStatus = (typeof PARKING_STATUS)[keyof typeof PARKING_STATUS];

// ── 혼잡도 상태 ──────────────────────────────────────────────
export const CONGESTION_STATUS = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  VERY_HIGH: 'VERY_HIGH',
  UNKNOWN: 'UNKNOWN',
} as const;

export type CongestionStatus =
  (typeof CONGESTION_STATUS)[keyof typeof CONGESTION_STATUS];

// ── 결제 상태 ────────────────────────────────────────────────
export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
  NEEDS_CONFIRMATION: 'NEEDS_CONFIRMATION',
} as const;

export type PaymentStatus =
  (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

// ── 승인 상태 ────────────────────────────────────────────────
export const APPROVAL_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  NEEDS_REVISION: 'NEEDS_REVISION',
} as const;

export type ApprovalStatus =
  (typeof APPROVAL_STATUS)[keyof typeof APPROVAL_STATUS];

// ── 주차 세션 상태 ───────────────────────────────────────────
export const SESSION_STATUS = {
  READY: 'READY',
  IN_USE: 'IN_USE',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED',
} as const;

export type SessionStatus =
  (typeof SESSION_STATUS)[keyof typeof SESSION_STATUS];
