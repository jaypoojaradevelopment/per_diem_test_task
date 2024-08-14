import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppNavigationProps} from '../../../App';
import {styles} from './styles';

const AuthScreen = () => {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const navigation = useNavigation<AppNavigationProps>();
  return (
    <View style={styles.container}>
      <TextInput
        value={username}
        placeholder="Username"
        style={styles.input}
        onChangeText={text => {
          setUsername(text);
        }}
      />
      <TextInput
        value={password}
        placeholder="Username"
        style={styles.input}
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
