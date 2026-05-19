import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {RecommendStackParamList} from '../../navigation/navigationTypes';
import {mockParkingLots} from '../../mocks';
import {PARKING_STATUS} from '../../constants/status';
import {AppSectionHeader} from '../../components/common/AppSectionHeader';
import {AppChip} from '../../components/common/AppChip';
import {AppCard} from '../../components/common/AppCard';
import {AppBadge} from '../../components/common/AppBadge';
import {AppButton} from '../../components/common/AppButton';
import {AppSurface} from '../../components/common/AppSurface';
import {AppSeparator} from '../../components/common/AppSeparator';
import {ParkingCard} from '../../components/parking/ParkingCard';
import {AppIcon} from '../../components/common/AppIcon';
import type {AppIconName} from '../../components/common/AppIcon';

type NavProp = StackNavigationProp<RecommendStackParamList, 'RecommendationScreen'>;

type SituationKey = '지금' | '출근' | '쇼핑' | '외식' | '병원';

const SITUATIONS: {k: SituationKey; emoji: string}[] = [
  {k: '지금', emoji: '⚡'},
  {k: '출근', emoji: '💼'},
  {k: '쇼핑', emoji: '🛍'},
  {k: '외식', emoji: '🍽'},
  {k: '병원', emoji: '🏥'},
];

function sortBySituation(situation: SituationKey) {
  const arr = [...mockParkingLots];
  switch (situation) {
    case '출근':
    case '병원':
      return arr.sort((a, b) => a.distanceMeters - b.distanceMeters);
    case '쇼핑':
      return arr.sort((a, b) => b.availableCount - a.availableCount);
    case '외식':
      return arr.sort((a, b) => a.pricePerHour - b.pricePerHour);
    default:
      return arr.sort((a, b) => b.recommendationScore - a.recommendationScore);
  }
}

const REASON_CHIPS: {icon: AppIconName; label: string}[] = [
  {icon: 'car', label: '도보 3분 이내'},
  {icon: 'circleDollarSign', label: '시간당 저렴'},
  {icon: 'sparkles', label: 'AI 추천 1위'},
];

export function RecommendationScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavProp>();
  const [situation, setSituation] = useState<SituationKey>('지금');

  const aiLots = sortBySituation(situation).slice(0, 3);
  const soonLots = mockParkingLots
    .filter(l => l.status === PARKING_STATUS.SOON_AVAILABLE)
    .slice(0, 3);

  const navigateToDetail = (id: string) => {
    (navigation as any).navigate('ParkingTab', {
      screen: 'ParkingDetailScreen',
      params: {parkingLotId: id},
    });
  };

  const goSearch = () => {
    navigation.dispatch(CommonActions.navigate({name: 'SearchTab'}));
  };

  return (
    <View style={styles.screen}>
      {/* ── Header ── */}
      <View style={[styles.header, {paddingTop: insets.top + 12}]}>
        <Text style={styles.headerTitle}>추천</Text>
        <Text style={styles.headerSub}>지금 주변 최적 주차장을 분석했어요</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          {paddingBottom: insets.bottom + 24},
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── 상황별 chips ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.situRow}
        >
          {SITUATIONS.map(s => (
            <AppChip
              key={s.k}
              label={`${s.emoji} ${s.k}`}
              active={situation === s.k}
              onPress={() => setSituation(s.k)}
            />
          ))}
        </ScrollView>

        {/* ── AI 배너 ── */}
        <AppSurface variant="success" style={styles.aiBanner}>
          <AppBadge label="AI" variant="ai" style={styles.aiPill} />
          <Text style={styles.aiBannerText}>
            <Text style={styles.aiBannerBold}>{situation} 기준</Text>
            {' 혼잡도·도보거리·요금을 분석해 추천해요'}
          </Text>
        </AppSurface>

        {/* ── AI 추천 주차장 ── */}
        <AppSectionHeader title="AI 추천 주차장" />
        <View style={styles.cardList}>
          {aiLots.map((lot, idx) => (
            <ParkingCard
              key={lot.id}
              lot={lot}
              rank={idx + 1}
              selected={false}
              onPress={() => navigateToDetail(lot.id)}
              onPressDetail={() => navigateToDetail(lot.id)}
            />
          ))}
        </View>

        {/* ── 추천 이유 chips ── */}
        <View style={styles.reasonRow}>
          {REASON_CHIPS.map(r => (
            <View key={r.label} style={styles.reasonChip}>
              <AppIcon name={r.icon} size={12} color="#717182" strokeWidth={1.8} />
              <Text style={styles.reasonText}>{r.label}</Text>
            </View>
          ))}
        </View>

        <AppSeparator style={styles.sep} />

        {/* ── 곧 비워질 자리 ── */}
        {soonLots.length > 0 && (
          <>
            <AppSectionHeader
              title="곧 비워질 자리"
              sub={`${soonLots.length}곳`}
            />
            <View style={styles.cardList}>
              {soonLots.map(lot => (
                <ParkingCard
                  key={lot.id}
                  lot={lot}
                  selected={false}
                  onPress={() => navigateToDetail(lot.id)}
                  onPressDetail={() => navigateToDetail(lot.id)}
                />
              ))}
            </View>
          </>
        )}

        {/* ── 목적지 주차 찾기 CTA ── */}
        <AppCard style={styles.ctaCard} padding="md" radius="xl" elevation>
          <View style={styles.ctaRow}>
            <View style={styles.ctaIconWrap}>
              <AppIcon name="mapPin" size={20} color="#006CFF" strokeWidth={2} />
            </View>
            <View style={styles.ctaBody}>
              <Text style={styles.ctaTitle}>목적지 주차 찾기</Text>
              <Text style={styles.ctaSub}>목적지 근처 최적 주차장을 찾아드려요</Text>
            </View>
            <AppButton
              label="검색"
              variant="primary"
              size="sm"
              onPress={goSearch}
              rightIcon="search"
            />
          </View>
        </AppCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: '#FFFFFF'},

  // ── Header
  header: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5EAF1',
    backgroundColor: '#FFFFFF',
    gap: 2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.5,
    includeFontPadding: false,
  },
  headerSub: {
    fontSize: 13,
    color: '#717182',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },

  scroll: {flex: 1},
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 14,
  },

  situRow: {gap: 8, paddingBottom: 2},

  // ── AI banner
  aiBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 10,
  },
  aiPill: {flexShrink: 0},
  aiBannerText: {
    flex: 1,
    fontSize: 12.5,
    color: '#4D5A6A',
    lineHeight: 18,
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  aiBannerBold: {fontWeight: '700', color: '#222225'},

  cardList: {gap: 8},

  // ── Reason chips
  reasonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: -6,
  },
  reasonChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 9999,
    backgroundColor: '#F3F3F5',
    borderWidth: 1,
    borderColor: '#E5EAF1',
  },
  reasonText: {
    fontSize: 11.5,
    fontWeight: '500',
    color: '#717182',
    includeFontPadding: false,
    letterSpacing: -0.2,
  },

  sep: {marginVertical: 4},

  // ── CTA
  ctaCard: {
    borderColor: 'rgba(0,108,255,0.18)',
    backgroundColor: '#F0F7FF',
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ctaIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,108,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  ctaBody: {flex: 1, gap: 2},
  ctaTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#006CFF',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  ctaSub: {
    fontSize: 11.5,
    color: '#4D5A6A',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
});
