import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AppIcon} from '../common/AppIcon';
import type {AiRegionSummary} from '../../types/aiRecommendation';

interface Props {
  summary: AiRegionSummary;
}

export function AiCongestionSummaryCard({summary}: Props): React.JSX.Element {
  const rateColor =
    summary.overallSuccessRate >= 80
      ? '#03AA5A'
      : summary.overallSuccessRate >= 60
      ? '#F5683C'
      : '#FB5852';

  const rateBg =
    summary.overallSuccessRate >= 80
      ? 'rgba(3,170,90,0.06)'
      : summary.overallSuccessRate >= 60
      ? 'rgba(245,104,60,0.06)'
      : 'rgba(251,88,82,0.06)';

  return (
    <View style={styles.card}>
      {/* Top row */}
      <View style={styles.topRow}>
        <View style={styles.topLeft}>
          <Text style={styles.dayLabel}>오늘의 AI 추천</Text>
          <Text style={styles.region}>{summary.regionName}</Text>
        </View>
        <View style={styles.aiBadge}>
          <AppIcon name="brain" size={11} color="#006CFF" strokeWidth={2} />
          <Text style={styles.aiBadgeText}>AI 혼잡도 분석</Text>
        </View>
      </View>

      {/* Success rate block */}
      <View style={[styles.rateBlock, {backgroundColor: rateBg}]}>
        <View style={styles.rateRow}>
          <View style={styles.rateLeft}>
            <Text style={[styles.rateNumber, {color: rateColor}]}>
              {summary.overallSuccessRate}%
            </Text>
            <Text style={styles.rateCaption}>주차 성공률</Text>
          </View>
          <View style={styles.rateRight}>
            <Text style={styles.statusMsg}>{summary.summaryMessage}</Text>
            <Text style={styles.updatedAt}>🕐 {summary.updatedAt} 업데이트</Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Best lot recommendation */}
      <View style={styles.bestRow}>
        <AppIcon name="sparkles" size={14} color="#006CFF" strokeWidth={2} />
        <View style={styles.bestBody}>
          <Text style={styles.bestTitle}>
            <Text style={styles.bestName}>{summary.bestLotName}</Text>
            {'이 현재 가장 유리해요.'}
          </Text>
          <Text style={styles.bestMeta}>
            {`이용 가능 ${summary.bestLotAvailableSpaces}면 · 도보 ${summary.bestLotWalkingMinutes}분 · 예상 혼잡도 낮음`}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Footer note */}
      <View style={styles.footerRow}>
        <AppIcon name="alertCircle" size={11} color="#8B99AC" strokeWidth={2} />
        <Text style={styles.footerText}>
          거리, 요금, 빈자리, 혼잡도, 곧 비워질 자리 정보를 함께 분석했어요.
        </Text>
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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  topLeft: {gap: 2},
  dayLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#006CFF',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  region: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,108,255,0.08)',
    borderRadius: 100,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  aiBadgeText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#006CFF',
    includeFontPadding: false,
  },
  rateBlock: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
  },
  rateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  rateLeft: {alignItems: 'center'},
  rateNumber: {
    fontSize: 52,
    fontWeight: '800',
    letterSpacing: -2,
    includeFontPadding: false,
    lineHeight: 56,
  },
  rateCaption: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#6B7C92',
    includeFontPadding: false,
    marginTop: 2,
  },
  rateRight: {flex: 1, gap: 5},
  statusMsg: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
    lineHeight: 18,
  },
  updatedAt: {
    fontSize: 11,
    color: '#8B99AC',
    includeFontPadding: false,
  },
  divider: {
    height: 1,
    backgroundColor: '#F2F4F7',
    marginBottom: 12,
  },
  bestRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bestBody: {flex: 1},
  bestTitle: {
    fontSize: 13,
    color: '#4D5A6A',
    letterSpacing: -0.2,
    includeFontPadding: false,
    marginBottom: 3,
  },
  bestName: {
    fontWeight: '700',
    color: '#222225',
  },
  bestMeta: {
    fontSize: 11.5,
    color: '#8B99AC',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5,
  },
  footerText: {
    flex: 1,
    fontSize: 11,
    color: '#8B99AC',
    letterSpacing: -0.2,
    includeFontPadding: false,
    lineHeight: 15,
  },
});
