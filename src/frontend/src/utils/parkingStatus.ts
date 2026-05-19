import {PARKING_STATUS, CONGESTION_STATUS} from '../constants/status';
import type {ParkingStatus, CongestionStatus} from '../constants/status';

export interface StatusDisplay {
  label: string;
  color: string;
  bg: string;
}

export const CONGESTION_DISPLAY: Record<CongestionStatus, StatusDisplay> = {
  [CONGESTION_STATUS.LOW]:       {label: '여유',      color: '#03AA5A', bg: 'rgba(3,170,90,0.10)'},
  [CONGESTION_STATUS.MEDIUM]:    {label: '보통',      color: '#F5683C', bg: 'rgba(245,104,60,0.10)'},
  [CONGESTION_STATUS.HIGH]:      {label: '혼잡',      color: '#FB5852', bg: 'rgba(251,88,82,0.12)'},
  [CONGESTION_STATUS.VERY_HIGH]: {label: '매우 혼잡', color: '#FB5852', bg: 'rgba(251,88,82,0.12)'},
  [CONGESTION_STATUS.UNKNOWN]:   {label: '정보 없음', color: '#8B99AC', bg: 'rgba(139,153,172,0.12)'},
};

export const STATUS_DISPLAY: Record<ParkingStatus, StatusDisplay> = {
  [PARKING_STATUS.AVAILABLE]: {
    label: '이용가능',
    color: '#03AA5A',
    bg: 'rgba(3,170,90,0.10)',
  },
  [PARKING_STATUS.SOON_AVAILABLE]: {
    label: '곧 비워짐',
    color: '#006CFF',
    bg: 'rgba(0,108,255,0.10)',
  },
  [PARKING_STATUS.OCCUPIED]: {
    label: '이용중',
    color: '#F5683C',
    bg: 'rgba(245,104,60,0.10)',
  },
  [PARKING_STATUS.FULL]: {
    label: '만차',
    color: '#FB5852',
    bg: 'rgba(251,88,82,0.12)',
  },
  [PARKING_STATUS.INACTIVE]: {
    label: '운영안함',
    color: '#8B99AC',
    bg: 'rgba(139,153,172,0.12)',
  },
};
