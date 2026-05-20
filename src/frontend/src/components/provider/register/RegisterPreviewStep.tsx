import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {AppIcon} from '../../common/AppIcon';
import {shared} from './registerStyles';
import {DAY_LABELS} from './RegisterPricingStep';
import type {ProviderRegisterForm} from '../../../types/provider';

interface Props {
  form: ProviderRegisterForm;
}

export function RegisterPreviewStep({form}: Props): React.JSX.Element {
  const typeLabel =
    form.type === 'PRIVATE' ? '개인공유' : form.type === 'COMMERCIAL' ? '상가' : '공영';
  const activeDayNames = DAY_LABELS.filter((_, i) => form.activeDays[i]);
  const dayRange =
    activeDayNames.length === 5 &&
    form.activeDays.slice(0, 5).every(Boolean) &&
    !form.activeDays[5] &&
    !form.activeDays[6]
      ? '평일'
      : activeDayNames.join('');
  const hours = `${dayRange} ${form.startTime} - ${form.endTime}`;

  return (
    <ScrollView
      style={shared.stepScroll}
      contentContainerStyle={shared.stepContent}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.previewCard}>
        <View style={styles.previewCardTop}>
          <View style={styles.previewThumb}>
            <AppIcon name="house" size={26} color="#006CFF" strokeWidth={1.8} />
          </View>
          <View style={styles.previewInfo}>
            <Text style={styles.previewName} numberOfLines={1}>{form.name}</Text>
            <Text style={styles.previewAddress} numberOfLines={1}>{form.address}</Text>
            <View style={styles.previewBadges}>
              <View style={styles.badgeGreen}>
                <Text style={styles.badgeGreenText}>{typeLabel}</Text>
              </View>
              <View style={styles.badgeBlue}>
                <Text style={styles.badgeBlueText}>{form.accessMethod}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.previewDivider} />

        <View style={styles.previewRow}>
          <Text style={styles.previewKey}>이용 가능</Text>
          <Text style={styles.previewVal}>{hours}</Text>
        </View>
        <View style={styles.previewRow}>
          <Text style={styles.previewKey}>시간당 요금</Text>
          <Text style={styles.previewVal}>
            ₩{parseInt(form.pricePerHour || '0', 10).toLocaleString()}
          </Text>
        </View>
        <View style={styles.previewRow}>
          <Text style={styles.previewKey}>일 최대 요금</Text>
          <Text style={styles.previewVal}>
            ₩{parseInt(form.maxDailyPrice || '0', 10).toLocaleString()}
          </Text>
        </View>
        <View style={styles.previewRow}>
          <Text style={styles.previewKey}>주차 면수</Text>
          <Text style={styles.previewVal}>{form.spaces}면</Text>
        </View>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          등록 신청 후 운영팀의 검토를 거쳐 24-48시간 이내에 승인 결과를 알려드려요.
          승인되면 자동으로 이용자에게 노출됩니다.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  previewCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EAF1',
    borderRadius: 14,
    padding: 16,
  },
  previewCardTop: {flexDirection: 'row', gap: 12, marginBottom: 12},
  previewThumb: {
    width: 52,
    height: 52,
    borderRadius: 10,
    backgroundColor: '#EEF4FF',
    borderWidth: 1,
    borderColor: '#E5EAF1',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  previewInfo: {flex: 1, gap: 3},
  previewName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  previewAddress: {
    fontSize: 12,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  previewBadges: {flexDirection: 'row', gap: 4, marginTop: 2},
  badgeGreen: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: 'rgba(3,170,90,0.10)',
  },
  badgeGreenText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#03AA5A',
    includeFontPadding: false,
  },
  badgeBlue: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: 'rgba(0,108,255,0.08)',
  },
  badgeBlueText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#006CFF',
    includeFontPadding: false,
  },
  previewDivider: {height: 1, backgroundColor: '#F2F4F7', marginBottom: 10},
  previewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  previewKey: {
    fontSize: 13,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  previewVal: {
    fontSize: 13,
    fontWeight: '600',
    color: '#222225',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  infoBox: {
    backgroundColor: 'rgba(0,108,255,0.05)',
    borderRadius: 10,
    padding: 14,
    marginTop: 14,
  },
  infoBoxText: {
    fontSize: 12.5,
    color: '#4D5A6A',
    lineHeight: 18,
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
});
