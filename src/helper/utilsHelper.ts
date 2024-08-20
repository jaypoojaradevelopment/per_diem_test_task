import {Platform} from 'react-native';
import Toast from 'react-native-toast-message';

export const isIos = Platform.OS === 'ios';

export const SuccessToast = (msg: string) => {
  Toast.show({
    type: 'success',
    text1: msg,
    visibilityTime: 3000,
  });
};

export const ErrorToast = (msg: string) => {
  Toast.show({
    type: 'error',
    text1: msg,
    visibilityTime: 3000,
  });
};
