import React from 'react';
import {Pressable, Text, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {AppIcon} from './AppIcon';
import type {AppIconName} from './AppIcon';

interface AppChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
  icon?: AppIconName;
  size?: 'sm' | 'md';
  style?: StyleProp<ViewStyle>;
}

export function AppChip({
  label,
  active = false,
  onPress,
  icon,
  size = 'md',
  style,
}: AppChipProps): React.JSX.Element {
  const isSm = size === 'sm';
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        active && styles.chipActive,
        isSm && styles.chipSm,
        style,
      ]}
    >
      {icon != null && (
        <AppIcon
          name={icon}
          size={isSm ? 12 : 14}
          color={active ? '#FFFFFF' : '#4D5A6A'}
          strokeWidth={1.8}
        />
      )}
      <Text style={[styles.label, active && styles.labelActive, isSm && styles.labelSm]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    backgroundColor: '#FFFFFF',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  chipActive: {
    backgroundColor: '#222225',
    borderColor: '#222225',
    elevation: 0,
    shadowOpacity: 0,
  },
  chipSm: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222225',
    includeFontPadding: false,
    letterSpacing: -0.3,
  },
  labelActive: {color: '#FFFFFF'},
  labelSm: {fontSize: 12},
});
