import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, DeviceEventEmitter} from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {HomeStackParamList} from '../../navigation/navigationTypes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MapPlaceholder} from '../../components/map/MapPlaceholder';
import {ParkingMarker} from '../../components/map/ParkingMarker';
import {SmartNaverMapView} from '../../components/map/SmartNaverMapView';
import type {SmartNaverMapViewRef} from '../../components/map/SmartNaverMapView';
import {SearchBar} from '../../components/common/SearchBar';
import {CategoryChips} from '../../components/home/CategoryChips';
import type {CategoryId} from '../../components/home/CategoryChips';
import {FABStack} from '../../components/home/FABStack';
import {CurrentLocationButton} from '../../components/home/CurrentLocationButton';
import {FloatingButton} from '../../components/common/FloatingButton';
import {AppIcon} from '../../components/common/AppIcon';
import {
  ParkingBottomSheet,
  SHEET_SNAP,
} from '../../components/parking/ParkingBottomSheet';
import type {SheetMode} from '../../components/parking/ParkingBottomSheet';
import {mockParkingLots} from '../../mocks';
import {PARKING_STATUS} from '../../constants/status';
import type {ParkingLotDetail} from '../../types/parking';

// ── Coordinate projection ─────────────────────────────────────────────────────

const LAT_MAX = 37.57;
const LAT_MIN = 37.45;
const LON_MIN = 126.90;
const LON_MAX = 127.12;

function toMapPos(
  lat: number,
  lon: number,
): {top: `${number}%`; left: `${number}%`} {
  const t = Math.round(
    Math.max(5, Math.min(85, ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * 80 + 5)),
  );
  const l = Math.round(
    Math.max(5, Math.min(90, ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * 85 + 5)),
  );
  return {top: `${t}%`, left: `${l}%`};
}

// ── Category filtering ────────────────────────────────────────────────────────

function filterLots(
  lots: readonly ParkingLotDetail[],
  category: CategoryId,
): readonly ParkingLotDetail[] {
  switch (category) {
    case 'available':
      return lots.filter(l => l.status === PARKING_STATUS.AVAILABLE);
    case 'soon':
      return lots.filter(l => l.status === PARKING_STATUS.SOON_AVAILABLE);
    case 'cheap':
      return lots.filter(l => l.pricePerHour <= 2500);
    case 'nfc':
      return lots.filter(l => (l.tags as string[]).includes('NFC'));
    case 'shared':
      return lots.filter(l => l.type === 'PRIVATE');
    case 'public':
      return lots.filter(l => l.type === 'PUBLIC');
    case '24h':
      return lots.filter(
        l =>
          l.operationHours.isAllDay ||
          (l.tags as string[]).includes('24시간'),
      );
    default:
      return lots;
  }
}

// ── Weather badge ─────────────────────────────────────────────────────────────

