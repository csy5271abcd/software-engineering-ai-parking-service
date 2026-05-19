import React from 'react';
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {spacing} from '../../theme';

interface SearchBarProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function SearchBar({
  onPress,
  style,
}: SearchBarProps): React.JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.bar, style]}
      accessibilityLabel="검색창 열기"
    >
      {/* Hamburger menu icon */}
      <View style={styles.menuIcon}>
        <View style={styles.menuLine} />
        <View style={styles.menuLine} />
        <View style={styles.menuLine} />
      </View>

      <Text style={styles.placeholder} numberOfLines={1}>
        장소, 버스, 지하철, 주소 검색
      </Text>

      {/* Mic button */}
      <View style={styles.micWrap}>
        <View style={styles.micBody} />
        <View style={styles.micStem} />
        <View style={styles.micArm} />
      </View>
    </Pressable>
  );
}

const ICON_COLOR = '#222225';

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    paddingHorizontal: spacing.md,
    paddingVertical: 11,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  menuIcon: {
    width: 20,
    height: 14,
    justifyContent: 'space-between',
  },
  menuLine: {
    height: 2,
    backgroundColor: ICON_COLOR,
    borderRadius: 1,
  },
  placeholder: {
    flex: 1,
    fontSize: 14,
    color: '#8B99AC',
    fontWeight: '400',
  },
  micWrap: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 2,
  },
  micBody: {
    width: 9,
    height: 12,
    borderRadius: 4.5,
    backgroundColor: ICON_COLOR,
  },
  micStem: {
    width: 2,
    height: 3,
    backgroundColor: ICON_COLOR,
    marginTop: 1,
  },
  micArm: {
    width: 14,
    height: 2,
    borderRadius: 1,
    backgroundColor: ICON_COLOR,
    marginTop: 1,
  },
});
