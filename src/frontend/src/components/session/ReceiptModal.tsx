import React from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppIcon} from '../common/AppIcon';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ReceiptData {
  receiptId: string;
  parkingLotName: string;
  parkingLotAddress?: string;
  startedAt: string;
  endedAt: string;
  durationMinutes: number;
  baseAmount: number;
  discountAmount: number;
  finalAmount: number;
  paymentMethod: string;
  approvalNumber: string;
  paidAt: string;
}

interface ReceiptModalProps {
  visible: boolean;
  onClose: () => void;
  receipt: ReceiptData;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const PAYMENT_METHOD_LABEL: Record<string, string> = {
  kakao: '카카오페이',
  shinhan: '신한카드',
  samsung: '삼성페이',
};

function formatCurrency(amount: number): string {
  return `₩${amount.toLocaleString()}`;
}

function formatDateTime(iso: string): string {
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) {return '-';}
    const yy = d.getFullYear();
    const mo = (d.getMonth() + 1).toString().padStart(2, '0');
    const dd = d.getDate().toString().padStart(2, '0');
    const hh = d.getHours().toString().padStart(2, '0');
    const mm = d.getMinutes().toString().padStart(2, '0');
    return `${yy}.${mo}.${dd} ${hh}:${mm}`;
  } catch {
    return '-';
  }
}

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) {return `${m}분`;}
  if (m === 0) {return `${h}시간`;}
  return `${h}시간 ${m}분`;
}

// ── Row helper ────────────────────────────────────────────────────────────────

