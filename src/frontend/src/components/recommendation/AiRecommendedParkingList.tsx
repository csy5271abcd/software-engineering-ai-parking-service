import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {AppIcon} from '../common/AppIcon';
import type {AiRecommendationInsight, CongestionLevel, ScenarioKey} from '../../types/aiRecommendation';

const CONG_COLOR: Record<CongestionLevel, string> = {
  LOW: '#03AA5A', MEDIUM: '#F5683C', HIGH: '#FB5852', VERY_HIGH: '#D00000',
};
const CONG_LABEL: Record<CongestionLevel, string> = {
  LOW: '낮음', MEDIUM: '보통', HIGH: '혼잡', VERY_HIGH: '매우혼잡',
};
const RANK_COLORS = ['#006CFF', '#03AA5A', '#F5683C', '#8B99AC'];

interface Props {
  insights: AiRecommendationInsight[];
  activeScenario: ScenarioKey;
  onPressLot: (id: string) => void;
}

export function AiRecommendedParkingList({insights, activeScenario, onPressLot}: Props): React.JSX.Element {
  return (
    <View style={styles.wrap}>
      <View style={styles.headerRow}>
        <AppIcon name="barChart3" size={16} color="#222225" strokeWidth={2} />
        <Text style={styles.title}>AI 추천순 주차장</Text>
        <Text style={styles.sub}>{activeScenario} 기준</Text>
      </View>

      <View style={styles.list}>
        {insights.map((ins, i) => {
          const rankColor = RANK_COLORS[i] ?? '#8B99AC';
          const congColor = CONG_COLOR[ins.congestionLevel];
          const congLabel = CONG_LABEL[ins.congestionLevel];
          const oneLineReason =
            ins.scenarioReasons?.[activeScenario] ?? ins.reasons[0] ?? '';

          return (
            <Pressable
              key={ins.parkingLotId}
              style={[styles.card, i === 0 && styles.cardFirst]}
              onPress={() => onPressLot(ins.parkingLotId)}
            >
              {/* Rank badge */}
              <View style={[styles.rankBadge, {backgroundColor: rankColor}]}>
                <Text style={styles.rankText}>{i + 1}</Text>
              </View>

              {/* Content */}
              <View style={styles.cardBody}>
                <View style={styles.topRow}>
                  <Text style={styles.name} numberOfLines={1}>{ins.displayName}</Text>
                  <View style={styles.scoreChip}>
                    <Text style={styles.scoreLabel}>AI</Text>
                    <Text style={styles.scoreVal}>{ins.recommendationScore}</Text>
                  </View>
                </View>

                <View style={styles.midRow}>
                  {/* Congestion */}
                  <View style={[styles.congBadge, {backgroundColor: `${congColor}18`}]}>
                    <View style={[styles.congDot, {backgroundColor: congColor}]} />
                    <Text style={[styles.congText, {color: congColor}]}>{congLabel}</Text>
                  </View>

                  {/* Success rate */}
                  <View style={styles.rateChip}>
                    <AppIcon name="trendingUp" size={11} color="#006CFF" strokeWidth={2.5} />
                    <Text style={styles.rateText}>성공률 {ins.successRate}%</Text>
                  </View>

                  {/* NFC badge */}
                  {ins.nfcAvailable && (
                    <View style={styles.nfcChip}>
                      <Text style={styles.nfcText}>NFC</Text>
                    </View>
                  )}

                  {/* Soon available */}
                  {ins.isSoonAvailable && ins.expectedExitMinutes != null && (
                    <View style={styles.soonChip}>
                      <Text style={styles.soonText}>{ins.expectedExitMinutes}분 후 출차 예정</Text>
                    </View>
                  )}
                </View>

                {/* One-line reason */}
                {oneLineReason.length > 0 && (
                  <Text style={styles.reasonText} numberOfLines={1}>{oneLineReason}</Text>
                )}

                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <AppIcon name="navigation" size={11} color="#8B99AC" strokeWidth={2} />
                    <Text style={styles.metaText}>도보 {ins.walkingMinutes}분</Text>
                  </View>
                  <Text style={styles.metaDot}>·</Text>
                  <View style={styles.metaItem}>
                    <AppIcon name="circleDollarSign" size={11} color="#8B99AC" strokeWidth={2} />
                    <Text style={styles.metaText}>₩{ins.pricePerHour.toLocaleString()}/시</Text>
                  </View>
                  <Text style={styles.metaDot}>·</Text>
                  <Text style={styles.metaText}>{ins.currentAvailableSpaces}면</Text>
                </View>
              </View>

              <AppIcon name="chevronRight" size={14} color="#CAD1DB" strokeWidth={2} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {gap: 10},
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  sub: {
    fontSize: 12,
    color: '#6B7C92',
    includeFontPadding: false,
    marginLeft: 2,
  },
  list: {gap: 8},
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    padding: 12,
  },
  cardFirst: {borderColor: '#006CFF', borderWidth: 1.5},
  rankBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  rankText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  cardBody: {flex: 1, gap: 5},
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  name: {
    flex: 1,
    fontSize: 13.5,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  scoreChip: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
    backgroundColor: 'rgba(0,108,255,0.07)',
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
    flexShrink: 0,
  },
  scoreLabel: {fontSize: 9.5, fontWeight: '700', color: '#006CFF', includeFontPadding: false},
  scoreVal: {fontSize: 13, fontWeight: '800', color: '#006CFF', includeFontPadding: false},
  midRow: {flexDirection: 'row', gap: 6, flexWrap: 'wrap'},
  congBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 7, paddingVertical: 3, borderRadius: 4,
  },
  congDot: {width: 5, height: 5, borderRadius: 2.5},
  congText: {fontSize: 10.5, fontWeight: '700', includeFontPadding: false},
  rateChip: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    paddingHorizontal: 7, paddingVertical: 3, borderRadius: 4,
    backgroundColor: 'rgba(0,108,255,0.06)',
  },
  rateText: {fontSize: 10.5, fontWeight: '600', color: '#006CFF', includeFontPadding: false},
  nfcChip: {
    paddingHorizontal: 7, paddingVertical: 3, borderRadius: 4,
    backgroundColor: 'rgba(0,108,255,0.08)',
  },
  nfcText: {fontSize: 10.5, fontWeight: '700', color: '#006CFF', includeFontPadding: false},
  soonChip: {
    paddingHorizontal: 7, paddingVertical: 3, borderRadius: 4,
    backgroundColor: 'rgba(245,104,60,0.10)',
  },
  soonText: {fontSize: 10.5, fontWeight: '600', color: '#F5683C', includeFontPadding: false},
  reasonText: {
    fontSize: 11.5,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
    fontStyle: 'italic',
  },
  metaRow: {flexDirection: 'row', alignItems: 'center', gap: 4, flexWrap: 'wrap'},
  metaItem: {flexDirection: 'row', alignItems: 'center', gap: 3},
  metaText: {fontSize: 11, color: '#8B99AC', includeFontPadding: false},
  metaDot: {fontSize: 11, color: '#CAD1DB', includeFontPadding: false},
});
