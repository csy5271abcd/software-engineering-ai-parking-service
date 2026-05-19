import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SplashScreen} from '../screens/common/SplashScreen';
import {PermissionGuideScreen} from '../screens/common/PermissionGuideScreen';
import {MainTabNavigator} from './MainTabNavigator';
import type {RootStackParamList} from './navigationTypes';

const Stack = createStackNavigator<RootStackParamList>();

// 현재는 로그인/권한/세션 분기 없이 MainTabNavigator로 진입한다.
// 이후 인증 상태와 위치 권한 체크 로직으로 분기를 추가한다.
export function RootNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName="MainTab"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="PermissionGuideScreen" component={PermissionGuideScreen} />
      <Stack.Screen name="MainTab" component={MainTabNavigator} />
    </Stack.Navigator>
  );
}
