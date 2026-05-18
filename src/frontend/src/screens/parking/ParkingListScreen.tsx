import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, spacing, typography} from '../../theme';

// U-02: 주변 주차장 목록 비교
// ParkingCard 목록과 이용 내역은 이후 단계에서 구현한다.
export function ParkingListScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>이용</Text>
      <Text style={styles.description}>
        주차장 목록 및 이용 내역 구현 예정{'\n'}(ParkingListScreen)
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
