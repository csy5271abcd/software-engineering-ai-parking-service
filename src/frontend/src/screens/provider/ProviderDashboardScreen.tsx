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
import type {MyPageStackParamList} from '../../navigation/navigationTypes';
import {ProviderParkingSpaceCard} from '../../components/provider/ProviderParkingSpaceCard';
import {ProviderTodayUsageRow} from '../../components/provider/ProviderTodayUsageRow';

type NavProp = StackNavigationProp<MyPageStackParamList, 'ProviderDashboardScreen'>;

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
            <ProviderParkingSpaceCard key={lot.id} lot={lot} />
          ))}
        </View>

        {/* ── Today's usage ── */}
        <Text style={[styles.sectionTitle, styles.sectionTitleMargin]}>오늘의 이용 현황</Text>
        <View style={styles.usageCard}>
          {mockProviderTodayUsages.map((u, i) => (
            <ProviderTodayUsageRow
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

  // ── Usage card
  usageCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EAF1',
    borderRadius: 12,
    paddingHorizontal: 14,
  },
});
