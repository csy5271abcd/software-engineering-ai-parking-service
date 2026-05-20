import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import type {DimensionValue} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {AppIcon} from '../common/AppIcon';
import {
  getMarkerVisual,
  OUTER_D,
  OUTER_D_SEL,
  INNER_D,
  INNER_D_SEL,
  TAIL_H,
  TAIL_H_SEL,
  ICON_SIZE,
  ICON_SIZE_SEL,
  STROKE_W,
  STROKE_W_SEL,
  OVERLAY_W,
  OVERLAY_W_SEL,
  OVERLAY_H,
  OVERLAY_H_SEL,
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

function PinBubble({
  overlayW,
  overlayH,
  outerD,
  tailH,
  color,
  strokeWidth: sw,
}: {
  overlayW: number;
  overlayH: number;
  outerD: number;
  tailH: number;
  color: string;
  strokeWidth: number;
}) {
  const R = outerD / 2;
  const cx = overlayW / 2;
  const cy = R + 1;

  const tailAngle = 30 * (Math.PI / 180);
  const ax = R * Math.sin(tailAngle);
  const attachY = cy + R * Math.cos(tailAngle);
  const tipY = overlayH - 1;
  const midY = attachY + (tipY - attachY) * 0.5;

  const d = [
    `M ${cx + ax} ${attachY}`,
    `A ${R} ${R} 0 1 0 ${cx - ax} ${attachY}`,
    `Q ${cx - ax * 0.1} ${midY} ${cx} ${tipY}`,
    `Q ${cx + ax * 0.1} ${midY} ${cx + ax} ${attachY}`,
    'Z',
  ].join(' ');

  const half = sw / 2;
  return (
    <Svg
      width={overlayW}
      height={overlayH}
      viewBox={`${-half} ${-half} ${overlayW + sw} ${overlayH + sw}`}
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

  const outerD = selected ? OUTER_D_SEL : OUTER_D;
  const innerD = selected ? INNER_D_SEL : INNER_D;
  const iconSz = selected ? ICON_SIZE_SEL : ICON_SIZE;
  const tailH = selected ? TAIL_H_SEL : TAIL_H;
  const bw = selected ? STROKE_W_SEL : STROKE_W;
  const markerW = selected ? OVERLAY_W_SEL : OVERLAY_W;
  const markerH = selected ? OVERLAY_H_SEL : OVERLAY_H;

  const innerTop = (outerD - innerD) / 2 + 1;
  const innerLeft = (markerW - innerD) / 2;

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
        transform: [
          {translateX: -(markerW / 2)},
          {translateY: -markerH},
        ],
        zIndex: selected ? 20 : 10,
      }}
    >
      <PinBubble
        overlayW={markerW}
        overlayH={markerH}
        outerD={outerD}
        tailH={tailH}
        color={visual.color}
        strokeWidth={bw}
      />
      <View
        style={[
          styles.innerCircle,
          {
            top: innerTop,
            left: innerLeft,
            width: innerD,
            height: innerD,
            borderRadius: innerD / 2,
            backgroundColor: visual.color,
          },
        ]}
      >
        <AppIcon
          name={visual.icon}
          size={iconSz}
          color="#FFFFFF"
          strokeWidth={2.5}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  innerCircle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
