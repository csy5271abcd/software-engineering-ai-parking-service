export type UsageStatus = 'PAID' | 'NEEDS_CONFIRMATION' | 'FAILED' | 'REFUNDED';

export interface UsageHistoryItem {
  id: string;
  date: string;
  name: string;
  duration: number; // minutes
  fee: number;
  status: UsageStatus;
  method: string;
}

export const mockUsageHistory: UsageHistoryItem[] = [
  {
    id: 'PS-2026-0518-01',
    date: '오늘 14:22',
    name: '성수동 공영주차장',
    duration: 92,
    fee: 4000,
    status: 'PAID',
    method: '카카오페이',
  },
  {
    id: 'PS-2026-0517-02',
    date: '어제 10:05',
    name: '카페거리 노상주차장',
    duration: 48,
    fee: 3000,
    status: 'PAID',
    method: '신한카드',
  },
  {
    id: 'PS-2026-0515-04',
    date: '5/15 19:31',
    name: '뚝섬역 4번 출구 주차장',
    duration: 138,
    fee: 6500,
    status: 'NEEDS_CONFIRMATION',
    method: '신한카드',
  },
  {
    id: 'PS-2026-0512-09',
    date: '5/12 08:42',
    name: '갤러리아 포레 방문자',
    duration: 35,
    fee: 3000,
    status: 'PAID',
    method: '카카오페이',
  },
  {
    id: 'PS-2026-0508-12',
    date: '5/08 13:18',
    name: '연무장길 12 — 주택공유',
    duration: 60,
    fee: 1800,
    status: 'PAID',
    method: '카카오페이',
  },
];
