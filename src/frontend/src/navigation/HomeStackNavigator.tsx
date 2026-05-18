import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeMapScreen} from '../screens/home/HomeMapScreen';
import type {HomeStackParamList} from './navigationTypes';
import {colors} from '../theme';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStackNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: colors.background.default},
        headerTintColor: colors.text.primary,
        headerTitleStyle: {fontWeight: '600'},
      }}>
      <Stack.Screen
        name="HomeMapScreen"
        component={HomeMapScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
