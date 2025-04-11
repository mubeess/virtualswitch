import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '@virtualswitch/screens/auth/Login';
import { stackScreenOptions } from '@virtualswitch/constants';
import { RootStackParamList } from '../types';

const Stack = createStackNavigator<RootStackParamList>();

function MainAppStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

export default MainAppStack;
