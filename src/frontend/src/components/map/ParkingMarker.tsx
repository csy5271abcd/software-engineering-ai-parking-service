import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import type {DimensionValue} from 'react-native';
import {AppIcon} from '../common/AppIcon';
import {getMarkerVisual} from '../../constants/mapMarker';
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

export function ParkingMarker({
  status,
  selected = false,
  top,
  left,
  onPress,
  isShared = false,
}: ParkingMarkerProps): React.JSX.Element {
  const visual = getMarkerVisual(status, isShared);
  const pillH = selected ? 34 : 28;
  const iconSz = selected ? 16 : 14;
  const tailW = selected ? 12 : 10;
  const tailH = selected ? 9 : 7;
  const markerW = visual.label !== null ? (selected ? 78 : 68) : (selected ? 54 : 46);
  const markerH = pillH + 2 + tailH;

  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={{
        position: 'absolute',
        top,
        left,
        alignItems: 'center',
        transform: [
          {translateX: -(markerW / 2)},
          {translateY: -markerH},
        ],
        zIndex: selected ? 20 : 10,
      }}
    >
      {/* Pill */}
      <View
        style={[
          styles.pill,
          {
            height: pillH,
            backgroundColor: visual.bg,
            borderColor: selected ? '#FFFFFF' : visual.border,
            borderWidth: selected ? 2.5 : 1.5,
          },
          selected && styles.pillSelected,
        ]}
      >
        <AppIcon
          name={visual.icon}
          size={iconSz}
          color="#FFFFFF"
          strokeWidth={2.5}
        />
        {visual.label !== null && (
          <Text style={[styles.pillText, {fontSize: selected ? 12 : 11}]}>
            {visual.label}
          </Text>
        )}
      </View>

      {/* Tail triangle */}
      <View
        style={[
          styles.tail,
          {
            borderLeftWidth: tailW / 2,
            borderRightWidth: tailW / 2,
            borderTopWidth: tailH,
            borderTopColor: visual.bg,
          },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,
    paddingHorizontal: 8,
    gap: 4,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.18,
    shadowRadius: 3,
  },
  pillSelected: {
    elevation: 8,
    shadowOpacity: 0.32,
    shadowRadius: 6,
  },
  pillText: {
    color: '#FFFFFF',
    fontWeight: '700',
    includeFontPadding: false,
    lineHeight: 16,
  },
  tail: {
    width: 0,
    height: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: 2,
  },
});
