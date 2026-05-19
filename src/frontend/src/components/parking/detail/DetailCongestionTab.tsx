import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {SectionHeader} from '../SectionHeader';
import type {ParkingLotDetail} from '../../../types/parking';

interface DetailCongestionTabProps {
  lot: ParkingLotDetail;
}

// Evening timeframe: 14시 ~ 02시 (13 bars)
const EVE_HOURS = [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2];
const EVE_VALS  = [42, 55, 68, 80, 92, 88, 76, 65, 52, 44, 36, 28, 22];
// X-axis labels shown only at 14시(idx 0), 18시(idx 4), 22시(idx 8), 02시(idx 12)
const EVE_AXIS_IDX = new Set([0, 4, 8, 12]);

const DAYS    = ['월', '화', '수', '목', '금', '토', '일'];
const DAY_VALS = [55, 50, 58, 62, 78, 88, 72];

function barColor(val: number): string {
  if (val > 80) {return '#FB5852';}
  if (val > 60) {return '#F5683C';}
  if (val > 40) {return '#FFB800';}
  return '#03AA5A';
}

interface EveBarChartProps {
  highlightHour: number; // 0-23
}

function EveBarChart({highlightHour}: EveBarChartProps): React.JSX.Element {
  const highlightIdx = EVE_HOURS.indexOf(highlightHour);
  const safeIdx = Math.max(0, highlightIdx);

  return (
    <View style={chartStyles.wrap}>
      <View style={chartStyles.bars}>
        {EVE_VALS.map((v, i) => (
          <View key={i} style={chartStyles.barCol}>
            <View style={chartStyles.barTrack}>
              <View
                style={[
                  chartStyles.bar,
                  {
                    height: `${v}%` as `${number}%`,
                    backgroundColor: barColor(v),
                    opacity: i === safeIdx ? 1 : 0.45,
                  },
                  i === safeIdx && chartStyles.barHighlight,
                ]}
              />
            </View>
          </View>
        ))}
      </View>
      <View style={chartStyles.labelRow}>
        {EVE_HOURS.map((h, i) => (
          <Text
            key={i}
            style={[
              chartStyles.label,
              EVE_AXIS_IDX.has(i) && chartStyles.labelVisible,
              i === safeIdx && chartStyles.labelActive,
            ]}
          >
            {EVE_AXIS_IDX.has(i) ? `${h < 10 ? h : h}시` : ''}
          </Text>
        ))}
      </View>
    </View>
  );
}

interface WeekBarChartProps {
  highlightIdx: number;
}

function WeekBarChart({highlightIdx}: WeekBarChartProps): React.JSX.Element {
  return (
    <View style={chartStyles.wrap}>
      <View style={chartStyles.bars}>
        {DAY_VALS.map((v, i) => (
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
        {DAYS.map((d, i) => (
          <Text
            key={i}
            style={[
              chartStyles.label,
              chartStyles.labelVisible,
              i === highlightIdx && chartStyles.labelActive,
            ]}
          >
            {d}
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
    gap: 3,
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
    color: 'transparent',
    includeFontPadding: false,
    fontWeight: '500',
  },
  labelVisible: {color: '#8B99AC'},
  labelActive: {color: '#006CFF', fontWeight: '700'},
});

export function DetailCongestionTab({lot}: DetailCongestionTabProps): React.JSX.Element {
  const todayIdx = new Date().getDay();
  const dayIdx = todayIdx === 0 ? 6 : todayIdx - 1;
  const nowHour = new Date().getHours();

  // If current hour is in 14-23 range or 0-2, highlight that bar
  const highlightHour = EVE_HOURS.includes(nowHour) ? nowHour : 18;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      <SectionHeader title="시간대별 혼잡도 예측" />
      <EveBarChart highlightHour={highlightHour} />

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
      <WeekBarChart highlightIdx={dayIdx} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {padding: 16, paddingBottom: 100, gap: 16},

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
