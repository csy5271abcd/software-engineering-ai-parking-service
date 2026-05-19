import React from 'react';
import {View, Text, Pressable, StyleSheet, DeviceEventEmitter} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CommonActions} from '@react-navigation/native';
import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {HomeStackNavigator} from './HomeStackNavigator';
import {SearchStackNavigator} from './SearchStackNavigator';
import {ParkingStackNavigator} from './ParkingStackNavigator';
import {RecommendStackNavigator} from './RecommendStackNavigator';
import {MyPageStackNavigator} from './MyPageStackNavigator';
import type {MainTabParamList} from './navigationTypes';
import {AppIcon} from '../components/common/AppIcon';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_CONFIG = [
  {label: '주변',      badge: false},
  {label: '저장',      badge: false},
  {label: '이용',      badge: false},
  {label: '스마트패스', badge: false},
  {label: 'MY',        badge: false},
] as const;

// ── AppIcon-based tab icon ────────────────────────────────────────────────────

function TabIcon({
  routeName,
  active,
}: {
  routeName: string;
  active: boolean;
}): React.JSX.Element {
  const color = active ? '#006CFF' : '#4D5A6A';
  const strokeWidth = active ? 2.2 : 1.8;
  switch (routeName) {
    case 'HomeTab':
      return (
        <AppIcon name="mapPin" size={22} color={color} strokeWidth={strokeWidth} />
      );
    case 'SearchTab':
      // Star fills when active (Naver-style)
      return (
        <AppIcon
          name="star"
          size={22}
          color={color}
          strokeWidth={strokeWidth}
          fill={active ? color : 'none'}
        />
      );
    case 'ParkingTab':
      return (
        <AppIcon name="calendarDays" size={22} color={color} strokeWidth={strokeWidth} />
      );
    case 'RecommendTab':
      return (
        <AppIcon name="cpu" size={22} color={color} strokeWidth={strokeWidth} />
      );
    case 'MyPageTab':
      return (
        <AppIcon name="user" size={22} color={color} strokeWidth={strokeWidth} />
      );
    default:
      return <View style={{width: 22, height: 22}} />;
  }
}

// ── Hide tab bar when ParkingDetailScreen is the top screen ──────────────────

function hasDetailScreenActive(state: BottomTabBarProps['state']): boolean {
  const activeRoute = state.routes[state.index];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nested = (activeRoute as any)?.state;
  if (!nested?.routes?.length) return false;
  const topIdx: number = nested.index ?? nested.routes.length - 1;
  return nested.routes[topIdx]?.name === 'ParkingDetailScreen';
}

// ── Custom bottom tab bar ─────────────────────────────────────────────────────

function SmartParkTabBar({
  state,
  navigation,
}: BottomTabBarProps): React.JSX.Element | null {
  const insets = useSafeAreaInsets();
  if (hasDetailScreenActive(state)) return null;
  return (
    <View style={[styles.bar, {paddingBottom: Math.max(insets.bottom, 8)}]}>
      {state.routes.map((route, idx) => {
        const active = state.index === idx;
        const cfg = TAB_CONFIG[idx as 0 | 1 | 2 | 3 | 4];
        return (
          <Pressable
            key={route.key}
            style={[styles.tab, active && styles.tabActive]}
            onPress={() => {
              if (idx === 0) {
                DeviceEventEmitter.emit('HOME_TAB_PRESS');
              }
              if (!active) {
                navigation.dispatch(
                  CommonActions.navigate({name: route.name}),
                );
              }
            }}
          >
            <TabIcon routeName={route.name} active={active} />
            <Text style={[styles.label, active && styles.labelActive]}>
              {cfg.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

// ── Navigator ─────────────────────────────────────────────────────────────────

export function MainTabNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      tabBar={props => <SmartParkTabBar {...props} />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} />
      <Tab.Screen name="SearchTab" component={SearchStackNavigator} />
      <Tab.Screen name="ParkingTab" component={ParkingStackNavigator} />
      <Tab.Screen name="RecommendTab" component={RecommendStackNavigator} />
      <Tab.Screen name="MyPageTab" component={MyPageStackNavigator} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5EAF1',
    paddingTop: 6,
    paddingHorizontal: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  tab: {
    flex: 1,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 2,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'transparent',
    gap: 2,
  },
  tabActive: {borderColor: '#006CFF'},
  label: {
    fontSize: 10.5,
    fontWeight: '500',
    color: '#6B7C92',
    includeFontPadding: false,
    letterSpacing: -0.4,
    lineHeight: 14,
  },
  labelActive: {color: '#006CFF', fontWeight: '700'},
});
