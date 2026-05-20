import React from 'react';
import {View, Text, TextInput, Pressable, ScrollView, StyleSheet} from 'react-native';
import {shared} from './registerStyles';
import type {ProviderRegisterForm} from '../../../types/provider';

export const DAY_LABELS = ['월', '화', '수', '목', '금', '토', '일'];

interface Props {
  form: ProviderRegisterForm;
  onChange: (patch: Partial<ProviderRegisterForm>) => void;
}

export function RegisterPricingStep({form, onChange}: Props): React.JSX.Element {
  const priceNum = parseInt(form.pricePerHour || '0', 10) || 0;
  const twoHourFee = priceNum * 2;
  const platform = Math.round(twoHourFee * 0.15);
  const settlement = twoHourFee - platform;

  return (
    <ScrollView
      style={shared.stepScroll}
      contentContainerStyle={shared.stepContent}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={shared.fieldLabel}>이용 가능 요일</Text>
      <View style={styles.dayRow}>
        {DAY_LABELS.map((day, i) => (
          <Pressable
            key={i}
            style={[styles.dayBtn, form.activeDays[i] && styles.dayBtnActive]}
            onPress={() => {
              const next = [...form.activeDays];
              next[i] = !next[i];
              onChange({activeDays: next});
            }}
          >
            <Text style={[styles.dayLabel, form.activeDays[i] && styles.dayLabelActive]}>
              {day}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.timeRow}>
        <View style={styles.timeCell}>
          <Text style={shared.fieldLabel}>시작 시간</Text>
          <TextInput
            style={shared.input}
            value={form.startTime}
            onChangeText={v => onChange({startTime: v})}
            placeholder="09:00"
            placeholderTextColor="#CAD1DB"
          />
        </View>
        <View style={styles.timeCell}>
          <Text style={shared.fieldLabel}>종료 시간</Text>
          <TextInput
            style={shared.input}
            value={form.endTime}
            onChangeText={v => onChange({endTime: v})}
            placeholder="18:00"
            placeholderTextColor="#CAD1DB"
          />
        </View>
      </View>

      <View style={styles.sectionDivider} />

      <Text style={shared.fieldLabel}>요금 정책</Text>
      <Text style={[shared.fieldLabel, {marginTop: 10, marginBottom: 6}]}>시간당 요금</Text>
      <TextInput
        style={shared.input}
        value={form.pricePerHour}
        onChangeText={v => onChange({pricePerHour: v})}
        keyboardType="number-pad"
        placeholder="1800"
        placeholderTextColor="#CAD1DB"
      />
      <Text style={shared.fieldHint}>주변 평균 ₩2,000/시</Text>

      <Text style={[shared.fieldLabel, shared.fieldLabelGap]}>일 최대 요금 (선택)</Text>
      <TextInput
        style={shared.input}
        value={form.maxDailyPrice}
        onChangeText={v => onChange({maxDailyPrice: v})}
        keyboardType="number-pad"
        placeholder="16000"
        placeholderTextColor="#CAD1DB"
      />

      <View style={styles.earningsBox}>
        <Text style={styles.earningsTitle}>예상 수익 (2시간 이용 기준)</Text>
        <View style={styles.earningsRow}>
          <Text style={styles.earningsKey}>이용자 결제</Text>
          <Text style={styles.earningsVal}>₩{twoHourFee.toLocaleString()}</Text>
        </View>
        <View style={styles.earningsRow}>
          <Text style={styles.earningsKey}>플랫폼 수수료 (15%)</Text>
          <Text style={styles.earningsDeduct}>-₩{platform.toLocaleString()}</Text>
        </View>
        <View style={[styles.earningsRow, {marginTop: 4}]}>
          <Text style={styles.earningsKeyBold}>공급자 정산</Text>
          <Text style={styles.earningsFinal}>₩{settlement.toLocaleString()}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dayRow: {flexDirection: 'row', gap: 6, marginBottom: 16},
  dayBtn: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#E5EAF1',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayBtnActive: {
    borderColor: '#006CFF',
    backgroundColor: '#006CFF',
  },
  dayLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7C92',
    includeFontPadding: false,
  },
  dayLabelActive: {color: '#FFFFFF'},
  timeRow: {flexDirection: 'row', gap: 10, marginBottom: 4},
  timeCell: {flex: 1},
  sectionDivider: {height: 1, backgroundColor: '#F2F4F7', marginVertical: 16},
  earningsBox: {
    backgroundColor: 'rgba(0,108,255,0.05)',
    borderRadius: 10,
    padding: 14,
    marginTop: 16,
    gap: 6,
  },
  earningsTitle: {
    fontSize: 11.5,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
    marginBottom: 4,
  },
  earningsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  earningsKey: {
    fontSize: 13,
    color: '#4D5A6A',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  earningsKeyBold: {
    fontSize: 13,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  earningsVal: {
    fontSize: 13,
    fontWeight: '600',
    color: '#222225',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  earningsDeduct: {
    fontSize: 13,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  earningsFinal: {
    fontSize: 17,
    fontWeight: '800',
    color: '#006CFF',
    letterSpacing: -0.4,
    includeFontPadding: false,
  },
});
