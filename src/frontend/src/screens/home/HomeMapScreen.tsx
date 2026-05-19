import React, {useState, useEffect} from 'react';
import {View, StyleSheet, DeviceEventEmitter} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {HomeStackParamList} from '../../navigation/navigationTypes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MapPlaceholder} from '../../components/map/MapPlaceholder';
import {ParkingMarker} from '../../components/map/ParkingMarker';
import {SearchBar} from '../../components/common/SearchBar';
import {CategoryChips} from '../../components/home/CategoryChips';
import type {CategoryId} from '../../components/home/CategoryChips';
import {FABStack} from '../../components/home/FABStack';
import {CurrentLocationButton} from '../../components/home/CurrentLocationButton';
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

// ── Screen ────────────────────────────────────────────────────────────────────

type HomeNavProp = StackNavigationProp<HomeStackParamList, 'HomeMapScreen'>;

export function HomeMapScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<HomeNavProp>();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [category, setCategory] = useState<CategoryId>('all');
  const [sheetMode, setSheetMode] = useState<SheetMode>('default');

  // Reset sheet to default when "주변" tab is pressed
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
    if (newId && sheetMode === 'hidden') {
      setSheetMode('default');
    }
  };

  const handleCategorySelect = (id: CategoryId) => {
    setCategory(id);
    setSelectedId(null);
    setSheetMode('default');
  };

  // ── Layout constants ──────────────────────────────────────────────────────
  // zIndex: map(0) → markers(10/20) → chips(29) → search(30) → fabStack(35) → locFab(36) → sheet(40) → tabBar(50)
  const searchBarTop = insets.top + 8;
  const chipsTop = insets.top + 60;
  const fabStackTop = insets.top + 112;
  const locFabBottom = SHEET_SNAP[sheetMode] + 14;

  return (
    <View style={styles.container}>
      {/* ── Map layer ── */}
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
          return (
            <ParkingMarker
              key={lot.id}
              name={lot.name}
              status={lot.status}
              selected={selectedId === lot.id}
              top={pos.top}
              left={pos.left}
              soonMin={soonMin}
              onPress={() => handleMarkerPress(lot.id)}
            />
          );
        })}
      </MapPlaceholder>

      {/* ── Search bar — zIndex 30 ── */}
      <SearchBar
        style={[styles.searchBar, {top: searchBarTop}]}
      />

      {/* ── Category chips — zIndex 29 ── */}
      <CategoryChips
        active={category}
        onSelect={handleCategorySelect}
        style={[styles.chips, {top: chipsTop}]}
      />

      {/* ── FAB stack (right side) — zIndex 35 ── */}
      <FABStack style={{top: fabStackTop}} />

      {/* ── Current location FAB — zIndex 36, floats above sheet ── */}
      <CurrentLocationButton bottom={locFabBottom} />

      {/* ── Bottom sheet — zIndex 40 ── */}
      <ParkingBottomSheet
        lots={filteredLots}
        selectedLot={selectedLot}
        onSelectLot={id => setSelectedId(id)}
        onOpenDetail={id =>
          navigation.navigate('ParkingDetailScreen', {parkingLotId: id})
        }
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
    right: 12,
    zIndex: 30,
  },
  chips: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 29,
  },
});
