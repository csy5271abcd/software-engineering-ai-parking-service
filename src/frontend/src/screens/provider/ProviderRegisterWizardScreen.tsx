import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppIcon} from '../../components/common/AppIcon';
import {initialProviderRegisterForm} from '../../mocks/provider.mock';
import type {ProviderRegisterForm, ParkingSpaceType, AccessMethod} from '../../types/provider';
import type {MyPageStackParamList} from '../../navigation/navigationTypes';

type NavProp = StackNavigationProp<MyPageStackParamList, 'ProviderRegisterWizardScreen'>;

const TOTAL_STEPS = 5;
const DAY_LABELS = ['월', '화', '수', '목', '금', '토', '일'];

const TYPE_OPTIONS: {value: ParkingSpaceType; label: string}[] = [
  {value: 'PRIVATE',    label: '개인 주택/빌라'},
  {value: 'COMMERCIAL', label: '상가/건물'},
  {value: 'PUBLIC',     label: '공영 위탁'},
];

const ACCESS_OPTIONS: {value: AccessMethod; label: string; emoji: string}[] = [
  {value: 'NFC',  label: 'NFC 태그',  emoji: '📲'},
  {value: 'QR',   label: 'QR 코드',   emoji: '▪️'},
  {value: 'PIN',  label: '비밀번호',   emoji: '🔑'},
  {value: 'FACE', label: '대면 인증',  emoji: '👋'},
];

// ── Step 1: 기본 정보 ──────────────────────────────────────────────────────────

