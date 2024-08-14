import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../utils/theme';
import {useNavigation} from '@react-navigation/native';
import {AppNavigationProps} from '../../../App';

const AuthScreen = () => {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const navigation = useNavigation<AppNavigationProps>();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TextInput
        value={username}
        placeholder="Username"
        style={{
          backgroundColor: colors.gray,
          padding: 20,
        }}
        onChangeText={text => {
          setUsername(text);
        }}
      />
      <TextInput
        value={password}
        placeholder="Username"
        style={{
          backgroundColor: colors.gray,
          padding: 20,
        }}
        onChangeText={text => {
          setPassword(text);
        }}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthScreen;
