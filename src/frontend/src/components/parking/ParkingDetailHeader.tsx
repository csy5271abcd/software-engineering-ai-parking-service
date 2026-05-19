import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface ParkingDetailHeaderProps {
  title: string;
  onBack: () => void;
}

export function ParkingDetailHeader({
  title,
  onBack,
}: ParkingDetailHeaderProps): React.JSX.Element {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.header, {paddingTop: insets.top + 8}]}>
      <Pressable onPress={onBack} style={styles.iconBtn} hitSlop={12}>
        <Text style={styles.backText}>‹</Text>
      </Pressable>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <Pressable style={styles.iconBtn} hitSlop={12}>
        <Text style={styles.actionText}>♡</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5EAF1',
  },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  backText: {
    fontSize: 28,
    color: '#222225',
    lineHeight: 32,
    includeFontPadding: false,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  actionText: {
    fontSize: 20,
    color: '#6B7C92',
    includeFontPadding: false,
  },
});
