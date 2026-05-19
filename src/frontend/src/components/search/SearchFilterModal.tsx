import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type SortKey = 'ai' | 'dist' | 'price' | 'cong';

const SORT_OPTIONS: {k: SortKey; label: string}[] = [
  {k: 'ai', label: 'AI 추천 점수'},
  {k: 'dist', label: '거리순'},
  {k: 'price', label: '요금순'},
  {k: 'cong', label: '여유순'},
];

const TYPE_OPTIONS = ['공영', '민영', '개인공유'] as const;

interface SearchFilterModalProps {
  visible: boolean;
  onClose: () => void;
}

export function SearchFilterModal({
  visible,
  onClose,
}: SearchFilterModalProps): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const [sortKey, setSortKey] = useState<SortKey>('ai');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [nfc, setNfc] = useState(false);
  const [allDay, setAllDay] = useState(false);
  const [includeSoon, setIncludeSoon] = useState(false);

  const toggleType = (t: string) => {
    setSelectedTypes(prev =>
      prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t],
    );
  };

  const handleReset = () => {
    setSortKey('ai');
    setSelectedTypes([]);
    setNfc(false);
    setAllDay(false);
    setIncludeSoon(false);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          style={[styles.sheet, {paddingBottom: Math.max(insets.bottom, 20)}]}
          onPress={e => e.stopPropagation()}
        >
          <View style={styles.handle} />
          <Text style={styles.title}>필터 · 정렬</Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Sort */}
            <Text style={styles.sectionTitle}>정렬 기준</Text>
            <View style={styles.chipRow}>
              {SORT_OPTIONS.map(o => {
                const active = sortKey === o.k;
                return (
                  <Pressable
                    key={o.k}
                    onPress={() => setSortKey(o.k)}
                    style={[styles.chip, active && styles.chipActive]}
                  >
                    <Text
                      style={[styles.chipText, active && styles.chipTextActive]}
                    >
                      {o.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Price range */}
            <Text style={styles.sectionTitle}>요금 범위</Text>
            <View style={styles.priceRow}>
              <Text style={styles.priceMeta}>₩0</Text>
              <View style={styles.priceBar}>
                <View style={styles.priceBarFill} />
                <View style={styles.priceThumb} />
              </View>
              <Text style={styles.priceMeta}>₩10,000</Text>
            </View>
            <Text style={styles.priceValue}>₩3,000/시 이하</Text>

            {/* Parking type */}
            <Text style={styles.sectionTitle}>주차장 유형</Text>
            <View style={styles.chipRow}>
              {TYPE_OPTIONS.map(t => {
                const active = selectedTypes.includes(t);
                return (
                  <Pressable
                    key={t}
                    onPress={() => toggleType(t)}
                    style={[styles.chip, active && styles.chipActive]}
                  >
                    <Text
                      style={[styles.chipText, active && styles.chipTextActive]}
                    >
                      {t}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Extra options */}
            <Text style={styles.sectionTitle}>추가 옵션</Text>
            <View style={styles.toggleList}>
              {[
                {label: 'NFC 결제 가능', value: nfc, set: setNfc},
                {label: '24시간 운영', value: allDay, set: setAllDay},
                {label: '곧 비워질 자리 포함', value: includeSoon, set: setIncludeSoon},
              ].map((o, i) => (
                <Pressable
                  key={i}
                  onPress={() => o.set(!o.value)}
                  style={styles.toggleRow}
                >
                  <Text style={styles.toggleLabel}>{o.label}</Text>
                  <View style={[styles.toggle, o.value && styles.toggleOn]}>
                    <View
                      style={[styles.toggleKnob, o.value && styles.toggleKnobOn]}
                    />
                  </View>
                </Pressable>
              ))}
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <Pressable onPress={handleReset} style={styles.resetBtn}>
              <Text style={styles.resetBtnText}>초기화</Text>
            </Pressable>
            <Pressable onPress={onClose} style={styles.applyBtn}>
              <Text style={styles.applyBtnText}>주차장 보기</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    maxHeight: '85%',
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CAD1DB',
    alignSelf: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.2,
    includeFontPadding: false,
    marginBottom: 10,
    marginTop: 4,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 20,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#CAD1DB',
    backgroundColor: '#FFFFFF',
  },
  chipActive: {backgroundColor: '#222225', borderColor: '#222225'},
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4D5A6A',
    includeFontPadding: false,
  },
  chipTextActive: {color: '#FFFFFF'},
  // Price bar (decorative)
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  priceMeta: {fontSize: 11, color: '#8B99AC', includeFontPadding: false},
  priceBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5EAF1',
    borderRadius: 2,
    position: 'relative',
  },
  priceBarFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '30%',
    backgroundColor: '#006CFF',
    borderRadius: 2,
  },
  priceThumb: {
    position: 'absolute',
    left: '28%',
    top: -6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#006CFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.12,
    shadowRadius: 2,
  },
  priceValue: {
    fontSize: 11,
    color: '#006CFF',
    fontWeight: '700',
    includeFontPadding: false,
    textAlign: 'center',
    marginBottom: 20,
  },
  toggleList: {gap: 8, marginBottom: 24},
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 13,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    backgroundColor: '#FFFFFF',
  },
  toggleLabel: {
    fontSize: 13.5,
    fontWeight: '500',
    color: '#222225',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  toggle: {
    width: 38,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#CAD1DB',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleOn: {backgroundColor: '#006CFF'},
  toggleKnob: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  toggleKnobOn: {alignSelf: 'flex-end'},
  footer: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 12,
  },
  resetBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    backgroundColor: '#F8F9FB',
    alignItems: 'center',
  },
  resetBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4D5A6A',
    includeFontPadding: false,
  },
  applyBtn: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#006CFF',
    alignItems: 'center',
  },
  applyBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    includeFontPadding: false,
  },
});
