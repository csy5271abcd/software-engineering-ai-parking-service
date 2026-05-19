import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardRadius = 'md' | 'lg' | 'xl';

interface AppCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padding?: CardPadding;
  radius?: CardRadius;
  elevation?: boolean;
  border?: boolean;
}

const PADDING: Record<CardPadding, number> = {none: 0, sm: 10, md: 14, lg: 18};
const RADIUS: Record<CardRadius, number>   = {md: 10, lg: 12, xl: 16};

export function AppCard({
  children,
  style,
  padding = 'md',
  radius = 'lg',
  elevation = true,
  border = true,
}: AppCardProps): React.JSX.Element {
  return (
    <View
      style={[
        styles.card,
        {
          padding: PADDING[padding],
          borderRadius: RADIUS[radius],
          borderWidth: border ? 1 : 0,
        },
        elevation && styles.shadow,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5EAF1',
  },
  shadow: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
});
