import React from 'react';
import {View, Text, Pressable, StyleSheet, StyleProp, ViewStyle} from 'react-native';

interface AppSectionHeaderProps {
  title: string;
  sub?: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function AppSectionHeader({
  title,
  sub,
  actionLabel,
  onAction,
  style,
}: AppSectionHeaderProps): React.JSX.Element {
  return (
    <View style={[styles.row, style]}>
      <View style={styles.left}>
        <Text style={styles.title}>{title}</Text>
        {sub != null && <Text style={styles.sub}>{sub}</Text>}
      </View>
      {onAction != null && actionLabel != null && (
        <Pressable onPress={onAction} style={styles.actionBtn} hitSlop={8}>
          <Text style={styles.actionText}>{actionLabel}</Text>
          <View style={styles.chevron} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginBottom: 10,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    flexShrink: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222225',
    letterSpacing: -0.4,
    includeFontPadding: false,
  },
  sub: {
    fontSize: 12,
    fontWeight: '500',
    color: '#717182',
    includeFontPadding: false,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    flexShrink: 0,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#717182',
    includeFontPadding: false,
  },
  chevron: {
    width: 0,
    height: 0,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderLeftWidth: 5,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#8B99AC',
  },
});
