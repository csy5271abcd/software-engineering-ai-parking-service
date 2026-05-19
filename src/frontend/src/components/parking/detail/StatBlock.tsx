import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface StatBlockProps {
  label: string;
  value: string;
  sub?: string;
  accentColor?: string;
  iconNode?: React.ReactNode;
}

export function StatBlock({
  label,
  value,
  sub,
  accentColor,
  iconNode,
}: StatBlockProps): React.JSX.Element {
  return (
    <View style={styles.cell}>
      <View style={styles.labelRow}>
        {iconNode != null && <View style={styles.iconWrap}>{iconNode}</View>}
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text
        style={[styles.value, accentColor ? {color: accentColor} : undefined]}
        numberOfLines={1}
      >
        {value}
      </Text>
      {sub != null && <Text style={styles.sub}>{sub}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    padding: 13,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 5,
  },
  iconWrap: {
    flexShrink: 0,
  },
  label: {
    fontSize: 11,
    color: '#8B99AC',
    fontWeight: '500',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  value: {
    fontSize: 15.5,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  sub: {
    fontSize: 10.5,
    color: '#8B99AC',
    letterSpacing: -0.2,
    includeFontPadding: false,
    marginTop: 2,
  },
});
