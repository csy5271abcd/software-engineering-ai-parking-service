import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import {PARKING_STATUS} from '../../constants/status';
import {STATUS_DISPLAY} from '../../utils/parkingStatus';
import {colors, spacing, typography, radius} from '../../theme';
import type {ParkingLotDetail} from '../../types/parking';

// ── Quick shortcuts ───────────────────────────────────────────────────────────

const QUICK_SHORTCUTS = [
  {id: 'home',     label: '집',   icon: '🏠', sub: '12분 · 여유', color: '#03AA5A'},
  {id: 'work',     label: '회사', icon: '🏢', sub: '24분 · 혼잡', color: '#FB5852'},
  {id: 'hospital', label: '병원', icon: '🏥', sub: '한양대 9분', color: '#006CFF'},
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

// ── Panel ─────────────────────────────────────────────────────────────────────

interface HomeParkingSummaryProps {
  lots: readonly ParkingLotDetail[];
  selectedLot?: ParkingLotDetail | null;
  onSelectLot: (id: string | null) => void;
}

export function HomeParkingSummary({
  lots,
  selectedLot,
  onSelectLot,
}: HomeParkingSummaryProps): React.JSX.Element {
  const soonLots = lots.filter(l => l.status === PARKING_STATUS.SOON_AVAILABLE);

  return (
    <View style={styles.panel}>
      {/* Drag handle */}
      <View style={styles.handleRow}>
        <View style={styles.handle} />
      </View>

      {selectedLot ? (
        <SelectedPreview lot={selectedLot} onClose={() => onSelectLot(null)} />
      ) : (
        <View style={styles.defaultContent}>
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
                  평균 10분 내 이용 가능 · AI 예측
                </Text>
              </View>
              <Text style={styles.soonChevron}>›</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

// ── Selected preview ──────────────────────────────────────────────────────────

function SelectedPreview({
  lot,
  onClose,
}: {
  lot: ParkingLotDetail;
  onClose: () => void;
}): React.JSX.Element {
  const s = STATUS_DISPLAY[lot.status];
  const dist =
    lot.distanceMeters >= 1000
      ? `${(lot.distanceMeters / 1000).toFixed(1)}km`
      : `${lot.distanceMeters}m`;
  const walkMin = Math.max(1, Math.round(lot.distanceMeters / 80));

  return (
    <View style={styles.selectedWrap}>
      <View style={styles.selectedHeader}>
        <View style={styles.selectedTitleArea}>
          <View style={[styles.statusBadge, {backgroundColor: s.bg}]}>
            <View style={[styles.statusDot, {backgroundColor: s.color}]} />
            <Text style={[styles.statusLabel, {color: s.color}]}>
              {s.label}
            </Text>
          </View>
          <Text style={styles.selectedName} numberOfLines={2}>
            {lot.name}
          </Text>
          <Text style={styles.selectedAddr} numberOfLines={1}>
            {lot.address.roadAddress}
          </Text>
        </View>
        <Pressable onPress={onClose} style={styles.closeBtn}>
          <Text style={styles.closeBtnText}>✕</Text>
        </Pressable>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>시간당</Text>
          <Text style={styles.statValue}>
            ₩{lot.pricePerHour.toLocaleString()}
          </Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>거리</Text>
          <Text style={styles.statValue}>
            {dist} ({walkMin}분)
          </Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>가용</Text>
          <Text style={styles.statValue}>
            {lot.availableCount}/{lot.totalCount}
          </Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <Pressable style={styles.actionBtn}>
          <Text style={styles.actionBtnText}>출발</Text>
        </Pressable>
        <Pressable style={[styles.actionBtn, styles.actionBtnPrimary]}>
          <Text style={[styles.actionBtnText, styles.actionBtnTextPrimary]}>
            도착
          </Text>
        </Pressable>
        <Pressable style={styles.actionBtn}>
          <Text style={styles.actionBtnText}>공유</Text>
        </Pressable>
      </View>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.background.default,
    borderTopLeftRadius: radius.bottomSheet,
    borderTopRightRadius: radius.bottomSheet,
    maxHeight: 240,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.10,
    shadowRadius: 12,
    borderTopWidth: 1,
    borderColor: '#E5EAF1',
  },
  handleRow: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 6,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CAD1DB',
  },

  // ── Default view ──────────────────────────────────────────────────────────
  defaultContent: {
    paddingHorizontal: spacing.screen,
    paddingBottom: spacing.md,
    gap: 10,
  },

  // ── Quick shortcuts ───────────────────────────────────────────────────────
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
    backgroundColor: colors.background.default,
  },
  shortcutIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shortcutEmoji: {fontSize: 18},
  shortcutLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text.primary,
    includeFontPadding: false,
  },
  shortcutSub: {
    fontSize: 10,
    color: colors.text.secondary,
    includeFontPadding: false,
  },

  // ── Soon banner ───────────────────────────────────────────────────────────
  soonBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1.5,
    borderColor: '#006CFF',
    borderRadius: 14,
    padding: 12,
  },
  soonIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#006CFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  soonIconText: {fontSize: 16},
  soonTextWrap: {flex: 1},
  soonTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 2,
  },
  soonCount: {color: '#006CFF'},
  soonSub: {fontSize: 11, color: colors.text.secondary},
  soonChevron: {fontSize: 18, color: '#8B99AC', fontWeight: '300'},

  // ── Selected preview ──────────────────────────────────────────────────────
  selectedWrap: {
    paddingHorizontal: spacing.screen,
    paddingBottom: spacing.md,
    gap: 12,
  },
  selectedHeader: {flexDirection: 'row', gap: 8},
  selectedTitleArea: {flex: 1, gap: 4},
  selectedName: {...typography.title.md, color: colors.text.primary},
  selectedAddr: {...typography.caption.md, color: colors.text.secondary},
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F0F4FF',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 4,
  },
  closeBtnText: {fontSize: 13, color: '#6B7C92', fontWeight: '600'},
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  statusDot: {width: 5, height: 5, borderRadius: 3},
  statusLabel: {fontSize: 11, fontWeight: '700'},
  statsRow: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    overflow: 'hidden',
  },
  statItem: {flex: 1, alignItems: 'center', paddingVertical: 10},
  statDivider: {
    width: 1,
    backgroundColor: '#E5EAF1',
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 10,
    color: colors.text.secondary,
    fontWeight: '500',
    marginBottom: 3,
  },
  statValue: {fontSize: 13, color: colors.text.primary, fontWeight: '700'},
  actionRow: {flexDirection: 'row', gap: 6},
  actionBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    alignItems: 'center',
    backgroundColor: colors.background.default,
  },
  actionBtnPrimary: {backgroundColor: '#006CFF', borderColor: '#006CFF'},
  actionBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  actionBtnTextPrimary: {color: '#FFFFFF'},
});
