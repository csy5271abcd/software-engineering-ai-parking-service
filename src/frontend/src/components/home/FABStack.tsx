import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {FloatingButton} from '../common/FloatingButton';

// ── Icon components ───────────────────────────────────────────────────────────

const IC = '#444447';

function BookmarkIcon(): React.JSX.Element {
  return (
    <View style={iconStyles.bookmark}>
      <View style={iconStyles.bookmarkBody} />
      <View style={iconStyles.bookmarkNotchRow}>
        <View style={iconStyles.bookmarkNotchL} />
        <View style={iconStyles.bookmarkNotchR} />
      </View>
    </View>
  );
}

function LayersIcon(): React.JSX.Element {
  return (
    <View style={iconStyles.layers}>
      <View style={[iconStyles.layerBar, {width: 18}]} />
      <View style={[iconStyles.layerBar, {width: 13, alignSelf: 'center'}]} />
      <View style={[iconStyles.layerBar, {width: 8, alignSelf: 'center'}]} />
    </View>
  );
}

function FilterIcon(): React.JSX.Element {
  return (
    <View style={iconStyles.filter}>
      <View style={iconStyles.filterFull} />
      <View style={iconStyles.filterMid} />
      <View style={iconStyles.filterShort} />
    </View>
  );
}

const iconStyles = StyleSheet.create({
  // Bookmark: rectangle body + V-notch via two triangles
  bookmark: {width: 14, height: 17, alignItems: 'flex-start'},
  bookmarkBody: {
    width: 14,
    height: 12,
    backgroundColor: IC,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  bookmarkNotchRow: {flexDirection: 'row', height: 5},
  bookmarkNotchL: {
    width: 0, height: 0,
    borderTopWidth: 5, borderRightWidth: 7,
    borderTopColor: IC, borderRightColor: 'transparent',
  },
  bookmarkNotchR: {
    width: 0, height: 0,
    borderTopWidth: 5, borderLeftWidth: 7,
    borderTopColor: IC, borderLeftColor: 'transparent',
  },
  // Layers: three bars
  layers: {gap: 3.5},
  layerBar: {height: 2.5, borderRadius: 1, backgroundColor: IC},
  // Filter: decreasing bars
  filter: {gap: 3.5, alignItems: 'center'},
  filterFull: {width: 18, height: 2, borderRadius: 1, backgroundColor: IC},
  filterMid: {width: 12, height: 2, borderRadius: 1, backgroundColor: IC},
  filterShort: {width: 6, height: 2, borderRadius: 1, backgroundColor: IC},
});

// ── FABStack component ────────────────────────────────────────────────────────

interface FABStackProps {
  onBookmark?: () => void;
  onLayers?: () => void;
  onFilter?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function FABStack({
  onBookmark,
  onLayers,
  onFilter,
  style,
}: FABStackProps): React.JSX.Element {
  return (
    <View style={[styles.stack, style]}>
      <FloatingButton onPress={onBookmark}>
        <BookmarkIcon />
      </FloatingButton>
      <FloatingButton onPress={onLayers}>
        <LayersIcon />
      </FloatingButton>
      <FloatingButton onPress={onFilter}>
        <FilterIcon />
      </FloatingButton>
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    position: 'absolute',
    right: 12,
    gap: 8,
    zIndex: 35,
  },
});
