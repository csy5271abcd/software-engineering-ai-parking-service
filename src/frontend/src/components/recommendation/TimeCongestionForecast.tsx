import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import type {TimeCongestionPrediction, CongestionLevel} from '../../types/aiRecommendation';

const CONGESTION_CONFIG: Record<CongestionLevel, {label: string; color: string; bg: string}> = {
  LOW:       {label: '낮음',     color: '#03AA5A', bg: 'rgba(3,170,90,0.12)'},
  MEDIUM:    {label: '보통',     color: '#F5683C', bg: 'rgba(245,104,60,0.12)'},
  HIGH:      {label: '혼잡',     color: '#FB5852', bg: 'rgba(251,88,82,0.12)'},
  VERY_HIGH: {label: '매우혼잡', color: '#D00000', bg: 'rgba(208,0,0,0.12)'},
};

interface Props {
  predictions: TimeCongestionPrediction[];
}

export function TimeCongestionForecast({predictions}: Props): React.JSX.Element {
  const [selected, setSelected] = useState<string>('지금');

  const nowPrediction = predictions.find(p => p.label === '지금');
  const laterPrediction = predictions.find(p => p.label === '30분 후');
  const isNowBest =
    nowPrediction != null &&
    laterPrediction != null &&
    nowPrediction.congestionScore < laterPrediction.congestionScore;
  const willRise =
    laterPrediction != null &&
    (laterPrediction.congestionLevel === 'MEDIUM' ||
      laterPrediction.congestionLevel === 'HIGH' ||
      laterPrediction.congestionLevel === 'VERY_HIGH');

  return (
    <View style={styles.card}>
      <Text style={styles.title}>시간대별 혼잡도 예측</Text>
      <Text style={styles.subtitle}>도착 예정 시간에 따라 주차 성공률이 달라져요</Text>

      <View style={styles.barRow}>
        {predictions.map(p => {
          const isSelected = selected === p.label;
          const cfg = CONGESTION_CONFIG[p.congestionLevel];
          const barH = Math.max(4, Math.round((p.congestionScore / 100) * 60));

          return (
            <Pressable
              key={p.label}
              style={[styles.barCell, isSelected && styles.barCellActive]}
              onPress={() => setSelected(p.label)}
            >
              <Text style={[styles.successRate, {color: isSelected ? '#006CFF' : '#6B7C92'}]}>
                {p.successRate}%
              </Text>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, {height: barH, backgroundColor: cfg.color}]} />
              </View>
              <View style={[styles.levelBadge, {backgroundColor: cfg.bg}]}>
                <Text style={[styles.levelText, {color: cfg.color}]}>{cfg.label}</Text>
              </View>
              <Text style={[styles.timeLabel, isSelected && styles.timeLabelActive]}>
                {p.label}
              </Text>
              {isSelected && <View style={styles.activeDot} />}
            </Pressable>
          );
        })}
      </View>

      <View style={styles.legend}>
        {([['LOW', '#03AA5A', '낮음'], ['MEDIUM', '#F5683C', '보통'], ['HIGH', '#FB5852', '혼잡']] as const).map(
          ([, color, label]) => (
            <View key={label} style={styles.legendItem}>
              <View style={[styles.legendDot, {backgroundColor: color}]} />
              <Text style={styles.legendText}>{label}</Text>
            </View>
          ),
        )}
        <Text style={styles.legendNote}>%는 주차 성공률</Text>
      </View>

      {/* Insight notes */}
      <View style={styles.notesWrap}>
        {willRise && (
          <View style={styles.noteRow}>
            <AppIconInline name="warning" />
            <Text style={styles.noteText}>
              30분 뒤에는 주변 상권 유입으로 혼잡도가 보통으로 올라갈 수 있어요.
            </Text>
          </View>
        )}
        {isNowBest && (
          <View style={styles.noteRow}>
            <AppIconInline name="ok" />
            <Text style={[styles.noteText, styles.noteTextGreen]}>
              지금 출발하면 가장 안정적인 시간대예요.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

function AppIconInline({name}: {name: 'warning' | 'ok'}): React.JSX.Element {
  const color = name === 'ok' ? '#03AA5A' : '#F5683C';
  return (
    <View style={[inlineStyles.dot, {backgroundColor: color}]} />
  );
}

const inlineStyles = StyleSheet.create({
  dot: {width: 6, height: 6, borderRadius: 3, marginTop: 5, flexShrink: 0},
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    padding: 16,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 11.5,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
    marginBottom: 16,
  },
  barRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  barCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'transparent',
    gap: 6,
  },
  barCellActive: {
    borderColor: '#006CFF',
    backgroundColor: 'rgba(0,108,255,0.04)',
  },
  successRate: {
    fontSize: 11.5,
    fontWeight: '700',
    includeFontPadding: false,
    letterSpacing: -0.2,
  },
  barTrack: {
    width: 20,
    height: 60,
    backgroundColor: '#F2F4F7',
    borderRadius: 4,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {width: '100%', borderRadius: 4},
  levelBadge: {paddingHorizontal: 5, paddingVertical: 2, borderRadius: 4},
  levelText: {fontSize: 9.5, fontWeight: '700', includeFontPadding: false},
  timeLabel: {
    fontSize: 10.5,
    color: '#6B7C92',
    includeFontPadding: false,
    textAlign: 'center',
    letterSpacing: -0.2,
  },
  timeLabelActive: {color: '#006CFF', fontWeight: '700'},
  activeDot: {width: 6, height: 6, borderRadius: 3, backgroundColor: '#006CFF'},
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  legendItem: {flexDirection: 'row', alignItems: 'center', gap: 4},
  legendDot: {width: 8, height: 8, borderRadius: 4},
  legendText: {fontSize: 10.5, color: '#6B7C92', includeFontPadding: false},
  legendNote: {fontSize: 10, color: '#8B99AC', includeFontPadding: false, marginLeft: 'auto'},
  notesWrap: {gap: 6},
  noteRow: {flexDirection: 'row', alignItems: 'flex-start', gap: 7},
  noteText: {
    flex: 1,
    fontSize: 11.5,
    color: '#F5683C',
    letterSpacing: -0.2,
    includeFontPadding: false,
    lineHeight: 16,
  },
  noteTextGreen: {color: '#03AA5A'},
});
