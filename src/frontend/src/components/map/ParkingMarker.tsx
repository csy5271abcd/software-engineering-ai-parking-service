import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import type {DimensionValue} from 'react-native';
import {PARKING_STATUS} from '../../constants/status';
import {STATUS_DISPLAY} from '../../utils/parkingStatus';
import type {ParkingStatus} from '../../constants/status';

interface ParkingMarkerProps {
  name: string;
  status: ParkingStatus;
  selected?: boolean;
  top: DimensionValue;
  left: DimensionValue;
  onPress?: () => void;
}

export function ParkingMarker({
  name,
  status,
  selected = false,
  top,
  left,
  onPress,
}: ParkingMarkerProps): React.JSX.Element {
  const s = STATUS_DISPLAY[status];
  const circleSize = selected ? 44 : 36;
  const innerSize = selected ? 30 : 24;
  const labelFontSize = selected ? 15 : 12;
  const tailBW = selected ? 10 : 8;   // half-base of triangle
  const tailH = selected ? 12 : 10;   // height of triangle
  const overlap = selected ? 6 : 5;   // circle/tail overlap

  // bubbleH = height of name bubble + marginBottom above pin circle
  const bubbleH = selected ? 24 : 0;
  // Transform anchors pin TIP at (top, left) instead of component top-left
  const tX = -(circleSize / 2);
  const tY = -(bubbleH + circleSize + tailH - overlap);

  const isSoon = status === PARKING_STATUS.SOON_AVAILABLE;

  return (
    <Pressable
      onPress={onPress}
      style={{
        position: 'absolute',
        top,
        left,
        alignItems: 'center',
        transform: [{translateX: tX}, {translateY: tY}],
        zIndex: selected ? 20 : 10,
      }}
    >
      {/* Name bubble — selected only */}
      {selected && (
        <View style={styles.bubble}>
          <Text style={styles.bubbleText} numberOfLines={1}>
            {name}
          </Text>
        </View>
      )}

      {/* Pin circle */}
      <View
        style={[
          styles.pinOuter,
          {
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize / 2,
            backgroundColor: s.color,
          },
        ]}
      >
        <View
          style={[
            styles.pinInner,
            {width: innerSize, height: innerSize, borderRadius: innerSize / 2},
          ]}
        >
          <Text
            style={[styles.pinLabel, {fontSize: labelFontSize, color: s.color}]}
          >
            P
          </Text>
        </View>

        {/* 곧 badge for SOON_AVAILABLE */}
        {isSoon && (
          <View style={styles.soonBadge}>
            <Text style={styles.soonBadgeText}>곧</Text>
          </View>
        )}
      </View>

      {/* Teardrop tail — CSS triangle trick */}
      <View
        style={[
          styles.pinTail,
          {
            borderLeftWidth: tailBW,
            borderRightWidth: tailBW,
            borderTopWidth: tailH,
            borderTopColor: s.color,
            marginTop: -overlap,
          },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: '#222225',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 100,
    marginBottom: 4,
    maxWidth: 120,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  bubbleText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  pinOuter: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  pinInner: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinLabel: {
    fontWeight: '800',
    includeFontPadding: false,
  },
  pinTail: {
    width: 0,
    height: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  soonBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#006CFF',
    borderRadius: 6,
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  soonBadgeText: {
    fontSize: 7,
    fontWeight: '800',
    color: '#FFFFFF',
    includeFontPadding: false,
  },
});
