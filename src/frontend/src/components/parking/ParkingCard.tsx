import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {PARKING_STATUS} from '../../constants/status';
import {ParkingStatusBadge, CongestionBadge} from './ParkingStatusBadge';
import type {ParkingLotDetail} from '../../types/parking';

interface ParkingCardProps {
  lot: ParkingLotDetail;
  onPress?: () => void;
  onPressDetail?: () => void;
  selected?: boolean;
  rank?: number;
}

export function ParkingCard({
  lot,
  onPress,
  onPressDetail,
  selected = false,
  rank,
}: ParkingCardProps): React.JSX.Element {
  const isShared = lot.type === 'PRIVATE';
  const walkMin = Math.max(1, Math.round(lot.distanceMeters / 80));
  const distLabel =
    lot.distanceMeters >= 1000
      ? `${(lot.distanceMeters / 1000).toFixed(1)}km`
      : `${lot.distanceMeters}m`;
  const isAllDay =
    lot.operationHours.isAllDay || (lot.tags as string[]).includes('24시간');
  const hasNfc = (lot.tags as string[]).includes('NFC');

  const soonLabel = (() => {
    if (lot.status !== PARKING_STATUS.SOON_AVAILABLE || !lot.expectedExitAt) {
      return null;
    }
    const diff = Math.round(
      (new Date(lot.expectedExitAt).getTime() - Date.now()) / 60000,
    );
    return diff > 0 ? `${diff}분 후 출차 예정` : '곧 출차 예정';
  })();

  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, selected && styles.cardSelected]}
    >
      {/* Thumbnail */}
      <View style={[styles.thumb, isShared && styles.thumbShared]}>
        {isShared ? (
          <Text style={styles.thumbEmoji}>🏠</Text>
        ) : (
          <Text style={styles.thumbP}>P</Text>
        )}
        {rank != null && (
          <View
            style={[
              styles.rankBadge,
              {backgroundColor: rank === 1 ? '#006CFF' : '#222225'},
            ]}
          >
            <Text style={styles.rankText}>{rank}</Text>
          </View>
        )}
      </View>

      {/* Body */}
      <View style={styles.body}>
        {/* Title row */}
        <View style={styles.titleRow}>
          <Text style={styles.name} numberOfLines={1}>
            {lot.name}
          </Text>
          {lot.recommendationScore >= 85 && (
            <View style={styles.aiScore}>
              <Text style={styles.aiScoreText}>AI {lot.recommendationScore}</Text>
            </View>
          )}
        </View>

        {/* Badge row */}
        <View style={styles.badgeRow}>
          <ParkingStatusBadge status={lot.status} />
          <CongestionBadge level={lot.congestionLevel} />
          {isShared && (
            <View style={styles.extraBadge}>
              <Text style={[styles.extraBadgeText, {color: '#006CFF'}]}>
                개인공유
              </Text>
            </View>
          )}
          {hasNfc && (
            <View style={styles.extraBadge}>
              <Text style={[styles.extraBadgeText, {color: '#006CFF'}]}>
                NFC
              </Text>
            </View>
          )}
          {isAllDay && (
            <View style={[styles.extraBadge, {backgroundColor: 'rgba(139,153,172,0.12)'}]}>
              <Text style={[styles.extraBadgeText, {color: '#6B7C92'}]}>
                24시간
              </Text>
            </View>
          )}
        </View>

        {/* Meta row */}
        <View style={styles.metaRow}>
          <Text style={styles.metaBold}>도보 {walkMin}분</Text>
          <Text style={styles.metaSep}>·</Text>
          <Text style={styles.metaText}>{distLabel}</Text>
          <Text style={styles.metaSep}>·</Text>
          <Text style={styles.metaText}>
            <Text style={styles.metaBold}>
              ₩{lot.pricePerHour.toLocaleString()}
            </Text>
            /시
          </Text>
        </View>

        {/* Soon row */}
        {soonLabel != null && (
          <View style={styles.soonRow}>
            <Text style={styles.soonText}>{soonLabel}</Text>
          </View>
        )}

        {/* Detail link */}
        {onPressDetail != null && (
          <Pressable onPress={onPressDetail} style={styles.detailLink} hitSlop={6}>
            <Text style={styles.detailLinkText}>상세 정보 ›</Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5EAF1',
  },
  cardSelected: {
    backgroundColor: '#F0F7FF',
    borderColor: '#B8D7FF',
  },

  // ── Thumbnail ──────────────────────────────────────────────────────────────
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 10,
    flexShrink: 0,
    backgroundColor: '#F0F4FF',
    borderWidth: 1,
    borderColor: '#E5EAF1',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  thumbShared: {
    backgroundColor: '#E8F4FF',
    borderColor: '#B8D7FF',
  },
  thumbP: {
    fontWeight: '800',
    fontSize: 26,
    color: '#006CFF',
    includeFontPadding: false,
  },
  thumbEmoji: {
    fontSize: 24,
  },
  rankBadge: {
    position: 'absolute',
    top: -6,
    left: -6,
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 11,
    includeFontPadding: false,
  },

  // ── Body ──────────────────────────────────────────────────────────────────
  body: {
    flex: 1,
    minWidth: 0,
    gap: 4,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 6,
  },
  name: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  aiScore: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: 'rgba(3,170,90,0.10)',
    flexShrink: 0,
  },
  aiScoreText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#03AA5A',
    includeFontPadding: false,
  },

  // ── Badges ────────────────────────────────────────────────────────────────
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  extraBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: 'rgba(0,108,255,0.08)',
  },
  extraBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    includeFontPadding: false,
  },

  // ── Meta ──────────────────────────────────────────────────────────────────
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  metaBold: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#4D5A6A',
    includeFontPadding: false,
  },
  metaSep: {
    fontSize: 12,
    color: '#CAD1DB',
    includeFontPadding: false,
  },
  metaText: {
    fontSize: 12.5,
    color: '#6B7C92',
    includeFontPadding: false,
  },

  // ── Detail link ──────────────────────────────────────────────────────────
  detailLink: {
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  detailLinkText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#006CFF',
    includeFontPadding: false,
  },

  // ── Soon row ──────────────────────────────────────────────────────────────
  soonRow: {
    marginTop: 4,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: 'rgba(0,108,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(0,108,255,0.18)',
    alignSelf: 'flex-start',
  },
  soonText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#006CFF',
    includeFontPadding: false,
  },
});
