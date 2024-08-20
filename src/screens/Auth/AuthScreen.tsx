import {StyleSheet, View, ActivityIndicator} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppNavigationProps} from '../../../App';
import storageHelper from '../../helper/storageHelper';

const AuthScreen = () => {
  const navigation = useNavigation<AppNavigationProps>();

  const init = useCallback(async () => {
    const isOnBorading = await storageHelper.getItem(
      storageHelper.STORAGE_KEYS.IS_ON_BOARDING,
    );
    if (!isOnBorading) {
      navigation.replace('OnBoardingScreen');
      return;
    }

    const isToken = await storageHelper.getItem(
      storageHelper.STORAGE_KEYS.TOKEN,
    );
    if (isToken) {
      navigation.replace('HomeScreen');
      return;
    } else {
      navigation.replace('LoginScreen');
      return;
    }
  }, [navigation]);

  useEffect(() => {
    init();
    return () => console.log('close');
  }, [init]);

  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
