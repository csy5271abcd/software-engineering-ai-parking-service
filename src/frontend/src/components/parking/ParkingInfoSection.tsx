import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import type {ParkingLotDetail, ParkingLotType} from '../../types/parking';

const TYPE_LABEL: Record<ParkingLotType, string> = {
  PUBLIC: '공영',
  PRIVATE: '개인공유',
  COMMERCIAL: '상업시설',
  BUILDING: '건물 주차장',
};

const DAY_SHORT: Record<string, string> = {
  MON: '월', TUE: '화', WED: '수', THU: '목',
  FRI: '금', SAT: '토', SUN: '일',
};

function formatDays(days: string[]): string {
  if (days.length === 7) return '매일';
  return days.map(d => DAY_SHORT[d] ?? d).join('·');
}

interface Props {
  lot: ParkingLotDetail;
}

export function ParkingInfoSection({lot}: Props): React.JSX.Element {
  const hours = lot.operationHours.isAllDay
    ? '24시간'
    : `${lot.operationHours.open} – ${lot.operationHours.close}`;
  const days = formatDays(lot.operationHours.operationDays);
  const hasNfc = (lot.tags as string[]).includes('NFC');
  const accessMethod = hasNfc ? 'NFC 태그 · QR 코드' : '관리자 인증';
  const tagList = (lot.tags as string[]).filter(t => t !== 'NFC');

  const rows: Array<{label: string; value: string}> = [
    {label: '주차장 유형', value: TYPE_LABEL[lot.type]},
    {label: '운영시간',   value: hours},
    {label: '운영요일',   value: days},
    {label: '출입 방식', value: accessMethod},
    {label: '결제',      value: '카드 · 카카오페이'},
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>이용 안내</Text>
      <View style={styles.card}>
        {rows.map((row, idx) => (
          <View
            key={row.label}
            style={[styles.row, idx < rows.length - 1 && styles.rowBorder]}
          >
            <Text style={styles.label}>{row.label}</Text>
            <Text style={styles.value}>{row.value}</Text>
          </View>
        ))}
      </View>

      {tagList.length > 0 && (
        <View style={styles.tagRow}>
          {tagList.map(tag => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
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
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F8F9FB',
  },
  label: {
    width: 80,
    fontSize: 12.5,
    color: '#6B7C92',
    fontWeight: '500',
    includeFontPadding: false,
  },
  value: {
    flex: 1,
    fontSize: 13,
    color: '#222225',
    textAlign: 'right',
    includeFontPadding: false,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    backgroundColor: '#F8F9FB',
    borderWidth: 1,
    borderColor: '#E5EAF1',
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6B7C92',
    includeFontPadding: false,
  },
});
