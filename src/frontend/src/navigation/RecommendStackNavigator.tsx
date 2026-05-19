import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import type {RecommendStackParamList} from './navigationTypes';
import {RecommendationScreen} from '../screens/recommend/RecommendationScreen';

const Stack = createStackNavigator<RecommendStackParamList>();

export function RecommendStackNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="RecommendationScreen" component={RecommendationScreen} />
    </Stack.Navigator>
  );
}
