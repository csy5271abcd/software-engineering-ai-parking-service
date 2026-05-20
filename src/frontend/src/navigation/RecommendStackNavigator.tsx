import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import type {RecommendStackParamList} from './navigationTypes';
import {RecommendationScreen} from '../screens/recommend/RecommendationScreen';
import {ParkingDetailScreen} from '../screens/parking/ParkingDetailScreen';
import {RouteScreen} from '../screens/session/RouteScreen';
import {ActiveSessionScreen} from '../screens/session/ActiveSessionScreen';
import {PaymentScreen} from '../screens/session/PaymentScreen';
import {PaymentResultScreen} from '../screens/session/PaymentResultScreen';

const Stack = createStackNavigator<RecommendStackParamList>();

export function RecommendStackNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="RecommendationScreen" component={RecommendationScreen} />
      <Stack.Screen name="ParkingDetailScreen" component={ParkingDetailScreen} />
      <Stack.Screen name="RouteScreen" component={RouteScreen} />
      <Stack.Screen name="ActiveSessionScreen" component={ActiveSessionScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="PaymentResultScreen" component={PaymentResultScreen} />
    </Stack.Navigator>
  );
}
