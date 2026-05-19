import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';

// Style reference for bottom sheet containers — does not replace ParkingBottomSheet's
// 4-stage swipe logic. Use these style constants when building sheet-style overlays.

export const SHEET_STYLE = {
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  backgroundColor: '#FFFFFF',
  borderTopWidth: 1,
  borderColor: '#E5EAF1',
  elevation: 16,
  shadowColor: '#000',
  shadowOffset: {width: 0, height: -4},
  shadowOpacity: 0.10,
  shadowRadius: 16,
} as const;

export const SHEET_HANDLE_STYLE = {
  width: 36,
  height: 4,
  borderRadius: 2,
  backgroundColor: '#CAD1DB',
} as const;

interface AppSheetHeaderProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function AppSheetHeader({children, style}: AppSheetHeaderProps): React.JSX.Element {
  return (
    <View style={[styles.header, style]}>
      <View style={styles.handle} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 8,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CAD1DB',
    marginBottom: 4,
  },
});
