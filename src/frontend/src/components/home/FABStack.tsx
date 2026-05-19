import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {FloatingButton} from '../common/FloatingButton';
import {AppIcon} from '../common/AppIcon';

interface FABStackProps {
  onLayers?: () => void;
  onSaved?: () => void;
  onLocate?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function FABStack({
  onLayers,
  onSaved,
  onLocate,
  style,
}: FABStackProps): React.JSX.Element {
  return (
    <View style={[styles.stack, style]}>
      <FloatingButton onPress={onLayers} size={44}>
        <AppIcon name="layers" size={20} color="#444447" strokeWidth={2} />
      </FloatingButton>
      <FloatingButton onPress={onSaved} size={44}>
        <AppIcon name="star" size={20} color="#444447" strokeWidth={2} />
      </FloatingButton>
      <FloatingButton onPress={onLocate} size={44}>
        <AppIcon name="navigation" size={20} color="#444447" strokeWidth={2} />
      </FloatingButton>
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    position: 'absolute',
    right: 12,
    gap: 8,
    zIndex: 35,
  },
});
