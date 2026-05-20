import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {mockUsageHistory} from '../../mocks';
import type {UsageHistoryItem} from '../../types/history';
import {HistoryCard} from '../../components/history/HistoryCard';

type FilterKey = '전체' | '결제완료' | '확인필요' | '환불' | '이번 달' | '지난달';

const FILTER_CHIPS: FilterKey[] = [
  '전체', '결제완료', '확인필요', '환불', '이번 달', '지난달',
];

const STATS = [
  {label: '이번 달', value: '12', sub: '회 이용'},
  {label: '결제 총액', value: '₩48k', sub: '5월'},
  {label: '평균 시간', value: '1.4', sub: '시간'},
];

function filterItems(
  items: UsageHistoryItem[],
  key: FilterKey,
): UsageHistoryItem[] {
  switch (key) {
    case '결제완료':
      return items.filter(i => i.status === 'PAID');
    case '확인필요':
      return items.filter(i => i.status === 'NEEDS_CONFIRMATION');
    case '환불':
      return items.filter(i => i.status === 'REFUNDED');
    case '지난달':
      return [];
    default:
      return items;
  }
}


export function UsedHistoryScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<FilterKey>('전체');
  const filtered = filterItems(mockUsageHistory, activeFilter);

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
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.pageTitle}>이용 내역</Text>

        {/* ── Stats grid ── */}
        <View style={styles.statsGrid}>
          {STATS.map((s, i) => (
            <View
              key={s.label}
              style={[styles.statCard, i > 0 && styles.statCardBorder]}
            >
              <Text style={styles.statLabel}>{s.label}</Text>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statSub}>{s.sub}</Text>
            </View>
          ))}
        </View>

        {/* ── Filter chips ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}
          style={styles.chipsScroll}
        >
          {FILTER_CHIPS.map(chip => {
            const active = activeFilter === chip;
            return (
              <Pressable
                key={chip}
                onPress={() => setActiveFilter(chip)}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {chip}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* ── History cards ── */}
        {filtered.length > 0 ? (
          <View style={styles.cardList}>
            {filtered.map(item => (
              <HistoryCard key={item.id} item={item} />
            ))}
          </View>
        ) : (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>이용 내역이 없어요</Text>
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

  // ── Stats grid
  statsGrid: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EAF1',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 18,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
  statCardBorder: {
    borderLeftWidth: 1,
    borderLeftColor: '#E5EAF1',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#222225',
    letterSpacing: -0.5,
    includeFontPadding: false,
    lineHeight: 26,
  },
  statSub: {
    fontSize: 10.5,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
    marginTop: 4,
  },

  // ── Filter chips
  chipsScroll: {marginBottom: 14},
  chipsRow: {gap: 6, paddingRight: 4},
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#CAD1DB',
    backgroundColor: '#FFFFFF',
  },
  chipActive: {
    backgroundColor: '#222225',
    borderColor: '#222225',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4D5A6A',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  chipTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
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
