import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AppIcon} from '../common/AppIcon';
import type {ScenarioKey} from '../../types/aiRecommendation';
import {SCENARIO_FIRST_REASON} from '../../types/aiRecommendation';

interface Props {
  reasons: string[];
  activeScenario: ScenarioKey;
  lotName: string;
}

export function AiReasonCard({reasons, activeScenario, lotName}: Props): React.JSX.Element {
  const scenarioReason = SCENARIO_FIRST_REASON[activeScenario];
  const mergedReasons = [scenarioReason, ...reasons.filter(r => r !== scenarioReason)].slice(0, 5);

  return (
    <View style={styles.card}>
      {/* Title */}
      <View style={styles.titleRow}>
        <AppIcon name="checkCircle" size={16} color="#03AA5A" strokeWidth={2} />
        <Text style={styles.title}>AI 추천 이유</Text>
      </View>

      {/* Lot name sub-header */}
      <View style={styles.subHeader}>
        <Text style={styles.subLotName}>{lotName}</Text>
        <Text style={styles.subSuffix}>을 추천하는 이유</Text>
      </View>

      {/* Analysis description */}
      <View style={styles.descRow}>
        <AppIcon name="brain" size={12} color="#006CFF" strokeWidth={2} />
        <Text style={styles.descText}>
          현재 이용 가능 공간, 같은 요일/시간대 평균 혼잡도, 목적지와의 거리, NFC 가능 여부를 함께 분석했어요.
        </Text>
      </View>

      {/* Reasons list */}
      <View style={styles.list}>
        {mergedReasons.map((reason, i) => (
          <View key={i} style={styles.row}>
            <View style={[styles.icon, i === 0 && styles.iconHighlight]}>
              <AppIcon
                name={i === 0 ? 'sparkles' : 'checkCircle'}
                size={13}
                color={i === 0 ? '#006CFF' : '#03AA5A'}
                strokeWidth={2}
              />
            </View>
            <Text style={[styles.text, i === 0 && styles.textHighlight]} numberOfLines={2}>
              {reason}
            </Text>
          </View>
        ))}
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
    marginBottom: 10,
  },
  subLotName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#006CFF',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  subSuffix: {
    fontSize: 13,
    color: '#4D5A6A',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  descRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    backgroundColor: 'rgba(0,108,255,0.04)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 14,
  },
  descText: {
    flex: 1,
    fontSize: 11.5,
    color: '#4D5A6A',
    letterSpacing: -0.2,
    includeFontPadding: false,
    lineHeight: 16,
  },
  list: {gap: 10},
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  icon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(3,170,90,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 1,
  },
  iconHighlight: {backgroundColor: 'rgba(0,108,255,0.08)'},
  text: {
    flex: 1,
    fontSize: 13,
    color: '#4D5A6A',
    letterSpacing: -0.2,
    includeFontPadding: false,
    lineHeight: 18,
  },
  textHighlight: {fontWeight: '600', color: '#222225'},
});
