import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import type {ProviderTodayUsage} from '../../types/provider';

interface Props {
  usage: ProviderTodayUsage;
  isLast: boolean;
}

export function ProviderTodayUsageRow({usage, isLast}: Props): React.JSX.Element {
  return (
    <View style={[styles.row, !isLast && styles.rowBorder]}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{usage.userName[0]}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.name}>{usage.userName} · {usage.duration}</Text>
        <Text style={styles.meta}>{usage.time} · {usage.lotName}</Text>
      </View>
      <Text style={styles.fee}>+₩{usage.fee.toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F2F4F7',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,108,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#006CFF',
    includeFontPadding: false,
  },
  body: {flex: 1, minWidth: 0, gap: 2},
  name: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#222225',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  meta: {
    fontSize: 10.5,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  fee: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#03AA5A',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
});
