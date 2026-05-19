import React from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PARKING_STATUS} from '../../constants/status';
import {mockParkingLots} from '../../mocks';
import {MapPlaceholder} from '../../components/map/MapPlaceholder';
import {ParkingMarker} from '../../components/map/ParkingMarker';
import {SoonAvailableCard} from '../../components/parking/SoonAvailableCard';
import type {ParkingStackParamList} from '../../navigation/navigationTypes';

type NavProp = StackNavigationProp<ParkingStackParamList, 'SoonAvailableScreen'>;

function toMapPos(lat: number, lon: number): {top: `${number}%`; left: `${number}%`} {
  const t = Math.round(Math.max(5, Math.min(85, ((37.57 - lat) / (37.57 - 37.45)) * 80 + 5)));
  const l = Math.round(Math.max(5, Math.min(90, ((lon - 126.9) / (127.12 - 126.9)) * 85 + 5)));
  return {top: `${t}%`, left: `${l}%`};
}

export function SoonAvailableScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavProp>();

  const soonLots = mockParkingLots
    .filter(l => l.status === PARKING_STATUS.SOON_AVAILABLE)
    .map(l => ({
      lot: l,
      soonMin: l.expectedExitAt
        ? Math.max(1, Math.round((new Date(l.expectedExitAt).getTime() - Date.now()) / 60000))
        : 10,
    }))
    .sort((a, b) => a.soonMin - b.soonMin);

  const handleOpenDetail = (id: string) => {
    navigation.navigate('ParkingDetailScreen', {parkingLotId: id});
  };

  return (
    <View style={styles.screen}>
      {/* ── Header ── */}
      <View style={[styles.header, {paddingTop: insets.top + 10}]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <View style={styles.chevronLeft} />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>곧 비워질 자리</Text>
          <Text style={styles.headerSub}>
            현재 주변 {soonLots.length}곳 · 평균 10분
          </Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      {/* ── Mini map ── */}
      <View style={styles.mapWrap}>
        <MapPlaceholder>
          {soonLots.map(({lot}) => {
            const pos = toMapPos(
              lot.coordinates.latitude,
              lot.coordinates.longitude,
            );
            return (
              <ParkingMarker
                key={lot.id}
                name={lot.name}
                status={lot.status}
                top={pos.top}
                left={pos.left}
                onPress={() => handleOpenDetail(lot.id)}
              />
            );
          })}
        </MapPlaceholder>
        <View style={styles.mapGradient} />
      </View>

      {/* ── Info banner ── */}
      <View style={styles.infoBanner}>
        <View style={styles.infoIcon}>
          <View style={styles.infoClockFace} />
        </View>
        <Text style={styles.infoText}>
          출차 예정 정보는 사용자가 입력한 값이에요. 변동 가능성을 고려해 주세요.
        </Text>
      </View>

      {/* ── List ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          {paddingBottom: insets.bottom + 20},
        ]}
        showsVerticalScrollIndicator={false}
      >
        {soonLots.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>현재 주변에 곧 비워질 자리가 없습니다</Text>
          </View>
        ) : (
          soonLots.map(({lot, soonMin}) => (
            <SoonAvailableCard
              key={lot.id}
              lot={lot}
              soonMin={soonMin}
              onPress={() => handleOpenDetail(lot.id)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: '#FFFFFF'},

  // ── Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5EAF1',
    backgroundColor: '#FFFFFF',
    gap: 4,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  chevronLeft: {
    width: 9,
    height: 9,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#222225',
    transform: [{rotate: '45deg'}],
  },
  headerCenter: {flex: 1, alignItems: 'center'},
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  headerSub: {
    fontSize: 11,
    color: '#8B99AC',
    includeFontPadding: false,
  },
  headerRight: {width: 36},

  // ── Mini map
  mapWrap: {
    height: 180,
    position: 'relative',
    overflow: 'hidden',
  },
  mapGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.92)',
  },

  // ── Info banner
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,108,255,0.05)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,108,255,0.18)',
  },
  infoIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: '#006CFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  infoClockFace: {
    width: 5,
    height: 5,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#006CFF',
    transform: [{rotate: '45deg'}, {translateX: -0.5}, {translateY: -0.5}],
  },
  infoText: {
    flex: 1,
    fontSize: 11.5,
    color: '#4D5A6A',
    lineHeight: 16,
    letterSpacing: -0.2,
    includeFontPadding: false,
  },

  scroll: {flex: 1},
  scrollContent: {padding: 16, gap: 8},

  empty: {paddingVertical: 48, alignItems: 'center'},
  emptyText: {
    fontSize: 14,
    color: '#8B99AC',
    includeFontPadding: false,
  },
});
