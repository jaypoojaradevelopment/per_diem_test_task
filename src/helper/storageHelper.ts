import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  USER: 'user',
  LIST_DATA: 'list_data',
};

const saveItem = async (key: string, authToken: string) => {
  try {
    await AsyncStorage.setItem(key, authToken).then();
    return true;
  } catch (error) {
    return false;
  }
};

const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
};

const getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export default {
  removeItem,
  getItem,
  saveItem,
  STORAGE_KEYS,
};
