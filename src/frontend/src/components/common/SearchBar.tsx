import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {AppIcon} from './AppIcon';
import {spacing} from '../../theme';

interface SearchBarProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function SearchBar({
  onPress,
  style,
}: SearchBarProps): React.JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.bar, style]}
      accessibilityLabel="검색창 열기"
    >
      <AppIcon name="mapPin" size={18} color="#006CFF" strokeWidth={2.2} />

      <Text style={styles.placeholder} numberOfLines={1}>
        장소, 버스, 지하철, 주소 검색
      </Text>

      <AppIcon name="mic" size={18} color="#6B7C92" strokeWidth={2} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  placeholder: {
    flex: 1,
    fontSize: 15,
    color: '#222225',
    fontWeight: '500',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
});
