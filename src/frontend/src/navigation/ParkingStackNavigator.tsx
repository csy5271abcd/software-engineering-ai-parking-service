import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ParkingListScreen} from '../screens/parking/ParkingListScreen';
import type {ParkingStackParamList} from './navigationTypes';
import {colors} from '../theme';

const Stack = createStackNavigator<ParkingStackParamList>();

export function ParkingStackNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: colors.background.default},
        headerTintColor: colors.text.primary,
        headerTitleStyle: {fontWeight: '600'},
      }}>
      <Stack.Screen
        name="ParkingListScreen"
        component={ParkingListScreen}
        options={{title: '이용'}}
      />
    </Stack.Navigator>
  );
}