function InfoRow({
  label,
  value,
  valueBlue,
  valueBold,
  last,
}: {
  label: string;
  value: string;
  valueBlue?: boolean;
  valueBold?: boolean;
  last?: boolean;
}): React.JSX.Element {
  return (
    <View style={[styles.infoRow, !last && styles.infoRowBorder]}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text
        style={[
          styles.infoValue,
          valueBlue && styles.infoValueBlue,
          valueBold && styles.infoValueBold,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export function ReceiptModal({visible, onClose, receipt}: ReceiptModalProps): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const methodLabel = PAYMENT_METHOD_LABEL[receipt.paymentMethod] ?? receipt.paymentMethod;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        {/* Tap-outside-to-close area */}
        <Pressable style={styles.dismissArea} onPress={onClose} />

        {/* Modal card — explicit height required so inner ScrollView(flex:1) can measure itself */}
        <View style={[styles.card, {height: SCREEN_HEIGHT * 0.86, paddingBottom: Math.max(insets.bottom, 16)}]}>
          {/* Handle */}
          <View style={styles.handle} />

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <AppIcon name="receiptText" size={17} color="#006CFF" strokeWidth={2} />
              <Text style={styles.headerTitle}>영수증</Text>
            </View>
            <Pressable onPress={onClose} style={styles.closeBtn} hitSlop={8}>
              <AppIcon name="x" size={18} color="#4D5A6A" strokeWidth={2.2} />
            </Pressable>
          </View>

          {/* Scrollable content */}
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {/* ── Success summary ── */}
            <View style={styles.successSection}>
              <View style={styles.successIconWrap}>
                <View style={styles.successGlow} />
                <View style={styles.successCircle}>
                  <AppIcon name="checkCircle" size={36} color="#FFFFFF" strokeWidth={2} fill="#FFFFFF" />
                </View>
              </View>
              <Text style={styles.successTitle}>결제 완료</Text>
              <Text style={styles.successAmount}>{formatCurrency(receipt.finalAmount)}</Text>
              <View style={styles.successBadge}>
                <Text style={styles.successBadgeText}>SmartPark 이용 영수증</Text>
              </View>
            </View>

            {/* ── 주차 이용 정보 ── */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <AppIcon name="circleParking" size={14} color="#006CFF" strokeWidth={2} />
                <Text style={styles.sectionTitle}>주차 이용 정보</Text>
              </View>
              <View style={styles.sectionCard}>
                <View style={styles.lotNameRow}>
                  <AppIcon name="mapPin" size={13} color="#6B7C92" strokeWidth={2} />
                  <Text style={styles.lotName}>{receipt.parkingLotName}</Text>
                </View>
                {receipt.parkingLotAddress != null && receipt.parkingLotAddress.length > 0 && (
                  <Text style={styles.lotAddress}>{receipt.parkingLotAddress}</Text>
                )}
                <View style={styles.sectionDivider} />
                <InfoRow label="입차 시간" value={formatDateTime(receipt.startedAt)} />
                <InfoRow label="출차 시간" value={formatDateTime(receipt.endedAt)} />
                <InfoRow
                  label="이용 시간"
                  value={formatDuration(receipt.durationMinutes)}
                  valueBold
                  last
                />
              </View>
            </View>

            {/* ── 결제 상세 ── */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <AppIcon name="circleDollarSign" size={14} color="#006CFF" strokeWidth={2} />
                <Text style={styles.sectionTitle}>결제 상세</Text>
              </View>
              <View style={styles.sectionCard}>
                <InfoRow
                  label="주차 요금"
                  value={formatCurrency(receipt.baseAmount)}
                />
                <InfoRow
                  label="할인/쿠폰"
                  value={receipt.discountAmount > 0 ? `-${formatCurrency(receipt.discountAmount)}` : '₩0'}
                />
                <View style={styles.totalDivider} />
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>최종 결제 금액</Text>
                  <Text style={styles.totalValue}>{formatCurrency(receipt.finalAmount)}</Text>
                </View>
              </View>
            </View>

            {/* ── 결제 정보 ── */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <AppIcon name="creditCard" size={14} color="#006CFF" strokeWidth={2} />
                <Text style={styles.sectionTitle}>결제 정보</Text>
              </View>
              <View style={styles.sectionCard}>
                <InfoRow label="결제 수단" value={methodLabel} />
                <InfoRow label="승인 번호" value={receipt.approvalNumber} />
                <InfoRow label="결제 일시" value={formatDateTime(receipt.paidAt)} />
                <View style={[styles.infoRow, {paddingTop: 10, paddingBottom: 2}]}>
                  <Text style={styles.infoLabel}>결제 상태</Text>
                  <View style={styles.paidBadge}>
                    <Text style={styles.paidBadgeText}>결제완료</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* ── 안내 문구 ── */}
            <View style={styles.noticeBox}>
              <AppIcon name="alertCircle" size={12} color="#006CFF" strokeWidth={2} />
              <Text style={styles.noticeText}>
                본 영수증은 SmartPark 앱 내 이용 내역에서도 다시 확인할 수 있어요.
              </Text>
            </View>

            <View style={styles.receiptId}>
              <Text style={styles.receiptIdText}>영수증 번호 {receipt.receiptId}</Text>
            </View>
          </ScrollView>

          {/* ── Close button ── */}
          <View style={styles.footer}>
            <Pressable onPress={onClose} style={styles.closeFooterBtn}>
              <Text style={styles.closeFooterBtnText}>닫기</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  dismissArea: {flex: 1},

  // ── Card
  card: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    // height is set inline (SCREEN_HEIGHT * 0.86) so ScrollView(flex:1) can measure
  },
  handle: {
    width: 38,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D9E6',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 4,
  },

  // ── Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F3',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  closeBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
  },

  // ── Scroll
  scroll: {flex: 1},
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    gap: 16,
  },

  // ── Success section
  successSection: {
    alignItems: 'center',
    paddingVertical: 8,
    gap: 6,
  },
  successIconWrap: {
    width: 88,
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  successGlow: {
    position: 'absolute',
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(0,108,255,0.10)',
  },
  successCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#006CFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#006CFF',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.4,
    includeFontPadding: false,
  },
  successAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: '#006CFF',
    letterSpacing: -1,
    includeFontPadding: false,
  },
  successBadge: {
    backgroundColor: 'rgba(0,108,255,0.08)',
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 2,
  },
  successBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#006CFF',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },

  // ── Section
  section: {gap: 8},
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#006CFF',
    letterSpacing: -0.1,
    includeFontPadding: false,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    paddingHorizontal: 16,
    paddingVertical: 4,
  },

  // Lot name row
  lotNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingTop: 12,
    paddingBottom: 2,
  },
  lotName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.2,
    includeFontPadding: false,
    flex: 1,
  },
  lotAddress: {
    fontSize: 11.5,
    color: '#8B99AC',
    letterSpacing: -0.2,
    includeFontPadding: false,
    paddingBottom: 8,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#F0F0F3',
    marginBottom: 4,
  },

  // ── Info row
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 9,
  },
  infoRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F8F9FB',
  },
  infoLabel: {
    fontSize: 12.5,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  infoValue: {
    fontSize: 12.5,
    color: '#222225',
    fontWeight: '500',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  infoValueBlue: {
    color: '#006CFF',
    fontWeight: '700',
  },
  infoValueBold: {
    fontWeight: '700',
  },

  // ── Total row
  totalDivider: {
    height: 1,
    backgroundColor: '#E5EAF1',
    marginVertical: 4,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#006CFF',
    letterSpacing: -0.5,
    includeFontPadding: false,
  },

  // ── Paid badge
  paidBadge: {
    backgroundColor: '#E8F5EC',
    borderRadius: 100,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  paidBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#03AA5A',
    letterSpacing: -0.1,
    includeFontPadding: false,
  },

  // ── Notice
  noticeBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 7,
    backgroundColor: 'rgba(0,108,255,0.05)',
    borderRadius: 10,
    padding: 12,
  },
  noticeText: {
    flex: 1,
    fontSize: 11.5,
    color: '#4D72B8',
    letterSpacing: -0.2,
    lineHeight: 17,
    includeFontPadding: false,
  },

  // ── Receipt ID
  receiptId: {alignItems: 'center', paddingVertical: 4},
  receiptIdText: {
    fontSize: 10.5,
    color: '#B0BAC8',
    letterSpacing: -0.1,
    includeFontPadding: false,
  },

  // ── Footer
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F3',
  },
  closeFooterBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  closeFooterBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#4D5A6A',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
});
