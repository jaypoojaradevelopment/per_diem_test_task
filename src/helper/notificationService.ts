import notifee, {
  AndroidImportance,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import storageHelper from './storageHelper';
import {Item} from '@components/ListTile';

const getToggleItems = async () => {
  const storedData = await storageHelper.getItem(
    storageHelper.STORAGE_KEYS.LIST_DATA,
  );
  if (storedData) {
    const items: Item[] = JSON.parse(storedData);
    const toggledItems: string[] = items.reduce((acc: string[], element) => {
      if (element.isAvailable) {
        acc.push(element.itemName);
      }
      return acc;
    }, []);

    return toggledItems;
  }
  return [];
};

export const createTriggerNotification = async () => {
  const date = new Date(Date.now());
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime() + 10 * 60000,
  };

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  const items = await getToggleItems();
  const toggledItems = items.length === 0 ? 'Nothing' : items.join(', ');

  // Create a trigger notification
  await notifee.createTriggerNotification(
    {
      title: 'Current Availability',
      body: `${toggledItems} is ON`,
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
      },
    },
    trigger,
  );
};
