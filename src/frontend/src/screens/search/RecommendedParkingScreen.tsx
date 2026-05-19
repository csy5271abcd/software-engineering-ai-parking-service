import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RouteProp} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {SearchStackParamList} from '../../navigation/navigationTypes';
import {mockParkingLots} from '../../mocks';
import {ParkingCard} from '../../components/parking/ParkingCard';
import {ArrivalTimeSelector} from '../../components/search/ArrivalTimeSelector';
import type {ArrivalTime} from '../../components/search/ArrivalTimeSelector';
import {SectionHeader} from '../../components/parking/SectionHeader';

type NavProp = StackNavigationProp<SearchStackParamList, 'RecommendedParkingScreen'>;
type RoutePropType = RouteProp<SearchStackParamList, 'RecommendedParkingScreen'>;

type SortKey = 'ai' | 'dist' | 'price' | 'cong';

const SORT_CHIPS: {k: SortKey; label: string}[] = [
  {k: 'ai', label: 'AI 추천'},
  {k: 'dist', label: '거리순'},
  {k: 'price', label: '요금순'},
  {k: 'cong', label: '여유순'},
];

function sortLots(
  lots: typeof mockParkingLots,
  key: SortKey,
): typeof mockParkingLots {
  const arr = [...lots];
  switch (key) {
    case 'ai':
      return arr.sort((a, b) => b.recommendationScore - a.recommendationScore);
    case 'dist':
      return arr.sort((a, b) => a.distanceMeters - b.distanceMeters);
    case 'price':
      return arr.sort((a, b) => a.pricePerHour - b.pricePerHour);
    case 'cong':
      return arr.sort((a, b) => a.availableCount - b.availableCount);
    default:
      return arr;
  }
}

export function RecommendedParkingScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RoutePropType>();

  const {destinationName, destinationSub} = route.params;
  const [arrivalTime, setArrivalTime] = useState<ArrivalTime>('지금');
  const [sortKey, setSortKey] = useState<SortKey>('ai');

  const sorted = sortLots(mockParkingLots, sortKey);

  const navigateToDetail = (parkingLotId: string) => {
    navigation.navigate('RecommendedParkingScreen', {
      destinationName,
      destinationSub,
    });
    // Navigate to detail via parent navigator
    (navigation as any).navigate('ParkingTab', {
      screen: 'ParkingDetailScreen',
      params: {parkingLotId},
    });
  };

  return (
    <View style={styles.screen}>
      {/* ── Header ── */}
      <View style={[styles.header, {paddingTop: insets.top + 10}]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <View style={styles.chevronLeft} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {destinationName}
        </Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          {paddingBottom: insets.bottom + 20},
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Destination card */}
        <View style={styles.destCard}>
          <View style={styles.destIconCircle}>
            <View style={styles.destPinIcon}>
              <View style={styles.destPinDot} />
            </View>
          </View>
          <View style={styles.destBody}>
            <Text style={styles.destLabel}>도착</Text>
            <Text style={styles.destName} numberOfLines={1}>
              {destinationName}
            </Text>
            {destinationSub != null && (
              <Text style={styles.destSub} numberOfLines={1}>
                {destinationSub}
              </Text>
            )}
          </View>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.destClose}
            hitSlop={8}
          >
            <Text style={styles.destCloseText}>✕</Text>
          </Pressable>
          <ArrivalTimeSelector value={arrivalTime} onChange={setArrivalTime} />
        </View>

        {/* AI banner */}
        <View style={styles.aiBanner}>
          <View style={styles.aiChip}>
            <Text style={styles.aiChipText}>AI</Text>
          </View>
          <Text style={styles.aiText}>
            <Text style={styles.aiTextBold}>{arrivalTime}</Text>
            {' 기준 혼잡도·도보거리·요금을 분석해 정렬했어요'}
          </Text>
        </View>

        {/* Sort chips */}
        <View style={styles.sortRow}>
          {SORT_CHIPS.map(c => {
            const active = sortKey === c.k;
            return (
              <Pressable
                key={c.k}
                onPress={() => setSortKey(c.k)}
                style={[styles.sortChip, active && styles.sortChipActive]}
              >
                <Text
                  style={[
                    styles.sortChipText,
                    active && styles.sortChipTextActive,
                  ]}
                >
                  {c.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <SectionHeader title="추천 주차장" sub={`${sorted.length}곳`} />
        <View style={styles.cardList}>
          {sorted.map((lot, idx) => (
            <ParkingCard
              key={lot.id}
              lot={lot}
              rank={idx < 3 ? idx + 1 : undefined}
              selected={false}
              onPress={() => navigateToDetail(lot.id)}
              onPressDetail={() => navigateToDetail(lot.id)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: '#FFFFFF'},

  // ── Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5EAF1',
    backgroundColor: '#FFFFFF',
    gap: 4,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  chevronLeft: {
    width: 9,
    height: 9,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#222225',
    transform: [{rotate: '45deg'}],
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  headerRight: {width: 36},

  scroll: {flex: 1},
  scrollContent: {
    padding: 16,
    gap: 12,
  },

  // ── Destination card
  destCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EAF1',
    borderRadius: 14,
    padding: 14,
  },
  destIconCircle: {
    position: 'absolute',
    top: 14,
    left: 14,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(251,88,82,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  destPinIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#FB5852',
    alignItems: 'center',
    justifyContent: 'center',
  },
  destPinDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#FB5852',
  },
  destBody: {
    marginLeft: 52,
    marginRight: 36,
    gap: 2,
  },
  destLabel: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#FB5852',
    letterSpacing: 0.5,
    includeFontPadding: false,
  },
  destName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  destSub: {
    fontSize: 11.5,
    color: '#8B99AC',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  destClose: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F8F9FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  destCloseText: {
    fontSize: 12,
    color: '#6B7C92',
    includeFontPadding: false,
  },

  // ── AI banner
  aiBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: 'rgba(3,170,90,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(3,170,90,0.20)',
    borderRadius: 10,
  },
  aiChip: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#03AA5A',
    flexShrink: 0,
  },
  aiChipText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  aiText: {
    flex: 1,
    fontSize: 12,
    color: '#4D5A6A',
    lineHeight: 17,
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  aiTextBold: {fontWeight: '700', color: '#222225'},

  // ── Sort chips
  sortRow: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  sortChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#CAD1DB',
    backgroundColor: '#FFFFFF',
  },
  sortChipActive: {backgroundColor: '#222225', borderColor: '#222225'},
  sortChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4D5A6A',
    includeFontPadding: false,
  },
  sortChipTextActive: {color: '#FFFFFF'},

  cardList: {gap: 8},
});
