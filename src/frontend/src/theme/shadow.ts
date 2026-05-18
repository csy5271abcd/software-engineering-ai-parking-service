// Foundation_Effect.png 기준
// Shadow 적용 대상: BottomSheet, SearchBar, FAB (이미지 확인)
// 정확한 offset/blur 수치는 이미지에서 확인 가능한 범위 기준 — 실무적 최솟값 적용

import type {ViewStyle} from 'react-native';
import {Platform} from 'react-native';

type ShadowToken = Pick<
  ViewStyle,
  | 'shadowColor'
  | 'shadowOffset'
  | 'shadowOpacity'
  | 'shadowRadius'
  | 'elevation'
>;

const buildShadow = (
  elevation: number,
  opacity: number,
  radius: number,
): ShadowToken =>
  Platform.OS === 'ios'
    ? {
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: elevation / 2},
        shadowOpacity: opacity,
        shadowRadius: radius,
      }
    : {elevation};

export const shadow = {
  // 지도 위 소형 UI (Chip, 소형 FAB)
  small: buildShadow(2, 0.08, 2),
  // SearchBar, 지도 위 카드
  medium: buildShadow(4, 0.12, 4),
  // BottomSheet, 주요 FAB
  large: buildShadow(8, 0.16, 8),
} as const;

export type Shadow = typeof shadow;
