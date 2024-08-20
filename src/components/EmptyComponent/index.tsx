import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/theme';

interface IProps {
  msg?: string;
}

const EmptyComponent = ({msg = 'No Data Found!'}: IProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{msg}</Text>
    </View>
  );
};

export default EmptyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: colors.gray,
  },
});
