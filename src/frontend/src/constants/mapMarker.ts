import type {AppIconName} from '../components/common/AppIcon';
import type {ParkingStatus} from './status';
import {PARKING_STATUS} from './status';

// ── Marker visual spec ────────────────────────────────────────────────────────

export type MarkerVisual = {
  icon: AppIconName;
  color: string;   // icon color + border color + label color
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
        color: '#03AA5A',
        label: null,
      };
    case PARKING_STATUS.SOON_AVAILABLE:
      return {icon: 'clock', color: '#006CFF', label: '곧'};
    case PARKING_STATUS.FULL:
      return {icon: 'alertCircle', color: '#FB5852', label: '만차'};
    case PARKING_STATUS.OCCUPIED:
      return {
        icon: isShared ? 'house' : 'car',
        color: '#F5683C',
        label: null,
      };
    case PARKING_STATUS.INACTIVE:
      return {icon: 'mapPin', color: '#8B99AC', label: '종료'};
    default:
      return {icon: 'car', color: '#8B99AC', label: null};
  }
}

// ── Pill marker dimensions ────────────────────────────────────────────────────
// Overlay height = pill height + 2px gap + tail height

export const PILL_H = 28;
export const PILL_H_SEL = 34;

export const TAIL_H = 7;
export const TAIL_H_SEL = 9;
export const TAIL_W = 10;
export const TAIL_W_SEL = 12;

export const ICON_SIZE = 14;
export const ICON_SIZE_SEL = 16;

export const OVERLAY_H = PILL_H + 2 + TAIL_H;               // 37
export const OVERLAY_H_SEL = PILL_H_SEL + 2 + TAIL_H_SEL;  // 45

// compact = icon only, full = icon + label text
export const OVERLAY_W_COMPACT = 46;
export const OVERLAY_W_LABEL = 68;
export const OVERLAY_W_COMPACT_SEL = 54;
export const OVERLAY_W_LABEL_SEL = 78;
