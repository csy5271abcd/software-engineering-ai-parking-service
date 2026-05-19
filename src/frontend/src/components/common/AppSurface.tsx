import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';

type SurfaceVariant = 'default' | 'muted' | 'accent' | 'info' | 'success' | 'warning';

interface AppSurfaceProps {
  children: React.ReactNode;
  variant?: SurfaceVariant;
  radius?: number;
  border?: boolean;
  style?: StyleProp<ViewStyle>;
}

const VARIANT_STYLES: Record<SurfaceVariant, {bg: string; border?: string}> = {
  default: {bg: '#FFFFFF', border: '#E5EAF1'},
  muted:   {bg: '#F3F3F5'},
  accent:  {bg: '#E9EBEF'},
  info:    {bg: 'rgba(0,108,255,0.06)', border: 'rgba(0,108,255,0.18)'},
  success: {bg: 'rgba(3,170,90,0.06)', border: 'rgba(3,170,90,0.20)'},
  warning: {bg: 'rgba(245,166,35,0.08)', border: 'rgba(245,166,35,0.25)'},
};

export function AppSurface({
  children,
  variant = 'default',
  radius = 10,
  border = true,
  style,
}: AppSurfaceProps): React.JSX.Element {
  const v = VARIANT_STYLES[variant];
  return (
    <View
      style={[
        {
          backgroundColor: v.bg,
          borderRadius: radius,
          borderWidth: border && v.border ? 1 : 0,
          borderColor: v.border ?? 'transparent',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
