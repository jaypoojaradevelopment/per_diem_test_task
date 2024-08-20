import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
  offlineAccess: false,
  iosClientId:
    '505910843688-4dt6pp1ptm6uvt4eq33gjvh97m6r39bp.apps.googleusercontent.com',
  webClientId:
    '505910843688-3rpcdrurc2pudfuchejv0puis11eo5if.apps.googleusercontent.com',
});
export const onGoogleButtonPress = async () => {
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

  const {idToken} = await GoogleSignin.signIn();

  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  return auth().signInWithCredential(googleCredential);
};
