import React, {useEffect, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppIcon} from '../../components/common/AppIcon';
import {getMockParkingLotById} from '../../mocks';

type NavParam = {
  ActiveSessionScreen: {parkingLotId: string};
  PaymentScreen: {parkingLotId: string};
};

interface Props {
  route: RouteProp<NavParam, 'ActiveSessionScreen'>;
  navigation: StackNavigationProp<NavParam, 'ActiveSessionScreen'>;
}

const EXIT_OPTIONS = ['10분 후', '30분 후', '1시간 후', '직접 입력'] as const;

export function ActiveSessionScreen({route: navRoute, navigation}: Props): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const {parkingLotId} = navRoute.params;
  const lot = getMockParkingLotById(parkingLotId);

  // Start at 57 min elapsed (as in reference image)
  const [elapsedSec, setElapsedSec] = useState(57 * 60);
  const [exitSel, setExitSel] = useState(1); // 30분 후 active by default

  useEffect(() => {
    const interval = setInterval(() => setElapsedSec(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const h = Math.floor(elapsedSec / 3600);
  const m = Math.floor((elapsedSec % 3600) / 60);
  const s = elapsedSec % 60;
  const timeStr = `${h}:${String(m).padStart(2, '0')}`;
  const secStr = String(s).padStart(2, '0');

  const pricePerHour = lot?.pricePerHour ?? 1500;
  const elapsedMin = Math.floor(elapsedSec / 60);
  const estimatedFee = Math.ceil(elapsedMin / 60) * pricePerHour;

  const lotDisplay = lot?.name ?? '주차장';

  return (
    <View style={styles.screen}>
      {/* ── Blue hero header ── */}
      <View style={[styles.hero, {paddingTop: insets.top + 16}]}>
        {/* 이용 중 back pill */}
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.heroPill}
        >
          <AppIcon name="chevronLeft" size={14} color="#FFFFFF" strokeWidth={2.5} />
          <Text style={styles.heroPillText}>이용 중</Text>
        </Pressable>

        {/* Timer */}
        <View style={styles.timerRow}>
          <Text style={styles.timerMain}>{timeStr}</Text>
          <Text style={styles.timerSec}>.{secStr}</Text>
        </View>
        <Text style={styles.heroSub}>이용 시간 · 입차 13:40</Text>
        <Text style={styles.heroLotName}>{lotDisplay}</Text>
      </View>

      {/* ── Scrollable body ── */}
      <ScrollView
        style={styles.body}
        contentContainerStyle={[
          styles.bodyContent,
          {paddingBottom: Math.max(insets.bottom, 16) + 76},
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Expected fee card */}
        <View style={styles.card}>
          <View style={styles.cardTopRow}>
            <Text style={styles.cardLabel}>예상 결제 금액</Text>
            <Text style={styles.cardFee}>₩{estimatedFee.toLocaleString()}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>시간당 요금</Text>
            <Text style={styles.infoValue}>₩{pricePerHour.toLocaleString()}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>결제 수단</Text>
            <Text style={styles.infoValue}>카카오페이</Text>
          </View>
        </View>

        {/* Exit time card */}
        <View style={styles.card}>
          <View style={styles.exitHeaderRow}>
            <View style={styles.exitIconWrap}>
              <AppIcon name="clock" size={16} color="#006CFF" strokeWidth={2} />
            </View>
            <View style={styles.exitHeaderText}>
              <Text style={styles.exitTitle}>출차 예정 시간 알리기</Text>
              <Text style={styles.exitSub}>다른 운전자에게 도움이 됩니다</Text>
            </View>
          </View>
          <View style={styles.exitBtnRow}>
            {EXIT_OPTIONS.map((opt, i) => (
              <Pressable
                key={opt}
                onPress={() => setExitSel(i)}
                style={[styles.exitBtn, exitSel === i && styles.exitBtnActive]}
              >
                <Text style={[styles.exitBtnText, exitSel === i && styles.exitBtnTextActive]}>
                  {opt}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Report / Inquiry row */}
        <View style={styles.actionRow}>
          <Pressable style={styles.actionBtn}>
            <AppIcon name="alertCircle" size={14} color="#4D5A6A" strokeWidth={2} />
            <Text style={styles.actionBtnText}>신고</Text>
          </Pressable>
          <Pressable style={styles.actionBtn}>
            <AppIcon name="messageSquare" size={14} color="#4D5A6A" strokeWidth={2} />
            <Text style={styles.actionBtnText}>문의</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* ── Fixed bottom CTA ── */}
      <View style={[styles.cta, {paddingBottom: Math.max(insets.bottom, 16)}]}>
        <Pressable
          onPress={() => navigation.navigate('PaymentScreen', {parkingLotId})}
          style={styles.ctaBtn}
        >
          <AppIcon name="x" size={18} color="#FFFFFF" strokeWidth={2.5} />
          <Text style={styles.ctaBtnText}>NFC로 이용 종료 · 결제</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: '#F8F9FB'},

  // ── Hero
  hero: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    backgroundColor: '#006CFF',
  },
  heroPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
    backgroundColor: 'rgba(0,0,0,0.18)',
    marginBottom: 16,
  },
  heroPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
    includeFontPadding: false,
  },
  timerRow: {flexDirection: 'row', alignItems: 'flex-end', gap: 2, marginBottom: 6},
  timerMain: {
    fontSize: 62,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
    includeFontPadding: false,
    lineHeight: 66,
  },
  timerSec: {
    fontSize: 28,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    includeFontPadding: false,
    marginBottom: 6,
  },
  heroSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: -0.2,
    includeFontPadding: false,
    marginBottom: 4,
  },
  heroLotName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },

  // ── Body
  body: {flex: 1},
  bodyContent: {padding: 16, gap: 12},

  // ── Card
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    padding: 16,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 13,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  cardFee: {
    fontSize: 28,
    fontWeight: '800',
    color: '#006CFF',
    letterSpacing: -0.5,
    includeFontPadding: false,
  },
  divider: {height: 1, backgroundColor: '#F0F0F3', marginBottom: 10},
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  infoValue: {
    fontSize: 12,
    color: '#4D5A6A',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },

  // ── Exit card
  exitHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  exitIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(0,108,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  exitHeaderText: {gap: 2},
  exitTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  exitSub: {
    fontSize: 11,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  exitBtnRow: {flexDirection: 'row', gap: 6},
  exitBtn: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  exitBtnActive: {
    backgroundColor: '#006CFF',
    borderColor: '#006CFF',
  },
  exitBtnText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#4D5A6A',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  exitBtnTextActive: {color: '#FFFFFF'},

  // ── Action row
  actionRow: {flexDirection: 'row', gap: 8},
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 13,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EAF1',
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4D5A6A',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },

  // ── CTA
  cta: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5EAF1',
  },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: '#006CFF',
    elevation: 3,
    shadowColor: '#006CFF',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  ctaBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
});
