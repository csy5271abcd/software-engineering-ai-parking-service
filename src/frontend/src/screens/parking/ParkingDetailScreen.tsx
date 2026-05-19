import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PARKING_STATUS} from '../../constants/status';
import {STATUS_DISPLAY, CONGESTION_DISPLAY} from '../../utils/parkingStatus';
import {getMockParkingLotById} from '../../mocks';
import {MapPlaceholder} from '../../components/map/MapPlaceholder';
import {ParkingMarker} from '../../components/map/ParkingMarker';
import {DetailHomeTab} from '../../components/parking/detail/DetailHomeTab';
import {DetailPricingTab} from '../../components/parking/detail/DetailPricingTab';
import {DetailCongestionTab} from '../../components/parking/detail/DetailCongestionTab';
import {DetailAroundTab} from '../../components/parking/detail/DetailAroundTab';
import {DetailReviewsTab} from '../../components/parking/detail/DetailReviewsTab';
import {DetailActionBar} from '../../components/parking/detail/DetailActionBar';
import {AppTabs} from '../../components/common/AppTabs';
import {AppIcon} from '../../components/common/AppIcon';
import {NFCScanModal} from '../../components/session/NFCScanModal';

// ── Types ────────────────────────────────────────────────────────────────────

type NavParam = {
  ParkingDetailScreen: {parkingLotId: string};
  RouteScreen: {parkingLotId: string};
  ActiveSessionScreen: {parkingLotId: string};
  PaymentScreen: {parkingLotId: string};
  PaymentResultScreen: {parkingLotId: string};
};
type DetailRoute = RouteProp<NavParam, 'ParkingDetailScreen'>;
interface Props {
  route: DetailRoute;
  navigation: StackNavigationProp<NavParam, 'ParkingDetailScreen'>;
}

const TYPE_LABEL: Record<string, string> = {
  PUBLIC: '공영',
  PRIVATE: '개인공유',
  COMMERCIAL: '상업시설',
  BUILDING: '건물',
};

type TabKey = 'home' | 'pricing' | 'congestion' | 'around' | 'reviews';
const TABS: {key: TabKey; label: string}[] = [
  {key: 'home', label: '홈'},
  {key: 'pricing', label: '요금·시간'},
  {key: 'congestion', label: '혼잡도'},
  {key: 'around', label: '주변'},
  {key: 'reviews', label: '리뷰'},
];

const HERO_H = 200;

// ── Screen ────────────────────────────────────────────────────────────────────

