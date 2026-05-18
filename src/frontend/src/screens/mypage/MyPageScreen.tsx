import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, spacing, typography} from '../../theme';

// 마이페이지: 사용자 정보, 결제 수단, 알림, 설정
// 세부 구성은 이후 단계에서 구현한다.
export function MyPageScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>마이</Text>
      <Text style={styles.description}>
        사용자 정보 및 설정 구현 예정{'\n'}(MyPageScreen)
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
