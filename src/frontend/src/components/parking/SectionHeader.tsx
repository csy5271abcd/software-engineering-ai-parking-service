import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

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
    marginBottom: 12,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    flexShrink: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
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
  chevron: {
    width: 0,
    height: 0,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderLeftWidth: 6,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#8B99AC',
  },
});
