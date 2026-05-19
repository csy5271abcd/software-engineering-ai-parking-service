import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {AppIcon} from '../common/AppIcon';

interface SectionHeaderProps {
  title: string;
  sub?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function SectionHeader({
  title,
  sub,
  actionLabel,
  onAction,
}: SectionHeaderProps): React.JSX.Element {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Text style={styles.title}>{title}</Text>
        {sub != null && <Text style={styles.sub}>{sub}</Text>}
      </View>
      {onAction != null && actionLabel != null && (
        <Pressable onPress={onAction} style={styles.actionBtn} hitSlop={8}>
          <Text style={styles.actionText}>{actionLabel}</Text>
          <AppIcon name="chevronRight" size={12} color="#8B99AC" strokeWidth={2.4} />
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
    marginBottom: 12,
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
    color: '#6B7C92',
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
    color: '#6B7C92',
    includeFontPadding: false,
  },
});
