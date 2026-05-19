import React, {useState} from 'react';
import {View, Text, ScrollView, Pressable, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MapPlaceholder} from '../../components/map/MapPlaceholder';
import {ParkingMarker} from '../../components/map/ParkingMarker';
import {SearchBar} from '../../components/common/SearchBar';
import {FloatingButton} from '../../components/common/FloatingButton';
import {
  ParkingBottomSheet,
  SHEET_HEIGHTS,
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

// ── Category chips ────────────────────────────────────────────────────────────

const CATEGORIES = [
  {id: 'all',       label: '전체'},
  {id: 'available', label: '이용가능'},
  {id: 'soon',      label: '곧 비워짐'},
  {id: 'cheap',     label: '저렴'},
  {id: 'nfc',       label: 'NFC'},
  {id: 'shared',    label: '개인공유'},
  {id: 'public',    label: '공영'},
  {id: '24h',       label: '24시간'},
] as const;

type CategoryId = (typeof CATEGORIES)[number]['id'];

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

function CategoryChips({
  active,
  onSelect,
  style,
}: {
  active: CategoryId;
  onSelect: (id: CategoryId) => void;
  style?: object;
}): React.JSX.Element {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={chipStyles.content}
      style={[chipStyles.scroll, style]}
    >
      {CATEGORIES.map(cat => {
        const isActive = cat.id === active;
        return (
          <Pressable
            key={cat.id}
            onPress={() => onSelect(cat.id)}
            style={[chipStyles.chip, isActive && chipStyles.chipActive]}
          >
            <Text
              style={[
                chipStyles.label,
                isActive && chipStyles.labelActive,
              ]}
            >
              {cat.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const chipStyles = StyleSheet.create({
  scroll: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 34,
    maxHeight: 40,
  },
  content: {
    paddingHorizontal: 12,
    gap: 8,
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EAF1',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  chipActive: {
    backgroundColor: '#222225',
    borderColor: '#222225',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#444447',
    includeFontPadding: false,
  },
  labelActive: {color: '#FFFFFF'},
});

// ── Screen ────────────────────────────────────────────────────────────────────

export function HomeMapScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [category, setCategory] = useState<CategoryId>('all');
  const [sheetMode, setSheetMode] = useState<SheetMode>('half');

  const filteredLots = filterLots(mockParkingLots, category);
  const selectedLot = mockParkingLots.find(l => l.id === selectedId) ?? null;

  const handleMarkerPress = (id: string) => {
    const newId = selectedId === id ? null : id;
    setSelectedId(newId);
    if (newId && sheetMode === 'collapsed') {
      setSheetMode('half');
    }
  };

  const handleCategorySelect = (id: CategoryId) => {
    setCategory(id);
    setSelectedId(null);
  };

  // zIndex ladder: map(0) → markers(10/20) → chips(34) → search(35) → fabs(35/30) → sheet(40)
  const searchBarTop = insets.top + 8;
  const chipsTop = insets.top + 60;
  const fabStackTop = insets.top + 108;
  // locFab stays above the bottom sheet
  const locFabBottom = SHEET_HEIGHTS[sheetMode] + 12;

  return (
    <View style={styles.container}>
      {/* Map */}
      <MapPlaceholder>
        {filteredLots.map(lot => {
          const pos = toMapPos(
            lot.coordinates.latitude,
            lot.coordinates.longitude,
          );
          return (
            <ParkingMarker
              key={lot.id}
              name={lot.name}
              status={lot.status}
              selected={selectedId === lot.id}
              top={pos.top}
              left={pos.left}
              onPress={() => handleMarkerPress(lot.id)}
            />
          );
        })}
      </MapPlaceholder>

      {/* Search bar */}
      <SearchBar style={[styles.searchBar, {top: searchBarTop}]} />

      {/* Category chips */}
      <CategoryChips
        active={category}
        onSelect={handleCategorySelect}
        style={{top: chipsTop}}
      />

      {/* FAB stack — right side */}
      <View style={[styles.fabStack, {top: fabStackTop}]}>
        <FloatingButton onPress={() => {}}>
          <Text style={styles.fabIcon}>★</Text>
        </FloatingButton>
        <FloatingButton onPress={() => {}}>
          <Text style={styles.fabIcon}>⊞</Text>
        </FloatingButton>
        <FloatingButton onPress={() => {}}>
          <Text style={styles.fabIcon}>≡</Text>
        </FloatingButton>
      </View>

      {/* Location FAB — adjusts above bottom sheet */}
      <FloatingButton
        variant="primary"
        onPress={() => {}}
        style={[styles.locFab, {bottom: locFabBottom}]}
      >
        <Text style={styles.locFabIcon}>◎</Text>
      </FloatingButton>

      {/* Bottom sheet */}
      <ParkingBottomSheet
        lots={filteredLots}
        selectedLot={selectedLot}
        onSelectLot={id => setSelectedId(id)}
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
    zIndex: 35,
  },
  fabStack: {
    position: 'absolute',
    right: 12,
    zIndex: 30,
    gap: 8,
  },
  fabIcon: {
    fontSize: 18,
    color: '#444447',
  },
  locFab: {
    position: 'absolute',
    right: 12,
    zIndex: 42,
  },
  locFabIcon: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});
