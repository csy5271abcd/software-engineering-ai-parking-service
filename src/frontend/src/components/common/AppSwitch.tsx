import React, {useRef, useEffect} from 'react';
import {
  Pressable,
  Animated,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface AppSwitchProps {
  value: boolean;
  onValueChange?: (v: boolean) => void;
  activeColor?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const TRACK_W = 44;
const TRACK_H = 24;
const THUMB_SIZE = 20;
const TRAVEL = TRACK_W - THUMB_SIZE - 4;

export function AppSwitch({
  value,
  onValueChange,
  activeColor = '#030213',
  disabled = false,
  style,
}: AppSwitchProps): React.JSX.Element {
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration: 160,
      useNativeDriver: false,
    }).start();
  }, [value, anim]);

  const translateX = anim.interpolate({inputRange: [0, 1], outputRange: [2, TRAVEL + 2]});
  const bgColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#CBCED4', activeColor],
  });

  return (
    <Pressable
      onPress={() => !disabled && onValueChange?.(!value)}
      disabled={disabled}
      style={[styles.track, {opacity: disabled ? 0.5 : 1}, style]}
    >
      <Animated.View style={[styles.trackBg, {backgroundColor: bgColor}]} />
      <Animated.View style={[styles.thumb, {transform: [{translateX}]}]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: TRACK_W,
    height: TRACK_H,
    borderRadius: TRACK_H / 2,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  trackBg: {
    ...StyleSheet.absoluteFill,
    borderRadius: TRACK_H / 2,
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
});
