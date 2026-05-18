import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, spacing, typography} from '../../theme';

// U-03: 목적지명 또는 주소 검색
// SearchBar, 최근 검색어, 검색 결과는 이후 단계에서 구현한다.
export function DestinationSearchScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>목적지 검색</Text>
      <Text style={styles.description}>
        SearchBar 및 검색 결과 구현 예정{'\n'}(DestinationSearchScreen)
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
