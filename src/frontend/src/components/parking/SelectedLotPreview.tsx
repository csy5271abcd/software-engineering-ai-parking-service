import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {STATUS_DISPLAY, CONGESTION_DISPLAY} from '../../utils/parkingStatus';
import type {ParkingLotDetail} from '../../types/parking';

interface SelectedLotPreviewProps {
  lot: ParkingLotDetail;
  onClose: () => void;
  onOpenDetail?: () => void;
}

export function SelectedLotPreview({
  lot,
  onClose,
  onOpenDetail,
}: SelectedLotPreviewProps): React.JSX.Element {
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
  const hasNfc = (lot.tags as string[]).includes('NFC');

  return (
    <View style={styles.wrap}>
      {/* Title row */}
      <View style={styles.titleRow}>
        <View style={styles.titleLeft}>
          <View style={styles.badgeRow}>
            <View style={[styles.badge, {backgroundColor: s.bg}]}>
              <View style={[styles.dot, {backgroundColor: s.color}]} />
              <Text style={[styles.badgeText, {color: s.color}]}>{s.label}</Text>
            </View>
            <View style={[styles.badge, {backgroundColor: c.bg}]}>
              <Text style={[styles.badgeText, {color: c.color}]}>{c.label}</Text>
            </View>
            {hasNfc && (
              <View style={[styles.badge, {backgroundColor: 'rgba(0,108,255,0.08)'}]}>
                <Text style={[styles.badgeText, {color: '#006CFF'}]}>NFC</Text>
              </View>
            )}
          </View>
          <Text style={styles.name} numberOfLines={2}>{lot.name}</Text>
          <Text style={styles.addr} numberOfLines={1}>
            {lot.address.roadAddress} · 도보 {walkMin}분
          </Text>
        </View>
        <Pressable onPress={onClose} style={styles.closeBtn} hitSlop={8}>
          <Text style={styles.closeBtnText}>✕</Text>
        </Pressable>
      </View>

      {/* Stat grid */}
      <View style={styles.statsGrid}>
        {[
          {label: '시간당', value: `₩${lot.pricePerHour.toLocaleString()}`},
          {label: '거리',   value: dist},
          {label: '운영',   value: opHours},
        ].map((stat, idx) => (
          <View
            key={stat.label}
            style={[styles.statCell, idx > 0 && styles.statCellBorder]}
          >
            <Text style={styles.statLabel}>{stat.label}</Text>
            <Text style={styles.statValue} numberOfLines={1}>{stat.value}</Text>
          </View>
        ))}
      </View>

      {/* Action buttons row */}
      <View style={styles.actionRow}>
        {[
          {label: '출발', primary: false},
          {label: '도착', primary: true},
          {label: '공유', primary: false},
          {label: '신고', primary: false},
        ].map(btn => (
          <Pressable
            key={btn.label}
            onPress={btn.primary ? onOpenDetail : undefined}
            style={[styles.actionBtn, btn.primary && styles.actionBtnPrimary]}
          >
            <Text
              style={[
                styles.actionBtnText,
                btn.primary && styles.actionBtnTextPrimary,
              ]}
            >
              {btn.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Detail button */}
      <Pressable onPress={onOpenDetail} style={styles.detailBtn}>
        <Text style={styles.detailBtnText}>상세 정보 열기</Text>
        <Text style={styles.detailBtnChevron}>›</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {gap: 12},

  // ── Title row ────────────────────────────────────────────────────────────────
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  titleLeft: {flex: 1, gap: 4},
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
  },
  dot: {width: 5, height: 5, borderRadius: 2.5},
  badgeText: {fontSize: 11, fontWeight: '700', includeFontPadding: false},
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.4,
    includeFontPadding: false,
    lineHeight: 26,
  },
  addr: {
    fontSize: 12.5,
    color: '#6B7C92',
    letterSpacing: -0.2,
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
    marginTop: 4,
  },
  closeBtnText: {
    fontSize: 13,
    color: '#6B7C92',
    fontWeight: '600',
    includeFontPadding: false,
  },

  // ── Stat grid ────────────────────────────────────────────────────────────────
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
    paddingHorizontal: 4,
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

  // ── Action row ───────────────────────────────────────────────────────────────
  actionRow: {flexDirection: 'row', gap: 6},
  actionBtn: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  actionBtnPrimary: {
    backgroundColor: '#006CFF',
    borderColor: '#006CFF',
    elevation: 2,
    shadowOpacity: 0.12,
  },
  actionBtnText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#4D5A6A',
    includeFontPadding: false,
    letterSpacing: -0.2,
  },
  actionBtnTextPrimary: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  // ── Detail button ────────────────────────────────────────────────────────────
  detailBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
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
    letterSpacing: -0.2,
  },
  detailBtnChevron: {
    fontSize: 16,
    color: '#8B99AC',
    includeFontPadding: false,
  },
});
