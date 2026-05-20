import React from 'react';
import {View, Text, ScrollView, Pressable, StyleSheet} from 'react-native';
import {AppIcon} from '../common/AppIcon';
import type {AiRecommendationInsight, CongestionLevel} from '../../types/aiRecommendation';

const CONG_COLOR: Record<CongestionLevel, string> = {
  LOW: '#03AA5A', MEDIUM: '#F5683C', HIGH: '#FB5852', VERY_HIGH: '#D00000',
};
const CONG_LABEL: Record<CongestionLevel, string> = {
  LOW: '낮음', MEDIUM: '보통', HIGH: '혼잡', VERY_HIGH: '매우혼잡',
};
const RANK_MEDAL = ['🥇', '🥈', '🥉'];

interface CompareRow {
  label: string;
  values: (string | number)[];
  highlight?: boolean;
}

interface Props {
  insights: AiRecommendationInsight[];
  onPressLot: (id: string) => void;
}

export function AiParkingCompareCard({insights, onPressLot}: Props): React.JSX.Element {
  const top3 = insights.slice(0, 3);

  const rows: CompareRow[] = [
    {label: 'AI 점수',   values: top3.map(i => `${i.recommendationScore}점`), highlight: true},
    {label: '성공률',    values: top3.map(i => `${i.successRate}%`)},
    {label: '혼잡도',   values: top3.map(i => CONG_LABEL[i.congestionLevel])},
    {label: '도보',      values: top3.map(i => `${i.walkingMinutes}분`)},
    {label: '요금/시',  values: top3.map(i => `₩${i.pricePerHour.toLocaleString()}`)},
    {label: '가능 면수', values: top3.map(i => `${i.currentAvailableSpaces}면`)},
    {label: 'NFC',      values: top3.map(i => (i.nfcAvailable ? '가능' : '-'))},
  ];

  return (
    <View style={styles.wrap}>
      <View style={styles.headerRow}>
        <AppIcon name="gauge" size={16} color="#222225" strokeWidth={2} />
        <Text style={styles.title}>후보 비교</Text>
        <Text style={styles.sub}>상위 {top3.length}곳 비교</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {top3.map((ins, i) => (
          <Pressable
            key={ins.parkingLotId}
            style={[styles.col, i === 0 && styles.colFirst]}
            onPress={() => onPressLot(ins.parkingLotId)}
          >
            {/* Header */}
            <View style={[styles.colHeader, i === 0 && styles.colHeaderFirst]}>
              <Text style={styles.medal}>{RANK_MEDAL[i]}</Text>
              <Text
                style={[styles.colName, i === 0 && styles.colNameFirst]}
                numberOfLines={2}
              >
                {ins.displayName}
              </Text>
            </View>

            {/* Row values */}
            {rows.map(row => {
              const val = row.values[i];
              const congLevel = ins.congestionLevel;
              const isCongest = row.label === '혼잡도';
              const isNfc = row.label === 'NFC';
              const nfcVal = String(val);
              const valColor = isCongest
                ? CONG_COLOR[congLevel]
                : isNfc && nfcVal === '가능'
                ? '#006CFF'
                : row.highlight && i === 0
                ? '#006CFF'
                : '#222225';

              return (
                <View key={row.label} style={styles.cell}>
                  <Text style={styles.cellLabel}>{row.label}</Text>
                  <Text
                    style={[
                      styles.cellVal,
                      {color: valColor},
                      row.highlight && i === 0 && styles.cellValBold,
                    ]}
                  >
                    {val}
                  </Text>
                </View>
              );
            })}
          </Pressable>
        ))}
      </ScrollView>
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
  scrollContent: {gap: 10, paddingVertical: 2},
  col: {
    width: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    overflow: 'hidden',
  },
  colFirst: {borderColor: '#006CFF', borderWidth: 1.5},
  colHeader: {
    backgroundColor: '#F8F9FB',
    padding: 12,
    alignItems: 'center',
    gap: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#E5EAF1',
  },
  colHeaderFirst: {
    backgroundColor: 'rgba(0,108,255,0.05)',
    borderBottomColor: 'rgba(0,108,255,0.15)',
  },
  medal: {fontSize: 20},
  colName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
    textAlign: 'center',
  },
  colNameFirst: {color: '#006CFF'},
  cell: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F4F7',
    gap: 2,
  },
  cellLabel: {
    fontSize: 10,
    color: '#8B99AC',
    includeFontPadding: false,
    letterSpacing: -0.1,
  },
  cellVal: {
    fontSize: 13.5,
    fontWeight: '600',
    includeFontPadding: false,
    letterSpacing: -0.2,
  },
  cellValBold: {fontWeight: '800'},
});
