import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PARKING_STATUS} from '../../../constants/status';
import type {ParkingStatus} from '../../../constants/status';

interface DetailActionBarProps {
  status: ParkingStatus;
  soonMin?: number | null;
  onRoute?: () => void;
  onStart?: () => void;
}

export function DetailActionBar({
  status,
  soonMin,
  onRoute,
  onStart,
}: DetailActionBarProps): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const isFull = status === PARKING_STATUS.FULL;
  const isSoon = status === PARKING_STATUS.SOON_AVAILABLE;

  const startLabel = isFull
    ? '만차 — 대체 주차장 보기'
    : isSoon && soonMin
    ? `${soonMin}분 후 이용가능 · 대기`
    : 'NFC 이용 시작';

  return (
    <View
      style={[
        styles.bar,
        {paddingBottom: Math.max(insets.bottom, 16)},
      ]}
    >
      <Pressable onPress={onRoute} style={styles.routeBtn}>
        <View style={styles.navArrow} />
        <Text style={styles.routeBtnText}>경로 안내</Text>
      </Pressable>
      <Pressable
        onPress={isFull ? undefined : onStart}
        style={[styles.startBtn, isFull && styles.startBtnDisabled]}
      >
        <Text style={[styles.startBtnText, isFull && styles.startBtnTextDisabled]}>
          {startLabel}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5EAF1',
  },
  routeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#006CFF',
    backgroundColor: '#FFFFFF',
  },
  navArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 0,
    borderRightWidth: 8,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#006CFF',
    borderLeftColor: 'transparent',
  },
  routeBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#006CFF',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  startBtn: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#006CFF',
  },
  startBtnDisabled: {
    backgroundColor: '#E5EAF1',
  },
  startBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  startBtnTextDisabled: {
    color: '#8B99AC',
  },
});
