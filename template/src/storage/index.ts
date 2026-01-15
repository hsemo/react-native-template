import { createMMKV } from 'react-native-mmkv';

import { name as appName } from '../../app.json';

export const storage = createMMKV({
  id: `${appName}-storage`,
});

// Storage utility functions
export const storageUtils = {
  // String operations
  setString: (key: string, value: string) => {
    storage.set(key, value);
  },

  getString: (key: string): string | undefined => {
    return storage.getString(key);
  },

  // Boolean operations
  setBoolean: (key: string, value: boolean) => {
    storage.set(key, value);
  },

  getBoolean: (key: string): boolean => {
    return storage.getBoolean(key) || false;
  },

  // Object operations
  setObject: <T>(key: string, value: T) => {
    storage.set(key, JSON.stringify(value));
  },

  getObject: <T>(key: string): T | null => {
    const value = storage.getString(key);
    if (value) {
      try {
        return JSON.parse(value) as T;
      } catch (error) {
        console.error('Error parsing stored object:', error);
        return null;
      }
    }
    return null;
  },

  // Delete operations
  remove: (key: string) => {
    storage.remove(key);
  },

  // Clear all storage
  clearAll: () => {
    storage.clearAll();
  },

  // Check if key exists
  contains: (key: string): boolean => {
    return storage.contains(key);
  },
};
