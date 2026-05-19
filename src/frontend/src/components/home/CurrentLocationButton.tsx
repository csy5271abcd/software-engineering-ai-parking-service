import React from 'react';
import {StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {FloatingButton} from '../common/FloatingButton';
import {AppIcon} from '../common/AppIcon';

interface CurrentLocationButtonProps {
  onPress?: () => void;
  bottom: number;
  style?: StyleProp<ViewStyle>;
}

export function CurrentLocationButton({
  onPress,
  bottom,
  style,
}: CurrentLocationButtonProps): React.JSX.Element {
  return (
    <FloatingButton
      variant="default"
      onPress={onPress}
      style={[styles.fab, {bottom}, style]}
      size={44}
    >
      <AppIcon name="crosshair" size={20} color="#006CFF" strokeWidth={2} />
    </FloatingButton>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 12,
    zIndex: 36,
  },
});
