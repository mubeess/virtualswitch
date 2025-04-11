import 'nativewind';
import './global.css';
import AnimatedSplashScreen from '@virtualswitch/screens/splash_screen/AnimatedSplashScreen';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigation from '@virtualswitch/navigations/AppNavigation';

export default function App() {
  const [visible, setVisible] = useState(true);
  return (
    <>
      {visible ? (
        <AnimatedSplashScreen
          onAnimationEnd={() => {
            setVisible(false);
          }}
        />
      ) : (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AppNavigation />
        </GestureHandlerRootView>
      )}
    </>
  );
}
