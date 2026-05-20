import type {
  ProviderSummary,
  ProviderParkingSpace,
  ProviderTodayUsage,
  ProviderRegisterForm,
} from '../types/provider';

export const mockProviderSummary: ProviderSummary = {
  monthlySettlement: 170000,
  totalUsageCount: 38,
  avgUsageHours: '1.8h',
  activeLots: 2,
};

export const mockProviderParkingSpaces: ProviderParkingSpace[] = [
  {
    id: 'pp-001',
    name: '우리집 주차 1면',
    status: 'APPROVED',
    address: '연무장길 12',
    hours: '평일 09:00-18:00',
    todayUses: 3,
    todayRevenue: 9000,
    monthlyRevenue: 142000,
  },
  {
    id: 'pp-002',
    name: '주말 게스트 주차',
    status: 'PENDING',
    address: '왕십리로 18',
    hours: '주말 전일',
  },
  {
    id: 'pp-003',
    name: '상가 지하 5면 (저녁)',
    status: 'NEEDS_REVISION',
    address: '뚝섬로 144',
    hours: '18:00-08:00',
    revisionReason: '주차장 입구 사진을 추가해주세요.',
  },
];

export const mockProviderTodayUsages: ProviderTodayUsage[] = [
  {id: 'u-1', userName: '김**', duration: '1h 32m', time: '14:22', lotName: '우리집 주차 1면', fee: 3000},
  {id: 'u-2', userName: '박**', duration: '0h 48m', time: '11:08', lotName: '우리집 주차 1면', fee: 1800},
  {id: 'u-3', userName: '이**', duration: '2h 15m', time: '09:55', lotName: '우리집 주차 1면', fee: 4200},
];

export const initialProviderRegisterForm: ProviderRegisterForm = {
  name: '우리집 마당 주차 1면',
  spaces: '1',
  type: 'PRIVATE',
  description: '단독주택 마당입니다. 좁은 골목으로 진입하시고, 대문 옆 자리 이용해주세요.',
  address: '서울 성동구 연무장길 12',
  detailAddress: '1층 마당 우측',
  accessMethod: 'NFC',
  startTime: '09:00',
  endTime: '18:00',
  activeDays: [true, true, true, true, true, false, false],
  pricePerHour: '1800',
  maxDailyPrice: '16000',
};
