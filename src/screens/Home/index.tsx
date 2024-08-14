import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {ListTile} from '../../components';
import {userDataType} from '../../components/ListTile';
import {styles} from './styles';
import AppIcon, {IconProvider} from '../../helper/appIcon';
import {colors} from '../../utils/theme';
import DatePicker from 'react-native-date-picker';

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
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState<boolean>(false);
  const [description, setDescription] = useState<string>();
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View>
          <TextInput
            placeholder="Enter Your Name"
            value={description}
            style={styles.textInput}
            onChangeText={text => setDescription(text)}
          />
          <TouchableOpacity onPress={() => setOpen(true)}>
            <AppIcon
              icon="calendar"
              iconProvider={IconProvider.entypo}
              size={28}
              color={colors.black}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttonView} onPress={() => {}}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <DatePicker
          modal
          mode="date"
          open={open}
          date={date}
          minimumDate={new Date()}
          onConfirm={date => {
            setDate(date);
            setOpen(false);
          }}
          onCancel={() => setOpen(false)}
        />
      </View>
      {data.map(item => {
        return <ListTile data={item} />;
      })}
    </View>
  );
};

export default HomeScreen;
