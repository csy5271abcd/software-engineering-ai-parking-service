import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, spacing, typography} from '../../theme';

export function SplashScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>SmartPark</Text>
      <Text style={styles.tagline}>AI 기반 스마트 주차 플랫폼</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.default,
    padding: spacing.screen,
  },
  appName: {
    fontSize: typography.title.xl.fontSize,
    fontWeight: typography.title.xl.fontWeight,
    lineHeight: typography.title.xl.lineHeight,
    color: colors.primary.text,
    marginBottom: spacing.xs,
  },
  tagline: {
    fontSize: typography.body.md.fontSize,
    fontWeight: typography.body.md.fontWeight,
    lineHeight: typography.body.md.lineHeight,
    color: colors.primary.text,
    opacity: 0.85,
  },
});
