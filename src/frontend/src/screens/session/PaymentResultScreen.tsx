import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {CommonActions} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppIcon} from '../../components/common/AppIcon';
import {getMockParkingLotById} from '../../mocks';
import {ReceiptModal} from '../../components/session/ReceiptModal';
import type {ReceiptData} from '../../components/session/ReceiptModal';

type NavParam = {
  PaymentResultScreen: {
    parkingLotId: string;
    startedAt: string;
    endedAt: string;
    durationMinutes: number;
    finalAmount: number;
    paymentMethod: string;
  };
};

interface Props {
  route: RouteProp<NavParam, 'PaymentResultScreen'>;
  navigation: StackNavigationProp<NavParam, 'PaymentResultScreen'>;
}

const PAYMENT_METHOD_LABEL: Record<string, string> = {
  kakao: '카카오페이',
  shinhan: '신한카드',
  samsung: '삼성페이',
};

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) {return `${m}분`;}
  if (m === 0) {return `${h}시간`;}
  return `${h}시간 ${m}분`;
}

function generateApprovalCode(): string {
  const pad = (n: number, len: number) => n.toString().padStart(len, '0');
  const d = new Date();
  return `${pad(d.getMonth() + 1, 2)}${pad(d.getDate(), 2)}-${pad(
    Math.floor(Math.random() * 9999),
    4,
  )}-${pad(Math.floor(Math.random() * 99), 2)}`;
}

export function PaymentResultScreen({route: navRoute, navigation}: Props): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const {parkingLotId, startedAt, endedAt, durationMinutes, finalAmount, paymentMethod} =
    navRoute.params;
  const lot = getMockParkingLotById(parkingLotId);
  const lotName = lot?.name ?? '주차장';
  const methodLabel = PAYMENT_METHOD_LABEL[paymentMethod] ?? paymentMethod;
  const durationLabel = formatDuration(durationMinutes);
  const approvalCode = useRef(generateApprovalCode()).current;

  const [isCompleting, setIsCompleting] = useState(false);
  const [receiptVisible, setReceiptVisible] = useState(false);

  const receiptData: ReceiptData = {
    receiptId: `RCP-${approvalCode}`,
    parkingLotName: lotName,
    parkingLotAddress: lot?.address.roadAddress,
    startedAt,
    endedAt,
    durationMinutes,
    baseAmount: finalAmount,
    discountAmount: 0,
    finalAmount,
    paymentMethod,
    approvalNumber: approvalCode,
    paidAt: endedAt,
  };

  const checkScale = useRef(new Animated.Value(0.4)).current;
  const checkOpacity = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(checkScale, {
          toValue: 1,
          useNativeDriver: true,
          bounciness: 14,
          speed: 10,
        }),
        Animated.timing(checkOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [checkScale, checkOpacity, contentOpacity]);

  const handleDone = () => {
    if (isCompleting) return;
    setIsCompleting(true);

    // Mock paid session record.
    // TODO: When real API is integrated, POST /sessions/{id}/complete before navigating.
    const paidUsageHistory = {
      id: `PS-${Date.now()}`,
      parkingLotId,
      parkingLotName: lotName,
      startedAt,
      endedAt,
      durationMinutes,
      amount: finalAmount,
      paymentMethod,
      approvalCode,
      status: 'PAID',
    };

    console.log('[PaymentResult] complete pressed');
    console.log('[PaymentResult] paid session', paidUsageHistory);
    console.log('[PaymentResult] navigate to usage history');

    // Reset the entire navigation state so the user cannot press back into the
    // payment flow. ParkingTab (index 2) is opened at UsedHistoryScreen.
    // Tab indices: 0=HomeTab, 1=SearchTab, 2=ParkingTab, 3=RecommendTab, 4=MyPageTab
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'MainTab',
            state: {
              index: 2,
              routes: [
                {name: 'HomeTab'},
                {name: 'SearchTab'},
                {
                  name: 'ParkingTab',
                  state: {
                    index: 0,
                    routes: [{name: 'UsedHistoryScreen'}],
                  },
                },
                {name: 'RecommendTab'},
                {name: 'MyPageTab'},
              ],
            },
          },
        ],
      }),
    );
  };

  const handleReceipt = () => {
    setReceiptVisible(true);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.body}>
        {/* Blue check circle */}
        <Animated.View
          style={[
            styles.checkWrap,
            {transform: [{scale: checkScale}], opacity: checkOpacity},
          ]}
        >
          <View style={styles.checkGlow} />
          <View style={styles.checkCircle}>
            <AppIcon name="check" size={44} color="#FFFFFF" strokeWidth={3} />
          </View>
        </Animated.View>

        {/* Title + description */}
        <Animated.View style={[styles.textBlock, {opacity: contentOpacity}]}>
          <Text style={styles.title}>결제 완료</Text>
          <Text style={styles.desc}>
            {lotName} · {durationLabel}{'\n'}
            영수증은 [이용] 탭에서 확인할 수 있어요
          </Text>
        </Animated.View>

        {/* Summary card */}
        <Animated.View style={[styles.summaryCard, {opacity: contentOpacity}]}>
          {[
            {label: '결제 금액', value: `₩${finalAmount.toLocaleString()}`, blue: true},
            {label: '결제 수단', value: methodLabel, blue: false},
            {label: '승인 번호', value: approvalCode, blue: false},
          ].map((r, i, arr) => (
            <View
              key={r.label}
              style={[styles.summaryRow, i < arr.length - 1 && styles.summaryRowBorder]}
            >
              <Text style={styles.summaryLabel}>{r.label}</Text>
              <Text style={[styles.summaryValue, r.blue && styles.summaryValueBlue]}>
                {r.value}
              </Text>
            </View>
          ))}
        </Animated.View>
      </View>

      {/* Buttons */}
      <View style={[styles.btnRow, {paddingBottom: Math.max(insets.bottom, 20)}]}>
        <Pressable onPress={handleReceipt} style={styles.receiptBtn}>
          <Text style={styles.receiptBtnText}>영수증 보기</Text>
        </Pressable>
        <Pressable
          onPress={handleDone}
          style={[styles.doneBtn, isCompleting && styles.doneBtnDisabled]}
          disabled={isCompleting}
        >
          <Text style={styles.doneBtnText}>완료</Text>
        </Pressable>
      </View>

      <ReceiptModal
        visible={receiptVisible}
        onClose={() => setReceiptVisible(false)}
        receipt={receiptData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    gap: 20,
  },

  // ── Check circle
  checkWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 110,
    height: 110,
  },
  checkGlow: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(0,108,255,0.14)',
  },
  checkCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#006CFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#006CFF',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 24,
  },

  // ── Text
  textBlock: {alignItems: 'center', gap: 8},
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.5,
    includeFontPadding: false,
  },
  desc: {
    fontSize: 13.5,
    color: '#6B7C92',
    textAlign: 'center',
    lineHeight: 20,
    letterSpacing: -0.2,
    includeFontPadding: false,
  },

  // ── Summary card
  summaryCard: {
    width: '100%',
    backgroundColor: '#F8F9FB',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    padding: 18,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 9,
  },
  summaryRowBorder: {borderBottomWidth: 1, borderBottomColor: '#F0F0F3'},
  summaryLabel: {
    fontSize: 12,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#222225',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  summaryValueBlue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#006CFF',
  },

  // ── Buttons
  btnRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  receiptBtn: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#006CFF',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  receiptBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#006CFF',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  doneBtn: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: '#006CFF',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#006CFF',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  doneBtnDisabled: {
    backgroundColor: '#A0BDFF',
    elevation: 0,
  },
  doneBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
});
