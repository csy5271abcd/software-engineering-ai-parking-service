import React from 'react';
import {
  ScrollView,
  Pressable,
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

export const CATEGORIES = [
  {id: 'all',       label: '전체',      emoji: '🚙', dot: null},
  {id: 'available', label: '이용가능',  emoji: null,  dot: '#03AA5A'},
  {id: 'soon',      label: '곧 비워짐', emoji: '⚡', dot: null},
  {id: 'cheap',     label: '저렴',      emoji: '🪙', dot: null},
  {id: 'nfc',       label: 'NFC',      emoji: null,  dot: null},
  {id: 'shared',    label: '개인공유',  emoji: null,  dot: null},
  {id: 'public',    label: '공영',      emoji: null,  dot: null},
  {id: '24h',       label: '24시간',    emoji: null,  dot: null},
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
            {/* Dot indicator (이용가능) */}
            {cat.dot != null && (
              <View style={[styles.dotIndicator, {backgroundColor: cat.dot}]} />
            )}
            {/* Emoji prefix */}
            {cat.emoji != null && (
              <Text style={styles.chipEmoji}>{cat.emoji}</Text>
            )}
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
    maxHeight: 46,
  },
  content: {
    paddingHorizontal: 12,
    gap: 6,
    alignItems: 'center',
    paddingVertical: 4,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EAF1',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  chipActive: {
    backgroundColor: '#222225',
    borderColor: '#222225',
    elevation: 0,
    shadowOpacity: 0,
  },
  dotIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    flexShrink: 0,
  },
  chipEmoji: {
    fontSize: 13,
    lineHeight: 16,
    includeFontPadding: false,
  },
  label: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#222225',
    includeFontPadding: false,
    letterSpacing: -0.3,
  },
  labelActive: {
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
