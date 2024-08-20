import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import AppIcon, {IconProvider} from '../../helper/appIcon';
import {colors} from '../../utils/theme';
import RNDatePicker from 'react-native-date-picker';
import moment from 'moment';

const DatePicker = ({
  date,
  onConfirm,
}: {
  date?: Date;
  onConfirm: (obj0: Date) => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={styles.datePickerButton}>
        <AppIcon
          icon="calendar"
          iconProvider={IconProvider.entypo}
          size={20}
          color={date ? colors.black : colors.gray}
        />
        <Text style={date ? styles.datePickerText : styles.placeholderText}>
          {date ? moment(date).format('DD-MM-YYYY') : 'Select date'}
        </Text>
      </TouchableOpacity>
      <RNDatePicker
        modal
        mode="date"
        open={open}
        date={date ?? new Date()}
        minimumDate={new Date()}
        onConfirm={selectedDate => {
          onConfirm(selectedDate);
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
      />
    </>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
  },
  datePickerText: {
    color: colors.black,
  },
  placeholderText: {
    color: colors.gray,
  },
});
