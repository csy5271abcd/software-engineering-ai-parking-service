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
import {SearchHeader} from '../../components/search/SearchHeader';
import {ArrivalTimeSelector} from '../../components/search/ArrivalTimeSelector';
import type {ArrivalTime} from '../../components/search/ArrivalTimeSelector';
import {ParkingCard} from '../../components/parking/ParkingCard';
import {SectionHeader} from '../../components/parking/SectionHeader';
import {AppIcon} from '../../components/common/AppIcon';
import {mockParkingLots} from '../../mocks';

// Self-contained NavParam — works in HomeStack or SearchStack
type NavParam = {
  RecommendedParkingScreen: {destinationName: string; destinationSub?: string};
  DestinationSearchScreen: undefined;
  ParkingDetailScreen: {parkingLotId: string};
};
type NavProp = StackNavigationProp<NavParam, 'RecommendedParkingScreen'>;
type RoutePropType = RouteProp<NavParam, 'RecommendedParkingScreen'>;

const sorted = [...mockParkingLots].sort(
  (a, b) => b.recommendationScore - a.recommendationScore,
);

export function RecommendedParkingScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RoutePropType>();

  const {destinationName, destinationSub} = route.params;
  const [arrivalTime, setArrivalTime] = useState<ArrivalTime>('지금');

  return (
    <View style={styles.screen}>
      {/* ── Header (same search bar style as DestinationSearchScreen) ── */}
      <SearchHeader
        onBack={() => navigation.goBack()}
        paddingTop={insets.top + 10}
        editable={false}
        onInputPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          {paddingBottom: insets.bottom + 24},
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── 선택 목적지 카드 ── */}
        <View style={styles.destCard}>
          <View style={styles.destIconCircle}>
            <AppIcon name="mapPin" size={20} color="#FB5852" strokeWidth={2} />
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
            <AppIcon name="x" size={12} color="#6B7C92" strokeWidth={2.2} />
          </Pressable>

          {/* 도착 예정 chip 영역 */}
          <ArrivalTimeSelector value={arrivalTime} onChange={setArrivalTime} />
        </View>

        {/* ── AI 안내 배너 ── */}
        <View style={styles.aiBanner}>
          <View style={styles.aiChip}>
            <Text style={styles.aiChipText}>AI</Text>
          </View>
          <Text style={styles.aiText}>
            <Text style={styles.aiTextBold}>{arrivalTime}</Text>
            {' 기준 혼잡도·도보거리·요금을 분석해 정렬했어요'}
          </Text>
        </View>

        {/* ── 추천 주차장 ── */}
        <SectionHeader title="추천 주차장" sub={`${sorted.length}곳`} />
        <View style={styles.cardList}>
          {sorted.map((lot, idx) => (
            <ParkingCard
              key={lot.id}
              lot={lot}
              rank={idx < 4 ? idx + 1 : undefined}
              selected={false}
              onPress={() =>
                navigation.navigate('ParkingDetailScreen', {
                  parkingLotId: lot.id,
                })
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: '#FFFFFF'},

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

  cardList: {gap: 8},
});
