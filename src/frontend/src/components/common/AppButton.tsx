import React from 'react';
import {
  Pressable,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {AppIcon} from './AppIcon';
import type {AppIconName} from './AppIcon';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'dark';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface AppButtonProps {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: AppIconName;
  rightIcon?: AppIconName;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
}

const VARIANT_STYLES: Record<ButtonVariant, {bg: string; text: string; border?: string}> = {
  primary:     {bg: '#006CFF', text: '#FFFFFF'},
  dark:        {bg: '#030213', text: '#FFFFFF'},
  secondary:   {bg: '#ECECF0', text: '#030213'},
  outline:     {bg: 'transparent', text: '#222225', border: '#E5EAF1'},
  ghost:       {bg: 'transparent', text: '#4D5A6A'},
  destructive: {bg: '#D4183D', text: '#FFFFFF'},
};

const SIZE_STYLES: Record<ButtonSize, {height: number; px: number; fontSize: number; iconSize: number}> = {
  sm: {height: 32, px: 12, fontSize: 13, iconSize: 14},
  md: {height: 40, px: 16, fontSize: 14, iconSize: 16},
  lg: {height: 48, px: 20, fontSize: 16, iconSize: 18},
};

export function AppButton({
  label,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  onPress,
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
}: AppButtonProps): React.JSX.Element {
  const v = VARIANT_STYLES[variant];
  const s = SIZE_STYLES[size];
  const opacity = disabled || loading ? 0.5 : 1;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({pressed}) => [
        styles.base,
        {
          height: s.height,
          paddingHorizontal: s.px,
          backgroundColor: v.bg,
          borderWidth: v.border ? 1 : 0,
          borderColor: v.border ?? 'transparent',
          opacity: pressed ? opacity * 0.8 : opacity,
          alignSelf: fullWidth ? 'auto' : 'flex-start',
        },
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={v.text} />
      ) : (
        <>
          {leftIcon != null && (
            <AppIcon name={leftIcon} size={s.iconSize} color={v.text} strokeWidth={2} />
          )}
          {label != null && (
            <Text style={[styles.label, {fontSize: s.fontSize, color: v.text}]}>
              {label}
            </Text>
          )}
          {rightIcon != null && (
            <AppIcon name={rightIcon} size={s.iconSize} color={v.text} strokeWidth={2} />
          )}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 8,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  label: {
    fontWeight: '600',
    includeFontPadding: false,
    letterSpacing: -0.2,
  },
});
