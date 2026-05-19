import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppIcon} from '../../components/common/AppIcon';
import {getMockParkingLotById} from '../../mocks';

type NavParam = {
  PaymentScreen: {parkingLotId: string};
  PaymentResultScreen: {parkingLotId: string};
};

interface Props {
  route: RouteProp<NavParam, 'PaymentScreen'>;
  navigation: StackNavigationProp<NavParam, 'PaymentScreen'>;
}

const METHODS = [
  {key: 'kakao', name: '카카오페이', sub: '간편결제 · 5만원 한도', emoji: '💛', disabled: false},
  {key: 'shinhan', name: '신한카드', sub: '국민·체크 8***', emoji: '💳', disabled: false},
  {key: 'samsung', name: '삼성페이', sub: '연결 안됨', emoji: '📱', disabled: true},
] as const;

const TOTAL_FEE = 4000;

export function PaymentScreen({route: navRoute, navigation}: Props): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const {parkingLotId} = navRoute.params;
  const lot = getMockParkingLotById(parkingLotId);
  const [method, setMethod] = useState<'kakao' | 'shinhan' | 'samsung'>('kakao');

  const lotName = lot?.name ?? '주차장';
  const pricePerHour = lot?.pricePerHour ?? 1500;

  return (
    <View style={styles.screen}>
      {/* ── Header ── */}
      <View style={[styles.header, {paddingTop: insets.top + 4}]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.headerBackBtn} hitSlop={8}>
          <AppIcon name="chevronLeft" size={20} color="#222225" strokeWidth={2.2} />
        </Pressable>
        <Text style={styles.headerTitle}>결제</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* ── Scrollable content ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          {paddingBottom: Math.max(insets.bottom, 16) + 80},
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Usage summary card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>주차 이용</Text>
          <Text style={styles.summaryLotName}>{lotName}</Text>

          {[
            {label: '입차', value: '오늘 13:40', bold: false},
            {label: '출차', value: '오늘 15:12', bold: false},
            {label: '이용 시간', value: '1시간 32분', bold: true},
            {label: '시간당 요금', value: `₩${pricePerHour.toLocaleString()}`, bold: false},
          ].map(r => (
            <View key={r.label} style={styles.summaryRow}>
              <Text style={styles.summaryRowLabel}>{r.label}</Text>
              <Text style={[styles.summaryRowValue, r.bold && styles.summaryRowValueBold]}>
                {r.value}
              </Text>
            </View>
          ))}

          <View style={styles.summaryDivider} />

          <View style={styles.summaryTotalRow}>
            <Text style={styles.summaryTotalLabel}>최종 결제 금액</Text>
            <Text style={styles.summaryTotalValue}>₩{TOTAL_FEE.toLocaleString()}</Text>
          </View>
        </View>

        {/* Payment methods */}
        <View style={styles.methodSection}>
          <View style={styles.methodSectionHeader}>
            <Text style={styles.methodSectionTitle}>결제 수단</Text>
            <Pressable hitSlop={8}>
              <Text style={styles.methodManage}>관리 &gt;</Text>
            </Pressable>
          </View>

          <View style={styles.methodList}>
            {METHODS.map(m => (
              <Pressable
                key={m.key}
                onPress={() => !m.disabled && setMethod(m.key)}
                style={[
                  styles.methodCard,
                  method === m.key && styles.methodCardActive,
                  m.disabled && styles.methodCardDisabled,
                ]}
                disabled={m.disabled}
              >
                <Text style={styles.methodEmoji}>{m.emoji}</Text>
                <View style={styles.methodInfo}>
                  <Text style={[styles.methodName, m.disabled && styles.methodNameDisabled]}>
                    {m.name}
                  </Text>
                  <Text style={[styles.methodSub, m.disabled && styles.methodSubDisabled]}>
                    {m.sub}
                  </Text>
                </View>
                <View
                  style={[
                    styles.radio,
                    method === m.key && styles.radioActive,
                    m.disabled && styles.radioDisabled,
                  ]}
                >
                  {method === m.key && !m.disabled && (
                    <View style={styles.radioDot} />
                  )}
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Coupon row */}
        <Pressable style={styles.couponRow}>
          <AppIcon name="fileText" size={14} color="#8B99AC" strokeWidth={2} />
          <Text style={styles.couponText}>쿠폰 사용 (보유 0장)</Text>
        </Pressable>
      </ScrollView>

      {/* ── Fixed bottom CTA ── */}
      <View style={[styles.cta, {paddingBottom: Math.max(insets.bottom, 16)}]}>
        <Pressable
          onPress={() => navigation.navigate('PaymentResultScreen', {parkingLotId})}
          style={styles.ctaBtn}
        >
          <Text style={styles.ctaBtnText}>₩{TOTAL_FEE.toLocaleString()} 결제하기</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: '#F8F9FB'},

  // ── Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5EAF1',
  },
  headerBackBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  headerSpacer: {width: 36},

  // ── Scroll
  scroll: {flex: 1},
  scrollContent: {padding: 16, gap: 14},

  // ── Summary card
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    padding: 18,
  },
  summaryLabel: {
    fontSize: 11,
    color: '#8B99AC',
    letterSpacing: -0.2,
    includeFontPadding: false,
    marginBottom: 4,
  },
  summaryLotName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
    marginBottom: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 7,
  },
  summaryRowLabel: {
    fontSize: 13,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  summaryRowValue: {
    fontSize: 13,
    color: '#222225',
    fontWeight: '500',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  summaryRowValueBold: {fontWeight: '700'},
  summaryDivider: {height: 1, backgroundColor: '#F0F0F3', marginVertical: 10},
  summaryTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryTotalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  summaryTotalValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#006CFF',
    letterSpacing: -0.5,
    includeFontPadding: false,
  },

  // ── Methods
  methodSection: {gap: 8},
  methodSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  methodSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  methodManage: {
    fontSize: 13,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  methodList: {gap: 8},
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EAF1',
  },
  methodCardActive: {
    backgroundColor: '#F0F7FF',
    borderColor: '#006CFF',
  },
  methodCardDisabled: {opacity: 0.42},
  methodEmoji: {fontSize: 22},
  methodInfo: {flex: 1, gap: 2},
  methodName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222225',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  methodNameDisabled: {color: '#8B99AC'},
  methodSub: {
    fontSize: 11,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  methodSubDisabled: {color: '#8B99AC'},
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CAD1DB',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  radioActive: {borderColor: '#006CFF', backgroundColor: '#006CFF'},
  radioDisabled: {borderColor: '#E5EAF1'},
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },

  // ── Coupon
  couponRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CAD1DB',
    backgroundColor: '#FFFFFF',
  },
  couponText: {
    fontSize: 13,
    color: '#8B99AC',
    fontWeight: '500',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },

  // ── CTA
  cta: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5EAF1',
  },
  ctaBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: '#006CFF',
    elevation: 3,
    shadowColor: '#006CFF',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  ctaBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
});
