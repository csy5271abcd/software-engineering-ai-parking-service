import React, {useMemo} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {PARKING_STATUS} from '../../constants/status';
import {QuickShortcuts} from './QuickShortcuts';
import {SectionHeader} from './SectionHeader';
import {ParkingCard} from './ParkingCard';
import {AppIcon} from '../common/AppIcon';
import type {ParkingLotDetail} from '../../types/parking';

type SheetMode = 'default' | 'half' | 'full';

interface DefaultSheetContentProps {
  lots: readonly ParkingLotDetail[];
  mode: SheetMode;
  onSelectLot: (id: string) => void;
  onOpenDetail?: (id: string) => void;
  onPressSoon?: () => void;
}

export function DefaultSheetContent({
  lots,
  mode,
  onSelectLot,
  onOpenDetail,
  onPressSoon,
}: DefaultSheetContentProps): React.JSX.Element {
  const soonLots = lots.filter(l => l.status === PARKING_STATUS.SOON_AVAILABLE);

  const sortedLots = useMemo(
    () => [...lots].sort((a, b) => b.recommendationScore - a.recommendationScore),
    [lots],
  );

  const visibleCards = mode === 'full' ? sortedLots : sortedLots.slice(0, 3);

  return (
    <View style={styles.wrap}>
      {/* Quick shortcuts */}
      <QuickShortcuts />

      {/* Soon-available banner */}
      {soonLots.length > 0 && (
        <Pressable style={styles.soonBanner} onPress={onPressSoon}>
          <View style={styles.soonIconCircle}>
            <AppIcon name="clock" size={20} color="#FFFFFF" strokeWidth={2.2} />
          </View>
          <View style={styles.soonTextWrap}>
            <Text style={styles.soonTitle}>
              {'근처에 곧 비워질 자리 '}
              <Text style={styles.soonCount}>{soonLots.length}곳</Text>
            </Text>
            <Text style={styles.soonSub}>
              평균 10분 내 이용 가능 · AI 예측 기반
            </Text>
          </View>
          <Text style={styles.soonChevron}>›</Text>
        </Pressable>
      )}

      {/* Section header */}
      <SectionHeader
        title="주변 주차장"
        sub={`${lots.length}곳`}
        actionLabel="목록"
        onAction={() => {}}
      />

      {/* Card list */}
      {lots.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>조건에 맞는 주차장이 없습니다</Text>
        </View>
      ) : (
        <View style={styles.cardList}>
          {visibleCards.map((lot, idx) => (
            <ParkingCard
              key={lot.id}
              lot={lot}
              rank={idx < 3 ? idx + 1 : undefined}
              selected={false}
              onPress={() => onSelectLot(lot.id)}
              onPressDetail={onOpenDetail ? () => onOpenDetail(lot.id) : undefined}
            />
          ))}
        </View>
      )}

      {/* Full mode: AI 추천 section */}
      {mode === 'full' && (
        <View style={styles.aiSection}>
          <SectionHeader title="AI 추천" sub="주차 성공률 높은 곳" />
          <View style={styles.aiCard}>
            <View style={styles.aiTopRow}>
              <View style={styles.aiBadge}>
                <Text style={styles.aiBadgeText}>AI</Text>
              </View>
              <Text style={styles.aiCardTitle}>예측 기반 분석</Text>
            </View>
            <Text style={styles.aiCardBody}>
              현재 시간대에는{' '}
              <Text style={styles.aiHighlight}>
                {sortedLots[0]?.name ?? '주변 주차장'}
              </Text>
              의 주차 성공 가능성이{' '}
              <Text style={styles.aiSuccess}>
                {sortedLots[0]?.recommendationScore ?? 0}%
              </Text>
              로 가장 높습니다. 과거 패턴과 현재 이용률을 기반으로 분석했습니다.
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {paddingHorizontal: 16, paddingBottom: 24},

  // ── Soon banner ───────────────────────────────────────────────────────────────
  soonBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#006CFF',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },
  soonIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#006CFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  soonTextWrap: {flex: 1},
  soonTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
    marginBottom: 2,
  },
  soonCount: {color: '#006CFF'},
  soonSub: {
    fontSize: 12,
    color: '#6B7C92',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  soonChevron: {
    fontSize: 18,
    color: '#8B99AC',
    includeFontPadding: false,
  },

  // ── Card list ─────────────────────────────────────────────────────────────────
  cardList: {gap: 8},

  // ── Empty state ───────────────────────────────────────────────────────────────
  empty: {paddingVertical: 32, alignItems: 'center'},
  emptyText: {
    fontSize: 14,
    color: '#8B99AC',
    fontWeight: '500',
    includeFontPadding: false,
  },

  // ── AI section ────────────────────────────────────────────────────────────────
  aiSection: {marginTop: 24},
  aiCard: {
    backgroundColor: '#F8F9FB',
    borderWidth: 1,
    borderColor: '#E5EAF1',
    borderRadius: 12,
    padding: 14,
  },
  aiTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  aiBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#03AA5A',
  },
  aiBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  aiCardTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#222225',
    includeFontPadding: false,
  },
  aiCardBody: {
    fontSize: 13,
    color: '#4D5A6A',
    lineHeight: 20,
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  aiHighlight: {fontWeight: '700', color: '#222225'},
  aiSuccess: {fontWeight: '700', color: '#03AA5A'},
});
