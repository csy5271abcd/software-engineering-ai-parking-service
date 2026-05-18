import type {ParkingStatus, CongestionStatus} from '../constants/status';
import type {AddressInfo, Coordinates} from './common';

export type ParkingLotType = 'PUBLIC' | 'PRIVATE' | 'COMMERCIAL' | 'BUILDING';

export interface OperationHours {
  open: string;           // "HH:MM"
  close: string;          // "HH:MM"
  isAllDay: boolean;
  operationDays: string[];
}

export interface ParkingFee {
  baseFee: number;        // 기본 요금
  baseMinutes: number;    // 기본 요금 적용 시간(분)
  extraFee: number;       // 추가 요금
  extraMinutes: number;   // 추가 요금 단위 시간(분)
  maxDailyFee?: number;
  pricePerHour: number;   // 시간당 환산 요금 (화면 표시용)
}

export interface ParkingImage {
  id: string;
  url: string;
  isPrimary: boolean;
}

export interface ParkingCongestion {
  level: CongestionStatus;
  predictedAt: string;    // ISO 8601
}

// ── 목록/지도 뷰 (HomeMapScreen, ParkingBottomSheet) ─────────
export interface ParkingLotSummary {
  id: string;
  name: string;
  address: AddressInfo;
  coordinates: Coordinates;
  distanceMeters: number;
  pricePerHour: number;
  availableCount: number;
  totalCount: number;
  status: ParkingStatus;
  congestionLevel: CongestionStatus;
  isFavorite: boolean;
  updatedAt: string;      // ISO 8601
}

// ── 상세 뷰 (ParkingDetailScreen) ────────────────────────────
export interface ParkingLotDetail extends ParkingLotSummary {
  type: ParkingLotType;
  operationHours: OperationHours;
  fee: ParkingFee;
  images: ParkingImage[];
  congestion: ParkingCongestion;
  recommendationScore: number;  // 0~100
  tags: string[];
  expectedExitAt?: string;      // SOON_AVAILABLE 상태일 때 사용
  description?: string;
}

export interface ParkingSpace {
  id: string;
  parkingLotId: string;
  spaceNumber: string;
  status: ParkingStatus;
  expectedExitAt?: string;
}
