import React from 'react';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeStackNavigator} from './HomeStackNavigator';
import {SearchStackNavigator} from './SearchStackNavigator';
import {ParkingStackNavigator} from './ParkingStackNavigator';
import {ProviderStackNavigator} from './ProviderStackNavigator';
import {MyPageStackNavigator} from './MyPageStackNavigator';
import type {MainTabParamList} from './navigationTypes';
import {colors, typography} from '../theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

type TabIconProps = {color: string};

function TabIcon({label}: {label: string}): (props: TabIconProps) => React.JSX.Element {
  return ({color}: TabIconProps) => (
    <Text style={{fontSize: 20, color}}>{label}</Text>
  );
}

export function MainTabNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary.default,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: {
          backgroundColor: colors.background.default,
          borderTopColor: colors.border.default,
        },
        tabBarLabelStyle: {
          fontSize: typography.caption.sm.fontSize,
          fontWeight: '500',
        },
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: TabIcon({label: '🏠'}),
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchStackNavigator}
        options={{
          tabBarLabel: '검색',
          tabBarIcon: TabIcon({label: '🔍'}),
        }}
      />
      <Tab.Screen
        name="ParkingTab"
        component={ParkingStackNavigator}
        options={{
          tabBarLabel: '이용',
          tabBarIcon: TabIcon({label: '🚗'}),
        }}
      />
      <Tab.Screen
        name="ProviderTab"
        component={ProviderStackNavigator}
        options={{
          tabBarLabel: '공급자',
          tabBarIcon: TabIcon({label: '🅿'}),
        }}
      />
      <Tab.Screen
        name="MyPageTab"
        component={MyPageStackNavigator}
        options={{
          tabBarLabel: '마이',
          tabBarIcon: TabIcon({label: '👤'}),
        }}
      />
    </Tab.Navigator>
  );
}
