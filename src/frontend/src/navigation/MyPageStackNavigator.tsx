import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MyPageScreen} from '../screens/mypage/MyPageScreen';
import {ProviderDashboardScreen} from '../screens/provider/ProviderDashboardScreen';
import {ProviderRegisterWizardScreen} from '../screens/provider/ProviderRegisterWizardScreen';
import type {MyPageStackParamList} from './navigationTypes';

const Stack = createStackNavigator<MyPageStackParamList>();

export function MyPageStackNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyPageScreen" component={MyPageScreen} />
      <Stack.Screen name="ProviderDashboardScreen" component={ProviderDashboardScreen} />
      <Stack.Screen name="ProviderRegisterWizardScreen" component={ProviderRegisterWizardScreen} />
    </Stack.Navigator>
  );
}
