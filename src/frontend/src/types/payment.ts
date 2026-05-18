import type {PaymentStatus, SessionStatus} from '../constants/status';

export type PaymentMethodType =
  | 'CARD'
  | 'KAKAO_PAY'
  | 'NAVER_PAY'
  | 'TOSS';

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  displayName: string;
  isDefault: boolean;
}

export interface ParkingSession {
  id: string;
  parkingLotId: string;
  parkingLotName: string;
  userId: string;
  status: SessionStatus;
  startedAt: string;          // ISO 8601
  endedAt?: string;
  expectedExitAt?: string;
  durationMinutes?: number;
  estimatedFee?: number;
}

export interface Payment {
  id: string;
  sessionId: string;
  userId: string;
  amount: number;
  status: PaymentStatus;
  paymentMethodId?: string;
  paidAt?: string;
  createdAt: string;
}
