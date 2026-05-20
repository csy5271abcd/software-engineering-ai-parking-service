import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AppIcon} from '../common/AppIcon';
import type {AiInfluenceFactor} from '../../types/aiRecommendation';

const SENTIMENT_STYLE = {
  positive: {bg: 'rgba(3,170,90,0.08)',  text: '#03AA5A'},
  neutral:  {bg: 'rgba(107,124,146,0.08)', text: '#6B7C92'},
  warning:  {bg: 'rgba(245,104,60,0.10)', text: '#F5683C'},
} as const;

interface Props {
  factors: AiInfluenceFactor[];
}

export function AiInfluenceFactorsCard({factors}: Props): React.JSX.Element {
  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <AppIcon name="activity" size={16} color="#F5683C" strokeWidth={2} />
        <Text style={styles.title}>혼잡도에 영향을 준 요인</Text>
      </View>

      <View style={styles.pillWrap}>
        {factors.map((f, i) => {
          const s = SENTIMENT_STYLE[f.sentiment];
          return (
            <View key={i} style={[styles.pill, {backgroundColor: s.bg}]}>
              {f.sentiment === 'positive' && (
                <View style={styles.dot} />
              )}
              {f.sentiment === 'warning' && (
                <AppIcon name="alertCircle" size={10} color={s.text} strokeWidth={2.5} />
              )}
              <Text style={[styles.pillText, {color: s.text}]}>{f.label}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, {backgroundColor: '#03AA5A'}]} />
          <Text style={styles.legendText}>긍정 요인</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, {backgroundColor: '#F5683C'}]} />
          <Text style={styles.legendText}>주의 요인</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, {backgroundColor: '#6B7C92'}]} />
          <Text style={styles.legendText}>중립</Text>
        </View>
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
    marginBottom: 14,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  pillWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 100,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#03AA5A',
  },
  pillText: {
    fontSize: 12.5,
    fontWeight: '600',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  legendRow: {
    flexDirection: 'row',
    gap: 14,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  legendText: {
    fontSize: 10.5,
    color: '#6B7C92',
    includeFontPadding: false,
  },
});
