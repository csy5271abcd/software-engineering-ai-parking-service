import React, {useState} from 'react';
import {View, Text, Pressable, ScrollView, StyleSheet} from 'react-native';
import {AppIcon} from '../common/AppIcon';

type RecentItem = {
  name: string;
  sub: string;
  type: 'place' | 'subway';
};

const INITIAL_RECENTS: readonly RecentItem[] = [
  {name: '성수동 카페거리', sub: '서울 성동구', type: 'place'},
  {name: '서울숲', sub: '공원·테마파크', type: 'place'},
  {name: '한양대학교병원', sub: '병원', type: 'place'},
  {name: '코엑스', sub: '서울 강남구', type: 'place'},
  {name: '뚝섬역', sub: '2호선', type: 'subway'},
];

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
  const [recents, setRecents] = useState<RecentItem[]>([...INITIAL_RECENTS]);

  const removeRecent = (idx: number) => {
    setRecents(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* ── 최근 검색 ── */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>최근 검색</Text>
          <Pressable hitSlop={8} onPress={() => setRecents([])}>
            <Text style={styles.sectionAction}>전체 삭제</Text>
          </Pressable>
        </View>

        {recents.map((r, i) => (
          <View
            key={`${r.name}-${i}`}
            style={[styles.recentRow, i < recents.length - 1 && styles.recentRowBorder]}
          >
            <Pressable
              style={styles.recentMain}
              onPress={() => onSelect(r.name, r.sub)}
            >
              <View style={styles.iconCircle}>
                {r.type === 'subway' ? (
                  <AppIcon name="train" size={15} color="#4D5A6A" strokeWidth={1.8} />
                ) : (
                  <AppIcon name="mapPin" size={15} color="#4D5A6A" strokeWidth={1.8} />
                )}
              </View>
              <View style={styles.recentBody}>
                <Text style={styles.recentName}>{r.name}</Text>
                <Text style={styles.recentSub}>{r.sub}</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => removeRecent(i)}
              style={styles.deleteBtn}
              hitSlop={10}
            >
              <AppIcon name="x" size={12} color="#CAD1DB" strokeWidth={2.2} />
            </Pressable>
          </View>
        ))}
      </View>

      {/* ── 주차 수요 급증 지역 ── */}
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
            key={t.name}
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
            <AppIcon name="chevronUp" size={14} color="#FB5852" strokeWidth={2.4} />
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
    marginBottom: 8,
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

  // ── Recent searches
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  recentRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F2F4F7',
  },
  recentMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8F9FB',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  recentBody: {flex: 1, minWidth: 0, gap: 2},
  recentName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  recentSub: {
    fontSize: 11,
    color: '#8B99AC',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  deleteBtn: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Live badge
  liveBadge: {flexDirection: 'row', alignItems: 'center', gap: 4},
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
});
