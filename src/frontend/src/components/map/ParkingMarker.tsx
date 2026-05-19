import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import type {DimensionValue} from 'react-native';
import {PARKING_STATUS} from '../../constants/status';
import {STATUS_DISPLAY} from '../../utils/parkingStatus';
import type {ParkingStatus} from '../../constants/status';
import {AppIcon} from '../common/AppIcon';

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

const SHARED_COLOR = '#03AA5A';

export function ParkingMarker({
  name,
  status,
  selected = false,
  top,
  left,
  onPress,
  soonMin,
  isShared = false,
}: ParkingMarkerProps): React.JSX.Element {
  const s = STATUS_DISPLAY[status];
  const pinColor = isShared ? SHARED_COLOR : s.color;

  const circleSize = selected ? 46 : 38;
  const innerSize = selected ? 32 : 26;
  const labelFontSize = selected ? 15 : 13;
  const tailBW = selected ? 10 : 8;
  const tailH = selected ? 12 : 10;
  const overlap = selected ? 6 : 5;

  const bubbleH = selected ? 26 : 0;
  const tX = -(circleSize / 2);
  const tY = -(bubbleH + circleSize + tailH - overlap);

  const isSoon = status === PARKING_STATUS.SOON_AVAILABLE;
  const badgeLabel = soonMin != null && soonMin > 0 ? `${soonMin}분` : '곧';

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
            backgroundColor: pinColor,
          },
        ]}
      >
        <View
          style={[
            styles.pinInner,
            {width: innerSize, height: innerSize, borderRadius: innerSize / 2},
          ]}
        >
          {isShared ? (
            <AppIcon name="house" size={innerSize - 8} color={SHARED_COLOR} strokeWidth={2} />
          ) : (
            <Text style={[styles.pinLabel, {fontSize: labelFontSize, color: pinColor}]}>
              P
            </Text>
          )}
        </View>

        {/* 곧/분 badge for SOON_AVAILABLE */}
        {isSoon && (
          <View style={styles.soonBadge}>
            <Text style={styles.soonBadgeText}>{badgeLabel}</Text>
          </View>
        )}
      </View>

      {/* Teardrop tail */}
      <View
        style={[
          styles.pinTail,
          {
            borderLeftWidth: tailBW,
            borderRightWidth: tailBW,
            borderTopWidth: tailH,
            borderTopColor: pinColor,
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
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    marginBottom: 5,
    maxWidth: 140,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.22,
    shadowRadius: 5,
  },
  bubbleText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  pinOuter: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.25,
    shadowRadius: 6,
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
    top: -5,
    right: -6,
    backgroundColor: '#006CFF',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    minWidth: 24,
    alignItems: 'center',
  },
  soonBadgeText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#FFFFFF',
    includeFontPadding: false,
  },
});
