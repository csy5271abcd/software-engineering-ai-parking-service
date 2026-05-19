import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {PARKING_STATUS, CONGESTION_STATUS} from '../../constants/status';
import {STATUS_DISPLAY, CONGESTION_DISPLAY} from '../../utils/parkingStatus';
import {getMockParkingLotById} from '../../mocks';
import {ParkingDetailHeader} from '../../components/parking/ParkingDetailHeader';
import {ParkingInfoSection} from '../../components/parking/ParkingInfoSection';
import {ParkingFeeSection} from '../../components/parking/ParkingFeeSection';
import {ParkingActionBar} from '../../components/parking/ParkingActionBar';
import {MapPlaceholder} from '../../components/map/MapPlaceholder';

// ── Navigation types ──────────────────────────────────────────────────────────

type DetailRoute = RouteProp<
  {ParkingDetailScreen: {parkingLotId: string}},
  'ParkingDetailScreen'
>;

interface Props {
  route: DetailRoute;
  navigation: StackNavigationProp<
    {ParkingDetailScreen: {parkingLotId: string}},
    'ParkingDetailScreen'
  >;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const TYPE_LABEL: Record<string, string> = {
  PUBLIC: '공영',
  PRIVATE: '개인공유',
  COMMERCIAL: '상업시설',
  BUILDING: '건물',
};

function aiMessage(score: number): string {
  if (score >= 85) return '주차 가능성이 높아요';
  if (score >= 70) return '주차 가능할 것으로 예상돼요';
  return '주차 상황을 미리 확인하세요';
}

function aiColor(score: number): string {
  if (score >= 85) return '#03AA5A';
  if (score >= 70) return '#006CFF';
  return '#F5683C';
}

// ── Screen ────────────────────────────────────────────────────────────────────

export function ParkingDetailScreen({route, navigation}: Props): React.JSX.Element {
  const {parkingLotId} = route.params;
  const lot = getMockParkingLotById(parkingLotId);

  if (!lot) {
    return (
      <View style={styles.errorWrap}>
        <Text style={styles.errorText}>주차장 정보를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  const s = STATUS_DISPLAY[lot.status];
  const c = CONGESTION_DISPLAY[lot.congestionLevel];
  const dist =
    lot.distanceMeters >= 1000
      ? `${(lot.distanceMeters / 1000).toFixed(1)}km`
      : `${lot.distanceMeters}m`;
  const walkMin = Math.max(1, Math.round(lot.distanceMeters / 80));
  const opHours = lot.operationHours.isAllDay
    ? '24시간'
    : `${lot.operationHours.open}–${lot.operationHours.close}`;
  const hasNfc = (lot.tags as string[]).includes('NFC');
  const isSoon =
    lot.status === PARKING_STATUS.SOON_AVAILABLE && lot.expectedExitAt != null;
  const soonMin = isSoon
    ? Math.max(
        1,
        Math.round(
          (new Date(lot.expectedExitAt!).getTime() - Date.now()) / 60000,
        ),
      )
    : null;

  const score = lot.recommendationScore;
  const accColor = aiColor(score);

  return (
    <View style={styles.screen}>
      {/* ── Header ── */}
      <ParkingDetailHeader title={lot.name} onBack={() => navigation.goBack()} />

      {/* ── Scrollable body ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Mini map */}
        <View style={styles.mapWrap}>
          <MapPlaceholder>
            {/* Centered parking pin */}
            <View style={styles.mapPinWrap}>
              <View style={styles.mapPin}>
                <Text style={styles.mapPinText}>P</Text>
              </View>
              <View style={styles.mapPinTail} />
            </View>
          </MapPlaceholder>
          <View style={styles.mapGradient} />
        </View>

        {/* Summary card — overlaps map bottom edge */}
        <View style={styles.summaryCard}>
          {/* Badges */}
          <View style={styles.badgeRow}>
            <View style={[styles.badge, {backgroundColor: s.bg}]}>
              <View style={[styles.dot, {backgroundColor: s.color}]} />
              <Text style={[styles.badgeText, {color: s.color}]}>{s.label}</Text>
            </View>
            <View style={[styles.badge, {backgroundColor: c.bg}]}>
              <Text style={[styles.badgeText, {color: c.color}]}>{c.label}</Text>
            </View>
            {hasNfc && (
              <View style={[styles.badge, {backgroundColor: 'rgba(0,108,255,0.08)'}]}>
                <Text style={[styles.badgeText, {color: '#006CFF'}]}>NFC</Text>
              </View>
            )}
            <View style={[styles.badge, {backgroundColor: '#F8F9FB'}]}>
              <Text style={[styles.badgeText, {color: '#6B7C92'}]}>
                {TYPE_LABEL[lot.type] ?? lot.type}
              </Text>
            </View>
          </View>

          {/* Name + address */}
          <Text style={styles.name}>{lot.name}</Text>
          <Text style={styles.address} numberOfLines={1}>
            {lot.address.roadAddress}
          </Text>

          {/* Stats grid */}
          <View style={styles.statsGrid}>
            {[
              {label: '시간당', value: `₩${lot.pricePerHour.toLocaleString()}`},
              {label: '거리',   value: `${dist} · 도보 ${walkMin}분`},
              {label: '이용가능', value: `${lot.availableCount} / ${lot.totalCount}`},
              {label: '운영',   value: opHours},
            ].map((stat, idx) => (
              <View
                key={stat.label}
                style={[
                  styles.statCell,
                  idx % 2 !== 0 && styles.statCellLeft,
                  idx >= 2 && styles.statCellTop,
                ]}
              >
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statValue} numberOfLines={1}>
                  {stat.value}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* AI/congestion banner */}
        <View style={[styles.aiBanner, {borderColor: accColor + '33', backgroundColor: accColor + '0D'}]}>
          <View style={[styles.aiChip, {backgroundColor: accColor}]}>
            <Text style={styles.aiChipText}>AI</Text>
          </View>
          <View style={styles.aiTextWrap}>
            <Text style={[styles.aiTitle, {color: accColor}]}>{aiMessage(score)}</Text>
            <Text style={styles.aiSub}>
              추천 점수 {score}점 · {c.label} · {
                lot.congestionLevel === CONGESTION_STATUS.LOW
                  ? '현재 한산해요'
                  : lot.congestionLevel === CONGESTION_STATUS.MEDIUM
                  ? '보통 수준이에요'
                  : '다소 혼잡해요'
              }
            </Text>
          </View>
          <View style={[styles.scoreCircle, {borderColor: accColor}]}>
            <Text style={[styles.scoreNum, {color: accColor}]}>{score}</Text>
          </View>
        </View>

        {/* Soon available banner */}
        {isSoon && soonMin != null && (
          <View style={styles.soonBanner}>
            <View style={styles.soonIconCircle}>
              <Text style={styles.soonIcon}>⏱</Text>
            </View>
            <View style={styles.soonTextWrap}>
              <Text style={styles.soonTitle}>
                {soonMin}분 후 출차 예정
              </Text>
              <Text style={styles.soonSub}>
                이용 중인 차량의 예정 출차 시간 기준이에요
              </Text>
            </View>
          </View>
        )}

        {/* Info section */}
        <ParkingInfoSection lot={lot} />

        {/* Fee section */}
        <ParkingFeeSection lot={lot} />

        {/* Photo placeholder */}
        <View style={styles.photoSection}>
          <Text style={styles.sectionTitle}>주차장 사진</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.photoList}
          >
            {[1, 2, 3].map(i => (
              <View key={i} style={styles.photoThumb}>
                <Text style={styles.photoIcon}>🅿</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* ── Fixed CTA ── */}
      <ParkingActionBar
        status={lot.status}
        onRoute={() => {}}
        onStart={() => {}}
        onBack={() => navigation.goBack()}
      />
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  errorWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 15,
    color: '#8B99AC',
    includeFontPadding: false,
  },

  // ── Map ──────────────────────────────────────────────────────────────────────
  scroll: {flex: 1},
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 16,
  },
  mapWrap: {
    marginHorizontal: -16,
    height: 160,
    position: 'relative',
    overflow: 'hidden',
  },
  mapGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  mapPinWrap: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    alignItems: 'center',
    marginLeft: -18,
    marginTop: -44,
  },
  mapPin: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#006CFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  mapPinText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  mapPinTail: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderTopColor: '#006CFF',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -1,
  },

  // ── Summary card ──────────────────────────────────────────────────────────
  summaryCard: {
    marginTop: -8,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    padding: 16,
    gap: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
  },
  dot: {width: 5, height: 5, borderRadius: 2.5},
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    includeFontPadding: false,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.4,
    includeFontPadding: false,
  },
  address: {
    fontSize: 13,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    overflow: 'hidden',
    marginTop: 4,
  },
  statCell: {
    width: '50%',
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
  statCellLeft: {
    borderLeftWidth: 1,
    borderLeftColor: '#E5EAF1',
  },
  statCellTop: {
    borderTopWidth: 1,
    borderTopColor: '#E5EAF1',
  },
  statLabel: {
    fontSize: 10.5,
    color: '#6B7C92',
    fontWeight: '500',
    marginBottom: 4,
    includeFontPadding: false,
  },
  statValue: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#222225',
    includeFontPadding: false,
  },

  // ── AI banner ──────────────────────────────────────────────────────────────
  aiBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  aiChip: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
    flexShrink: 0,
  },
  aiChipText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  aiTextWrap: {flex: 1, gap: 2},
  aiTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  aiSub: {
    fontSize: 11.5,
    color: '#6B7C92',
    includeFontPadding: false,
  },
  scoreCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  scoreNum: {
    fontSize: 13,
    fontWeight: '800',
    includeFontPadding: false,
  },

  // ── Soon banner ────────────────────────────────────────────────────────────
  soonBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#006CFF',
    backgroundColor: 'rgba(0,108,255,0.05)',
  },
  soonIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#006CFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  soonIcon: {fontSize: 18},
  soonTextWrap: {flex: 1},
  soonTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#006CFF',
    marginBottom: 2,
    includeFontPadding: false,
  },
  soonSub: {
    fontSize: 11.5,
    color: '#6B7C92',
    includeFontPadding: false,
  },

  // ── Photo placeholder ──────────────────────────────────────────────────────
  photoSection: {gap: 10},
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  photoList: {gap: 8},
  photoThumb: {
    width: 120,
    height: 88,
    borderRadius: 10,
    backgroundColor: '#F0F4FF',
    borderWidth: 1,
    borderColor: '#E5EAF1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoIcon: {fontSize: 28},
});