function Step1({
  form,
  onChange,
}: {
  form: ProviderRegisterForm;
  onChange: (f: Partial<ProviderRegisterForm>) => void;
}): React.JSX.Element {
  return (
    <ScrollView
      style={styles.stepScroll}
      contentContainerStyle={styles.stepContent}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.fieldLabel}>주차 공간 이름</Text>
      <TextInput
        style={styles.input}
        value={form.name}
        onChangeText={v => onChange({name: v})}
        placeholder="주차 공간 이름"
        placeholderTextColor="#CAD1DB"
      />

      <Text style={[styles.fieldLabel, styles.fieldLabelGap]}>주차 가능 면수</Text>
      <TextInput
        style={styles.input}
        value={form.spaces}
        onChangeText={v => onChange({spaces: v})}
        keyboardType="number-pad"
        placeholder="1"
        placeholderTextColor="#CAD1DB"
      />
      <Text style={styles.fieldHint}>동시 이용 가능한 차량 수</Text>

      <Text style={[styles.fieldLabel, styles.fieldLabelGap]}>주차장 유형</Text>
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

      <Text style={[styles.fieldLabel, styles.fieldLabelGap]}>설명 (선택)</Text>
      <TextInput
        style={[styles.input, styles.inputMulti]}
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

// ── Step 2: 위치 선택 ──────────────────────────────────────────────────────────

function Step2({
  form,
  onChange,
}: {
  form: ProviderRegisterForm;
  onChange: (f: Partial<ProviderRegisterForm>) => void;
}): React.JSX.Element {
  return (
    <ScrollView
      style={styles.stepScroll}
      contentContainerStyle={styles.stepContent}
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

      <Text style={[styles.fieldLabel, {marginTop: 16}]}>주소</Text>
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

      <Text style={[styles.fieldLabel, styles.fieldLabelGap]}>상세 주소</Text>
      <TextInput
        style={styles.input}
        value={form.detailAddress}
        onChangeText={v => onChange({detailAddress: v})}
        placeholder="상세 주소 (동·호수, 층 등)"
        placeholderTextColor="#CAD1DB"
      />
    </ScrollView>
  );
}

// ── Step 3: 사진 등록 ──────────────────────────────────────────────────────────

function Step3({
  form,
  onChange,
}: {
  form: ProviderRegisterForm;
  onChange: (f: Partial<ProviderRegisterForm>) => void;
}): React.JSX.Element {
  return (
    <ScrollView
      style={styles.stepScroll}
      contentContainerStyle={styles.stepContent}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <Text style={styles.photoHint}>
        주차 공간을 확인할 수 있는 사진 3장 이상 권장 (입구, 주차면, 진입로)
      </Text>

      <View style={styles.photoGrid}>
        {/* 3 placeholder slots */}
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

        {/* Add button */}
        <Pressable style={styles.photoAdd}>
          <AppIcon name="plus" size={22} color="#6B7C92" strokeWidth={2} />
          <Text style={styles.photoAddText}>사진 추가</Text>
        </Pressable>
      </View>

      <Text style={[styles.fieldLabel, {marginTop: 20}]}>출입 방식</Text>
      <View style={styles.accessGrid}>
        {ACCESS_OPTIONS.map(opt => (
          <Pressable
            key={opt.value}
            style={[
              styles.accessBtn,
              form.accessMethod === opt.value && styles.accessBtnActive,
            ]}
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

// ── Step 4: 시간·요금 ──────────────────────────────────────────────────────────

function Step4({
  form,
  onChange,
}: {
  form: ProviderRegisterForm;
  onChange: (f: Partial<ProviderRegisterForm>) => void;
}): React.JSX.Element {
  const priceNum = parseInt(form.pricePerHour || '0', 10) || 0;
  const twoHourFee = priceNum * 2;
  const platform = Math.round(twoHourFee * 0.15);
  const settlement = twoHourFee - platform;

  return (
    <ScrollView
      style={styles.stepScroll}
      contentContainerStyle={styles.stepContent}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.fieldLabel}>이용 가능 요일</Text>
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
          <Text style={styles.fieldLabel}>시작 시간</Text>
          <TextInput
            style={styles.input}
            value={form.startTime}
            onChangeText={v => onChange({startTime: v})}
            placeholder="09:00"
            placeholderTextColor="#CAD1DB"
          />
        </View>
        <View style={styles.timeCell}>
          <Text style={styles.fieldLabel}>종료 시간</Text>
          <TextInput
            style={styles.input}
            value={form.endTime}
            onChangeText={v => onChange({endTime: v})}
            placeholder="18:00"
            placeholderTextColor="#CAD1DB"
          />
        </View>
      </View>

      <View style={styles.sectionDivider} />

      <Text style={styles.fieldLabel}>요금 정책</Text>
      <Text style={[styles.fieldLabel, {marginTop: 10, marginBottom: 6}]}>시간당 요금</Text>
      <TextInput
        style={styles.input}
        value={form.pricePerHour}
        onChangeText={v => onChange({pricePerHour: v})}
        keyboardType="number-pad"
        placeholder="1800"
        placeholderTextColor="#CAD1DB"
      />
      <Text style={styles.fieldHint}>주변 평균 ₩2,000/시</Text>

      <Text style={[styles.fieldLabel, styles.fieldLabelGap]}>일 최대 요금 (선택)</Text>
      <TextInput
        style={styles.input}
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

// ── Step 5: 미리보기 ───────────────────────────────────────────────────────────

function Step5({form}: {form: ProviderRegisterForm}): React.JSX.Element {
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
      style={styles.stepScroll}
      contentContainerStyle={styles.stepContent}
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

// ── Screen ────────────────────────────────────────────────────────────────────

const STEP_TITLES = ['기본 정보', '위치 선택', '사진 등록', '시간·요금', '미리보기'];

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
        {step === 1 && <Step1 form={form} onChange={patchForm} />}
        {step === 2 && <Step2 form={form} onChange={patchForm} />}
        {step === 3 && <Step3 form={form} onChange={patchForm} />}
        {step === 4 && <Step4 form={form} onChange={patchForm} />}
        {step === 5 && <Step5 form={form} />}
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

  // ── Body / scroll
  body: {flex: 1},
  stepScroll: {flex: 1},
  stepContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },

  // ── Field common
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#222225',
    letterSpacing: -0.2,
    includeFontPadding: false,
    marginBottom: 8,
  },
  fieldLabelGap: {marginTop: 16},
  fieldHint: {
    fontSize: 11.5,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
    marginTop: 5,
  },

  // ── Text inputs
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EAF1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#222225',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  inputMulti: {
    height: 100,
    paddingTop: 12,
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

  // ── Type buttons (step 1)
  typeRow: {
    flexDirection: 'row',
    gap: 8,
  },
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

  // ── Map placeholder (step 2)
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
  mapPinWrap: {
    alignItems: 'center',
    gap: 0,
  },
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

  // ── Photo grid (step 3)
  photoHint: {
    fontSize: 12,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
    marginBottom: 12,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
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

  // ── Access buttons (step 3)
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

  // ── Day selector (step 4)
  dayRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 16,
  },
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

  // ── Time row (step 4)
  timeRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 4,
  },
  timeCell: {flex: 1},

  sectionDivider: {
    height: 1,
    backgroundColor: '#F2F4F7',
    marginVertical: 16,
  },

  // ── Earnings box (step 4)
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

  // ── Preview (step 5)
  previewCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EAF1',
    borderRadius: 14,
    padding: 16,
  },
  previewCardTop: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
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
  previewDivider: {
    height: 1,
    backgroundColor: '#F2F4F7',
    marginBottom: 10,
  },
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
