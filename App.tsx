import {StatusBar} from 'react-native';
import React from 'react';
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
import SplashScreen from 'react-native-splash-screen';

export type AppStackParams = {
  AuthScreen: undefined;
  LoginScreen: undefined;
  OnBoardingScreen: undefined;
  HomeScreen: undefined;
};

export type AppNavigationProps = StackNavigationProp<AppStackParams>;

const Stack = createStackNavigator<AppStackParams>();

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      <NavigationContainer
        onReady={() => {
          SplashScreen.hide();
        }}>
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
