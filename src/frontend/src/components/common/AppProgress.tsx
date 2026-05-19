import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';

interface AppProgressProps {
  value: number;     // 0–100
  color?: string;
  trackColor?: string;
  height?: number;
  style?: StyleProp<ViewStyle>;
}

export function AppProgress({
  value,
  color = '#006CFF',
  trackColor = '#ECECF0',
  height = 6,
  style,
}: AppProgressProps): React.JSX.Element {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <View
      style={[
        styles.track,
        {height, backgroundColor: trackColor, borderRadius: height / 2},
        style,
      ]}
    >
      <View
        style={[
          styles.fill,
          {
            width: `${pct}%`,
            backgroundColor: color,
            borderRadius: height / 2,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    height: '100%',
  },
});
