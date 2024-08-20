import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {Platform} from 'react-native';

export const firebaseConfig = {
  apiKey:
    Platform.OS === 'ios'
      ? 'AIzaSyCMyL8EZNH-rP3CBH_oZ4cGFqKTRC2diOA'
      : 'AIzaSyDDFbDJpMIaLTwjf0vbSsCaqAer-h6BdlQ',
  authDomain: 'react-native-test-task-961b4.firebaseapp.com',
  projectId: 'react-native-test-task-961b4',
  storageBucket: 'react-native-test-task-961b4.appspot.com',
  messagingSenderId: '505910843688',
  appId: '1:505910843688:android:127397e4c4f5850159581d',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const currentAuth = getAuth();

export {currentAuth, auth};
