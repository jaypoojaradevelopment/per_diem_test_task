import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Item} from '../../components/ListTile';
import {colors} from '../../utils/theme';
import {FullScreenContainer, ListTile, DatePicker} from '../../components';
import storageHelper from '../../helper/storageHelper';
import lodash from 'lodash';
import notifee, {
  AndroidImportance,
  AuthorizationStatus,
} from '@notifee/react-native';

const HomeScreen = () => {
  const [itemName, setItemName] = useState<string>();
  const [date, setDate] = useState<Date>();

  const [itemList, setItemList] = useState<Item[]>([]);

  const init = useCallback(async () => {
    const storedData = await storageHelper.getItem(
      storageHelper.STORAGE_KEYS.LIST_DATA,
    );
    if (storedData) {
      setItemList(JSON.parse(storedData));
    }
    checkNotificationPermission();
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  const checkNotificationPermission = async () => {
    const settings = await notifee.getNotificationSettings();
    if (settings.authorizationStatus == AuthorizationStatus.AUTHORIZED) {
      console.log('Notification permissions has been authorized');
    } else if (settings.authorizationStatus == AuthorizationStatus.DENIED) {
      console.log('Notification permissions has been denied');
      Alert.alert(
        'Notification permission is required',
        '',
        [
          {
            text: 'Go to Setttings',
            onPress: () => {
              notifee.openNotificationSettings();
            },
            style: 'default',
          },
        ],
        {
          cancelable: true,
        },
      );
    }
  };

  const handleSubmitBtn = async () => {
    if (!itemName || !date) {
      return;
    }
    const newItem: Item = {
      id: new Date().getTime().toString(),
      itemName,
      date,
      isAvailable: false,
    };

    const update = itemList;
    update.push(newItem);
    await storeData(update);
  };

  const clearForm = () => {
    setItemName(undefined);
    setDate(undefined);
  };

  const handleSwitch = async (value: boolean, index: number) => {
    const update = itemList;
    update[index].isAvailable = value;
    await storeData(lodash.cloneDeep(update));
  };

  const storeData = async (update: Item[]) => {
    await storageHelper
      .saveItem(storageHelper.STORAGE_KEYS.LIST_DATA, JSON.stringify(update))
      .then(() => {
        setItemList(update);
        clearForm();
      });
  };

  const isDisabled = Boolean(!itemName || !date);

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    // await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  return (
    <FullScreenContainer style={styles.container}>
      <Text style={styles.headerText}>Home</Text>
      <TouchableOpacity onPress={onDisplayNotification}>
        <Text>Notif</Text>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Enter item name"
            value={itemName}
            style={styles.textInput}
            onChangeText={setItemName}
          />
          <View style={styles.separator} />
          <DatePicker date={date} onConfirm={setDate} />
        </View>
        <TouchableOpacity
          disabled={isDisabled}
          onPress={handleSubmitBtn}
          style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={styles.listContent}
        data={itemList}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => (
          <ListTile
            data={item}
            index={index}
            onValueChange={value => handleSwitch(value, index)}
          />
        )}
      />
    </FullScreenContainer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  headerText: {
    fontSize: 25,
    color: colors.black,
    fontWeight: 'bold',
  },
  inputContainer: {
    borderRadius: 12,
    backgroundColor: colors.white,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  inputWrapper: {
    gap: 5,
    flex: 1,
  },
  textInput: {
    color: colors.black,
    paddingVertical: 11,
  },
  separator: {
    height: 1,
    backgroundColor: colors.secondaryColor,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 10,
  },
  submitButtonText: {
    color: colors.white,
    fontWeight: '800',
  },
  listContent: {
    gap: 15,
  },
});
