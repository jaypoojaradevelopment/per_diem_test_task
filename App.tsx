import {AppState, AppStateStatus, Platform, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
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
import notifee, {
  AndroidImportance,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';

export type AppStackParams = {
  AuthScreen: undefined;
  LoginScreen: undefined;
  OnBoardingScreen: undefined;
  HomeScreen: undefined;
};

export type AppNavigationProps = StackNavigationProp<AppStackParams>;

const Stack = createStackNavigator<AppStackParams>();

const App = () => {
  useEffect(() => {
    const appStateId = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      appStateId.remove(console.log('the app is closed'));
    };
  }, []);

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    console.log('nextAppState:::::', nextAppState);

    // if(Platform.OS === 'ios'){
    if (nextAppState === 'background') {
      console.log('the app is closed');
      await onCreateTriggerNotification();
    }
    // }
  };

  const onCreateTriggerNotification = async () => {
    const date = new Date(Date.now());
    // date.setHours(11);
    // date.setMinutes(10);
    console.log('trigger time:', date.getTime() + 1 * 60000);

    // Create a time-based trigger
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime() + 1 * 60000,
    };

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        title: 'Meeting with Jane',
        body: 'Today at 11:20am',
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
        },
      },
      trigger,
    );
  };

  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      <NavigationContainer
        onReady={async () => {
          SplashScreen.hide();
          // Request permissions (required for iOS)
          await notifee.requestPermission();
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
