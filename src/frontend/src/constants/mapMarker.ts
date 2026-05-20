import type {AppIconName} from '../components/common/AppIcon';
import type {ParkingStatus} from './status';
import {PARKING_STATUS} from './status';

// ── Marker visual spec ────────────────────────────────────────────────────────

export type MarkerVisual = {
  icon: AppIconName;
  color: string;
  label: string | null;
};

export function getMarkerVisual(
  status: ParkingStatus,
  isShared: boolean,
): MarkerVisual {
  switch (status) {
    case PARKING_STATUS.AVAILABLE:
      return {
        icon: isShared ? 'house' : 'circleParking',
        color: '#34C97C',
        label: '이용가능',
      };
    case PARKING_STATUS.SOON_AVAILABLE:
      return {icon: 'clock', color: '#4E96FF', label: '곧'};
    case PARKING_STATUS.FULL:
      return {icon: 'alertCircle', color: '#FC7C78', label: '만차'};
    case PARKING_STATUS.OCCUPIED:
      return {
        icon: isShared ? 'house' : 'car',
        color: '#F88560',
        label: null,
      };
    case PARKING_STATUS.INACTIVE:
      return {icon: 'mapPin', color: '#A0ADBF', label: '종료'};
    default:
      return {icon: 'car', color: '#A0ADBF', label: null};
  }
}

// ── Pin marker dimensions ─────────────────────────────────────────────────────

// Outer circle (white fill, status color border)
export const OUTER_D = 34;
export const OUTER_D_SEL = 42;

// Inner colored circle (status color fill, white icon)
export const INNER_D = 23;
export const INNER_D_SEL = 29;

// Pointed tail below the outer circle
export const TAIL_H = 8;
export const TAIL_H_SEL = 10;

// Icon size inside the inner circle
export const ICON_SIZE = 14;
export const ICON_SIZE_SEL = 17;

// Border stroke width
export const STROKE_W = 1.5;
export const STROKE_W_SEL = 2;

// Overlay total dimensions (+2 for stroke overflow buffer)
export const OVERLAY_W = OUTER_D + 2;                        // 36
export const OVERLAY_W_SEL = OUTER_D_SEL + 2;               // 44
export const OVERLAY_H = OUTER_D + TAIL_H + 2;              // 44
export const OVERLAY_H_SEL = OUTER_D_SEL + TAIL_H_SEL + 2; // 54
