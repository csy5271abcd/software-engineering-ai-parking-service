import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeMapScreen} from '../screens/home/HomeMapScreen';
import type {HomeStackParamList} from './navigationTypes';
import {colors} from '../theme';

const Stack = createStackNavigator<HomeStackParamList>();

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
