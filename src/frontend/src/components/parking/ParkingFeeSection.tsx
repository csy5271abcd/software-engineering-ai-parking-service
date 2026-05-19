import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import type {ParkingLotDetail} from '../../types/parking';

interface Props {
  lot: ParkingLotDetail;
}

export function ParkingFeeSection({lot}: Props): React.JSX.Element {
  const {fee} = lot;
  const hasNfc = (lot.tags as string[]).includes('NFC');

  const rows: Array<{label: string; value: string; highlight?: boolean}> = [
    {
      label: '기본 요금',
      value: `최초 ${fee.baseMinutes}분 ₩${fee.baseFee.toLocaleString()}`,
    },
    {
      label: '추가 요금',
      value: `${fee.extraMinutes}분당 ₩${fee.extraFee.toLocaleString()}`,
    },
    {
      label: '시간당 환산',
      value: `₩${fee.pricePerHour.toLocaleString()}`,
      highlight: true,
    },
    ...(fee.maxDailyFee != null
      ? [{label: '일 최대 요금', value: `₩${fee.maxDailyFee.toLocaleString()}`}]
      : []),
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>요금 안내</Text>
      <View style={styles.card}>
        {rows.map((row, idx) => (
          <View
            key={row.label}
            style={[styles.row, idx < rows.length - 1 && styles.rowBorder]}
          >
            <Text style={styles.label}>{row.label}</Text>
            <Text style={[styles.value, row.highlight && styles.valueHighlight]}>
              {row.value}
            </Text>
          </View>
        ))}
      </View>

      {hasNfc && (
        <View style={styles.nfcBanner}>
          <View style={styles.nfcBadge}>
            <Text style={styles.nfcBadgeText}>NFC</Text>
          </View>
          <Text style={styles.nfcDesc}>NFC 태그로 간편하게 이용 시작·종료 가능</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {marginBottom: 8},
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    marginBottom: 10,
    includeFontPadding: false,
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 14,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F8F9FB',
  },
  label: {
    flex: 1,
    fontSize: 13,
    color: '#6B7C92',
    includeFontPadding: false,
  },
  value: {
    fontSize: 13,
    fontWeight: '600',
    color: '#222225',
    includeFontPadding: false,
  },
  valueHighlight: {
    color: '#006CFF',
    fontSize: 14,
    fontWeight: '700',
  },
  nfcBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(0,108,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(0,108,255,0.18)',
  },
  nfcBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: '#006CFF',
  },
  nfcBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  nfcDesc: {
    flex: 1,
    fontSize: 12,
    color: '#4D5A6A',
    includeFontPadding: false,
  },
});
