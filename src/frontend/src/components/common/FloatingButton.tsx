import React from 'react';
import {
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface FloatingButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
  variant?: 'default' | 'primary';
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export function FloatingButton({
  onPress,
  children,
  variant = 'default',
  size = 44,
  style,
}: FloatingButtonProps): React.JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.base,
        {width: size, height: size, borderRadius: size / 2},
        variant === 'primary' ? styles.primary : styles.default,
        style,
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  default: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EAF1',
  },
  primary: {
    backgroundColor: '#006CFF',
    borderWidth: 0,
  },
});
