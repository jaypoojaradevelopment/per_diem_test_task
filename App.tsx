import {AppState, AppStateStatus, StatusBar} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import {colors} from './src/utils/theme';
import {
  AuthScreen,
  HomeScreen,
  LoginScreen,
  OnBoardingScreen,
} from './src/screens';
import storageHelper from './src/helper/storageHelper';
import {onCreateTriggerNotification} from './src/helper/notificationService';
export type AppStackParams = {
  AuthScreen: undefined;
  LoginScreen: undefined;
  OnBoardingScreen: undefined;
  HomeScreen: undefined;
};

export type AppNavigationProps = StackNavigationProp<AppStackParams>;

const Stack = createStackNavigator<AppStackParams>();

const App = () => {
  const handleAppStateChange = useCallback(
    async (nextAppState: AppStateStatus) => {
      const token = await storageHelper.getItem(
        storageHelper.STORAGE_KEYS.TOKEN,
      );
      if (nextAppState === 'background' && token !== undefined) {
        await onCreateTriggerNotification();
      }
    },
    [],
  );

  useEffect(() => {
    const appStateId = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      appStateId.remove();
    };
  }, [handleAppStateChange]);

  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="AuthScreen"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="AuthScreen" component={AuthScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};

export default App;
