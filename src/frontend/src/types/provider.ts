export type ProviderParkingStatus = 'APPROVED' | 'PENDING' | 'NEEDS_REVISION' | 'REJECTED';
export type AccessMethod = 'NFC' | 'QR' | 'PIN' | 'FACE';
export type ParkingSpaceType = 'PRIVATE' | 'COMMERCIAL' | 'PUBLIC';

export interface ProviderSummary {
  monthlySettlement: number;
  totalUsageCount: number;
  avgUsageHours: string;
  activeLots: number;
}

export interface ProviderParkingSpace {
  id: string;
  name: string;
  status: ProviderParkingStatus;
  address: string;
  hours: string;
  todayUses?: number;
  todayRevenue?: number;
  monthlyRevenue?: number;
  revisionReason?: string;
}

export interface ProviderTodayUsage {
  id: string;
  userName: string;
  duration: string;
  time: string;
  lotName: string;
  fee: number;
}

export interface ProviderRegisterForm {
  name: string;
  spaces: string;
  type: ParkingSpaceType;
  description: string;
  address: string;
  detailAddress: string;
  accessMethod: AccessMethod;
  startTime: string;
  endTime: string;
  activeDays: boolean[];
  pricePerHour: string;
  maxDailyPrice: string;
}
