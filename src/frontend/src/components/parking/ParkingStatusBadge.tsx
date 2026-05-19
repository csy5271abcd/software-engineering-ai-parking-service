import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {STATUS_DISPLAY, CONGESTION_DISPLAY} from '../../utils/parkingStatus';
import type {ParkingStatus} from '../../constants/status';
import type {CongestionStatus} from '../../constants/status';

export function ParkingStatusBadge({
  status,
}: {
  status: ParkingStatus;
}): React.JSX.Element {
  const s = STATUS_DISPLAY[status];
  return (
    <View style={[styles.badge, {backgroundColor: s.bg}]}>
      <View style={[styles.dot, {backgroundColor: s.color}]} />
      <Text style={[styles.label, {color: s.color}]}>{s.label}</Text>
    </View>
  );
}

export function CongestionBadge({
  level,
}: {
  level: CongestionStatus;
}): React.JSX.Element {
  const c = CONGESTION_DISPLAY[level];
  return (
    <View style={[styles.badge, {backgroundColor: c.bg}]}>
      <Text style={[styles.label, {color: c.color}]}>{c.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
  },
  dot: {width: 5, height: 5, borderRadius: 2.5},
  label: {fontSize: 11, fontWeight: '700', includeFontPadding: false},
});
