import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AppIcon} from '../common/AppIcon';
import type {AppIconName} from '../common/AppIcon';
import type {AiScoreBreakdown} from '../../types/aiRecommendation';

interface BreakdownItem {
  key: keyof AiScoreBreakdown;
  label: string;
  icon: AppIconName;
  color: string;
  isBonus?: boolean;
}

const ITEMS: BreakdownItem[] = [
  {key: 'distance',      label: '도보 거리',      icon: 'navigation',      color: '#006CFF'},
  {key: 'price',         label: '요금 경쟁력',    icon: 'circleDollarSign',color: '#03AA5A'},
  {key: 'availability',  label: '현재 빈자리',    icon: 'circleParking',   color: '#8B5CF6'},
  {key: 'congestion',    label: '혼잡도 예측',    icon: 'activity',        color: '#F5683C'},
  {key: 'soonAvailable', label: '곧 비워질 자리', icon: 'clock',           color: '#006CFF', isBonus: true},
];

interface Props {
  breakdown: AiScoreBreakdown;
  totalScore: number;
}

export function AiScoreBreakdownCard({breakdown, totalScore}: Props): React.JSX.Element {
  const highestKey = (['distance', 'price', 'availability', 'congestion'] as const).reduce(
    (best, key) => (breakdown[key] > breakdown[best] ? key : best),
    'distance' as keyof AiScoreBreakdown,
  );
  const highestItem = ITEMS.find(it => it.key === highestKey);
  const hasSoonBonus = breakdown.soonAvailable > 0;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>AI 추천 점수 분석</Text>
          <Text style={styles.sub}>거리·요금·빈자리·혼잡도·출차 예정을 반영했어요</Text>
        </View>
        <View style={styles.totalBox}>
          <Text style={styles.total}>{totalScore}</Text>
          <Text style={styles.totalUnit}>점</Text>
        </View>
      </View>

      <View style={styles.list}>
        {ITEMS.map(item => {
          const val = breakdown[item.key];
          const barPct = item.isBonus ? Math.min(val * 10, 100) : val;
          const displayVal = item.isBonus ? `+${val}` : String(val);

          return (
            <View key={item.key} style={styles.row}>
              <View style={styles.rowLabel}>
                <AppIcon name={item.icon} size={13} color={item.color} strokeWidth={2} />
                <Text style={styles.rowLabelText}>{item.label}</Text>
              </View>
              <View style={styles.barBg}>
                <View
                  style={[
                    styles.barFill,
                    {width: `${barPct}%` as any, backgroundColor: item.color},
                  ]}
                />
              </View>
              <Text style={[styles.rowVal, {color: item.color}]}>{displayVal}</Text>
            </View>
          );
        })}
      </View>

      {/* Insight notes */}
      <View style={styles.notesWrap}>
        {highestItem != null && (
          <View style={styles.noteRow}>
            <View style={[styles.noteDot, {backgroundColor: highestItem.color}]} />
            <Text style={styles.noteText}>
              {highestItem.label} 점수가 가장 높게 반영되었어요.
            </Text>
          </View>
        )}
        {hasSoonBonus && (
          <View style={styles.noteRow}>
            <View style={[styles.noteDot, {backgroundColor: '#006CFF'}]} />
            <Text style={styles.noteText}>
              곧 비워질 자리 정보는 보정 점수로 반영했어요.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },
  headerLeft: {flex: 1, gap: 4},
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  sub: {
    fontSize: 11.5,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
    lineHeight: 15,
  },
  totalBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,108,255,0.06)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexShrink: 0,
    flexDirection: 'row',
    gap: 2,
  },
  total: {
    fontSize: 26,
    fontWeight: '800',
    color: '#006CFF',
    letterSpacing: -1,
    includeFontPadding: false,
  },
  totalUnit: {
    fontSize: 12,
    fontWeight: '700',
    color: '#006CFF',
    includeFontPadding: false,
    marginTop: 8,
  },
  list: {gap: 10, marginBottom: 14},
  row: {flexDirection: 'row', alignItems: 'center', gap: 10},
  rowLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    width: 92,
    flexShrink: 0,
  },
  rowLabelText: {
    fontSize: 12,
    color: '#4D5A6A',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  barBg: {
    flex: 1,
    height: 7,
    backgroundColor: '#F2F4F7',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {height: '100%', borderRadius: 4},
  rowVal: {
    fontSize: 12,
    fontWeight: '700',
    width: 28,
    textAlign: 'right',
    includeFontPadding: false,
  },
  notesWrap: {gap: 6},
  noteRow: {flexDirection: 'row', alignItems: 'flex-start', gap: 7},
  noteDot: {width: 6, height: 6, borderRadius: 3, marginTop: 5, flexShrink: 0},
  noteText: {
    flex: 1,
    fontSize: 11.5,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
    lineHeight: 16,
  },
});
