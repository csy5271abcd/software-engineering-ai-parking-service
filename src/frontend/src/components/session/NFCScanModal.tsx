import React, {useEffect, useRef, useState} from 'react';
import {Animated, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppIcon} from '../common/AppIcon';

interface NFCScanModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function NFCScanModal({visible, onClose, onSuccess}: NFCScanModalProps): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const [phase, setPhase] = useState<'scanning' | 'success'>('scanning');
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const successScale = useRef(new Animated.Value(0.6)).current;
  const successOpacity = useRef(new Animated.Value(0)).current;

  // Reset state when modal opens
  useEffect(() => {
    if (visible) {
      setPhase('scanning');
      pulseAnim.setValue(0);
      successScale.setValue(0.6);
      successOpacity.setValue(0);
    }
  }, [visible, pulseAnim, successScale, successOpacity]);

  // Pulse animation for scanning state
  useEffect(() => {
    if (phase !== 'scanning') return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {toValue: 1, duration: 1100, useNativeDriver: true}),
        Animated.timing(pulseAnim, {toValue: 0, duration: 1100, useNativeDriver: true}),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [phase, pulseAnim]);

  // Auto-transition to success after 3s in scanning
  useEffect(() => {
    if (phase !== 'scanning' || !visible) return;
    const t = setTimeout(() => setPhase('success'), 3000);
    return () => clearTimeout(t);
  }, [phase, visible]);

  // Success animation + auto-dismiss
  useEffect(() => {
    if (phase !== 'success') return;
    Animated.parallel([
      Animated.spring(successScale, {toValue: 1, useNativeDriver: true, bounciness: 12}),
      Animated.timing(successOpacity, {toValue: 1, duration: 300, useNativeDriver: true}),
    ]).start();
    const t = setTimeout(() => {
      onSuccess();
    }, 1600);
    return () => clearTimeout(t);
  }, [phase, onSuccess, successScale, successOpacity]);

  const pulseScale = pulseAnim.interpolate({inputRange: [0, 1], outputRange: [1, 1.35]});
  const pulseOpacity = pulseAnim.interpolate({inputRange: [0, 1], outputRange: [0.45, 0]});

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={[styles.overlay, {paddingTop: insets.top}]}>
        {/* Close button */}
        <Pressable onPress={onClose} style={[styles.closeBtn, {top: insets.top + 12}]} hitSlop={8}>
          <AppIcon name="x" size={16} color="#FFFFFF" strokeWidth={2.5} />
        </Pressable>

        {/* Content */}
        <View style={styles.content}>
          {/* NFC icon area */}
          <View style={styles.iconWrap}>
            {phase === 'scanning' && (
              <Animated.View
                style={[
                  styles.pulseRing,
                  {transform: [{scale: pulseScale}], opacity: pulseOpacity},
                ]}
              />
            )}
            {phase === 'scanning' ? (
              <View style={styles.nfcCircle}>
                <Text style={styles.nfcText}>NFC</Text>
              </View>
            ) : (
              <Animated.View
                style={[
                  styles.successCircle,
                  {transform: [{scale: successScale}], opacity: successOpacity},
                ]}
              >
                <AppIcon name="check" size={44} color="#FFFFFF" strokeWidth={3} />
              </Animated.View>
            )}
          </View>

          {/* Title */}
          <Text style={styles.title}>
            {phase === 'success' ? '인식 완료' : 'NFC 태그에 가까이 대주세요'}
          </Text>
          {/* Description */}
          <Text style={styles.desc}>
            {phase === 'success'
              ? '주차 이용을 시작합니다'
              : '주차 공간 입구 또는 정산기에 부착된 NFC 태그를\n스마트폰 뒷면에 가까이 대주세요.'}
          </Text>
        </View>

        {/* Buttons — scanning only */}
        {phase === 'scanning' && (
          <View style={[styles.btns, {paddingBottom: Math.max(insets.bottom, 20)}]}>
            <Pressable onPress={() => setPhase('success')} style={styles.qrBtn}>
              <Text style={styles.qrBtnText}>QR 코드로 인식</Text>
            </Pressable>
            <Pressable onPress={onClose} style={styles.manualBtn}>
              <Text style={styles.manualBtnText}>수동 코드 입력</Text>
            </Pressable>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(34,34,37,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  closeBtn: {
    position: 'absolute',
    right: 16,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {alignItems: 'center', width: '100%'},
  iconWrap: {
    width: 148,
    height: 148,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  pulseRing: {
    position: 'absolute',
    width: 148,
    height: 148,
    borderRadius: 74,
    borderWidth: 2,
    borderColor: '#006CFF',
  },
  nfcCircle: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#006CFF',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 24,
  },
  nfcText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#006CFF',
    letterSpacing: -0.5,
    includeFontPadding: false,
  },
  successCircle: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: '#006CFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#006CFF',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 30,
  },
  title: {
    fontSize: 21,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.4,
    includeFontPadding: false,
    marginBottom: 10,
  },
  desc: {
    fontSize: 13.5,
    color: 'rgba(255,255,255,0.72)',
    textAlign: 'center',
    lineHeight: 20,
    letterSpacing: -0.2,
  },
  btns: {width: '100%', gap: 8, position: 'absolute', bottom: 0},
  qrBtn: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
  },
  qrBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  manualBtn: {paddingVertical: 12, alignItems: 'center'},
  manualBtnText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
});
