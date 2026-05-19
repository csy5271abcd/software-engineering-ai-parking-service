import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {FloatingButton} from '../common/FloatingButton';

// Navigation arrow icon (pointing upper-right, white on blue)
function NavArrow(): React.JSX.Element {
  return (
    <View style={styles.iconWrap}>
      {/* Upper triangle: solid white */}
      <View style={styles.arrowTop} />
      {/* Lower-right part: solid white */}
      <View style={styles.arrowBottom} />
    </View>
  );
}

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
      variant="primary"
      onPress={onPress}
      style={[styles.fab, {bottom}, style]}
    >
      <NavArrow />
    </FloatingButton>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 12,
    zIndex: 36,
  },
  iconWrap: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Upward-pointing triangle rotated slightly for navigation arrow
  arrowTop: {
    width: 0,
    height: 0,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderBottomWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFFFFF',
    transform: [{rotate: '25deg'}, {translateX: 1}],
  },
  arrowBottom: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    width: 6,
    height: 6,
    backgroundColor: '#006CFF',
  },
});
