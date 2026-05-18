import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, spacing, typography} from '../../theme';

// U-01: 현재 위치 기반 주변 주차장 지도 표시
// 지도 영역과 ParkingBottomSheet는 이후 단계에서 구현한다.
export function HomeMapScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapLabel}>지도 영역 (구현 예정)</Text>
        <Text style={styles.mapSub}>Naver Maps SDK 연동 후 교체</Text>
      </View>
      <View style={styles.bottomSheetPlaceholder}>
        <Text style={styles.sheetLabel}>ParkingBottomSheet (구현 예정)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.border.default,
  },
  mapLabel: {
    fontSize: typography.title.sm.fontSize,
    fontWeight: typography.title.sm.fontWeight,
    lineHeight: typography.title.sm.lineHeight,
    color: colors.text.secondary,
  },
  mapSub: {
    fontSize: typography.caption.md.fontSize,
    fontWeight: typography.caption.md.fontWeight,
    lineHeight: typography.caption.md.lineHeight,
    color: colors.text.disabled,
    marginTop: spacing.xs,
  },
  bottomSheetPlaceholder: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border.default,
    padding: spacing.screen,
  },
  sheetLabel: {
    fontSize: typography.body.md.fontSize,
    fontWeight: typography.body.md.fontWeight,
    lineHeight: typography.body.md.lineHeight,
    color: colors.text.secondary,
  },
});