function HomeWeatherBadge({top}: {top: number}): React.JSX.Element {
  return (
    <View style={[styles.weatherBadge, {top}]}>
      <AppIcon name="cloud" size={18} color="#8B99AC" strokeWidth={1.5} />
      <Text style={styles.weatherTemp}>20°</Text>
      <Text style={styles.weatherSub}>미세</Text>
    </View>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────

const ENABLE_NAVER_MAP = true;

type HomeNavProp = StackNavigationProp<HomeStackParamList, 'HomeMapScreen'>;

export function HomeMapScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<HomeNavProp>();
  const naverMapRef = useRef<SmartNaverMapViewRef>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [category, setCategory] = useState<CategoryId>('all');
  const [sheetMode, setSheetMode] = useState<SheetMode>('default');

  useEffect(() => {
    const sub = DeviceEventEmitter.addListener('HOME_TAB_PRESS', () => {
      setSheetMode('default');
    });
    return () => sub.remove();
  }, []);

  const filteredLots = filterLots(mockParkingLots, category);
  const selectedLot = mockParkingLots.find(l => l.id === selectedId) ?? null;

  const handleMarkerPress = (id: string) => {
    const newId = selectedId === id ? null : id;
    setSelectedId(newId);
    if (newId) {
      setSheetMode('half');
    }
  };

  const handleCategorySelect = (id: CategoryId) => {
    setCategory(id);
    setSelectedId(null);
    setSheetMode('default');
  };

  const handleSearchPress = () => {
    navigation.navigate('DestinationSearchScreen');
  };

  const handlePressSoon = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'ParkingTab',
        params: {screen: 'SoonAvailableScreen'},
      }),
    );
  };

  // ── Layout constants
  // zIndex: map(0) → markers(10/20) → chips(29) → search(30) → navFab(31) → weather(32) → fabStack(35) → locFab(36) → sheet(40) → tabBar(50)
  const searchBarTop = insets.top + 8;
  const chipsTop = insets.top + 62;
  const fabStackTop = insets.top + 116;
  const weatherBadgeTop = fabStackTop;
  const locFabBottom = SHEET_SNAP[sheetMode] + 14;

  return (
    <View style={styles.container}>
      {/* ── Map layer ── */}
      {ENABLE_NAVER_MAP ? (
        <SmartNaverMapView
          ref={naverMapRef}
          parkingLots={filteredLots}
          selectedParkingLotId={selectedId}
          onPressParkingLot={handleMarkerPress}
        />
      ) : (
        <MapPlaceholder>
          {filteredLots.map(lot => {
            const pos = toMapPos(
              lot.coordinates.latitude,
              lot.coordinates.longitude,
            );
            const soonMin =
              lot.status === PARKING_STATUS.SOON_AVAILABLE && lot.expectedExitAt
                ? Math.max(
                    1,
                    Math.round(
                      (new Date(lot.expectedExitAt).getTime() - Date.now()) /
                        60000,
                    ),
                  )
                : null;
            const isShared = lot.type === 'PRIVATE';
            return (
              <ParkingMarker
                key={lot.id}
                name={lot.name}
                status={lot.status}
                selected={selectedId === lot.id}
                top={pos.top}
                left={pos.left}
                soonMin={soonMin}
                isShared={isShared}
                onPress={() => handleMarkerPress(lot.id)}
              />
            );
          })}
        </MapPlaceholder>
      )}

      {/* ── Search bar — zIndex 30, right:68 leaves room for blue FAB ── */}
      <SearchBar
        style={[styles.searchBar, {top: searchBarTop}]}
        onPress={handleSearchPress}
      />

      {/* ── Blue nav FAB right of SearchBar — zIndex 31 ── */}
      <FloatingButton
        variant="primary"
        onPress={handleSearchPress}
        size={44}
        style={[styles.navFab, {top: searchBarTop + 2}]}
      >
        <AppIcon name="chevronRight" size={20} color="#FFFFFF" strokeWidth={2.5} />
      </FloatingButton>

      {/* ── Category chips — zIndex 29 ── */}
      <CategoryChips
        active={category}
        onSelect={handleCategorySelect}
        style={[styles.chips, {top: chipsTop}]}
      />

      {/* ── Weather badge — left side ── */}
      <HomeWeatherBadge top={weatherBadgeTop} />

      {/* ── FAB stack (right side) — zIndex 35 ── */}
      <FABStack style={{top: fabStackTop}} />

      {/* ── Current location FAB — zIndex 36, floats above sheet ── */}
      <CurrentLocationButton
        bottom={locFabBottom}
        onPress={() => naverMapRef.current?.moveToCurrentLocation()}
      />

      {/* ── Bottom sheet — zIndex 40 ── */}
      <ParkingBottomSheet
        lots={filteredLots}
        selectedLot={selectedLot}
        onSelectLot={id => {
          setSelectedId(id);
          if (id !== null) {
            setSheetMode('half');
          }
        }}
        onOpenDetail={id =>
          navigation.navigate('ParkingDetailScreen', {parkingLotId: id})
        }
        onPressSoon={handlePressSoon}
        mode={sheetMode}
        onModeChange={setSheetMode}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  searchBar: {
    position: 'absolute',
    left: 12,
    right: 68,
    zIndex: 30,
  },
  navFab: {
    position: 'absolute',
    right: 12,
    zIndex: 31,
  },
  chips: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 29,
  },
  weatherBadge: {
    position: 'absolute',
    left: 12,
    zIndex: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.10,
    shadowRadius: 6,
    minWidth: 48,
  },
  weatherTemp: {
    fontSize: 13,
    fontWeight: '700',
    color: '#222225',
    includeFontPadding: false,
    letterSpacing: -0.3,
  },
  weatherSub: {
    fontSize: 10,
    color: '#8B99AC',
    fontWeight: '500',
    includeFontPadding: false,
  },
});
