import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {AppIcon} from '../common/AppIcon';
import type {ProviderParkingSpace} from '../../types/provider';

type ProviderParkingStatus = 'APPROVED' | 'PENDING' | 'NEEDS_REVISION' | 'REJECTED';

const STATUS_CONFIG: Record<ProviderParkingStatus, {label: string; color: string; bg: string}> = {
  APPROVED:       {label: '승인 완료', color: '#03AA5A', bg: 'rgba(3,170,90,0.10)'},
  PENDING:        {label: '승인 대기', color: '#006CFF', bg: 'rgba(0,108,255,0.08)'},
  NEEDS_REVISION: {label: '보완 요청', color: '#F5683C', bg: 'rgba(245,104,60,0.10)'},
  REJECTED:       {label: '반려',      color: '#FB5852', bg: 'rgba(251,88,82,0.12)'},
};

interface Props {
  lot: ProviderParkingSpace;
}

export function ProviderParkingSpaceCard({lot}: Props): React.JSX.Element {
  const s = STATUS_CONFIG[lot.status];
  return (
    <Pressable style={styles.card}>
      <View style={styles.thumb}>
        <AppIcon name="house" size={22} color="#006CFF" strokeWidth={1.8} />
      </View>
      <View style={styles.body}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>{lot.name}</Text>
          <View style={[styles.badge, {backgroundColor: s.bg}]}>
            <Text style={[styles.badgeText, {color: s.color}]}>{s.label}</Text>
          </View>
        </View>
        <Text style={styles.meta}>{lot.address} · {lot.hours}</Text>
        {lot.status === 'APPROVED' && lot.todayUses != null && (
          <View style={styles.stats}>
            <Text style={styles.statText}>오늘 {lot.todayUses}회 · ₩{lot.todayRevenue?.toLocaleString()}</Text>
            <Text style={styles.monthly}>이번 달 ₩{lot.monthlyRevenue?.toLocaleString()}</Text>
          </View>
        )}
        {lot.status === 'PENDING' && (
          <Text style={styles.pending}>관리자 검토 중 · 보통 1-2일 소요</Text>
        )}
        {lot.status === 'NEEDS_REVISION' && lot.revisionReason != null && (
          <View style={styles.revision}>
            <AppIcon name="alertCircle" size={12} color="#F5683C" strokeWidth={2} />
            <Text style={styles.revisionText}>{lot.revisionReason}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EAF1',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
  },
  thumb: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#EEF4FF',
    borderWidth: 1,
    borderColor: '#E5EAF1',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  body: {flex: 1, minWidth: 0, gap: 4},
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  badge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10.5,
    fontWeight: '700',
    includeFontPadding: false,
    letterSpacing: -0.2,
  },
  meta: {
    fontSize: 11.5,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  statText: {
    fontSize: 11.5,
    color: '#4D5A6A',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  monthly: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#03AA5A',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  pending: {
    fontSize: 11.5,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  revision: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  revisionText: {
    fontSize: 11.5,
    color: '#F5683C',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
});
