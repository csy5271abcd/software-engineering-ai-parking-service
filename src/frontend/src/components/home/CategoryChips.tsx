import React from 'react';
import {
  ScrollView,
  Pressable,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

export const CATEGORIES = [
  {id: 'all',       label: '전체'},
  {id: 'available', label: '이용가능'},
  {id: 'soon',      label: '곧 비워짐'},
  {id: 'cheap',     label: '저렴'},
  {id: 'nfc',       label: 'NFC'},
  {id: 'shared',    label: '개인공유'},
  {id: 'public',    label: '공영'},
  {id: '24h',       label: '24시간'},
] as const;

export type CategoryId = (typeof CATEGORIES)[number]['id'];

interface CategoryChipsProps {
  active: CategoryId;
  onSelect: (id: CategoryId) => void;
  style?: StyleProp<ViewStyle>;
}

export function CategoryChips({
  active,
  onSelect,
  style,
}: CategoryChipsProps): React.JSX.Element {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      style={[styles.scroll, style]}
    >
      {CATEGORIES.map(cat => {
        const isActive = cat.id === active;
        return (
          <Pressable
            key={cat.id}
            onPress={() => onSelect(cat.id)}
            style={[styles.chip, isActive && styles.chipActive]}
          >
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {cat.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    maxHeight: 42,
  },
  content: {
    paddingHorizontal: 12,
    gap: 6,
    alignItems: 'center',
    paddingVertical: 4,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CAD1DB',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  chipActive: {
    backgroundColor: '#222225',
    borderColor: '#222225',
    elevation: 0,
    shadowOpacity: 0,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4D5A6A',
    includeFontPadding: false,
    letterSpacing: -0.3,
  },
  labelActive: {
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
