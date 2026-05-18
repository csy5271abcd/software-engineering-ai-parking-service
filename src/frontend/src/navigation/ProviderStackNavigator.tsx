import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProviderHomeScreen} from '../screens/provider/ProviderHomeScreen';
import type {ProviderStackParamList} from './navigationTypes';
import {colors} from '../theme';

const Stack = createNativeStackNavigator<ProviderStackParamList>();

export function ProviderStackNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: colors.background.default},
        headerTintColor: colors.text.primary,
        headerTitleStyle: {fontWeight: '600'},
      }}>
      <Stack.Screen
        name="ProviderHomeScreen"
        component={ProviderHomeScreen}
        options={{title: '공급자'}}
      />
    </Stack.Navigator>
  );
}
