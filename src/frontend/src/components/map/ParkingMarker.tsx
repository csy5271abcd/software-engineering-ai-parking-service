import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import type {DimensionValue} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {AppIcon} from '../common/AppIcon';
import {
  getMarkerVisual,
  PILL_H,
  PILL_H_SEL,
  TAIL_H,
  TAIL_H_SEL,
  TAIL_BASE_W,
  TAIL_BASE_W_SEL,
  OVERLAY_H,
  OVERLAY_H_SEL,
  OVERLAY_W_COMPACT,
  OVERLAY_W_COMPACT_SEL,
  OVERLAY_W_LABEL,
  OVERLAY_W_LABEL_SEL,
  ICON_SIZE,
  ICON_SIZE_SEL,
} from '../../constants/mapMarker';
import type {ParkingStatus} from '../../constants/status';

interface ParkingMarkerProps {
  name: string;
  status: ParkingStatus;
  selected?: boolean;
  top: DimensionValue;
  left: DimensionValue;
  onPress?: () => void;
  soonMin?: number | null;
  isShared?: boolean;
}

function CalloutBubble({
  width: W,
  height: H,
  pillH: pH,
  tailH: tH,
  tailBaseW: tW,
  color,
  strokeWidth: sw,
}: {
  width: number;
  height: number;
  pillH: number;
  tailH: number;
  tailBaseW: number;
  color: string;
  strokeWidth: number;
}) {
  const cx = W / 2;
  const r = pH / 2;
  const ctrlY = pH + 2 * tH;
  const d = [
    `M ${r} 0`,
    `L ${W - r} 0`,
    `Q ${W} 0 ${W} ${r}`,
    `L ${W} ${pH - r}`,
    `Q ${W} ${pH} ${W - r} ${pH}`,
    `L ${cx + tW / 2} ${pH}`,
    `Q ${cx} ${ctrlY} ${cx - tW / 2} ${pH}`,
    `L ${r} ${pH}`,
    `Q 0 ${pH} 0 ${pH - r}`,
    `L 0 ${r}`,
    `Q 0 0 ${r} 0`,
    'Z',
  ].join(' ');

  const half = sw / 2;
  return (
    <Svg
      width={W}
      height={H}
      viewBox={`${-half} ${-half} ${W + sw} ${H + sw}`}
      style={StyleSheet.absoluteFill}
    >
      <Path d={d} fill="#FFFFFF" stroke={color} strokeWidth={sw} />
    </Svg>
  );
}

export function ParkingMarker({
  status,
  selected = false,
  top,
  left,
  onPress,
  isShared = false,
}: ParkingMarkerProps): React.JSX.Element {
  const visual = getMarkerVisual(status, isShared);
  const hasLabel = visual.label !== null;
  const pillH = selected ? PILL_H_SEL : PILL_H;
  const iconSz = selected ? ICON_SIZE_SEL : ICON_SIZE;
  const tailH = selected ? TAIL_H_SEL : TAIL_H;
  const tailBaseW = selected ? TAIL_BASE_W_SEL : TAIL_BASE_W;
  const bw = selected ? 2.5 : 1.5;
  const markerW = hasLabel
    ? selected ? OVERLAY_W_LABEL_SEL : OVERLAY_W_LABEL
    : selected ? OVERLAY_W_COMPACT_SEL : OVERLAY_W_COMPACT;
  const markerH = selected ? OVERLAY_H_SEL : OVERLAY_H;

  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={{
        position: 'absolute',
        top,
        left,
        width: markerW,
        height: markerH,
        alignItems: 'center',
        transform: [
          {translateX: -(markerW / 2)},
          {translateY: -markerH},
        ],
        zIndex: selected ? 20 : 10,
      }}
    >
      <CalloutBubble
        width={markerW}
        height={markerH}
        pillH={pillH}
        tailH={tailH}
        tailBaseW={tailBaseW}
        color={visual.color}
        strokeWidth={bw}
      />
      <View style={[styles.pillContent, {height: pillH}]}>
        <AppIcon
          name={visual.icon}
          size={iconSz}
          color={visual.color}
          strokeWidth={2.5}
        />
        {hasLabel && (
          <Text
            style={[
              styles.pillText,
              {fontSize: selected ? 12 : 11, color: visual.color},
            ]}
          >
            {visual.label}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pillContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 4,
  },
  pillText: {
    fontWeight: '700',
    includeFontPadding: false,
    lineHeight: 16,
  },
});
