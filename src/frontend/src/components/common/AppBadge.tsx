import React from 'react';
import {View, Text, StyleSheet, StyleProp, ViewStyle} from 'react-native';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'muted' | 'outline' | 'ai';

interface AppBadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: StyleProp<ViewStyle>;
}

const VARIANT_MAP: Record<BadgeVariant, {bg: string; text: string; border?: string}> = {
  default:     {bg: '#030213', text: '#FFFFFF'},
  success:     {bg: 'rgba(3,170,90,0.10)', text: '#03AA5A'},
  warning:     {bg: 'rgba(245,166,35,0.12)', text: '#C47E00'},
  danger:      {bg: 'rgba(212,24,61,0.10)', text: '#D4183D'},
  info:        {bg: 'rgba(0,108,255,0.08)', text: '#006CFF'},
  muted:       {bg: '#ECECF0', text: '#717182'},
  outline:     {bg: 'transparent', text: '#222225', border: '#CAD1DB'},
  ai:          {bg: '#03AA5A', text: '#FFFFFF'},
};

export function AppBadge({
  label,
  variant = 'muted',
  style,
}: AppBadgeProps): React.JSX.Element {
  const v = VARIANT_MAP[variant];
  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: v.bg,
          borderWidth: v.border ? 1 : 0,
          borderColor: v.border ?? 'transparent',
        },
        style,
      ]}
    >
      <Text style={[styles.text, {color: v.text}]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
    includeFontPadding: false,
    letterSpacing: -0.1,
  },
});
