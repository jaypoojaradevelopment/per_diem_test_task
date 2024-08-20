import {useCallback, useEffect, useState} from 'react';
import {Item} from '../components/ListTile';
import storageHelper from '../helper/storageHelper';
import lodash from 'lodash';
import {SuccessToast} from '../helper/utilsHelper';

const useItemList = () => {
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
  }, []);

  useEffect(() => {
    init();
  }, [init]);

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

  const clearForm = () => {
    setItemName(undefined);
    setDate(undefined);
  };

  const addItem = async () => {
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
    SuccessToast('Item added successfully');
  };

  return {
    itemName,
    date,
    itemList,
    setItemName,
    setDate,
    handleSwitch,
    addItem,
  };
};

export default useItemList;
