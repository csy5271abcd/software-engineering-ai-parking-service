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
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native';
import {SelectedLotPreview} from './SelectedLotPreview';
import {DefaultSheetContent} from './DefaultSheetContent';
import type {ParkingLotDetail} from '../../types/parking';

// ── Sheet levels ──────────────────────────────────────────────────────────────

export type SheetMode = 'hidden' | 'default' | 'half' | 'full';

const {height: SCREEN_H} = Dimensions.get('window');

export const SHEET_SNAP: Record<SheetMode, number> = {
  hidden:  0,
  default: Math.round(SCREEN_H * 0.30),
  half:    Math.round(SCREEN_H * 0.50),
  full:    SCREEN_H,
};

const SHEET_RENDER_H = SCREEN_H;

function snapToTranslateY(mode: SheetMode): number {
  return SHEET_RENDER_H - SHEET_SNAP[mode];
}

const MODES: SheetMode[] = ['hidden', 'default', 'half', 'full'];

function nextMode(mode: SheetMode): SheetMode {
  const idx = MODES.indexOf(mode);
  return MODES[Math.min(idx + 1, MODES.length - 1)];
}

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

// ── Main component ────────────────────────────────────────────────────────────

interface ParkingBottomSheetProps {
  lots: readonly ParkingLotDetail[];
  selectedLot?: ParkingLotDetail | null;
  onSelectLot: (id: string | null) => void;
  onOpenDetail?: (id: string) => void;
  onPressSoon?: () => void;
  mode: SheetMode;
  onModeChange: (mode: SheetMode) => void;
}

export function ParkingBottomSheet({
  lots,
  selectedLot,
  onSelectLot,
  onOpenDetail,
  onPressSoon,
  mode,
  onModeChange,
}: ParkingBottomSheetProps): React.JSX.Element {
  const translateY = useRef(new Animated.Value(snapToTranslateY(mode))).current;
  const baseY = useRef(snapToTranslateY(mode));
  const scrollOffset = useRef(0);

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

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_e, gs) => Math.abs(gs.dy) > 4,
        onPanResponderGrant: () => {
          translateY.stopAnimation(val => {
            baseY.current = val;
          });
        },
        onPanResponderMove: (_e, gs) => {
          const next = baseY.current + gs.dy;
          const minY = snapToTranslateY('full');
          const maxY = snapToTranslateY('hidden');
          translateY.setValue(Math.max(minY, Math.min(maxY, next)));
        },
        onPanResponderRelease: (_e, gs) => {
          const currentY = baseY.current + gs.dy;
          let targetMode: SheetMode;

          if (Math.abs(gs.dy) < DRAG_THRESHOLD) {
            targetMode = nextMode(mode);
          } else if (gs.dy < 0) {
            const idx = MODES.indexOf(mode);
            targetMode = MODES[Math.min(idx + 1, MODES.length - 1)];
          } else {
            const idx = MODES.indexOf(mode);
            targetMode = MODES[Math.max(idx - 1, 0)];
          }

          if (Math.abs(gs.vy) < 0.3) {
            targetMode = nearestMode(currentY);
          }

          onModeChange(targetMode);
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, onModeChange],
  );

  // ── Content-area pan responder (captures downward swipe at scroll top) ──────
  const contentPanResponder = useMemo(
    () =>
      PanResponder.create({
        // Capture phase: intercept before ScrollView claims the gesture
        onMoveShouldSetPanResponderCapture: (_e, gs) =>
          mode === 'full' && scrollOffset.current <= 0 && gs.dy > 10,
        onPanResponderGrant: () => {
          translateY.stopAnimation(val => {
            baseY.current = val;
          });
        },
        onPanResponderMove: (_e, gs) => {
          if (gs.dy <= 0) {return;}
          const next = baseY.current + gs.dy;
          translateY.setValue(
            Math.max(snapToTranslateY('full'), Math.min(snapToTranslateY('hidden'), next)),
          );
        },
        onPanResponderRelease: (_e, gs) => {
          const currentY = baseY.current + gs.dy;
          let targetMode: SheetMode;
          if (gs.vy > 0.5) {
            // Fast downward flick → go one level down
            const idx = MODES.indexOf(mode);
            targetMode = MODES[Math.max(idx - 1, 0)];
          } else {
            targetMode = nearestMode(currentY);
          }
          onModeChange(targetMode);
        },
        onPanResponderTerminate: () => {
          // Interrupted — snap back to current mode
          onModeChange(mode);
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, onModeChange],
  );

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollOffset.current = e.nativeEvent.contentOffset.y;
    },
    [],
  );

  const isScrollable = mode === 'full';

  const handleTap = useCallback(() => {
    onModeChange(nextMode(mode));
  }, [mode, onModeChange]);

  // Determine content mode for DefaultSheetContent
  const contentMode: 'default' | 'half' | 'full' =
    mode === 'full' ? 'full' : mode === 'half' ? 'half' : 'default';

  return (
    <Animated.View style={[styles.sheet, {transform: [{translateY}]}]}>
      {/* ── Handle bar — drag target ── */}
      <View {...panResponder.panHandlers} style={styles.handleArea}>
        <View style={styles.handleRow}>
          <View style={styles.handle} />
        </View>
      </View>

      {/* ── Scrollable content ── */}
      <View {...contentPanResponder.panHandlers} style={styles.scrollWrap}>
        <ScrollView
          scrollEnabled={isScrollable}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {selectedLot ? (
            <SelectedLotPreview
              lot={selectedLot}
              onClose={() => onSelectLot(null)}
              onOpenDetail={
                onOpenDetail ? () => onOpenDetail(selectedLot.id) : undefined
              }
            />
          ) : (
            <DefaultSheetContent
              lots={lots}
              mode={contentMode}
              onSelectLot={(id: string) => onSelectLot(id)}
              onOpenDetail={onOpenDetail}
              onPressSoon={onPressSoon}
            />
          )}
        </ScrollView>
      </View>

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
    top: 0,
    height: SHEET_RENDER_H,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderColor: '#E5EAF1',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -6},
    shadowOpacity: 0.10,
    shadowRadius: 16,
    zIndex: 40,
  },
  handleArea: {
    flexShrink: 0,
  },
  scrollWrap: {
    flex: 1,
  },
  handleRow: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 8,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CAD1DB',
  },
  scrollContent: {
    paddingBottom: 32,
  },
  hiddenTapBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
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
    letterSpacing: -0.3,
  },
});
