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

  // default: no list, half: 2 cards, full: all cards
  const showNearby = mode === 'half' || mode === 'full';
  const visibleCards = mode === 'full' ? sortedLots : sortedLots.slice(0, 2);

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
          <AppIcon name="chevronRight" size={16} color="#8B99AC" strokeWidth={2.2} />
        </Pressable>
      )}

      {/* Nearby parking section — half and full only */}
      {showNearby && (
        <>
          <SectionHeader
            title="주변 주차장"
            sub={`${lots.length}곳`}
            actionLabel="목록"
            onAction={() => {}}
          />

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
                  onPressDetail={
                    onOpenDetail ? () => onOpenDetail(lot.id) : undefined
                  }
                />
              ))}
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {paddingHorizontal: 16, paddingBottom: 24},

  // ── Soon banner
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

  // ── Card list
  cardList: {gap: 8},

  // ── Empty state
  empty: {paddingVertical: 32, alignItems: 'center'},
  emptyText: {
    fontSize: 14,
    color: '#8B99AC',
    fontWeight: '500',
    includeFontPadding: false,
  },
});
