import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {SectionHeader} from '../SectionHeader';
import type {ParkingLotDetail} from '../../../types/parking';

interface DetailCongestionTabProps {
  lot: ParkingLotDetail;
}

const HOURS = ['6', '8', '10', '12', '14', '16', '18', '20', '22'];
const HOUR_VALS = [20, 35, 55, 80, 65, 72, 88, 76, 40];
const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
const DAY_VALS = [55, 50, 58, 62, 78, 88, 72];

function barColor(val: number): string {
  if (val > 80) {return '#FB5852';}
  if (val > 60) {return '#F5683C';}
  if (val > 40) {return '#FFB800';}
  return '#03AA5A';
}

interface BarChartProps {
  labels: string[];
  values: number[];
  highlightIdx: number;
}

function BarChart({labels, values, highlightIdx}: BarChartProps): React.JSX.Element {
  return (
    <View style={chartStyles.wrap}>
      <View style={chartStyles.bars}>
        {values.map((v, i) => (
          <View key={i} style={chartStyles.barCol}>
            <View style={chartStyles.barTrack}>
              <View
                style={[
                  chartStyles.bar,
                  {
                    height: `${v}%` as `${number}%`,
                    backgroundColor: barColor(v),
                    opacity: i === highlightIdx ? 1 : 0.45,
                  },
                  i === highlightIdx && chartStyles.barHighlight,
                ]}
              />
            </View>
          </View>
        ))}
      </View>
      <View style={chartStyles.labelRow}>
        {labels.map((l, i) => (
          <Text
            key={i}
            style={[
              chartStyles.label,
              i === highlightIdx && chartStyles.labelActive,
            ]}
          >
            {l}
          </Text>
        ))}
      </View>
    </View>
  );
}

const chartStyles = StyleSheet.create({
  wrap: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  bars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 80,
    gap: 4,
    marginBottom: 8,
  },
  barCol: {flex: 1, height: '100%', justifyContent: 'flex-end'},
  barTrack: {flex: 1, justifyContent: 'flex-end'},
  bar: {
    borderRadius: 3,
    minHeight: 4,
  },
  barHighlight: {
    borderWidth: 1.5,
    borderColor: '#006CFF',
  },
  labelRow: {
    flexDirection: 'row',
  },
  label: {
    flex: 1,
    textAlign: 'center',
    fontSize: 10,
    color: '#8B99AC',
    includeFontPadding: false,
    fontWeight: '500',
  },
  labelActive: {color: '#006CFF', fontWeight: '700'},
});

export function DetailCongestionTab({lot}: DetailCongestionTabProps): React.JSX.Element {
  const todayIdx = new Date().getDay(); // 0=Sun
  const dayIdx = todayIdx === 0 ? 6 : todayIdx - 1; // Mon=0
  const nowHour = new Date().getHours();
  const hourIdx = Math.min(
    Math.floor((nowHour - 6) / 2),
    HOURS.length - 1,
  );
  const safeHourIdx = Math.max(0, hourIdx);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      <SectionHeader title="시간대별 혼잡도 예측" />
      <BarChart
        labels={HOURS.map(h => `${h}시`)}
        values={HOUR_VALS}
        highlightIdx={safeHourIdx}
      />

      <View style={styles.aiBanner}>
        <View style={styles.aiChip}>
          <Text style={styles.aiChipText}>AI 분석</Text>
        </View>
        <View style={styles.aiBody}>
          <Text style={styles.aiTitle}>지금 가시면 거의 비어있어요</Text>
          <Text style={styles.aiText}>
            {`과거 4주간 같은 시간대 평균 이용률 32%. 현재 이용 가능 ${lot.availableCount}면 / 곧 비워질 자리 포함. `}
            <Text style={styles.aiHighlight}>
              주차 성공률 {lot.recommendationScore}%
            </Text>
          </Text>
        </View>
      </View>

      <SectionHeader title="요일별 패턴" />
      <BarChart
        labels={DAYS}
        values={DAY_VALS}
        highlightIdx={dayIdx}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {padding: 16, paddingBottom: 32, gap: 16},

  aiBanner: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(3,170,90,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(3,170,90,0.20)',
    gap: 8,
  },
  aiChip: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#03AA5A',
    alignSelf: 'flex-start',
  },
  aiChipText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  aiBody: {gap: 4},
  aiTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  aiText: {
    fontSize: 12.5,
    color: '#4D5A6A',
    lineHeight: 18,
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  aiHighlight: {fontWeight: '700', color: '#03AA5A'},
});
