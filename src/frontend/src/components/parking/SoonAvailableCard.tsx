import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {CongestionBadge} from './ParkingStatusBadge';
import type {ParkingLotDetail} from '../../types/parking';

interface SoonAvailableCardProps {
  lot: ParkingLotDetail;
  soonMin: number;
  onPress?: () => void;
}

const RING_SIZE = 56;
const RING_R = 22;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_R;

export function SoonAvailableCard({
  lot,
  soonMin,
  onPress,
}: SoonAvailableCardProps): React.JSX.Element {
  const walkMin = Math.max(1, Math.round(lot.distanceMeters / 80));
  const hasNfc = (lot.tags as string[]).includes('NFC');
  const urgency = soonMin <= 5 ? '#FB5852' : '#006CFF';

  const progress = Math.max(0, Math.min(1, (30 - soonMin) / 30));
  const strokeDashoffset = RING_CIRCUMFERENCE * (1 - progress);

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [styles.card, pressed && styles.cardPressed]}
    >
      {/* Circular progress ring */}
      <View style={styles.timerWrap}>
        <Svg width={RING_SIZE} height={RING_SIZE}>
          {/* Track */}
          <Circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RING_R}
            stroke="#E5EAF1"
            strokeWidth={4}
            fill="none"
          />
          {/* Progress arc */}
          <Circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RING_R}
            stroke={urgency}
            strokeWidth={4}
            fill="none"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
          />
        </Svg>
        <View style={styles.timerLabel}>
          <Text style={[styles.timerNum, {color: urgency}]}>{soonMin}</Text>
          <Text style={[styles.timerUnit, {color: urgency}]}>분 후</Text>
        </View>
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
      <Pressable onPress={onPress} style={styles.waitBtn} hitSlop={4}>
        <Text style={styles.waitBtnText}>대기</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  cardPressed: {backgroundColor: '#F8F9FB'},

  // ── Progress ring
  timerWrap: {
    width: RING_SIZE,
    height: RING_SIZE,
    flexShrink: 0,
  },
  timerLabel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerNum: {
    fontSize: 19,
    fontWeight: '800',
    includeFontPadding: false,
    lineHeight: 22,
  },
  timerUnit: {
    fontSize: 9,
    fontWeight: '600',
    includeFontPadding: false,
    lineHeight: 12,
  },

  // ── Body
  body: {flex: 1, minWidth: 0, gap: 5},
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  badgeRow: {flexDirection: 'row', gap: 5, flexWrap: 'wrap'},
  nfcBadge: {
    paddingHorizontal: 7,
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
    fontSize: 12,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },

  // ── Wait button
  waitBtn: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: '#006CFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    elevation: 2,
    shadowColor: '#006CFF',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  waitBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    includeFontPadding: false,
  },
});
