import React, {useState} from 'react';
import {View, Text, ScrollView, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ParkingCard} from '../../components/parking/ParkingCard';
import {mockParkingLots} from '../../mocks';
import type {SearchStackParamList} from '../../navigation/navigationTypes';

type FilterKey = '전체' | '즐겨찾기' | '최근';

const FILTER_TABS: {key: FilterKey; count: number}[] = [
  {key: '전체', count: 12},
  {key: '즐겨찾기', count: 5},
  {key: '최근', count: 7},
];

// First 4 lots as saved/bookmarked lots
const SAVED_IDS = ['pl-001', 'pl-002', 'pl-003', 'pl-004'];
const savedLots = mockParkingLots.filter(l => SAVED_IDS.includes(l.id));

type NavProp = StackNavigationProp<SearchStackParamList, 'SavedParkingScreen'>;

export function SavedParkingScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavProp>();
  const [activeTab, setActiveTab] = useState<FilterKey>('전체');

  const displayed =
    activeTab === '즐겨찾기'
      ? savedLots.filter(l => l.isFavorite)
      : activeTab === '최근'
      ? savedLots.slice(0, 3)
      : savedLots;

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + 8,
            paddingBottom: insets.bottom + 24,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>저장한 주차장</Text>

        {/* ── Filter tabs ── */}
        <View style={styles.tabRow}>
          {FILTER_TABS.map(tab => {
            const active = activeTab === tab.key;
            return (
              <Pressable
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                style={[styles.tab, active && styles.tabActive]}
              >
                <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
                  {tab.key}
                </Text>
                <Text style={styles.tabCount}>{tab.count}</Text>
              </Pressable>
            );
          })}
        </View>

        {/* ── Parking cards ── */}
        {displayed.length > 0 ? (
          <View style={styles.cardList}>
            {displayed.map(lot => (
              <ParkingCard
                key={lot.id}
                lot={lot}
                selected={false}
                onPress={() =>
                  navigation.navigate('ParkingDetailScreen', {
                    parkingLotId: lot.id,
                  })
                }
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>저장한 주차장이 없어요</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: '#F8F9FB'},
  scroll: {flex: 1},
  scrollContent: {paddingHorizontal: 16, gap: 0},

  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.5,
    includeFontPadding: false,
    marginBottom: 16,
    marginTop: 8,
  },

  // ── Filter tabs
  tabRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    backgroundColor: 'transparent',
    alignItems: 'center',
    gap: 2,
  },
  tabActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#006CFF',
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4D5A6A',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  tabLabelActive: {
    fontWeight: '700',
    color: '#006CFF',
  },
  tabCount: {
    fontSize: 10.5,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },

  // ── Card list
  cardList: {gap: 8},

  // ── Empty
  emptyBox: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#8B99AC',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
});
