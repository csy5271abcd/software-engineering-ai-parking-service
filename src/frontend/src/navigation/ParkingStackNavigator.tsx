import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ParkingListScreen} from '../screens/parking/ParkingListScreen';
import {ParkingDetailScreen} from '../screens/parking/ParkingDetailScreen';
import {SoonAvailableScreen} from '../screens/parking/SoonAvailableScreen';
import {RouteScreen} from '../screens/session/RouteScreen';
import {ActiveSessionScreen} from '../screens/session/ActiveSessionScreen';
import {PaymentScreen} from '../screens/session/PaymentScreen';
import {PaymentResultScreen} from '../screens/session/PaymentResultScreen';
import type {ParkingStackParamList} from './navigationTypes';

const Stack = createStackNavigator<ParkingStackParamList>();

export function ParkingStackNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ParkingListScreen" component={ParkingListScreen} />
      <Stack.Screen name="ParkingDetailScreen" component={ParkingDetailScreen} />
      <Stack.Screen name="SoonAvailableScreen" component={SoonAvailableScreen} />
      <Stack.Screen name="RouteScreen" component={RouteScreen} />
      <Stack.Screen name="ActiveSessionScreen" component={ActiveSessionScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="PaymentResultScreen" component={PaymentResultScreen} />
    </Stack.Navigator>
  );
}
