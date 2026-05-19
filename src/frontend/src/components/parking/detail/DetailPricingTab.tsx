import React, {useState} from 'react';
import {View, Text, Pressable, ScrollView, StyleSheet} from 'react-native';
import {SectionHeader} from '../SectionHeader';
import type {ParkingLotDetail} from '../../../types/parking';

interface DetailPricingTabProps {
  lot: ParkingLotDetail;
}

export function DetailPricingTab({lot}: DetailPricingTabProps): React.JSX.Element {
  const [hours, setHours] = useState(2);
  const fee = lot.fee;
  const estimated = lot.pricePerHour * hours;
  const daily = fee?.maxDailyFee ?? lot.pricePerHour * 10;

  const increment = () => setHours(h => Math.min(h + 1, 24));
  const decrement = () => setHours(h => Math.max(h - 1, 1));

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {/* Calculator */}
      <SectionHeader title="요금 계산기" />
      <View style={styles.calcCard}>
        <View style={styles.calcRow}>
          <Text style={styles.calcLabel}>예상 이용 시간</Text>
          <View style={styles.stepper}>
            <Pressable onPress={decrement} style={styles.stepBtn} hitSlop={8}>
              <Text style={styles.stepBtnText}>−</Text>
            </Pressable>
            <Text style={styles.stepValue}>{hours}시간</Text>
            <Pressable onPress={increment} style={styles.stepBtn} hitSlop={8}>
              <Text style={styles.stepBtnText}>+</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.estimateBox}>
          <Text style={styles.estimateLabel}>예상 결제 금액</Text>
          <Text style={styles.estimateValue}>
            ₩{estimated.toLocaleString()}
          </Text>
        </View>
        {estimated >= daily && (
          <Text style={styles.capNote}>
            일 최대 요금 ₩{daily.toLocaleString()} 적용됩니다
          </Text>
        )}
      </View>

      {/* Policy */}
      <SectionHeader title="요금 정책" />
      <View style={styles.policyCard}>
        {[
          {
            label: '기본 요금',
            value: fee
              ? `최초 ${fee.baseMinutes}분 ₩${fee.baseFee.toLocaleString()}`
              : `최초 30분 ₩${(lot.pricePerHour / 2).toLocaleString()}`,
          },
          {
            label: '추가 요금',
            value: fee
              ? `${fee.extraMinutes}분당 ₩${fee.extraFee.toLocaleString()}`
              : `10분당 ₩${Math.round(lot.pricePerHour / 6).toLocaleString()}`,
          },
          {
            label: '일 최대 요금',
            value: `₩${daily.toLocaleString()}`,
          },
          {label: '월 정기권', value: '제공 안 함'},
        ].map((r, i, arr) => (
          <View
            key={i}
            style={[styles.policyRow, i < arr.length - 1 && styles.policyRowBorder]}
          >
            <Text style={styles.policyLabel}>{r.label}</Text>
            <Text style={styles.policyValue}>{r.value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {padding: 16, paddingBottom: 32, gap: 16},

  // ── Calc card
  calcCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    padding: 16,
    gap: 14,
    backgroundColor: '#FFFFFF',
  },
  calcRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calcLabel: {
    fontSize: 12.5,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    backgroundColor: '#F8F9FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnText: {
    fontSize: 18,
    color: '#4D5A6A',
    includeFontPadding: false,
    fontWeight: '600',
  },
  stepValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222225',
    minWidth: 60,
    textAlign: 'center',
    includeFontPadding: false,
  },
  estimateBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    backgroundColor: 'rgba(0,108,255,0.05)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,108,255,0.18)',
  },
  estimateLabel: {
    fontSize: 13,
    color: '#4D5A6A',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  estimateValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#006CFF',
    letterSpacing: -0.5,
    includeFontPadding: false,
  },
  capNote: {
    fontSize: 11.5,
    color: '#6B7C92',
    textAlign: 'center',
    includeFontPadding: false,
  },

  // ── Policy
  policyCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  policyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
  },
  policyRowBorder: {borderBottomWidth: 1, borderBottomColor: '#F2F4F7'},
  policyLabel: {
    fontSize: 13,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  policyValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#222225',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
});
