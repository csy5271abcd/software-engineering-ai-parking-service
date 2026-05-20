import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {AppIcon} from '../common/AppIcon';
import type {UsageHistoryItem, UsageStatus} from '../../types/history';

const STATUS_CONFIG: Record<UsageStatus, {label: string; color: string; bg: string}> = {
  PAID:                {label: '결제완료', color: '#03AA5A', bg: 'rgba(3,170,90,0.10)'},
  NEEDS_CONFIRMATION:  {label: '확인필요', color: '#F5683C', bg: 'rgba(245,104,60,0.10)'},
  FAILED:              {label: '실패',     color: '#FB5852', bg: 'rgba(251,88,82,0.12)'},
  REFUNDED:            {label: '환불',     color: '#6B7C92', bg: '#F8F9FB'},
};

interface Props {
  item: UsageHistoryItem;
}

export function HistoryCard({item}: Props): React.JSX.Element {
  const cfg = STATUS_CONFIG[item.status];
  const hours = Math.floor(item.duration / 60);
  const mins = item.duration % 60;
  const durationLabel = hours > 0 ? `${hours}시간 ${mins}분` : `${mins}분`;

  return (
    <Pressable style={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.cardLeft}>
          <Text style={styles.cardDate}>{item.date} · {item.id}</Text>
          <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
        </View>
        <View style={[styles.statusBadge, {backgroundColor: cfg.bg}]}>
          <Text style={[styles.statusText, {color: cfg.color}]}>{cfg.label}</Text>
        </View>
      </View>

      <View style={styles.cardBottom}>
        <Text style={styles.cardDuration}>이용 {durationLabel} · {item.method}</Text>
        <Text style={styles.cardFee}>₩{item.fee.toLocaleString()}</Text>
      </View>

      {item.status === 'NEEDS_CONFIRMATION' && (
        <View style={styles.warningBox}>
          <AppIcon name="alertCircle" size={14} color="#F5683C" strokeWidth={2.2} />
          <Text style={styles.warningText}>결제 상태 확인 중 · 관리자 검토 진행 중</Text>
        </View>
      )}
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
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  cardLeft: {flex: 1, gap: 3},
  cardDate: {
    fontSize: 10.5,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  cardName: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    flexShrink: 0,
  },
  statusText: {
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardDuration: {
    fontSize: 11.5,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  cardFee: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(245,104,60,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(245,104,60,0.20)',
  },
  warningText: {
    flex: 1,
    fontSize: 11.5,
    fontWeight: '600',
    color: '#F5683C',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
});
