import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ParkingListScreen} from '../screens/parking/ParkingListScreen';
import {ParkingDetailScreen} from '../screens/parking/ParkingDetailScreen';
import {SoonAvailableScreen} from '../screens/parking/SoonAvailableScreen';
import type {ParkingStackParamList} from './navigationTypes';

const Stack = createStackNavigator<ParkingStackParamList>();

export function ParkingStackNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="ParkingListScreen"
        component={ParkingListScreen}
      />
      <Stack.Screen
        name="ParkingDetailScreen"
        component={ParkingDetailScreen}
      />
      <Stack.Screen
        name="SoonAvailableScreen"
        component={SoonAvailableScreen}
      />
    </Stack.Navigator>
  );
}
