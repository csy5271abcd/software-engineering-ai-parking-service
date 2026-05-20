import React from 'react';
import {View, ScrollView, Pressable, Text, StyleSheet} from 'react-native';
import type {ScenarioKey} from '../../types/aiRecommendation';

export const SCENARIO_LIST: ScenarioKey[] = [
  '빠른 주차',
  '저렴한 주차',
  '곧 비워질 자리',
  'NFC 가능',
  '오래 주차',
  '혼잡도 낮은 곳',
];

interface Props {
  active: ScenarioKey;
  onSelect: (s: ScenarioKey) => void;
  description: string;
}

export function RecommendationScenarioChips({
  active,
  onSelect,
  description,
}: Props): React.JSX.Element {
  return (
    <View style={styles.wrap}>
      <Text style={styles.sectionLabel}>상황별 추천</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {SCENARIO_LIST.map(s => (
          <Pressable
            key={s}
            style={[styles.chip, active === s && styles.chipActive]}
            onPress={() => onSelect(s)}
          >
            <Text style={[styles.label, active === s && styles.labelActive]}>{s}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {gap: 8},
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8B99AC',
    letterSpacing: -0.1,
    includeFontPadding: false,
  },
  row: {gap: 8, paddingVertical: 2},
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: '#E5EAF1',
    backgroundColor: '#FFFFFF',
  },
  chipActive: {
    backgroundColor: '#222225',
    borderColor: '#222225',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4D5A6A',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  labelActive: {color: '#FFFFFF'},
  description: {
    fontSize: 12,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
    paddingHorizontal: 2,
  },
});
