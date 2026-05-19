import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {PARKING_STATUS} from '../../../constants/status';
import {StatBlock} from './StatBlock';
import {SectionHeader} from '../SectionHeader';
import {AppIcon} from '../../common/AppIcon';
import type {ParkingLotDetail} from '../../../types/parking';

interface DetailHomeTabProps {
  lot: ParkingLotDetail;
  soonMin?: number | null;
}

const TYPE_LABEL: Record<string, string> = {
  PUBLIC: '공영',
  PRIVATE: '개인공유',
  COMMERCIAL: '상업시설',
  BUILDING: '건물',
};

export function DetailHomeTab({lot, soonMin}: DetailHomeTabProps): React.JSX.Element {
  const hasNfc = (lot.tags as string[]).includes('NFC');
  const opHours = lot.operationHours.isAllDay
    ? '24시간'
    : `${lot.operationHours.open}–${lot.operationHours.close}`;
  const dist =
    lot.distanceMeters >= 1000
      ? `${(lot.distanceMeters / 1000).toFixed(1)}km`
      : `${lot.distanceMeters}m`;
  const walkMin = Math.max(1, Math.round(lot.distanceMeters / 80));
  const dailyMax = lot.fee?.maxDailyFee;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {/* 2×2 stat grid */}
      <View style={styles.grid}>
        <View style={styles.gridRow}>
          <StatBlock
            label="시간당"
            value={`₩${lot.pricePerHour.toLocaleString()}`}
            sub={dailyMax ? `일 최대 ₩${dailyMax.toLocaleString()}` : undefined}
            accentColor="#006CFF"
            iconNode={
              <AppIcon name="circleDollarSign" size={13} color="#006CFF" strokeWidth={2} />
            }
          />
          <View style={styles.gridDivV} />
          <StatBlock
            label="운영시간"
            value={opHours}
            sub={lot.operationHours.isAllDay ? '24시간 운영' : undefined}
            accentColor="#03AA5A"
            iconNode={
              <AppIcon name="clock" size={13} color="#03AA5A" strokeWidth={2} />
            }
          />
        </View>
        <View style={styles.gridDivH} />
        <View style={styles.gridRow}>
          <StatBlock
            label="거리"
            value={dist}
            sub={`도보 ${walkMin}분`}
            accentColor="#FB5852"
            iconNode={
              <AppIcon name="mapPin" size={13} color="#FB5852" strokeWidth={2} />
            }
          />
          <View style={styles.gridDivV} />
          <StatBlock
            label="이용가능"
            value={`${lot.availableCount} / ${lot.totalCount}`}
            sub={
              lot.status === PARKING_STATUS.SOON_AVAILABLE && soonMin
                ? `${soonMin}분 후 추가 가능`
                : '실시간 갱신'
            }
            accentColor="#006CFF"
            iconNode={
              <AppIcon name="circleParking" size={13} color="#006CFF" strokeWidth={2} />
            }
          />
        </View>
      </View>

      {/* Soon banner */}
      {lot.status === PARKING_STATUS.SOON_AVAILABLE && soonMin != null && (
        <View style={styles.soonBanner}>
          <View style={styles.soonCircle}>
            <AppIcon name="clock" size={18} color="#FFFFFF" strokeWidth={2.2} />
          </View>
          <View style={styles.soonBody}>
            <Text style={styles.soonTitle}>{soonMin}분 후 출차 예정</Text>
            <Text style={styles.soonSub}>
              현재 이용 중인 차량의 출차 예정 시간 기준이에요. 다른 사용자가 먼저 도착할 수 있어요.
            </Text>
          </View>
        </View>
      )}

      {/* Photo placeholder */}
      <SectionHeader title="주차장 사진" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.photoList}
      >
        {[1, 2, 3, 4].map(i => (
          <View key={i} style={styles.photoThumb}>
            <AppIcon name="imagePlus" size={32} color="#CAD1DB" strokeWidth={1.5} />
          </View>
        ))}
      </ScrollView>

      {/* Usage guide */}
      <SectionHeader title="이용 안내" />
      <View style={styles.infoCard}>
        {[
          {label: '출입 방식', value: hasNfc ? 'NFC 태그 / QR 코드' : '관리자 인증'},
          {label: '결제', value: '카카오페이, 신용카드, 계좌이체'},
          {label: '차량 제한', value: '대형차 가능 · 전기차 충전 ✗'},
          {label: '주차장 유형', value: TYPE_LABEL[lot.type] ?? lot.type},
        ].map((r, i, arr) => (
          <View key={i} style={[styles.infoRow, i < arr.length - 1 && styles.infoRowBorder]}>
            <Text style={styles.infoLabel}>{r.label}</Text>
            <Text style={styles.infoValue}>{r.value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {padding: 16, paddingBottom: 100, gap: 16},

  // ── Grid
  grid: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    overflow: 'hidden',
    backgroundColor: '#E5EAF1',
    gap: 1,
  },
  gridRow: {flexDirection: 'row', gap: 1, backgroundColor: '#E5EAF1'},
  gridDivH: {height: 1, backgroundColor: '#E5EAF1'},
  gridDivV: {width: 1, backgroundColor: '#E5EAF1'},

  // ── Soon banner
  soonBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(0,108,255,0.06)',
    borderWidth: 1,
    borderColor: '#006CFF',
  },
  soonCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#006CFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  soonBody: {flex: 1, gap: 3},
  soonTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#006CFF',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  soonSub: {
    fontSize: 12,
    color: '#6B7C92',
    lineHeight: 17,
    letterSpacing: -0.2,
    includeFontPadding: false,
  },

  // ── Photos
  photoList: {gap: 8},
  photoThumb: {
    width: 130,
    height: 96,
    borderRadius: 10,
    backgroundColor: '#F0F4FF',
    borderWidth: 1,
    borderColor: '#E5EAF1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Info card
  infoCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    backgroundColor: '#FFFFFF',
  },
  infoRowBorder: {borderBottomWidth: 1, borderBottomColor: '#F2F4F7'},
  infoLabel: {
    fontSize: 12,
    color: '#8B99AC',
    fontWeight: '500',
    width: 70,
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  infoValue: {
    flex: 1,
    fontSize: 13,
    color: '#222225',
    textAlign: 'right',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
});
