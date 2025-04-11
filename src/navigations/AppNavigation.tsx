import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainAppStack from './stack/MainAppStack';


export default function AppNavigation() {
  return (
    <NavigationContainer>
      <MainAppStack />
    </NavigationContainer>
  );
}
