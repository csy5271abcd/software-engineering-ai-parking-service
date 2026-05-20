import React from 'react';
import {View, Text, Pressable, ScrollView, StyleSheet} from 'react-native';
import {AppIcon} from '../../common/AppIcon';
import {shared} from './registerStyles';
import type {ProviderRegisterForm, AccessMethod} from '../../../types/provider';

const ACCESS_OPTIONS: {value: AccessMethod; label: string; emoji: string}[] = [
  {value: 'NFC',  label: 'NFC 태그',  emoji: '📲'},
  {value: 'QR',   label: 'QR 코드',   emoji: '▪️'},
  {value: 'PIN',  label: '비밀번호',   emoji: '🔑'},
  {value: 'FACE', label: '대면 인증',  emoji: '👋'},
];

interface Props {
  form: ProviderRegisterForm;
  onChange: (patch: Partial<ProviderRegisterForm>) => void;
}

export function RegisterPhotoStep({form, onChange}: Props): React.JSX.Element {
  return (
    <ScrollView
      style={shared.stepScroll}
      contentContainerStyle={shared.stepContent}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <Text style={styles.photoHint}>
        주차 공간을 확인할 수 있는 사진 3장 이상 권장 (입구, 주차면, 진입로)
      </Text>

      <View style={styles.photoGrid}>
        {[0, 1, 2].map(i => (
          <View key={i} style={styles.photoSlot}>
            <AppIcon name="imagePlus" size={26} color="#CAD1DB" strokeWidth={1.5} />
            {i === 0 && (
              <View style={styles.repBadge}>
                <Text style={styles.repBadgeText}>대표</Text>
              </View>
            )}
          </View>
        ))}
        <Pressable style={styles.photoAdd}>
          <AppIcon name="plus" size={22} color="#6B7C92" strokeWidth={2} />
          <Text style={styles.photoAddText}>사진 추가</Text>
        </Pressable>
      </View>

      <Text style={[shared.fieldLabel, {marginTop: 20}]}>출입 방식</Text>
      <View style={styles.accessGrid}>
        {ACCESS_OPTIONS.map(opt => (
          <Pressable
            key={opt.value}
            style={[styles.accessBtn, form.accessMethod === opt.value && styles.accessBtnActive]}
            onPress={() => onChange({accessMethod: opt.value})}
          >
            <Text style={styles.accessEmoji}>{opt.emoji}</Text>
            <Text
              style={[
                styles.accessLabel,
                form.accessMethod === opt.value && styles.accessLabelActive,
              ]}
            >
              {opt.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  photoHint: {
    fontSize: 12,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
    marginBottom: 12,
  },
  photoGrid: {flexDirection: 'row', flexWrap: 'wrap', gap: 8},
  photoSlot: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#EAEDF2',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  repBadge: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    backgroundColor: '#006CFF',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  repBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  photoAdd: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#CAD1DB',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  photoAddText: {
    fontSize: 11.5,
    color: '#6B7C92',
    includeFontPadding: false,
  },
  accessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  accessBtn: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E5EAF1',
    backgroundColor: '#FFFFFF',
  },
  accessBtnActive: {
    borderColor: '#006CFF',
    backgroundColor: 'rgba(0,108,255,0.04)',
  },
  accessEmoji: {fontSize: 18},
  accessLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4D5A6A',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  accessLabelActive: {color: '#006CFF'},
});
