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
import notifee, {AuthorizationStatus} from '@notifee/react-native';
import {useNavigation} from '@react-navigation/native';
import {AppNavigationProps} from '../../../App';
import AppIcon, {IconProvider} from '../../helper/appIcon';
import {Menu, MenuItem} from 'react-native-material-menu';
import EmptyComponent from '../../components/EmptyComponent';

const HomeScreen = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const [itemName, setItemName] = useState<string>();
  const [date, setDate] = useState<Date>();
  const [itemList, setItemList] = useState<Item[]>([]);
  const [visible, setVisible] = useState<boolean>(false);

  const init = useCallback(async () => {
    await notifee.requestPermission();
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
    if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
      Alert.alert(
        'Notification permission is required',
        'Please enable notifications form settings to receive notification',
        [],
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

  const showMenu = () => setVisible(true);

  const hideMenu = () => setVisible(false);

  const handleLogOut = async () => {
    await storageHelper.removeItem(storageHelper.STORAGE_KEYS.TOKEN);
    await storageHelper.removeItem(storageHelper.STORAGE_KEYS.LIST_DATA);
    hideMenu();
    navigation.replace('LoginScreen');
  };

  const isDisabled = Boolean(!itemName || !date);

  return (
    <FullScreenContainer style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Home</Text>
        <Menu
          visible={visible}
          onRequestClose={hideMenu}
          anchor={
            <TouchableOpacity onPress={showMenu} hitSlop={25}>
              <AppIcon
                icon="more-v-a"
                iconProvider={IconProvider.fontisto}
                size={18}
                color={colors.black}
              />
            </TouchableOpacity>
          }>
          <MenuItem onPress={handleLogOut}>Log Out</MenuItem>
        </Menu>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Enter item name"
            value={itemName}
            style={styles.textInput}
            placeholderTextColor={colors.gray}
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
        ListEmptyComponent={<EmptyComponent />}
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
    flexGrow: 1,
    gap: 15,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
