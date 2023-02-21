import { StorageConstantsEnum } from './types';

const Cache = {
  async getItem<T>(key: StorageConstantsEnum): Promise<T | null> {
    const value = await localStorage.getItem(key);

    if (value) {
      return JSON.parse(value);
    }

    return null;
  },

  async setItem<T = null>(key: StorageConstantsEnum, value: T): Promise<void> {
    await localStorage.setItem(key, JSON.stringify(value));
  },

  async removeItem(key: StorageConstantsEnum): Promise<void> {
    await localStorage.removeItem(key);
  },
};

export default Cache;
