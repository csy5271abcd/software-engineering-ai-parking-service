import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppIcon} from '../../components/common/AppIcon';
import {
  mockProviderSummary,
  mockProviderParkingSpaces,
  mockProviderTodayUsages,
} from '../../mocks/provider.mock';
import type {ProviderParkingSpace, ProviderTodayUsage} from '../../types/provider';
import type {MyPageStackParamList} from '../../navigation/navigationTypes';

type NavProp = StackNavigationProp<MyPageStackParamList, 'ProviderDashboardScreen'>;

// ── Status config ─────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  APPROVED:       {label: '승인 완료', color: '#03AA5A', bg: 'rgba(3,170,90,0.10)'},
  PENDING:        {label: '승인 대기', color: '#006CFF', bg: 'rgba(0,108,255,0.08)'},
  NEEDS_REVISION: {label: '보완 요청', color: '#F5683C', bg: 'rgba(245,104,60,0.10)'},
  REJECTED:       {label: '반려',      color: '#FB5852', bg: 'rgba(251,88,82,0.12)'},
};

// ── Sub-components ────────────────────────────────────────────────────────────

function ParkingSpaceCard({lot}: {lot: ProviderParkingSpace}): React.JSX.Element {
  const s = STATUS_CONFIG[lot.status];
  return (
    <Pressable style={styles.spaceCard}>
      <View style={styles.spaceThumb}>
        <AppIcon name="house" size={22} color="#006CFF" strokeWidth={1.8} />
      </View>
      <View style={styles.spaceBody}>
        <View style={styles.spaceNameRow}>
          <Text style={styles.spaceName} numberOfLines={1}>{lot.name}</Text>
          <View style={[styles.statusBadge, {backgroundColor: s.bg}]}>
            <Text style={[styles.statusBadgeText, {color: s.color}]}>{s.label}</Text>
          </View>
        </View>
        <Text style={styles.spaceMeta}>{lot.address} · {lot.hours}</Text>
        {lot.status === 'APPROVED' && lot.todayUses != null && (
          <View style={styles.spaceStats}>
            <Text style={styles.spaceStatText}>
              오늘 {lot.todayUses}회 · ₩{lot.todayRevenue?.toLocaleString()}
            </Text>
            <Text style={styles.spaceMonthly}>
              이번 달 ₩{lot.monthlyRevenue?.toLocaleString()}
            </Text>
          </View>
        )}
        {lot.status === 'PENDING' && (
          <Text style={styles.spacePending}>관리자 검토 중 · 보통 1-2일 소요</Text>
        )}
        {lot.status === 'NEEDS_REVISION' && lot.revisionReason != null && (
          <View style={styles.spaceRevision}>
            <AppIcon name="alertCircle" size={12} color="#F5683C" strokeWidth={2} />
            <Text style={styles.spaceRevisionText}>{lot.revisionReason}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

function TodayUsageRow({
  usage,
  isLast,
}: {
  usage: ProviderTodayUsage;
  isLast: boolean;
}): React.JSX.Element {
  return (
    <View style={[styles.usageRow, !isLast && styles.usageRowBorder]}>
      <View style={styles.usageAvatar}>
        <Text style={styles.usageAvatarText}>{usage.userName[0]}</Text>
      </View>
      <View style={styles.usageBody}>
        <Text style={styles.usageName}>{usage.userName} · {usage.duration}</Text>
        <Text style={styles.usageMeta}>{usage.time} · {usage.lotName}</Text>
      </View>
      <Text style={styles.usageFee}>+₩{usage.fee.toLocaleString()}</Text>
    </View>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────

export function ProviderDashboardScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavProp>();

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          {paddingTop: insets.top + 8, paddingBottom: insets.bottom + 32},
        ]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
            <AppIcon name="chevronLeft" size={22} color="#222225" strokeWidth={2.2} />
          </Pressable>
          <Text style={styles.headerTitle}>공급자</Text>
          <Pressable
            style={styles.addBtn}
            onPress={() => navigation.navigate('ProviderRegisterWizardScreen')}
          >
            <AppIcon name="plus" size={14} color="#FFFFFF" strokeWidth={2.5} />
            <Text style={styles.addBtnText}>주차장 등록</Text>
          </Pressable>
        </View>

        {/* ── Earnings summary ── */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>이번 달 정산 예정</Text>
          <Text style={styles.summaryAmount}>
            ₩{mockProviderSummary.monthlySettlement.toLocaleString()}
          </Text>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryStats}>
            <View style={styles.summaryStat}>
              <Text style={styles.summaryStatLabel}>이용 건수</Text>
              <Text style={styles.summaryStatValue}>{mockProviderSummary.totalUsageCount}</Text>
            </View>
            <View style={styles.summaryStatDivider} />
            <View style={styles.summaryStat}>
              <Text style={styles.summaryStatLabel}>평균 이용</Text>
              <Text style={styles.summaryStatValue}>{mockProviderSummary.avgUsageHours}</Text>
            </View>
            <View style={styles.summaryStatDivider} />
            <View style={styles.summaryStat}>
              <Text style={styles.summaryStatLabel}>활성 주차장</Text>
              <Text style={styles.summaryStatValue}>{mockProviderSummary.activeLots}</Text>
            </View>
          </View>
        </View>

        {/* ── Alert banner ── */}
        <View style={styles.alertBanner}>
          <AppIcon name="alertCircle" size={16} color="#F5683C" strokeWidth={2.2} />
          <Text style={styles.alertText}>
            <Text style={styles.alertBold}>1건의 보완 요청</Text>
            {'이 있어요. 상가 지하 주차장에 입구 사진을 추가해 주세요.'}
          </Text>
        </View>

        {/* ── Parking spaces ── */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>등록한 주차 공간</Text>
          <Pressable style={styles.filterBtn}>
            <Text style={styles.filterBtnText}>필터</Text>
            <AppIcon name="chevronRight" size={12} color="#6B7C92" strokeWidth={2} />
          </Pressable>
        </View>
        <View style={styles.spaceList}>
          {mockProviderParkingSpaces.map(lot => (
            <ParkingSpaceCard key={lot.id} lot={lot} />
          ))}
        </View>

        {/* ── Today's usage ── */}
        <Text style={[styles.sectionTitle, styles.sectionTitleMargin]}>오늘의 이용 현황</Text>
        <View style={styles.usageCard}>
          {mockProviderTodayUsages.map((u, i) => (
            <TodayUsageRow
              key={u.id}
              usage={u}
              isLast={i === mockProviderTodayUsages.length - 1}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: '#F8F9FB'},
  scroll: {flex: 1},
  scrollContent: {paddingHorizontal: 16, gap: 0},

  // ── Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    marginTop: 8,
  },
  backBtn: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.5,
    includeFontPadding: false,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#006CFF',
    borderRadius: 100,
    paddingHorizontal: 14,
    paddingVertical: 9,
    flexShrink: 0,
  },
  addBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    includeFontPadding: false,
    letterSpacing: -0.2,
  },

  // ── Summary card
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EAF1',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: '#222225',
    letterSpacing: -0.8,
    includeFontPadding: false,
    marginBottom: 14,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#F2F4F7',
    marginBottom: 12,
  },
  summaryStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryStat: {flex: 1, gap: 3},
  summaryStatDivider: {width: 1, height: 32, backgroundColor: '#E5EAF1'},
  summaryStatLabel: {
    fontSize: 10.5,
    fontWeight: '500',
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  summaryStatValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },

  // ── Alert banner
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 12,
    backgroundColor: 'rgba(245,104,60,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(245,104,60,0.20)',
    borderRadius: 10,
    marginBottom: 20,
  },
  alertText: {
    flex: 1,
    fontSize: 12.5,
    color: '#4D5A6A',
    lineHeight: 18,
    letterSpacing: -0.2,
    includeFontPadding: false,
    marginTop: 1,
  },
  alertBold: {
    fontWeight: '700',
    color: '#F5683C',
  },

  // ── Section
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  sectionTitleMargin: {marginTop: 24, marginBottom: 10},
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  filterBtnText: {
    fontSize: 13,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },

  // ── Space list
  spaceList: {gap: 8, marginBottom: 4},
  spaceCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EAF1',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
  },
  spaceThumb: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#EEF4FF',
    borderWidth: 1,
    borderColor: '#E5EAF1',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  spaceBody: {flex: 1, minWidth: 0, gap: 4},
  spaceNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  spaceName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  statusBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusBadgeText: {
    fontSize: 10.5,
    fontWeight: '700',
    includeFontPadding: false,
    letterSpacing: -0.2,
  },
  spaceMeta: {
    fontSize: 11.5,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  spaceStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  spaceStatText: {
    fontSize: 11.5,
    color: '#4D5A6A',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  spaceMonthly: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#03AA5A',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  spacePending: {
    fontSize: 11.5,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  spaceRevision: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  spaceRevisionText: {
    fontSize: 11.5,
    color: '#F5683C',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },

  // ── Usage card
  usageCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EAF1',
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  usageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
  },
  usageRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F2F4F7',
  },
  usageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,108,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  usageAvatarText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#006CFF',
    includeFontPadding: false,
  },
  usageBody: {flex: 1, minWidth: 0, gap: 2},
  usageName: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#222225',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  usageMeta: {
    fontSize: 10.5,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  usageFee: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#03AA5A',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
});