export function ParkingDetailScreen({route, navigation}: Props): React.JSX.Element {
  const {parkingLotId} = route.params;
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [saved, setSaved] = useState(false);
  const [showNfcModal, setShowNfcModal] = useState(false);

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

  const handleOpenDetail = (id: string) => {
    navigation.push('ParkingDetailScreen', {parkingLotId: id});
  };

  const shortName = lot.name.replace(/^가상\s*/, '').slice(0, 7);

  return (
    <View style={styles.screen}>
      {/* ── Hero map ── */}
      <View style={[styles.hero, {height: HERO_H}]}>
        <MapPlaceholder>
          {/* Green teardrop marker for this lot */}
          <ParkingMarker
            name={lot.name}
            status={lot.status}
            selected
            top="55%"
            left="48%"
            isShared={lot.type === 'PRIVATE'}
          />
        </MapPlaceholder>
        <View style={styles.heroGradientTop} />
        <View style={styles.heroGradientBottom} />

        {/* Lot name label at top-center */}
        <View style={[styles.lotNameWrap, {top: insets.top + 8}]}>
          <View style={styles.lotNamePill}>
            <Text style={styles.lotNameText} numberOfLines={1}>{shortName}</Text>
          </View>
        </View>

        {/* Back button */}
        <Pressable
          onPress={() => navigation.goBack()}
          style={[styles.heroBackBtn, {top: insets.top + 10}]}
          hitSlop={8}
        >
          <AppIcon name="chevronLeft" size={18} color="#222225" strokeWidth={2.2} />
        </Pressable>

        {/* Right buttons */}
        <View style={[styles.heroRightBtns, {top: insets.top + 10}]}>
          <Pressable style={styles.heroIconBtn} hitSlop={8}>
            <AppIcon name="share2" size={17} color="#4D5A6A" strokeWidth={2} />
          </Pressable>
          <Pressable
            style={styles.heroIconBtn}
            hitSlop={8}
            onPress={() => setSaved(v => !v)}
          >
            <AppIcon
              name="star"
              size={17}
              color={saved ? '#FFB800' : '#4D5A6A'}
              strokeWidth={2}
              fill={saved ? '#FFB800' : 'none'}
            />
          </Pressable>
        </View>
      </View>

      {/* ── Title block ── */}
      <View style={styles.titleBlock}>
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
              <Text style={[styles.badgeText, {color: '#006CFF'}]}>NFC 가능</Text>
            </View>
          )}
          <View style={[styles.badge, {backgroundColor: '#F3F3F5'}]}>
            <Text style={[styles.badgeText, {color: '#717182'}]}>
              {TYPE_LABEL[lot.type] ?? lot.type}
            </Text>
          </View>
        </View>
        <Text style={styles.name}>{lot.name}</Text>
        <Text style={styles.address} numberOfLines={1}>
          {lot.address.roadAddress}
        </Text>
      </View>

      {/* ── AppTabs (scrollable line variant) ── */}
      <AppTabs
        tabs={TABS}
        active={activeTab}
        onSelect={setActiveTab}
        variant="line"
        scrollable
      />

      {/* ── Tab content ── */}
      <View style={styles.tabContent}>
        {activeTab === 'home' && (
          <DetailHomeTab lot={lot} soonMin={soonMin} />
        )}
        {activeTab === 'pricing' && <DetailPricingTab lot={lot} />}
        {activeTab === 'congestion' && <DetailCongestionTab lot={lot} />}
        {activeTab === 'around' && (
          <DetailAroundTab lot={lot} onOpenDetail={handleOpenDetail} />
        )}
        {activeTab === 'reviews' && <DetailReviewsTab />}
      </View>

      {/* ── Bottom CTA ── */}
      <DetailActionBar
        status={lot.status}
        soonMin={soonMin}
        onRoute={() => navigation.navigate('RouteScreen', {parkingLotId})}
        onStart={() => setShowNfcModal(true)}
      />

      <NFCScanModal
        visible={showNfcModal}
        onClose={() => setShowNfcModal(false)}
        onSuccess={() => {
          setShowNfcModal(false);
          navigation.navigate('ActiveSessionScreen', {parkingLotId});
        }}
      />
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: '#FFFFFF'},

  errorWrap: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  errorText: {fontSize: 15, color: '#717182', includeFontPadding: false},

  // ── Hero
  hero: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#E5EAF1',
  },
  lotNameWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 8,
  },
  lotNamePill: {
    backgroundColor: '#222225',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    maxWidth: 140,
  },
  lotNameText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  heroGradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  heroGradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: 'rgba(255,255,255,0.92)',
  },

  // Floating buttons
  heroBackBtn: {
    position: 'absolute',
    left: 12,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EAF1',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  heroRightBtns: {
    position: 'absolute',
    right: 12,
    flexDirection: 'row',
    gap: 8,
  },
  heroIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EAF1',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  // ── Title block
  titleBlock: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 14,
    gap: 4,
    backgroundColor: '#FFFFFF',
    marginTop: -24,
    zIndex: 5,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 4,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  dot: {width: 5, height: 5, borderRadius: 2.5},
  badgeText: {
    fontSize: 10.5,
    fontWeight: '700',
    includeFontPadding: false,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.4,
    includeFontPadding: false,
    lineHeight: 28,
  },
  address: {
    fontSize: 13,
    color: '#717182',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },

  tabContent: {flex: 1},
});
