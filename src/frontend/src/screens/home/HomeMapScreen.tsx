import React, {useState} from 'react';
import {View, Text, ScrollView, Pressable, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MapPlaceholder} from '../../components/map/MapPlaceholder';
import {ParkingMarker} from '../../components/map/ParkingMarker';
import {SearchBar} from '../../components/common/SearchBar';
import {FloatingButton} from '../../components/common/FloatingButton';
import {HomeParkingSummary} from '../../components/parking/HomeParkingSummary';
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
        l => l.operationHours.isAllDay || (l.tags as string[]).includes('24시간'),
      );
    default:
      return lots;
  }
}

interface CategoryChipsProps {
  active: CategoryId;
  onSelect: (id: CategoryId) => void;
  style?: object;
}

function CategoryChips({
  active,
  onSelect,
  style,
}: CategoryChipsProps): React.JSX.Element {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.chipsContent}
      style={[styles.chipsScroll, style]}
    >
      {CATEGORIES.map(cat => {
        const isActive = cat.id === active;
        return (
          <Pressable
            key={cat.id}
            onPress={() => onSelect(cat.id)}
            style={[styles.chip, isActive && styles.chipActive]}
          >
            <Text style={[styles.chipLabel, isActive && styles.chipLabelActive]}>
              {cat.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────

export function HomeMapScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [category, setCategory] = useState<CategoryId>('all');

  const filteredLots = filterLots(mockParkingLots, category);
  const selectedLot = mockParkingLots.find(l => l.id === selectedId) ?? null;

  const handleMarkerPress = (id: string) => {
    setSelectedId(prev => (prev === id ? null : id));
  };

  const handleCategorySelect = (id: CategoryId) => {
    setCategory(id);
    setSelectedId(null);
  };

  // Layout positions relative to safe area
  const searchBarTop = insets.top + 8;
  const chipsTop = insets.top + 60;  // below search bar (44px) + 8px gap
  const fabStackTop = insets.top + 108; // below chips (40px) + 8px gap

  return (
    <View style={styles.container}>
      {/* Full-screen map */}
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

      {/* Location FAB — blue, above summary panel */}
      <FloatingButton
        variant="primary"
        onPress={() => {}}
        style={styles.locFab}
      >
        <Text style={styles.locFabIcon}>◎</Text>
      </FloatingButton>

      {/* Bottom summary panel */}
      <HomeParkingSummary
        lots={filteredLots}
        selectedLot={selectedLot}
        onSelectLot={id => setSelectedId(id)}
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
  chipsScroll: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 34,
    maxHeight: 40,
  },
  chipsContent: {
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
  chipLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#444447',
    includeFontPadding: false,
  },
  chipLabelActive: {
    color: '#FFFFFF',
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
    bottom: 200,
    zIndex: 35,
  },
  locFabIcon: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});
