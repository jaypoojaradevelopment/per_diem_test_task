import {StyleSheet, Switch, Text, View} from 'react-native';
import React from 'react';
import moment from 'moment';
import {colors} from '../../utils/theme';

export type Item = {
  id: string;
  itemName: string;
  date: string | Date;
  isAvailable: boolean;
};

type Props = {
  data: Item;
  index: number;
  onValueChange: (arg0: boolean) => void;
};

const ListTile = ({data, index, onValueChange}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.indexContainer}>
        <Text style={styles.indexText}>#{index + 1}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.itemName}>{data.itemName}</Text>
        <Text style={styles.dateText}>
          {moment(data.date).format('DD-MM-YYYY')}
        </Text>
      </View>
      <View style={styles.switchContainer}>
        <Switch
          ios_backgroundColor={colors.gray}
          trackColor={{false: colors.gray, true: colors.primary}}
          thumbColor={colors.white}
          value={data.isAvailable}
          onValueChange={onValueChange}
        />
      </View>
    </View>
  );
};

export default ListTile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 12,
    overflow: 'hidden',
  },
  indexContainer: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indexText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 20,
    fontStyle: 'italic',
  },
  detailsContainer: {
    flex: 1,
    gap: 5,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 20,
    color: colors.black,
  },
  dateText: {
    color: colors.gray,
    fontSize: 13,
  },
  switchContainer: {
    justifyContent: 'center',
    marginRight: 10,
  },
});
