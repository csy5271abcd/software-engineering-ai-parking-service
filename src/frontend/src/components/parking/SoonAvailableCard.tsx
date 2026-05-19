import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {CongestionBadge} from './ParkingStatusBadge';
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
  const progress = Math.max(0, Math.min(1, (30 - soonMin) / 30));

  return (
    <Pressable onPress={onPress} style={styles.card}>
      {/* Progress ring (View-based approximation) */}
      <View style={styles.ringWrap}>
        <View style={styles.ringOuter}>
          <View style={styles.ringInner} />
          {/* Fill arc indicator using border trick */}
          {progress > 0 && (
            <View
              style={[
                styles.ringFill,
                {
                  borderColor: progress > 0 ? '#006CFF' : 'transparent',
                  // Rotate to show progress; simplified as opacity
                  opacity: Math.min(1, progress * 1.5),
                },
              ]}
            />
          )}
        </View>
        <View style={styles.ringTextWrap}>
          <Text style={styles.ringNum}>{soonMin}</Text>
          <Text style={styles.ringUnit}>분 후</Text>
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
              <Text style={styles.nfcBadgeText}>NFC</Text>
            </View>
          )}
        </View>
        <Text style={styles.meta}>
          도보 {walkMin}분 · ₩{lot.pricePerHour.toLocaleString()}/시
        </Text>
      </View>

      {/* CTA */}
      <Pressable onPress={onPress} style={styles.waitBtn}>
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
    padding: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5EAF1',
  },

  // ── Ring
  ringWrap: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  ringOuter: {
    position: 'absolute',
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 4,
    borderColor: '#E5EAF1',
  },
  ringInner: {
    position: 'absolute',
    inset: 0,
  },
  ringFill: {
    position: 'absolute',
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 4,
    borderTopColor: '#006CFF',
    borderRightColor: '#006CFF',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    transform: [{rotate: '-45deg'}],
  },
  ringTextWrap: {
    alignItems: 'center',
  },
  ringNum: {
    fontSize: 17,
    fontWeight: '800',
    color: '#006CFF',
    includeFontPadding: false,
    lineHeight: 20,
  },
  ringUnit: {
    fontSize: 9,
    color: '#8B99AC',
    includeFontPadding: false,
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
  nfcBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#006CFF',
    includeFontPadding: false,
  },
  meta: {
    fontSize: 11.5,
    color: '#8B99AC',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },

  // ── Wait btn
  waitBtn: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#006CFF',
    flexShrink: 0,
  },
  waitBtnText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#FFFFFF',
    includeFontPadding: false,
  },
});
