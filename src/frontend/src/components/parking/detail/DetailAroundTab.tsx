import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {mockParkingLots} from '../../../mocks';
import {ParkingCard} from '../ParkingCard';
import type {ParkingLotDetail} from '../../../types/parking';

interface DetailAroundTabProps {
  lot: ParkingLotDetail;
  onOpenDetail?: (id: string) => void;
}

export function DetailAroundTab({lot, onOpenDetail}: DetailAroundTabProps): React.JSX.Element {
  const nearby = mockParkingLots.filter(l => l.id !== lot.id).slice(0, 5);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.intro}>
        <Text style={styles.introName}>{lot.name}</Text>
        {' 기준 주변 주차장'}
      </Text>
      <View style={styles.cardList}>
        {nearby.map(l => (
          <ParkingCard
            key={l.id}
            lot={l}
            onPress={() => onOpenDetail?.(l.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {padding: 16, paddingBottom: 100},
  intro: {
    fontSize: 12,
    color: '#8B99AC',
    letterSpacing: -0.2,
    includeFontPadding: false,
    marginBottom: 12,
  },
  introName: {fontWeight: '600', color: '#4D5A6A'},
  cardList: {gap: 8},
});
