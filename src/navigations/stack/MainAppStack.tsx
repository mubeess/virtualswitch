import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { stackScreenOptions } from '@virtualswitch/constants';
import { RootStackParamList } from '../types';
import Home from '@virtualswitch/screens/main_app/Home';

const Stack = createStackNavigator<RootStackParamList>();

function MainAppStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

export default MainAppStack;
