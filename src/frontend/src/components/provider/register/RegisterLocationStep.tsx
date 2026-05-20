import React from 'react';
import {View, Text, TextInput, ScrollView, StyleSheet} from 'react-native';
import {AppIcon} from '../../common/AppIcon';
import {shared} from './registerStyles';
import type {ProviderRegisterForm} from '../../../types/provider';

interface Props {
  form: ProviderRegisterForm;
  onChange: (patch: Partial<ProviderRegisterForm>) => void;
}

export function RegisterLocationStep({form, onChange}: Props): React.JSX.Element {
  return (
    <ScrollView
      style={shared.stepScroll}
      contentContainerStyle={shared.stepContent}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Map placeholder */}
      <View style={styles.mapPlaceholder}>
        <View style={styles.mapGrid}>
          {[...Array(9)].map((_, i) => (
            <View key={i} style={styles.mapGridCell} />
          ))}
        </View>
        <View style={styles.mapPinWrap}>
          <View style={styles.mapPinOuter}>
            <View style={styles.mapPinInner} />
          </View>
          <View style={styles.mapPinDot} />
        </View>
        <View style={styles.mapToast}>
          <Text style={styles.mapToastText}>
            지도를 움직여 주차 공간의 정확한 위치에 핀을 맞춰주세요
          </Text>
        </View>
      </View>

      <Text style={[shared.fieldLabel, {marginTop: 16}]}>주소</Text>
      <View style={styles.inputSearchWrap}>
        <AppIcon name="search" size={15} color="#6B7C92" strokeWidth={2} />
        <TextInput
          style={styles.inputSearch}
          value={form.address}
          onChangeText={v => onChange({address: v})}
          placeholder="주소를 입력하세요"
          placeholderTextColor="#CAD1DB"
        />
      </View>

      <Text style={[shared.fieldLabel, shared.fieldLabelGap]}>상세 주소</Text>
      <TextInput
        style={shared.input}
        value={form.detailAddress}
        onChangeText={v => onChange({detailAddress: v})}
        placeholder="상세 주소 (동·호수, 층 등)"
        placeholderTextColor="#CAD1DB"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mapPlaceholder: {
    height: 180,
    borderRadius: 12,
    backgroundColor: '#E8F0E8',
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapGrid: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mapGridCell: {
    width: '33.33%',
    height: 60,
    borderWidth: 0.5,
    borderColor: '#D4C89A',
    backgroundColor: '#F5F0DC',
  },
  mapPinWrap: {alignItems: 'center', gap: 0},
  mapPinOuter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#006CFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPinInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  mapPinDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#006CFF',
    opacity: 0.4,
    marginTop: 2,
  },
  mapToast: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(30,30,30,0.75)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  mapToastText: {
    fontSize: 11.5,
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  inputSearchWrap: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EAF1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inputSearch: {
    flex: 1,
    fontSize: 14,
    color: '#222225',
    letterSpacing: -0.2,
    includeFontPadding: false,
    padding: 0,
  },
});
