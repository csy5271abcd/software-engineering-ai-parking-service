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
