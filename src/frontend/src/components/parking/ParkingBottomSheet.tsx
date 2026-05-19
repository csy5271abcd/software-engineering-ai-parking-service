import React, {useRef, useCallback, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import {PARKING_STATUS} from '../../constants/status';
import {STATUS_DISPLAY, CONGESTION_DISPLAY} from '../../utils/parkingStatus';
import {ParkingCard} from './ParkingCard';
import type {ParkingLotDetail} from '../../types/parking';

// ── Sheet levels ──────────────────────────────────────────────────────────────

export type SheetMode = 'hidden' | 'default' | 'half' | 'full';

const {height: SCREEN_H} = Dimensions.get('window');

// visibleHeight for each mode (how much of the sheet is visible above bottom)
export const SHEET_SNAP: Record<SheetMode, number> = {
  hidden:  0,
  default: Math.round(SCREEN_H * 0.30),
  half:    Math.round(SCREEN_H * 0.50),
  full:    SCREEN_H,
};

// The sheet's rendered height is always SCREEN_H; we move it via translateY
const SHEET_RENDER_H = SCREEN_H;

// translateY value for each mode: positive = shifted down = less visible
function snapToTranslateY(mode: SheetMode): number {
  return SHEET_RENDER_H - SHEET_SNAP[mode];
}

const MODES: SheetMode[] = ['hidden', 'default', 'half', 'full'];

function nextMode(mode: SheetMode): SheetMode {
  const idx = MODES.indexOf(mode);
  return MODES[Math.min(idx + 1, MODES.length - 1)];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function nearestMode(translateY: number): SheetMode {
  let best: SheetMode = 'hidden';
  let bestDist = Infinity;
  for (const m of MODES) {
    const d = Math.abs(translateY - snapToTranslateY(m));
    if (d < bestDist) {
      bestDist = d;
      best = m;
    }
  }
  return best;
}

// ── Quick shortcuts ───────────────────────────────────────────────────────────

const QUICK_SHORTCUTS = [
  {id: 'home',     label: '집',   icon: '🏠', sub: '12분 · 여유', color: '#03AA5A'},
  {id: 'work',     label: '회사', icon: '🏢', sub: '24분 · 혼잡', color: '#FB5852'},
  {id: 'hospital', label: '병원', icon: '🏥', sub: '한양대 9분',  color: '#006CFF'},
] as const;

function QuickShortcuts(): React.JSX.Element {
  return (
    <View style={styles.shortcuts}>
      {QUICK_SHORTCUTS.map(s => (
        <Pressable key={s.id} style={styles.shortcut}>
          <View style={[styles.shortcutIcon, {backgroundColor: s.color + '1A'}]}>
            <Text style={styles.shortcutEmoji}>{s.icon}</Text>
          </View>
          <Text style={styles.shortcutLabel}>{s.label}</Text>
          <Text style={styles.shortcutSub} numberOfLines={1}>{s.sub}</Text>
        </Pressable>
      ))}
    </View>
  );
}

// ── Selected lot preview ──────────────────────────────────────────────────────

function SelectedPreview({
  lot,
  onClose,
}: {
  lot: ParkingLotDetail;
  onClose: () => void;
}): React.JSX.Element {
  const s = STATUS_DISPLAY[lot.status];
  const c = CONGESTION_DISPLAY[lot.congestionLevel];
  const dist =
    lot.distanceMeters >= 1000
      ? `${(lot.distanceMeters / 1000).toFixed(1)}km`
      : `${lot.distanceMeters}m`;
  const walkMin = Math.max(1, Math.round(lot.distanceMeters / 80));
  const opHours = lot.operationHours.isAllDay
    ? '24시간'
    : `${lot.operationHours.open}–${lot.operationHours.close}`;

  return (
    <View style={styles.selectedWrap}>
      <View style={styles.selectedTop}>
        <View style={styles.selectedInfo}>
          <View style={styles.selectedBadgeRow}>
            <View style={[styles.statusBadge, {backgroundColor: s.bg}]}>
              <View style={[styles.statusDot, {backgroundColor: s.color}]} />
              <Text style={[styles.statusLabel, {color: s.color}]}>{s.label}</Text>
            </View>
            <View style={[styles.statusBadge, {backgroundColor: c.bg}]}>
              <Text style={[styles.statusLabel, {color: c.color}]}>{c.label}</Text>
            </View>
          </View>
          <Text style={styles.selectedName} numberOfLines={2}>{lot.name}</Text>
          <Text style={styles.selectedAddr} numberOfLines={1}>
            {lot.address.roadAddress} · 도보 {walkMin}분
          </Text>
        </View>
        <Pressable onPress={onClose} style={styles.closeBtn}>
          <Text style={styles.closeBtnText}>✕</Text>
        </Pressable>
      </View>

      <View style={styles.statsGrid}>
        {[
          {label: '시간당', value: `₩${lot.pricePerHour.toLocaleString()}`},
          {label: '거리',   value: dist},
          {label: '운영',   value: opHours},
        ].map((stat, idx) => (
          <View key={stat.label} style={[styles.statCell, idx > 0 && styles.statCellBorder]}>
            <Text style={styles.statLabel}>{stat.label}</Text>
            <Text style={styles.statValue}>{stat.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.actionRow}>
        {[
          {label: '출발', primary: false},
          {label: '도착', primary: true},
          {label: '공유', primary: false},
          {label: '신고', primary: false},
        ].map(btn => (
          <Pressable
            key={btn.label}
            style={[styles.actionBtn, btn.primary && styles.actionBtnPrimary]}
          >
            <Text style={[styles.actionBtnText, btn.primary && styles.actionBtnTextPrimary]}>
              {btn.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.detailBtn}>
        <Text style={styles.detailBtnText}>상세 정보 열기</Text>
        <Text style={styles.detailBtnChevron}>›</Text>
      </Pressable>
    </View>
  );
}

// ── Section header ────────────────────────────────────────────────────────────

function SectionHeader({
  title,
  count,
  mode,
}: {
  title: string;
  count: number;
  mode: SheetMode;
}): React.JSX.Element {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionCount}>{count}곳</Text>
      <View style={styles.sectionSpacer} />
      <View style={styles.sortBtn}>
        <Text style={styles.sortBtnText}>
          {mode === 'full' ? '목록 ▲' : '목록 ▼'}
        </Text>
      </View>
    </View>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface ParkingBottomSheetProps {
  lots: readonly ParkingLotDetail[];
  selectedLot?: ParkingLotDetail | null;
  onSelectLot: (id: string | null) => void;
  mode: SheetMode;
  onModeChange: (mode: SheetMode) => void;
}

export function ParkingBottomSheet({
  lots,
  selectedLot,
  onSelectLot,
  mode,
  onModeChange,
}: ParkingBottomSheetProps): React.JSX.Element {
  const translateY = useRef(new Animated.Value(snapToTranslateY(mode))).current;
  // track the current snapped translateY so PanResponder can offset from it
  const baseY = useRef(snapToTranslateY(mode));

  // Animate to new mode whenever prop changes
  useEffect(() => {
    const target = snapToTranslateY(mode);
    baseY.current = target;
    Animated.spring(translateY, {
      toValue: target,
      useNativeDriver: true,
      bounciness: 4,
      speed: 14,
    }).start();
  }, [mode, translateY]);

  const DRAG_THRESHOLD = 50;

  // PanResponder for handle drag — only the handle bar triggers sheet movement
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_e, gs) => Math.abs(gs.dy) > 4,
        onPanResponderGrant: () => {
          // capture the current animated value so drag starts from current position
          translateY.stopAnimation(val => {
            baseY.current = val;
          });
        },
        onPanResponderMove: (_e, gs) => {
          const next = baseY.current + gs.dy;
          // clamp: cannot drag above full snap or below hidden snap
          const minY = snapToTranslateY('full');
          const maxY = snapToTranslateY('hidden');
          translateY.setValue(Math.max(minY, Math.min(maxY, next)));
        },
        onPanResponderRelease: (_e, gs) => {
          const currentY = baseY.current + gs.dy;
          let targetMode: SheetMode;

          if (Math.abs(gs.dy) < DRAG_THRESHOLD) {
            // Small movement — tap-like: advance one level on handle tap
            targetMode = nextMode(mode);
          } else if (gs.dy < 0) {
            // Dragged up — expand
            const idx = MODES.indexOf(mode);
            targetMode = MODES[Math.min(idx + 1, MODES.length - 1)];
          } else {
            // Dragged down — collapse
            const idx = MODES.indexOf(mode);
            targetMode = MODES[Math.max(idx - 1, 0)];
          }

          // Also snap to nearest if velocity is low — prevents overshooting
          if (Math.abs(gs.vy) < 0.3) {
            targetMode = nearestMode(currentY);
          }

          onModeChange(targetMode);
          // Animation driven by useEffect above
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, onModeChange],
  );

  const soonLots = lots.filter(l => l.status === PARKING_STATUS.SOON_AVAILABLE);

  const sortedLots = useMemo(
    () => [...lots].sort((a, b) => b.recommendationScore - a.recommendationScore),
    [lots],
  );

  const isScrollable = mode === 'full';

  const handleTap = useCallback(() => {
    onModeChange(nextMode(mode));
  }, [mode, onModeChange]);

  return (
    <Animated.View
      style={[styles.sheet, {transform: [{translateY}]}]}
    >
      {/* ── Handle bar — drag target ── */}
      <View {...panResponder.panHandlers} style={styles.handleArea}>
        <View style={styles.handleRow}>
          <View style={styles.handle} />
        </View>
        {mode !== 'hidden' && (
          <SectionHeader
            title={selectedLot ? '선택된 주차장' : '주변 주차장'}
            count={lots.length}
            mode={mode}
          />
        )}
      </View>

      {/* ── Scrollable content ── */}
      <ScrollView
        scrollEnabled={isScrollable}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        {selectedLot ? (
          <SelectedPreview lot={selectedLot} onClose={() => onSelectLot(null)} />
        ) : (
          <>
            <QuickShortcuts />
            {soonLots.length > 0 && (
              <View style={styles.soonBanner}>
                <View style={styles.soonIconCircle}>
                  <Text style={styles.soonIconText}>⏱</Text>
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
              </View>
            )}
          </>
        )}

        {lots.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>조건에 맞는 주차장이 없습니다</Text>
          </View>
        ) : (
          <View style={styles.cardList}>
            {sortedLots.map((lot, idx) => (
              <ParkingCard
                key={lot.id}
                lot={lot}
                rank={idx < 3 ? idx + 1 : undefined}
                selected={selectedLot ? selectedLot.id === lot.id : false}
                onPress={() => onSelectLot(lot.id)}
              />
            ))}
          </View>
        )}
      </ScrollView>

      {/* ── Hidden-state tap-to-open bar ── */}
      {mode === 'hidden' && (
        <Pressable onPress={handleTap} style={styles.hiddenTapBar}>
          <View style={styles.handle} />
          <Text style={styles.hiddenHintText}>주변 주차장 {lots.length}곳 ▲</Text>
        </Pressable>
      )}
    </Animated.View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    // sheet top edge starts at y=0; translateY shifts it down
    top: 0,
    height: SHEET_RENDER_H,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderColor: '#E5EAF1',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.10,
    shadowRadius: 12,
    zIndex: 40,
  },

  // ── Handle area ────────────────────────────────────────────────────────────
  handleArea: {
    flexShrink: 0,
  },
  handleRow: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 4,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CAD1DB',
  },

  // ── Section header ─────────────────────────────────────────────────────────
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
    gap: 4,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222225',
    includeFontPadding: false,
  },
  sectionCount: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8B99AC',
    marginLeft: 2,
    includeFontPadding: false,
  },
  sectionSpacer: {flex: 1},
  sortBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: '#F8F9FB',
    borderWidth: 1,
    borderColor: '#E5EAF1',
  },
  sortBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6B7C92',
    includeFontPadding: false,
  },

  // ── Scroll content ─────────────────────────────────────────────────────────
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 10,
  },

  // ── Quick shortcuts ────────────────────────────────────────────────────────
  shortcuts: {
    flexDirection: 'row',
    gap: 8,
  },
  shortcut: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    backgroundColor: '#FFFFFF',
  },
  shortcutIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shortcutEmoji: {fontSize: 16},
  shortcutLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#222225',
    includeFontPadding: false,
  },
  shortcutSub: {
    fontSize: 10,
    color: '#6B7C92',
    includeFontPadding: false,
  },

  // ── Soon banner ────────────────────────────────────────────────────────────
  soonBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#006CFF',
    borderRadius: 14,
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
  soonIconText: {fontSize: 20},
  soonTextWrap: {flex: 1},
  soonTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222225',
    marginBottom: 2,
    includeFontPadding: false,
  },
  soonCount: {color: '#006CFF'},
  soonSub: {
    fontSize: 12,
    color: '#6B7C92',
    includeFontPadding: false,
  },
  soonChevron: {
    fontSize: 18,
    color: '#8B99AC',
    includeFontPadding: false,
  },

  // ── Card list ──────────────────────────────────────────────────────────────
  cardList: {gap: 8},

  // ── Empty state ────────────────────────────────────────────────────────────
  emptyState: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#8B99AC',
    fontWeight: '500',
    includeFontPadding: false,
  },

  // ── Hidden tap bar (shown only in hidden mode) ─────────────────────────────
  hiddenTapBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderColor: '#E5EAF1',
    gap: 6,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.10,
    shadowRadius: 12,
  },
  hiddenHintText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4D5A6A',
    includeFontPadding: false,
  },

  // ── Selected preview ───────────────────────────────────────────────────────
  selectedWrap: {gap: 12},
  selectedTop: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
  },
  selectedInfo: {flex: 1, gap: 4},
  selectedBadgeRow: {flexDirection: 'row', gap: 4, flexWrap: 'wrap'},
  selectedName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.4,
    includeFontPadding: false,
  },
  selectedAddr: {
    fontSize: 12.5,
    color: '#6B7C92',
    includeFontPadding: false,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F8F9FB',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  closeBtnText: {
    fontSize: 13,
    color: '#6B7C92',
    fontWeight: '600',
    includeFontPadding: false,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusDot: {width: 5, height: 5, borderRadius: 2.5},
  statusLabel: {fontSize: 11, fontWeight: '700', includeFontPadding: false},
  statsGrid: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    overflow: 'hidden',
  },
  statCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  statCellBorder: {
    borderLeftWidth: 1,
    borderLeftColor: '#E5EAF1',
  },
  statLabel: {
    fontSize: 10.5,
    color: '#6B7C92',
    fontWeight: '500',
    marginBottom: 3,
    includeFontPadding: false,
  },
  statValue: {
    fontSize: 13.5,
    color: '#222225',
    fontWeight: '700',
    includeFontPadding: false,
  },
  actionRow: {flexDirection: 'row', gap: 6},
  actionBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  actionBtnPrimary: {
    backgroundColor: '#006CFF',
    borderColor: '#006CFF',
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4D5A6A',
    includeFontPadding: false,
  },
  actionBtnTextPrimary: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  detailBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F8F9FB',
    borderWidth: 1,
    borderColor: '#E5EAF1',
    gap: 4,
  },
  detailBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4D5A6A',
    includeFontPadding: false,
  },
  detailBtnChevron: {
    fontSize: 16,
    color: '#8B99AC',
    includeFontPadding: false,
  },
});
