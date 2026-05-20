import React from 'react';
import {View, Text, ScrollView, Pressable, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {AppCard} from '../../components/common/AppCard';
import {AppSeparator} from '../../components/common/AppSeparator';
import {AppIcon} from '../../components/common/AppIcon';
import type {MyPageStackParamList} from '../../navigation/navigationTypes';

type NavProp = StackNavigationProp<MyPageStackParamList, 'MyPageScreen'>;

// ── Mock user data ────────────────────────────────────────────────────────────

const MOCK_USER = {
  initial: '김',
  name: '김민준',
  email: 'kmj****@gmail.com',
  stats: [
    {label: '저장한 곳', value: '12'},
    {label: '이용 횟수', value: '48'},
    {label: '신뢰도', value: '⭐ 4.8'},
  ],
};

// ── Menu section types ────────────────────────────────────────────────────────

interface MenuItem {
  icon: string; // emoji
  label: string;
  sub?: string;
  badge?: string;
}

interface MenuSectionData {
  title: string;
  items: MenuItem[];
}

const MENU_SECTIONS: MenuSectionData[] = [
  {
    title: '결제 · 차량',
    items: [
      {icon: '💳', label: '결제 수단 관리', sub: '카카오페이 · 1'},
      {icon: '🚗', label: '내 차량 정보', sub: '12가 3456 · 흰색 K5'},
      {icon: '🎟', label: '쿠폰함', sub: '0장'},
    ],
  },
  {
    title: '알림 · 설정',
    items: [
      {icon: '🔔', label: '알림 설정', sub: '곧 비워질 자리 ON'},
      {icon: '📍', label: '위치 권한', sub: '항상 허용'},
      {icon: '🌐', label: '언어 / 지역', sub: '한국어'},
    ],
  },
  {
    title: 'AI 투명성',
    items: [
      {icon: '📊', label: 'AI 추천 기준', sub: '추천이 어떻게 만들어졌나요?'},
      {icon: '🛡', label: '데이터 사용 내역', sub: '내 이용 데이터'},
      {icon: '📑', label: '개인정보 처리방침'},
    ],
  },
  {
    title: '고객 지원',
    items: [
      {icon: '💬', label: '문의하기'},
      {icon: '⚠️', label: '신고 내역', badge: '1'},
      {icon: '📜', label: '이용 약관'},
    ],
  },
];

// ── Components ────────────────────────────────────────────────────────────────

function MenuSection({section}: {section: MenuSectionData}): React.JSX.Element {
  return (
    <View style={styles.menuSection}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <AppCard padding="none" radius="xl" elevation>
        {section.items.map((item, i) => (
          <React.Fragment key={i}>
            <Pressable style={styles.menuRow}>
              <View style={styles.menuIconWrap}>
                <Text style={styles.menuIconEmoji}>{item.icon}</Text>
              </View>
              <View style={styles.menuBody}>
                <Text style={styles.menuLabel}>{item.label}</Text>
                {item.sub != null && (
                  <Text style={styles.menuSub}>{item.sub}</Text>
                )}
              </View>
              {item.badge != null && (
                <View style={styles.menuBadge}>
                  <Text style={styles.menuBadgeText}>{item.badge}</Text>
                </View>
              )}
              <AppIcon name="chevronRight" size={14} color="#CAD1DB" strokeWidth={2.2} />
            </Pressable>
            {i < section.items.length - 1 && (
              <AppSeparator style={styles.rowDivider} />
            )}
          </React.Fragment>
        ))}
      </AppCard>
    </View>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────

export function MyPageScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavProp>();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.content,
        {paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24},
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Profile card ── */}
      <AppCard style={styles.profileCard} padding="md" radius="xl" elevation>
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{MOCK_USER.initial}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{MOCK_USER.name}</Text>
            <Text style={styles.profileEmail}>{MOCK_USER.email}</Text>
            <View style={styles.profileBadges}>
              <View style={styles.badgeGreen}>
                <Text style={styles.badgeGreenText}>일반 이용자</Text>
              </View>
              <View style={styles.badgeBlue}>
                <Text style={styles.badgeBlueText}>공급자</Text>
              </View>
            </View>
          </View>
          <AppIcon name="chevronRight" size={20} color="#8B99AC" strokeWidth={2} />
        </View>
      </AppCard>

      {/* ── Stats grid ── */}
      <AppCard style={styles.statsCard} padding="none" radius="xl" elevation>
        <View style={styles.statsGrid}>
          {MOCK_USER.stats.map((s, i) => (
            <View
              key={i}
              style={[styles.statCell, i > 0 && styles.statCellBorder]}
            >
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>
      </AppCard>

      {/* ── Provider section ── */}
      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>공급자</Text>
        <AppCard padding="none" radius="xl" elevation>
          <Pressable
            style={styles.menuRow}
            onPress={() => navigation.navigate('ProviderDashboardScreen')}
          >
            <View style={styles.menuIconWrap}>
              <Text style={styles.menuIconEmoji}>🏠</Text>
            </View>
            <View style={styles.menuBody}>
              <Text style={styles.menuLabel}>공급자 대시보드</Text>
              <Text style={styles.menuSub}>주차장 등록 및 수익 현황</Text>
            </View>
            <AppIcon name="chevronRight" size={14} color="#CAD1DB" strokeWidth={2.2} />
          </Pressable>
        </AppCard>
      </View>

      {/* ── Menu sections ── */}
      {MENU_SECTIONS.map(section => (
        <MenuSection key={section.title} section={section} />
      ))}

      <Text style={styles.version}>SmartPark v1.1.9</Text>
    </ScrollView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: '#F8F9FB'},
  content: {gap: 12},

  // ── Profile
  profileCard: {marginHorizontal: 16, marginTop: 0},
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#006CFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  profileInfo: {flex: 1, gap: 3},
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.4,
    includeFontPadding: false,
  },
  profileEmail: {
    fontSize: 12,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  profileBadges: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 2,
  },
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

  // ── Stats
  statsCard: {marginHorizontal: 16},
  statsGrid: {
    flexDirection: 'row',
  },
  statCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 8,
    backgroundColor: '#FFFFFF',
  },
  statCellBorder: {
    borderLeftWidth: 1,
    borderLeftColor: '#E5EAF1',
  },
  statValue: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },

  // ── Menu sections
  menuSection: {marginHorizontal: 16},
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7C92',
    letterSpacing: 0.2,
    paddingHorizontal: 4,
    paddingTop: 8,
    paddingBottom: 6,
    includeFontPadding: false,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  menuIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#F8F9FB',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  menuIconEmoji: {
    fontSize: 15,
    textAlign: 'center',
    includeFontPadding: false,
  },
  menuBody: {flex: 1, gap: 1},
  menuLabel: {
    fontSize: 13.5,
    fontWeight: '500',
    color: '#222225',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  menuSub: {
    fontSize: 11.5,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  menuBadge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 5,
    backgroundColor: '#FB5852',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  menuBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  rowDivider: {
    marginLeft: 54,
  },

  version: {
    fontSize: 11.5,
    color: '#CAD1DB',
    textAlign: 'center',
    paddingVertical: 16,
    includeFontPadding: false,
  },
});
