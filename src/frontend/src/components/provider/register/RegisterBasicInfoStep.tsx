import React from 'react';
import {View, Text, TextInput, Pressable, ScrollView, StyleSheet} from 'react-native';
import {shared} from './registerStyles';
import type {ProviderRegisterForm, ParkingSpaceType} from '../../../types/provider';

const TYPE_OPTIONS: {value: ParkingSpaceType; label: string}[] = [
  {value: 'PRIVATE',    label: '개인 주택/빌라'},
  {value: 'COMMERCIAL', label: '상가/건물'},
  {value: 'PUBLIC',     label: '공영 위탁'},
];

interface Props {
  form: ProviderRegisterForm;
  onChange: (patch: Partial<ProviderRegisterForm>) => void;
}

export function RegisterBasicInfoStep({form, onChange}: Props): React.JSX.Element {
  return (
    <ScrollView
      style={shared.stepScroll}
      contentContainerStyle={shared.stepContent}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={shared.fieldLabel}>주차 공간 이름</Text>
      <TextInput
        style={shared.input}
        value={form.name}
        onChangeText={v => onChange({name: v})}
        placeholder="주차 공간 이름"
        placeholderTextColor="#CAD1DB"
      />

      <Text style={[shared.fieldLabel, shared.fieldLabelGap]}>주차 가능 면수</Text>
      <TextInput
        style={shared.input}
        value={form.spaces}
        onChangeText={v => onChange({spaces: v})}
        keyboardType="number-pad"
        placeholder="1"
        placeholderTextColor="#CAD1DB"
      />
      <Text style={shared.fieldHint}>동시 이용 가능한 차량 수</Text>

      <Text style={[shared.fieldLabel, shared.fieldLabelGap]}>주차장 유형</Text>
      <View style={styles.typeRow}>
        {TYPE_OPTIONS.map(opt => (
          <Pressable
            key={opt.value}
            style={[styles.typeBtn, form.type === opt.value && styles.typeBtnActive]}
            onPress={() => onChange({type: opt.value})}
          >
            <Text
              style={[styles.typeBtnText, form.type === opt.value && styles.typeBtnTextActive]}
            >
              {opt.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={[shared.fieldLabel, shared.fieldLabelGap]}>설명 (선택)</Text>
      <TextInput
        style={[shared.input, shared.inputMulti]}
        value={form.description}
        onChangeText={v => onChange({description: v})}
        placeholder="주차 공간에 대한 설명을 입력해주세요."
        placeholderTextColor="#CAD1DB"
        multiline
        textAlignVertical="top"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  typeRow: {flexDirection: 'row', gap: 8},
  typeBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E5EAF1',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeBtnActive: {
    borderColor: '#006CFF',
    backgroundColor: 'rgba(0,108,255,0.06)',
  },
  typeBtnText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  typeBtnTextActive: {color: '#006CFF'},
});
