import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MyPageScreen} from '../screens/mypage/MyPageScreen';
import type {MyPageStackParamList} from './navigationTypes';
import {colors} from '../theme';

const Stack = createStackNavigator<MyPageStackParamList>();

export function MyPageStackNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyPageScreen" component={MyPageScreen} />
    </Stack.Navigator>
  );
}
