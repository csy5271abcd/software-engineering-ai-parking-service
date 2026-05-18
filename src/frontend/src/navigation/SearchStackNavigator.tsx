import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DestinationSearchScreen} from '../screens/search/DestinationSearchScreen';
import type {SearchStackParamList} from './navigationTypes';
import {colors} from '../theme';

const Stack = createNativeStackNavigator<SearchStackParamList>();

export function SearchStackNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: colors.background.default},
        headerTintColor: colors.text.primary,
        headerTitleStyle: {fontWeight: '600'},
      }}>
      <Stack.Screen
        name="DestinationSearchScreen"
        component={DestinationSearchScreen}
        options={{title: '목적지 검색'}}
      />
    </Stack.Navigator>
  );
}
