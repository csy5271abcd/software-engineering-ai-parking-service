import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, spacing, typography} from '../../theme';

export function PermissionGuideScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>권한 안내</Text>
      <Text style={styles.description}>
        SmartPark는 현재 위치 기반 주차장 탐색을 위해{'\n'}
        위치 권한이 필요합니다.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.default,
    padding: spacing.screen,
  },
  title: {
    fontSize: typography.title.lg.fontSize,
    fontWeight: typography.title.lg.fontWeight,
    lineHeight: typography.title.lg.lineHeight,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: typography.body.md.fontSize,
    fontWeight: typography.body.md.fontWeight,
    lineHeight: typography.body.md.lineHeight,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
