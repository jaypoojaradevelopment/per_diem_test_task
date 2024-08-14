import {View} from 'react-native';
import React from 'react';
import {ListTile} from '../../components';
import {userDataType} from '../../components/ListTile';

const data: userDataType[] = [
  {
    description: 'small',
    date: new Date(),
    isAvailable: false,
  },
  {
    description: 'big',
    date: new Date(),
    isAvailable: true,
  },
  {
    description: 'extra small',
    date: new Date(),
    isAvailable: true,
  },
  {
    description: 'large',
    date: new Date(),
    isAvailable: false,
  },
];

const HomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}>
      {data.map(item => {
        return <ListTile data={item} />;
      })}
    </View>
  );
};

export default HomeScreen;
