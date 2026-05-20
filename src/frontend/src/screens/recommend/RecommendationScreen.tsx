import React, {useState, useCallback, useMemo} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppIcon} from '../../components/common/AppIcon';
import {AiCongestionSummaryCard} from '../../components/recommendation/AiCongestionSummaryCard';
import {RecommendationScenarioChips} from '../../components/recommendation/RecommendationScenarioChips';
import {TimeCongestionForecast} from '../../components/recommendation/TimeCongestionForecast';
import {AiBestParkingCard} from '../../components/recommendation/AiBestParkingCard';
import {AiScoreBreakdownCard} from '../../components/recommendation/AiScoreBreakdownCard';
import {AiReasonCard} from '../../components/recommendation/AiReasonCard';
import {AiRecommendedParkingList} from '../../components/recommendation/AiRecommendedParkingList';
import {AiParkingCompareCard} from '../../components/recommendation/AiParkingCompareCard';
import {AiInfluenceFactorsCard} from '../../components/recommendation/AiInfluenceFactorsCard';
import {
  mockAiRegionSummary,
  mockAiInsights,
  mockScenarioRecommendations,
} from '../../mocks/aiRecommendation.mock';
import type {ScenarioKey, AiRecommendationInsight} from '../../types/aiRecommendation';
import {SCENARIO_DESCRIPTION} from '../../types/aiRecommendation';
import type {RecommendStackParamList} from '../../navigation/navigationTypes';

type NavProp = StackNavigationProp<RecommendStackParamList, 'RecommendationScreen'>;

export function RecommendationScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavProp>();
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>('빠른 주차');

  const scenarioRec = useMemo(
    () => mockScenarioRecommendations[activeScenario],
    [activeScenario],
  );

  const bestInsight = useMemo((): AiRecommendationInsight => {
    return (
      mockAiInsights.find(i => i.parkingLotId === scenarioRec.bestParkingLotId) ??
      mockAiInsights[0]
    );
  }, [scenarioRec]);

  const sortedInsights = useMemo((): AiRecommendationInsight[] => {
    return scenarioRec.sortedParkingLotIds
      .map(id => mockAiInsights.find(i => i.parkingLotId === id))
      .filter((i): i is AiRecommendationInsight => i !== undefined);
  }, [scenarioRec]);

  const handlePressLot = useCallback(
    (id: string) => {
      navigation.navigate('ParkingDetailScreen', {parkingLotId: id});
    },
    [navigation],
  );

  return (
    <View style={styles.screen}>
      {/* ── Fixed header ── */}
      <View style={[styles.header, {paddingTop: insets.top + 12}]}>
        <View style={styles.headerLeft}>
          <View style={styles.headerIconRow}>
            <AppIcon name="atom" size={18} color="#006CFF" strokeWidth={2} />
            <Text style={styles.headerTitle}>추천</Text>
          </View>
          <Text style={styles.headerSub}>
            AI가 지금 가장 주차하기 좋은 곳을 분석했어요
          </Text>
        </View>
        <View style={styles.headerBadge}>
          <AppIcon name="sparkles" size={11} color="#FFFFFF" strokeWidth={2} />
          <Text style={styles.headerBadgeText}>실시간</Text>
        </View>
      </View>

      {/* ── Scrollable content ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          {paddingBottom: insets.bottom + 32},
        ]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* 1. 오늘의 AI 추천 요약 */}
        <AiCongestionSummaryCard summary={mockAiRegionSummary} />

        {/* 2. 상황별 추천 chip + 설명 */}
        <RecommendationScenarioChips
          active={activeScenario}
          onSelect={setActiveScenario}
          description={SCENARIO_DESCRIPTION[activeScenario]}
        />

        {/* 3. BEST 추천 카드 */}
        <AiBestParkingCard
          insight={bestInsight}
          activeScenario={activeScenario}
          onPress={handlePressLot}
        />

        {/* 4. 시간대별 혼잡도 예측 */}
        <TimeCongestionForecast predictions={bestInsight.timePredictions} />

        {/* 5. AI 추천 점수 분석 */}
        <AiScoreBreakdownCard
          breakdown={bestInsight.scoreBreakdown}
          totalScore={bestInsight.recommendationScore}
        />

        {/* 6. AI 추천 이유 */}
        <AiReasonCard
          reasons={bestInsight.reasons}
          activeScenario={activeScenario}
          lotName={bestInsight.displayName}
        />

        {/* 7. AI 추천순 주차장 리스트 */}
        <AiRecommendedParkingList
          insights={sortedInsights}
          activeScenario={activeScenario}
          onPressLot={handlePressLot}
        />

        {/* 8. 후보 비교 카드 */}
        <AiParkingCompareCard
          insights={sortedInsights}
          onPressLot={handlePressLot}
        />

        {/* 9. 혼잡도 영향 요인 */}
        <AiInfluenceFactorsCard factors={bestInsight.influenceFactors} />

        {/* 분석 기준 footer note */}
        <View style={styles.footerNote}>
          <AppIcon name="alertCircle" size={12} color="#8B99AC" strokeWidth={2} />
          <Text style={styles.footerText}>
            AI 분석은 최근 4주 이용 데이터, 시간대별 혼잡도 패턴, 현재 가용 면수를 기반으로 계산됩니다.
            실제 상황과 차이가 있을 수 있습니다.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: '#F8F9FB'},

  // ── Header
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5EAF1',
  },
  headerLeft: {gap: 3},
  headerIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.5,
    includeFontPadding: false,
  },
  headerSub: {
    fontSize: 12.5,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#006CFF',
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 2,
  },
  headerBadgeText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#FFFFFF',
    includeFontPadding: false,
  },

  scroll: {flex: 1},
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16,
  },

  // ── Footer
  footerNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    paddingVertical: 4,
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
