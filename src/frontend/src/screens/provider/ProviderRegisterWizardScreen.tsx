import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppIcon} from '../../components/common/AppIcon';
import {initialProviderRegisterForm} from '../../mocks/provider.mock';
import type {ProviderRegisterForm} from '../../types/provider';
import type {MyPageStackParamList} from '../../navigation/navigationTypes';
import {RegisterBasicInfoStep} from '../../components/provider/register/RegisterBasicInfoStep';
import {RegisterLocationStep} from '../../components/provider/register/RegisterLocationStep';
import {RegisterPhotoStep} from '../../components/provider/register/RegisterPhotoStep';
import {RegisterPricingStep} from '../../components/provider/register/RegisterPricingStep';
import {RegisterPreviewStep} from '../../components/provider/register/RegisterPreviewStep';

type NavProp = StackNavigationProp<MyPageStackParamList, 'ProviderRegisterWizardScreen'>;

const TOTAL_STEPS = 5;
const STEP_TITLES = ['기본 정보', '위치 선택', '사진 등록', '시간·요금', '미리보기'];

// ── Screen ────────────────────────────────────────────────────────────────────

export function ProviderRegisterWizardScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavProp>();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ProviderRegisterForm>(initialProviderRegisterForm);

  function patchForm(patch: Partial<ProviderRegisterForm>) {
    setForm(prev => ({...prev, ...patch}));
  }

  function handleBack() {
    if (step > 1) {
      setStep(s => s - 1);
    } else {
      navigation.goBack();
    }
  }

  function handleNext() {
    if (step < TOTAL_STEPS) {
      setStep(s => s + 1);
    } else {
      navigation.goBack();
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
      {/* ── Header ── */}
      <View style={[styles.header, {paddingTop: insets.top + 8}]}>
        <Pressable onPress={handleBack} style={styles.backBtn} hitSlop={8}>
          <AppIcon name="chevronLeft" size={22} color="#222225" strokeWidth={2.2} />
        </Pressable>
        <View style={styles.headerText}>
          <Text style={styles.stepLabel}>STEP {step}/{TOTAL_STEPS}</Text>
          <Text style={styles.stepTitle}>{STEP_TITLES[step - 1]}</Text>
        </View>
      </View>

      {/* ── Progress bar ── */}
      <View style={styles.progressBar}>
        {Array.from({length: TOTAL_STEPS}).map((_, i) => (
          <View
            key={i}
            style={[styles.progressSegment, i < step && styles.progressSegmentFilled]}
          />
        ))}
      </View>

      {/* ── Step content ── */}
      <View style={styles.body}>
        {step === 1 && <RegisterBasicInfoStep form={form} onChange={patchForm} />}
        {step === 2 && <RegisterLocationStep form={form} onChange={patchForm} />}
        {step === 3 && <RegisterPhotoStep form={form} onChange={patchForm} />}
        {step === 4 && <RegisterPricingStep form={form} onChange={patchForm} />}
        {step === 5 && <RegisterPreviewStep form={form} />}
      </View>

      {/* ── Bottom buttons ── */}
      <View style={[styles.bottomBar, {paddingBottom: insets.bottom + 16}]}>
        {step > 1 ? (
          <>
            <Pressable style={styles.prevBtn} onPress={handleBack}>
              <Text style={styles.prevBtnText}>이전</Text>
            </Pressable>
            <Pressable style={styles.nextBtn} onPress={handleNext}>
              <Text style={styles.nextBtnText}>
                {step === TOTAL_STEPS ? '등록 신청' : '다음'}
              </Text>
            </Pressable>
          </>
        ) : (
          <Pressable style={[styles.nextBtn, {flex: 1}]} onPress={handleNext}>
            <Text style={styles.nextBtnText}>다음</Text>
          </Pressable>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: '#F8F9FB'},

  // ── Header
  header: {
    paddingHorizontal: 16,
    paddingBottom: 6,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#F8F9FB',
  },
  backBtn: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 14,
  },
  headerText: {flex: 1, gap: 2},
  stepLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#006CFF',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  stepTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.6,
    includeFontPadding: false,
  },

  // ── Progress
  progressBar: {
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  progressSegment: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#E5EAF1',
  },
  progressSegmentFilled: {
    backgroundColor: '#006CFF',
  },

  // ── Body
  body: {flex: 1},

  // ── Bottom buttons
  bottomBar: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: '#F8F9FB',
    borderTopWidth: 1,
    borderTopColor: '#E5EAF1',
  },
  prevBtn: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E5EAF1',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prevBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#4D5A6A',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  nextBtn: {
    flex: 2,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#006CFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
});
