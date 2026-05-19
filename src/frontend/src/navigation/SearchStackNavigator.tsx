import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DestinationSearchScreen} from '../screens/search/DestinationSearchScreen';
import {RecommendedParkingScreen} from '../screens/search/RecommendedParkingScreen';
import type {SearchStackParamList} from './navigationTypes';

const Stack = createStackNavigator<SearchStackParamList>();

export function SearchStackNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="DestinationSearchScreen"
        component={DestinationSearchScreen}
      />
      <Stack.Screen
        name="RecommendedParkingScreen"
        component={RecommendedParkingScreen}
      />
    </Stack.Navigator>
  );
}
