import React from 'react';
import {View, Text, Pressable, ScrollView, StyleSheet} from 'react-native';
import {SearchResultItem} from './SearchResultItem';

const RECENT_SEARCHES = [
  {name: '강남역', sub: '서울 강남구 강남대로 396', type: 'place'},
  {name: '코엑스 주차장', sub: '서울 강남구 영동대로 513', type: 'parking'},
  {name: '홍대입구역', sub: '서울 마포구 양화로 160', type: 'place'},
] as const;

const HOT_AREAS = [
  {name: '코엑스', sub: '특이값 +320% · 행사 영향'},
  {name: '잠실 롯데월드', sub: '주말 혼잡 · 매우혼잡 90%'},
  {name: '서울대공원', sub: '+180% · 어린이날 잔여 효과'},
] as const;

interface SearchInitialStateProps {
  onSelect: (name: string, sub: string) => void;
}

export function SearchInitialState({
  onSelect,
}: SearchInitialStateProps): React.JSX.Element {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Recent searches */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>최근 검색</Text>
          <Pressable hitSlop={8}>
            <Text style={styles.sectionAction}>전체 삭제</Text>
          </Pressable>
        </View>
        {RECENT_SEARCHES.map((r, i) => (
          <SearchResultItem
            key={i}
            name={r.name}
            sub={r.sub}
            icon={r.type === 'parking' ? 'parking' : 'place'}
            onPress={() => onSelect(r.name, r.sub)}
            isLast={i === RECENT_SEARCHES.length - 1}
          />
        ))}
      </View>

      {/* Hot areas */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>주차 수요 급증 지역</Text>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>
        {HOT_AREAS.map((t, i) => (
          <Pressable
            key={i}
            onPress={() => onSelect(t.name, t.sub)}
            style={[styles.hotRow, i < HOT_AREAS.length - 1 && styles.hotRowBorder]}
          >
            <Text style={[styles.hotRank, i === 0 && styles.hotRankFirst]}>
              {i + 1}
            </Text>
            <View style={styles.hotBody}>
              <Text style={styles.hotName}>{t.name}</Text>
              <Text style={styles.hotSub}>{t.sub}</Text>
            </View>
            <View style={styles.hotArrow}>
              <View style={styles.hotArrowUp} />
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},

  section: {
    paddingTop: 20,
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  sectionAction: {
    fontSize: 12,
    color: '#8B99AC',
    includeFontPadding: false,
  },

  // ── Live badge
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FB5852',
  },
  liveText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FB5852',
    includeFontPadding: false,
  },

  // ── Hot areas
  hotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  hotRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F2F4F7',
  },
  hotRank: {
    fontSize: 17,
    fontWeight: '800',
    color: '#8B99AC',
    width: 22,
    includeFontPadding: false,
  },
  hotRankFirst: {color: '#FB5852'},
  hotBody: {flex: 1, gap: 2},
  hotName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  hotSub: {
    fontSize: 11,
    color: '#FB5852',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  hotArrow: {width: 14, height: 14, alignItems: 'center', justifyContent: 'center'},
  hotArrowUp: {
    width: 8,
    height: 8,
    borderTopWidth: 1.5,
    borderRightWidth: 1.5,
    borderColor: '#FB5852',
    transform: [{rotate: '-45deg'}],
  },
});
