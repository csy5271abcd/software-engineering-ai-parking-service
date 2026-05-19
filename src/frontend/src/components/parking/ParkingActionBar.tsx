import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PARKING_STATUS} from '../../constants/status';
import type {ParkingStatus} from '../../constants/status';

interface ParkingActionBarProps {
  status: ParkingStatus;
  onRoute: () => void;
  onStart: () => void;
  onBack: () => void;
}

export function ParkingActionBar({
  status,
  onRoute,
  onStart,
  onBack,
}: ParkingActionBarProps): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const isFull = status === PARKING_STATUS.FULL;
  const isSoon = status === PARKING_STATUS.SOON_AVAILABLE;

  const startLabel = isFull
    ? '만차 — 목록 보기'
    : isSoon
    ? '대기 등록'
    : '이용 시작';

  return (
    <View style={[styles.bar, {paddingBottom: Math.max(insets.bottom, 12)}]}>
      <Pressable onPress={onRoute} style={styles.routeBtn}>
        <Text style={styles.routeBtnIcon}>◎</Text>
        <Text style={styles.routeBtnText}>길찾기</Text>
      </Pressable>
      <Pressable
        onPress={isFull ? onBack : onStart}
        style={[styles.startBtn, isFull && styles.startBtnFull]}
      >
        <Text style={[styles.startBtnText, isFull && styles.startBtnTextFull]}>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#006CFF',
    backgroundColor: '#FFFFFF',
    flexShrink: 0,
  },
  routeBtnIcon: {
    fontSize: 14,
    color: '#006CFF',
    includeFontPadding: false,
  },
  routeBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#006CFF',
    includeFontPadding: false,
  },
  startBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#006CFF',
  },
  startBtnFull: {
    backgroundColor: '#F8F9FB',
    borderWidth: 1,
    borderColor: '#E5EAF1',
  },
  startBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  startBtnTextFull: {
    color: '#6B7C92',
  },
});
