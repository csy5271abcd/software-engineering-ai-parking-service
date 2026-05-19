import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';

interface AppSeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  style?: StyleProp<ViewStyle>;
  color?: string;
  thickness?: number;
}

export function AppSeparator({
  orientation = 'horizontal',
  style,
  color = 'rgba(0,0,0,0.09)',
  thickness = 1,
}: AppSeparatorProps): React.JSX.Element {
  return (
    <View
      style={[
        orientation === 'horizontal'
          ? {height: thickness, width: '100%'}
          : {width: thickness, height: '100%'},
        {backgroundColor: color},
        style,
      ]}
    />
  );
}
