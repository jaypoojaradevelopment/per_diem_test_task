import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  IS_ON_BOARDING: 'is_on_boarding',
  TOKEN: 'token',
  LIST_DATA: 'list_data',
};

const saveItem = async (key: string, data: string) => {
  try {
    await AsyncStorage.setItem(key, data).then();
    return;
  } catch (error) {
    throw error;
  }
};

const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return;
  } catch (error) {
    throw error;
  }
};

const getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      return undefined;
    }
  } catch (error) {
    throw error;
  }
};

export default {
  removeItem,
  getItem,
  saveItem,
  STORAGE_KEYS,
};
