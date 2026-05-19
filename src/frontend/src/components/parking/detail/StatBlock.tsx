import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface StatBlockProps {
  label: string;
  value: string;
  sub?: string;
  accentColor?: string;
}

export function StatBlock({
  label,
  value,
  sub,
  accentColor,
}: StatBlockProps): React.JSX.Element {
  return (
    <View style={styles.cell}>
      <Text style={styles.label}>{label}</Text>
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
  label: {
    fontSize: 11,
    color: '#8B99AC',
    fontWeight: '500',
    letterSpacing: -0.2,
    includeFontPadding: false,
    marginBottom: 5,
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
