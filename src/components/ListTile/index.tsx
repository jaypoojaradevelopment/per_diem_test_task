import {StyleSheet, Switch, Text, View} from 'react-native';
import React, {useState} from 'react';
import moment from 'moment';
import {colors} from '../../utils/theme';

export type userDataType = {
  description: string;
  date: Date;
  isAvailable: boolean;
};

type ListTileType = {
  data: userDataType;
};

const ListTile = ({data}: ListTileType) => {
  const [available, setAvailable] = useState<boolean>(data.isAvailable);

  const date = moment(data.date).format('DD-MM-YYYY');

  return (
    <View style={styles.container}>
      <View style={styles.gap}>
        <Text style={styles.titleText}>{data.description}</Text>
        <Text style={styles.dateText}>{date}</Text>
      </View>
      <Switch
        ios_backgroundColor={colors.gray}
        trackColor={{false: colors.gray, true: colors.primary}}
        thumbColor={colors.white}
        onValueChange={val => setAvailable(val)}
        value={available}
      />
    </View>
  );
};

export default ListTile;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primaryOpacity,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    width: '100%',
    marginVertical: 10,
  },
  gap: {
    gap: 10,
  },
  titleText: {
    fontSize: 20,
    color: colors.black,
    fontWeight: '800',
  },
  dateText: {
    fontSize: 14,
    color: colors.gray,
    fontWeight: '400',
  },
});
