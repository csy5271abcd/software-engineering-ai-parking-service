import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {AppIcon} from '../common/AppIcon';

const TIMES = ['지금', '15분 후', '30분 후', '1시간 후'] as const;
export type ArrivalTime = (typeof TIMES)[number];

interface ArrivalTimeSelectorProps {
  value: ArrivalTime;
  onChange: (t: ArrivalTime) => void;
}

export function ArrivalTimeSelector({
  value,
  onChange,
}: ArrivalTimeSelectorProps): React.JSX.Element {
  return (
    <View style={styles.row}>
      <AppIcon name="clock" size={14} color="#03AA5A" strokeWidth={2} />
      <Text style={styles.label}>도착 예정</Text>
      <View style={styles.chips}>
        {TIMES.map(t => {
          const active = value === t;
          return (
            <Pressable
              key={t}
              onPress={() => onChange(t)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {t}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 12,
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F2F4F7',
  },
  label: {
    fontSize: 12,
    color: '#4D5A6A',
    fontWeight: '500',
    letterSpacing: -0.2,
    includeFontPadding: false,
    flexShrink: 0,
  },
  chips: {
    flex: 1,
    flexDirection: 'row',
    gap: 5,
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  chip: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#CAD1DB',
    backgroundColor: '#FFFFFF',
  },
  chipActive: {
    backgroundColor: '#222225',
    borderColor: '#222225',
  },
  chipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4D5A6A',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  chipTextActive: {color: '#FFFFFF'},
});
