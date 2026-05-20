import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {AppIcon} from '../common/AppIcon';
import type {AiRecommendationInsight, ScenarioKey} from '../../types/aiRecommendation';
import {SCENARIO_HINT, SCENARIO_BEST_MESSAGE} from '../../types/aiRecommendation';

const CONGESTION_COLOR: Record<string, string> = {
  LOW: '#03AA5A', MEDIUM: '#F5683C', HIGH: '#FB5852', VERY_HIGH: '#D00000',
};
const CONGESTION_LABEL: Record<string, string> = {
  LOW: '여유', MEDIUM: '보통', HIGH: '혼잡', VERY_HIGH: '매우혼잡',
};

interface Props {
  insight: AiRecommendationInsight;
  activeScenario: ScenarioKey;
  onPress: (id: string) => void;
}

export function AiBestParkingCard({insight, activeScenario, onPress}: Props): React.JSX.Element {
  const congColor = CONGESTION_COLOR[insight.congestionLevel] ?? '#8B99AC';
  const congLabel = CONGESTION_LABEL[insight.congestionLevel] ?? '-';
  const hint = SCENARIO_HINT[activeScenario];
  const bestMessage = SCENARIO_BEST_MESSAGE[activeScenario];

  return (
    <View style={styles.card}>
      {/* BEST label row */}
      <View style={styles.labelRow}>
        <View style={styles.topLabel}>
          <AppIcon name="sparkles" size={12} color="#FFFFFF" strokeWidth={2} />
          <Text style={styles.topLabelText}>AI BEST 추천</Text>
        </View>
        <Text style={styles.bestMessage}>{bestMessage}</Text>
      </View>

      {/* Name + score row */}
      <View style={styles.mainRow}>
        <View style={styles.mainLeft}>
          <Text style={styles.lotName} numberOfLines={1}>{insight.displayName}</Text>
          <View style={styles.badgeRow}>
            <View style={styles.badgeGreen}>
              <Text style={styles.badgeGreenText}>이용가능</Text>
            </View>
            <View style={[styles.badgeCong, {backgroundColor: `${congColor}18`}]}>
              <Text style={[styles.badgeCongText, {color: congColor}]}>{congLabel}</Text>
            </View>
            {insight.nfcAvailable && (
              <View style={styles.badgeBlue}>
                <Text style={styles.badgeBlueText}>NFC</Text>
              </View>
            )}
            {insight.isSoonAvailable && insight.expectedExitMinutes != null && (
              <View style={styles.badgeOrange}>
                <Text style={styles.badgeOrangeText}>{insight.expectedExitMinutes}분 후 출차</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>AI 점수</Text>
          <Text style={styles.score}>{insight.recommendationScore}</Text>
          <Text style={styles.scoreUnit}>점</Text>
        </View>
      </View>

      {/* Success rate bar */}
      <View style={styles.rateRow}>
        <Text style={styles.rateLabel}>주차 성공률</Text>
        <View style={styles.rateBarBg}>
          <View style={[styles.rateBarFill, {width: `${insight.successRate}%` as any}]} />
        </View>
        <Text style={styles.rateVal}>{insight.successRate}%</Text>
      </View>

      {/* Scenario hint */}
      <View style={styles.hintRow}>
        <AppIcon name="zap" size={12} color="#006CFF" strokeWidth={2.5} />
        <Text style={styles.hintText} numberOfLines={1}>{hint}</Text>
      </View>

      {/* Detail chips */}
      <View style={styles.detailRow}>
        <View style={styles.detailItem}>
          <AppIcon name="navigation" size={13} color="#6B7C92" strokeWidth={2} />
          <Text style={styles.detailText}>도보 {insight.walkingMinutes}분</Text>
        </View>
        <View style={styles.detailItem}>
          <AppIcon name="circleDollarSign" size={13} color="#6B7C92" strokeWidth={2} />
          <Text style={styles.detailText}>₩{insight.pricePerHour.toLocaleString()}/시</Text>
        </View>
        <View style={styles.detailItem}>
          <AppIcon name="circleParking" size={13} color="#6B7C92" strokeWidth={2} />
          <Text style={styles.detailText}>{insight.currentAvailableSpaces}면 가능</Text>
        </View>
        {insight.maxDailyPrice != null && (
          <View style={styles.detailItem}>
            <AppIcon name="calendarDays" size={13} color="#6B7C92" strokeWidth={2} />
            <Text style={styles.detailText}>일 최대 ₩{insight.maxDailyPrice.toLocaleString()}</Text>
          </View>
        )}
      </View>

      {/* CTA */}
      <Pressable style={styles.cta} onPress={() => onPress(insight.parkingLotId)}>
        <Text style={styles.ctaText}>상세 보기</Text>
        <AppIcon name="chevronRight" size={14} color="#FFFFFF" strokeWidth={2.5} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#006CFF',
    padding: 16,
    elevation: 4,
    shadowColor: '#006CFF',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  topLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#006CFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexShrink: 0,
  },
  topLabelText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.2,
    includeFontPadding: false,
  },
  bestMessage: {
    flex: 1,
    fontSize: 11.5,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  mainLeft: {flex: 1, gap: 6},
  lotName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#222225',
    letterSpacing: -0.5,
    includeFontPadding: false,
  },
  badgeRow: {flexDirection: 'row', gap: 5, flexWrap: 'wrap'},
  badgeGreen: {
    paddingHorizontal: 7, paddingVertical: 3, borderRadius: 5,
    backgroundColor: 'rgba(3,170,90,0.10)',
  },
  badgeGreenText: {fontSize: 10.5, fontWeight: '700', color: '#03AA5A', includeFontPadding: false},
  badgeCong: {paddingHorizontal: 7, paddingVertical: 3, borderRadius: 5},
  badgeCongText: {fontSize: 10.5, fontWeight: '700', includeFontPadding: false},
  badgeBlue: {
    paddingHorizontal: 7, paddingVertical: 3, borderRadius: 5,
    backgroundColor: 'rgba(0,108,255,0.08)',
  },
  badgeBlueText: {fontSize: 10.5, fontWeight: '700', color: '#006CFF', includeFontPadding: false},
  badgeOrange: {
    paddingHorizontal: 7, paddingVertical: 3, borderRadius: 5,
    backgroundColor: 'rgba(245,104,60,0.10)',
  },
  badgeOrangeText: {fontSize: 10.5, fontWeight: '700', color: '#F5683C', includeFontPadding: false},
  scoreBox: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,108,255,0.06)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minWidth: 62,
    flexShrink: 0,
  },
  scoreLabel: {fontSize: 9.5, color: '#6B7C92', includeFontPadding: false, marginBottom: 2},
  score: {
    fontSize: 28, fontWeight: '800', color: '#006CFF',
    letterSpacing: -1, includeFontPadding: false,
  },
  scoreUnit: {fontSize: 10, color: '#006CFF', fontWeight: '600', includeFontPadding: false},
  rateRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10,
  },
  rateLabel: {fontSize: 11.5, color: '#6B7C92', includeFontPadding: false, width: 62},
  rateBarBg: {
    flex: 1, height: 6, backgroundColor: '#F2F4F7',
    borderRadius: 3, overflow: 'hidden',
  },
  rateBarFill: {height: '100%', backgroundColor: '#006CFF', borderRadius: 3},
  rateVal: {
    fontSize: 12, fontWeight: '700', color: '#006CFF',
    width: 36, textAlign: 'right', includeFontPadding: false,
  },
  hintRow: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(0,108,255,0.05)', borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 7, marginBottom: 12,
  },
  hintText: {
    fontSize: 12, color: '#006CFF', fontWeight: '600',
    letterSpacing: -0.2, includeFontPadding: false, flex: 1,
  },
  detailRow: {
    flexDirection: 'row', gap: 12, marginBottom: 14, flexWrap: 'wrap',
  },
  detailItem: {flexDirection: 'row', alignItems: 'center', gap: 4},
  detailText: {fontSize: 12, color: '#4D5A6A', letterSpacing: -0.2, includeFontPadding: false},
  cta: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 4, backgroundColor: '#006CFF', borderRadius: 10, paddingVertical: 12,
  },
  ctaText: {
    fontSize: 14, fontWeight: '700', color: '#FFFFFF',
    letterSpacing: -0.2, includeFontPadding: false,
  },
});
