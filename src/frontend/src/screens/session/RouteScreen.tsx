import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Svg, {Path} from 'react-native-svg';
import {MapPlaceholder} from '../../components/map/MapPlaceholder';
import {AppIcon} from '../../components/common/AppIcon';
import {getMockParkingLotById} from '../../mocks';

type NavParam = {
  RouteScreen: {parkingLotId: string};
  ActiveSessionScreen: {parkingLotId: string};
};

interface Props {
  route: RouteProp<NavParam, 'RouteScreen'>;
  navigation: StackNavigationProp<NavParam, 'RouteScreen'>;
}

const ROUTE_DATA = [
  {
    key: 0,
    name: '추천',
    dur: 7,
    dist: '1.2 km',
    cost: 0,
    color: '#006CFF',
    desc: '교통 원활',
  },
  {
    key: 1,
    name: '무료 도로',
    dur: 9,
    dist: '1.5 km',
    cost: 0,
    color: '#03AA5A',
    desc: '신호 적음',
  },
  {
    key: 2,
    name: '최단',
    dur: 6,
    dist: '0.9 km',
    cost: 800,
    color: '#F5683C',
    desc: '유료터널 1개',
  },
] as const;

const MAP_H = 260;

export function RouteScreen({route: navRoute, navigation}: Props): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const {parkingLotId} = navRoute.params;
  const lot = getMockParkingLotById(parkingLotId);
  const [selected, setSelected] = useState(0);

  const lotName = lot?.name ?? '목적지';
  const selectedRoute = ROUTE_DATA[selected as 0 | 1 | 2];

  return (
    <View style={styles.screen}>
      {/* ── Map area ── */}
      <View style={[styles.mapArea, {height: MAP_H + insets.top}]}>
        <MapPlaceholder>
          {/* SVG route line (percentage-based viewBox 0 0 100 100) */}
          <Svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
            pointerEvents="none"
          >
            <Path
              d="M 43 42 Q 45 44 47 47"
              stroke="#006CFF"
              strokeWidth={2}
              strokeDasharray="4 3"
              strokeLinecap="round"
              fill="none"
            />
          </Svg>

          {/* Destination marker (red) */}
          <View style={styles.destMarker}>
            <View style={styles.destCircle}>
              <Text style={styles.destLabel}>도</Text>
            </View>
            <View style={styles.destTail} />
          </View>

          {/* 추천 pill label on map */}
          <View style={[styles.routePill, {backgroundColor: selectedRoute.color}]}>
            <Text style={styles.routePillText}>
              {selectedRoute.name} · {selectedRoute.dur}분
            </Text>
          </View>
        </MapPlaceholder>

        {/* Floating header card */}
        <View style={[styles.headerCard, {top: insets.top + 10}]}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
            <AppIcon name="chevronLeft" size={20} color="#222225" strokeWidth={2.2} />
          </Pressable>
          <View style={styles.headerCenter}>
            <View style={styles.headerRow}>
              <View style={[styles.dot, {backgroundColor: '#006CFF'}]} />
              <Text style={styles.headerOrigin}>내 위치</Text>
            </View>
            <View style={styles.headerRow}>
              <View style={[styles.dot, {backgroundColor: '#FB5852'}]} />
              <Text style={styles.headerDest} numberOfLines={1}>{lotName}</Text>
            </View>
          </View>
          <Pressable style={styles.switchBtn} hitSlop={8}>
            <AppIcon name="refreshCw" size={18} color="#6B7C92" strokeWidth={2} />
          </Pressable>
        </View>
      </View>

      {/* ── Mode chips ── */}
      <View style={styles.modeRow}>
        {['자동차', '도보', '대중교통'].map((label, i) => (
          <View
            key={label}
            style={[styles.modeChip, i === 0 && styles.modeChipActive]}
          >
            <Text style={[styles.modeChipText, i === 0 && styles.modeChipTextActive]}>
              {label}
            </Text>
          </View>
        ))}
        <View style={styles.compareBtn}>
          <Text style={styles.compareBtnText}>경로 비교</Text>
          <AppIcon name="chevronRight" size={10} color="#8B99AC" strokeWidth={2.5} />
        </View>
      </View>

      {/* ── Route list ── */}
      <ScrollView
        style={styles.list}
        contentContainerStyle={[
          styles.listContent,
          {paddingBottom: Math.max(insets.bottom, 16) + 76},
        ]}
        showsVerticalScrollIndicator={false}
      >
        {ROUTE_DATA.map(r => (
          <Pressable
            key={r.key}
            onPress={() => setSelected(r.key)}
            style={[
              styles.card,
              selected === r.key && styles.cardActive,
            ]}
          >
            <View style={[styles.cardBar, {backgroundColor: r.color}]} />
            <View style={styles.cardBody}>
              <Text style={styles.cardName}>{r.name}</Text>
              <View style={styles.cardMetaRow}>
                <Text style={styles.cardMeta}>{r.dist}</Text>
                <Text style={styles.cardMetaDot}>·</Text>
                <Text style={styles.cardMeta}>
                  통행료 {r.cost === 0 ? '없음' : `₩${r.cost.toLocaleString()}`}
                </Text>
                <Text style={styles.cardMetaDot}>·</Text>
                <Text style={[styles.cardMeta, {color: r.cost > 0 ? '#F5683C' : '#03AA5A', fontWeight: '600'}]}>
                  {r.desc}
                </Text>
              </View>
            </View>
            <View style={styles.cardRight}>
              <View style={styles.cardDurRow}>
                <Text style={[styles.cardDur, {color: r.color}]}>{r.dur}</Text>
                <Text style={[styles.cardDurUnit, {color: r.color}]}>분</Text>
              </View>
              {r.cost === 0 && (
                <Text style={styles.cardFree}>무료</Text>
              )}
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {/* ── Bottom CTA ── */}
      <View style={[styles.cta, {paddingBottom: Math.max(insets.bottom, 16)}]}>
        <Pressable style={styles.ctaHexBtn}>
          <AppIcon name="slidersHorizontal" size={18} color="#4D5A6A" strokeWidth={2} />
        </Pressable>
        <Pressable style={styles.ctaStartBtn}>
          <AppIcon name="navigation" size={16} color="#FFFFFF" strokeWidth={2.2} />
          <Text style={styles.ctaStartText}>안내 시작 — {ROUTE_DATA[selected as 0 | 1 | 2].dur}분</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: '#FFFFFF'},

  // ── Map
  mapArea: {position: 'relative', overflow: 'hidden'},
  destMarker: {
    position: 'absolute',
    top: '38%',
    left: '42%',
    alignItems: 'center',
    zIndex: 15,
    transform: [{translateX: -20}],
  },
  destCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FB5852',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.22,
    shadowRadius: 5,
  },
  destLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  destTail: {
    width: 0,
    height: 0,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderTopWidth: 9,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FB5852',
    marginTop: -4,
  },
  routePill: {
    position: 'absolute',
    top: '35%',
    left: '52%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    zIndex: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.18,
    shadowRadius: 6,
  },
  routePillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },

  // ── Header card
  headerCard: {
    position: 'absolute',
    left: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    paddingHorizontal: 12,
    paddingVertical: 10,
    zIndex: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  backBtn: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {flex: 1, gap: 3},
  headerRow: {flexDirection: 'row', alignItems: 'center', gap: 6},
  dot: {width: 6, height: 6, borderRadius: 3},
  headerOrigin: {
    fontSize: 11,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  headerDest: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  switchBtn: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Mode row
  modeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#E5EAF1',
    backgroundColor: '#FFFFFF',
  },
  modeChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CAD1DB',
  },
  modeChipActive: {
    backgroundColor: '#222225',
    borderColor: '#222225',
  },
  modeChipText: {
    fontSize: 12.5,
    fontWeight: '500',
    color: '#4D5A6A',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  modeChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  compareBtn: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  compareBtnText: {
    fontSize: 11,
    color: '#8B99AC',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },

  // ── Route list
  list: {flex: 1, backgroundColor: '#FFFFFF'},
  listContent: {padding: 16, gap: 8},
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EAF1',
  },
  cardActive: {
    backgroundColor: '#F0F7FF',
    borderColor: '#B8D7FF',
  },
  cardBar: {
    width: 4,
    height: 36,
    borderRadius: 2,
    flexShrink: 0,
  },
  cardBody: {flex: 1, gap: 4},
  cardName: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  cardMetaRow: {flexDirection: 'row', alignItems: 'center', gap: 5, flexWrap: 'wrap'},
  cardMeta: {
    fontSize: 11.5,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  cardMetaDot: {
    fontSize: 11.5,
    color: '#6B7C92',
    includeFontPadding: false,
  },
  cardRight: {alignItems: 'flex-end', flexShrink: 0, minWidth: 40},
  cardDurRow: {flexDirection: 'row', alignItems: 'flex-end', gap: 1},
  cardDur: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
    includeFontPadding: false,
    lineHeight: 24,
  },
  cardDurUnit: {
    fontSize: 11,
    fontWeight: '700',
    includeFontPadding: false,
    marginBottom: 2,
  },
  cardFree: {
    fontSize: 10,
    fontWeight: '700',
    color: '#03AA5A',
    marginTop: 2,
    includeFontPadding: false,
  },

  // ── CTA
  cta: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5EAF1',
  },
  ctaHexBtn: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EAF1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaStartBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#006CFF',
    elevation: 3,
    shadowColor: '#006CFF',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  ctaStartText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
});
