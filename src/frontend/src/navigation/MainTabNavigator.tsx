import React from 'react';
import {View, Text, Pressable, StyleSheet, DeviceEventEmitter} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CommonActions} from '@react-navigation/native';
import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {HomeStackNavigator} from './HomeStackNavigator';
import {SearchStackNavigator} from './SearchStackNavigator';
import {ParkingStackNavigator} from './ParkingStackNavigator';
import {ProviderStackNavigator} from './ProviderStackNavigator';
import {MyPageStackNavigator} from './MyPageStackNavigator';
import type {MainTabParamList} from './navigationTypes';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_CONFIG = [
  {label: '주변',   badge: false},
  {label: '저장',   badge: false},
  {label: '이용',   badge: false},
  {label: '공급자', badge: true},
  {label: 'MY',     badge: false},
] as const;

// ── View-based tab icons ──────────────────────────────────────────────────────

function IconLocation({active}: {active: boolean}): React.JSX.Element {
  const c = active ? '#006CFF' : '#8B99AC';
  return (
    <View style={icon.wrap}>
      <View style={[icon.locCircle, {borderColor: c}]}>
        <View style={[icon.locDot, {backgroundColor: c}]} />
      </View>
      <View style={[icon.locTail, {borderTopColor: c}]} />
    </View>
  );
}

function IconStar({active}: {active: boolean}): React.JSX.Element {
  return (
    <Text style={[icon.star, {color: active ? '#006CFF' : '#8B99AC'}]}>
      {active ? '★' : '☆'}
    </Text>
  );
}

function IconCalendar({active}: {active: boolean}): React.JSX.Element {
  const c = active ? '#006CFF' : '#8B99AC';
  return (
    <View style={icon.wrap}>
      <View style={[icon.calBody, {borderColor: c}]}>
        <View style={[icon.calBar, {backgroundColor: c}]} />
        <View style={icon.calRow}>
          <View style={[icon.calDot, {backgroundColor: c}]} />
          <View style={[icon.calDot, {backgroundColor: c}]} />
          <View style={[icon.calDot, {backgroundColor: c}]} />
        </View>
      </View>
    </View>
  );
}

function IconHouse({active}: {active: boolean}): React.JSX.Element {
  const c = active ? '#006CFF' : '#8B99AC';
  return (
    <View style={icon.wrap}>
      <View style={[icon.houseRoof, {borderBottomColor: c}]} />
      <View style={[icon.houseBody, {backgroundColor: c}]} />
    </View>
  );
}

function IconPerson({active}: {active: boolean}): React.JSX.Element {
  const c = active ? '#006CFF' : '#8B99AC';
  return (
    <View style={icon.wrap}>
      <View style={[icon.personHead, {backgroundColor: c}]} />
      <View style={[icon.personBody, {borderColor: c}]} />
    </View>
  );
}

const icon = StyleSheet.create({
  wrap: {width: 22, height: 22, alignItems: 'center', justifyContent: 'center'},
  star: {fontSize: 18, lineHeight: 22, includeFontPadding: false},
  // Location pin
  locCircle: {
    width: 15,
    height: 15,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locDot: {width: 5, height: 5, borderRadius: 2.5},
  locTail: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -2,
  },
  // Calendar
  calBody: {
    width: 16,
    height: 14,
    borderRadius: 2,
    borderWidth: 1.5,
    overflow: 'hidden',
  },
  calBar: {height: 4},
  calRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 1,
    marginTop: 2,
  },
  calDot: {width: 3, height: 3, borderRadius: 1.5},
  // House
  houseRoof: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  houseBody: {
    width: 14,
    height: 9,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    marginTop: -1,
  },
  // Person
  personHead: {width: 10, height: 10, borderRadius: 5, marginBottom: 1},
  personBody: {
    width: 16,
    height: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 2,
    borderBottomWidth: 0,
  },
});

function TabIcon({
  routeName,
  active,
}: {
  routeName: string;
  active: boolean;
}): React.JSX.Element {
  switch (routeName) {
    case 'HomeTab':
      return <IconLocation active={active} />;
    case 'SearchTab':
      return <IconStar active={active} />;
    case 'ParkingTab':
      return <IconCalendar active={active} />;
    case 'ProviderTab':
      return <IconHouse active={active} />;
    case 'MyPageTab':
      return <IconPerson active={active} />;
    default:
      return <View style={{width: 22, height: 22}} />;
  }
}

// ── Custom bottom tab bar ─────────────────────────────────────────────────────

function SmartParkTabBar({
  state,
  navigation,
}: BottomTabBarProps): React.JSX.Element {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bar, {paddingBottom: Math.max(insets.bottom, 6)}]}>
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
            {cfg.badge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>1</Text>
              </View>
            )}
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
      <Tab.Screen name="ProviderTab" component={ProviderStackNavigator} />
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
    alignItems: 'center',
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'transparent',
    position: 'relative',
  },
  tabActive: {borderColor: '#006CFF'},
  label: {
    fontSize: 10,
    fontWeight: '500',
    color: '#8B99AC',
    marginTop: 3,
    includeFontPadding: false,
  },
  labelActive: {color: '#006CFF', fontWeight: '700'},
  badge: {
    position: 'absolute',
    top: 4,
    right: 8,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FB5852',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  badgeText: {fontSize: 8, fontWeight: '800', color: '#FFFFFF'},
});
