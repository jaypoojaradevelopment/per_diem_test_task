import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppNavigationProps} from '../../../App';
import {AppButton, FullScreenContainer} from '../../components';
import {Images} from '../../assets/index';
import storageHelper from '../../helper/storageHelper';
import {colors} from '../../utils/theme';
import {ErrorToast} from '../../helper/utilsHelper';
import {onGoogleButtonPress} from '../../helper/firebaseAuthHelper';
import {isError} from 'lodash';

const AuthScreen = () => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isGoogleLoading, setGoogleLoading] = useState<boolean>(false);
  const navigation = useNavigation<AppNavigationProps>();

  const handleLogin = () => {
    setLoading(true);
    setTimeout(async () => {
      if (username === 'admin' && password === 'password123') {
        await storageHelper.saveItem(
          storageHelper.STORAGE_KEYS.TOKEN,
          username,
        );
        navigation.replace('HomeScreen');
      } else {
        ErrorToast('Invalid username or password');
      }
      setLoading(false);
    }, 2500);
  };

  const handleLoginWithGoogle = async () => {
    setGoogleLoading(true);
    try {
      const userDetail = await onGoogleButtonPress();
      if (userDetail.user) {
        await storageHelper.saveItem(
          storageHelper.STORAGE_KEYS.TOKEN,
          userDetail.user.displayName!,
        );
        navigation.replace('HomeScreen');
      } else {
        ErrorToast('Invalid username or password');
      }
    } catch (error) {
      if (isError(error)) {
        ErrorToast(error.message);
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const isDisabled = Boolean(!username || !password);

  return (
    <FullScreenContainer style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.welcomeText}>
            Welcome back! Glad{'\n'}to see you, Again!
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              autoCapitalize="none"
              value={username}
              placeholder="Username"
              style={styles.input}
              onChangeText={setUsername}
              placeholderTextColor={colors.gray}
            />
            <TextInput
              secureTextEntry
              value={password}
              placeholder="Password"
              style={styles.input}
              onChangeText={setPassword}
              placeholderTextColor={colors.gray}
            />
          </View>
          <AppButton
            title="Login"
            isLoading={isLoading}
            onPress={handleLogin}
            disabled={isDisabled}
          />
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>Or Login with</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity
            disabled={isLoading}
            style={styles.googleButton}
            onPress={handleLoginWithGoogle}>
            {isGoogleLoading ? (
              <ActivityIndicator color={colors.primary} />
            ) : (
              <Image source={Images.google} style={styles.googleIcon} />
            )}

            <Text style={styles.googleButtonText}>With Google</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </FullScreenContainer>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  welcomeText: {
    marginVertical: 30,
    fontSize: 20,
    lineHeight: 30,
    letterSpacing: 0.6,
    fontWeight: 'bold',
    color: colors.black,
  },
  inputContainer: {
    gap: 15,
    marginBottom: 30,
  },
  input: {
    backgroundColor: colors.white,
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.backgroundColor,
    color: colors.black,
  },
  dividerContainer: {
    marginVertical: 35,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  divider: {
    height: 1,
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  dividerText: {
    color: colors.gray,
  },
  googleButton: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.backgroundColor,
    height: 45,
    alignItems: 'center',
    paddingHorizontal: 15,
    gap: 12,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  googleIcon: {
    height: 20,
    width: 20,
  },
  googleButtonText: {
    color: colors.black,
    fontSize: 13,
  },
});
