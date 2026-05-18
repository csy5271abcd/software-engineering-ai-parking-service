import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, spacing, typography} from '../../theme';

// P-01: 공급자 관리 홈
// 공급자 주차장 목록, 정산 현황은 이후 단계에서 구현한다.
export function ProviderHomeScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>공급자</Text>
      <Text style={styles.description}>
        공급자 주차장 등록 및 관리 구현 예정{'\n'}(ProviderHomeScreen)
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
    fontSize: typography.title.md.fontSize,
    fontWeight: typography.title.md.fontWeight,
    lineHeight: typography.title.md.lineHeight,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: typography.body.md.fontSize,
    fontWeight: typography.body.md.fontWeight,
    lineHeight: typography.body.md.lineHeight,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
