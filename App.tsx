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
import notifee, {
  AndroidImportance,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import storageHelper from './src/helper/storageHelper';
import {Item} from '@components/ListTile';

export type AppStackParams = {
  AuthScreen: undefined;
  LoginScreen: undefined;
  OnBoardingScreen: undefined;
  HomeScreen: undefined;
};

export type AppNavigationProps = StackNavigationProp<AppStackParams>;

const Stack = createStackNavigator<AppStackParams>();

const App = () => {
  const getToggleItems = async () => {
    const storedData = await storageHelper.getItem(
      storageHelper.STORAGE_KEYS.LIST_DATA,
    );
    if (storedData) {
      const items: Item[] = JSON.parse(storedData);
      const toogledItems: string[] = [];

      items.forEach(element => {
        if (element.isAvailable) {
          toogledItems.push(element.itemName);
        }
      });

      return toogledItems;
    }
    return [];
  };

  const onCreateTriggerNotification = useCallback(async () => {
    const date = new Date(Date.now());
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime() + 10 * 60000,
    };

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    const items = await getToggleItems();
    const toggledItems = items.length === 0 ? 'Nothing' : items.join(',');
    
    
    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        title: 'Current Availability',
        body: `${toggledItems} is ON`,
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
        },
      },
      trigger,
    );
  }, []);

  const handleAppStateChange = useCallback(
    async (nextAppState: AppStateStatus) => {
      const token = await storageHelper.getItem(storageHelper.STORAGE_KEYS.TOKEN);
      if (nextAppState === 'background' && token !== undefined) {
        await onCreateTriggerNotification();
      }
    },
    [onCreateTriggerNotification],
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
