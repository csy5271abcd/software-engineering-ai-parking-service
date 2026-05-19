import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {CongestionBadge} from './ParkingStatusBadge';
import {AppProgress} from '../common/AppProgress';
import {AppButton} from '../common/AppButton';
import type {ParkingLotDetail} from '../../types/parking';

interface SoonAvailableCardProps {
  lot: ParkingLotDetail;
  soonMin: number;
  onPress?: () => void;
}

export function SoonAvailableCard({
  lot,
  soonMin,
  onPress,
}: SoonAvailableCardProps): React.JSX.Element {
  const walkMin = Math.max(1, Math.round(lot.distanceMeters / 80));
  const hasNfc = (lot.tags as string[]).includes('NFC');
  // 0 = just exited, 1 = 30+ min away
  const progress = Math.max(0, Math.min(100, ((30 - soonMin) / 30) * 100));
  const urgency = soonMin <= 5 ? '#FB5852' : soonMin <= 10 ? '#F5A623' : '#006CFF';

  return (
    <Pressable onPress={onPress} style={styles.card}>
      {/* Timer column */}
      <View style={styles.timerCol}>
        <View style={[styles.timerCircle, {borderColor: urgency}]}>
          <Text style={[styles.timerNum, {color: urgency}]}>{soonMin}</Text>
          <Text style={styles.timerUnit}>분</Text>
        </View>
        <AppProgress
          value={progress}
          color={urgency}
          height={4}
          style={styles.timerProgress}
        />
      </View>

      {/* Body */}
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {lot.name}
        </Text>
        <View style={styles.badgeRow}>
          <CongestionBadge level={lot.congestionLevel} />
          {hasNfc && (
            <View style={styles.nfcBadge}>
              <Text style={styles.nfcText}>NFC</Text>
            </View>
          )}
        </View>
        <Text style={styles.meta}>
          도보 {walkMin}분 · ₩{lot.pricePerHour.toLocaleString()}/시
        </Text>
      </View>

      {/* CTA */}
      <AppButton
        label="대기"
        variant="primary"
        size="sm"
        onPress={onPress}
        style={styles.waitBtn}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },

  // ── Timer
  timerCol: {
    width: 56,
    alignItems: 'center',
    gap: 6,
    flexShrink: 0,
  },
  timerCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFBFC',
  },
  timerNum: {
    fontSize: 18,
    fontWeight: '800',
    includeFontPadding: false,
    lineHeight: 21,
  },
  timerUnit: {
    fontSize: 9,
    color: '#8B99AC',
    includeFontPadding: false,
  },
  timerProgress: {
    width: 48,
  },

  // ── Body
  body: {flex: 1, minWidth: 0, gap: 4},
  name: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  badgeRow: {flexDirection: 'row', gap: 4, flexWrap: 'wrap'},
  nfcBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: 'rgba(0,108,255,0.08)',
  },
  nfcText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#006CFF',
    includeFontPadding: false,
  },
  meta: {
    fontSize: 11.5,
    color: '#717182',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },

  waitBtn: {
    borderRadius: 20,
    flexShrink: 0,
  },
});
