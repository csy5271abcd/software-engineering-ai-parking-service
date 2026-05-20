export type ParkingSessionStatus =
  | 'READY'
  | 'IN_USE'
  | 'END_NFC_REQUIRED'
  | 'COMPLETED_PENDING_PAYMENT'
  | 'PAID';

export interface SessionRouteParams {
  parkingLotId: string;
  startedAt: string;
}

export interface PaymentRouteParams extends SessionRouteParams {
  endedAt: string;
  durationMinutes: number;
  finalAmount: number;
}

export interface PaymentResultRouteParams extends PaymentRouteParams {
  paymentMethod: string;
}
