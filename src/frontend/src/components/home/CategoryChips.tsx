import React from 'react';
import {
  ScrollView,
  Pressable,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {AppIcon} from '../common/AppIcon';
import type {AppIconName} from '../common/AppIcon';

export const CATEGORIES: {
  id: string;
  label: string;
  icon: AppIconName;
  iconColor: string;
}[] = [
  {id: 'all',       label: '전체',     icon: 'car',              iconColor: '#006CFF'},
  {id: 'available', label: '이용가능', icon: 'circleParking',    iconColor: '#03AA5A'},
  {id: 'soon',      label: '곧 비워짐', icon: 'clock',           iconColor: '#F5683C'},
  {id: 'cheap',     label: '저렴',     icon: 'circleDollarSign', iconColor: '#E8A000'},
  {id: 'nfc',       label: 'NFC',      icon: 'creditCard',       iconColor: '#8B5CF6'},
  {id: 'shared',    label: '개인공유', icon: 'house',            iconColor: '#006CFF'},
  {id: 'public',    label: '공영',     icon: 'mapPin',           iconColor: '#4D5A6A'},
  {id: '24h',       label: '24시간',   icon: 'calendarDays',     iconColor: '#03AA5A'},
];

export type CategoryId = string;

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
            <AppIcon
              name={cat.icon}
              size={15}
              color={cat.iconColor}
              strokeWidth={2.2}
              fill="none"
            />
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
    paddingVertical: 3,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'transparent',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.10,
    shadowRadius: 6,
  },
  chipActive: {
    borderColor: '#006CFF',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#222225',
    includeFontPadding: false,
    letterSpacing: -0.3,
  },
  labelActive: {
    color: '#006CFF',
    fontWeight: '700',
  },
});
