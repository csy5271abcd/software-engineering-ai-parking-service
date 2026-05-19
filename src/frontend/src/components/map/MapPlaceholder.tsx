import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Naver Map-style light palette (not in theme — map-specific)
const M = {
  land: '#F5F5EF',
  water: '#B6DDED',
  park: '#D6E7C4',
  building: '#E8E4DA',
  roadFill: '#FFE8A8',
  roadOutline: '#F0CC72',
  roadMinor: '#FFFFFF',
  roadMinorBorder: '#D6D6CE',
  label: '#2C3038',
  locBlue: '#006CFF',
  locRing: 'rgba(0,108,255,0.18)',
} as const;

// [top%, left%, width%, height%]
const BUILDINGS: ReadonlyArray<readonly [number, number, number, number]> = [
  [14, 38, 11, 7], [10, 54, 9, 6],  [17, 68, 13, 8],
  [28, 42, 7, 5],  [26, 56, 9, 7],  [28, 72, 11, 6],
  [46, 38, 9, 6],  [44, 54, 7, 5],  [44, 70, 9, 5],
  [10, 82, 11, 8], [26, 86, 7, 5],  [44, 82, 9, 6],
  [34, 12, 8, 5],  [60, 60, 7, 5],  [42, 66, 8, 5],
];

interface MapPlaceholderProps {
  children?: React.ReactNode;
}

export function MapPlaceholder({children}: MapPlaceholderProps): React.JSX.Element {
  return (
    <View style={styles.map}>
      {/* Water — river at bottom */}
      <View style={styles.water} />

      {/* Park — top-left (Seoul Forest) */}
      <View style={styles.park} />

      {/* Building blocks */}
      {BUILDINGS.map(([t, l, w, h], i) => (
        <View
          key={i}
          style={[
            styles.building,
            {
              top: `${t}%`,
              left: `${l}%`,
              width: `${w}%`,
              height: `${h}%`,
            },
          ]}
        />
      ))}

      {/* Major road outlines */}
      <View style={[styles.roadOutlineH, {top: '37%'}]} />
      <View style={[styles.roadOutlineH, {top: '59%'}]} />
      <View style={[styles.roadOutlineV, {left: '35%'}]} />
      <View style={[styles.roadOutlineV, {left: '71%'}]} />

      {/* Major road fills */}
      <View style={[styles.roadFillH, {top: '37%'}]} />
      <View style={[styles.roadFillH, {top: '59%'}]} />
      <View style={[styles.roadFillV, {left: '35%'}]} />
      <View style={[styles.roadFillV, {left: '71%'}]} />

      {/* Minor roads */}
      <View style={[styles.roadMinorH, {top: '20%'}]} />
      <View style={[styles.roadMinorH, {top: '76%'}]} />
      <View style={[styles.roadMinorV, {left: '22%'}]} />
      <View style={[styles.roadMinorV, {left: '58%'}]} />
      <View style={[styles.roadMinorV, {left: '88%'}]} />

      {/* Place labels */}
      <Text style={[styles.placeLabel, {top: '11%', left: '6%'}]}>서울숲</Text>
      <Text style={[styles.placeLabel, {top: '41%', left: '42%'}]}>성수역</Text>
      <Text style={[styles.placeLabel, {top: '63%', left: '70%'}]}>뚝섬역</Text>

      {/* Current location */}
      <View style={styles.locRing} />
      <View style={styles.locDot} />

      {/* Attribution */}
      <Text style={styles.attribution}>SmartPark Maps</Text>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: M.land,
    overflow: 'hidden',
  },
  water: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '20%',
    backgroundColor: M.water,
    opacity: 0.9,
  },
  park: {
    position: 'absolute',
    top: '4%',
    left: '2%',
    width: '27%',
    height: '22%',
    backgroundColor: M.park,
    borderRadius: 8,
    opacity: 0.9,
  },
  building: {
    position: 'absolute',
    backgroundColor: M.building,
    borderRadius: 2,
    opacity: 0.65,
  },
  roadOutlineH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 8,
    backgroundColor: M.roadOutline,
  },
  roadOutlineV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 8,
    backgroundColor: M.roadOutline,
  },
  roadFillH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 5,
    marginTop: 1.5,
    backgroundColor: M.roadFill,
  },
  roadFillV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 5,
    marginLeft: 1.5,
    backgroundColor: M.roadFill,
  },
  roadMinorH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: M.roadMinor,
    opacity: 0.9,
  },
  roadMinorV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: M.roadMinor,
    opacity: 0.9,
  },
  placeLabel: {
    position: 'absolute',
    fontSize: 10,
    fontWeight: '600',
    color: M.label,
  },
  locRing: {
    position: 'absolute',
    top: '46%',
    left: '46%',
    width: 60,
    height: 60,
    marginTop: -30,
    marginLeft: -30,
    borderRadius: 30,
    backgroundColor: M.locRing,
  },
  locDot: {
    position: 'absolute',
    top: '46%',
    left: '46%',
    width: 16,
    height: 16,
    marginTop: -8,
    marginLeft: -8,
    borderRadius: 8,
    backgroundColor: M.locBlue,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  attribution: {
    position: 'absolute',
    bottom: 6,
    right: 8,
    fontSize: 9,
    color: '#6B7C92',
    opacity: 0.6,
  },
});
