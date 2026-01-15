import { STORAGE_KEYS } from '@constants/storage';
import { storageUtils } from '.';

export const authStorage = {
  setTokens: (accessToken: string, refreshToken: string) => {
    storageUtils.setString(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    storageUtils.setString(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    storageUtils.setBoolean(STORAGE_KEYS.IS_AUTHENTICATED, true);
  },

  getAccessToken: (): string | undefined => {
    return storageUtils.getString(STORAGE_KEYS.ACCESS_TOKEN);
  },

  getRefreshToken: (): string | undefined => {
    return storageUtils.getString(STORAGE_KEYS.REFRESH_TOKEN);
  },

  isAuthenticated: (): boolean => {
    return storageUtils.getBoolean(STORAGE_KEYS.IS_AUTHENTICATED);
  },

  clearAuth: () => {
    storageUtils.remove(STORAGE_KEYS.ACCESS_TOKEN);
    storageUtils.remove(STORAGE_KEYS.REFRESH_TOKEN);
    storageUtils.setBoolean(STORAGE_KEYS.IS_AUTHENTICATED, false);
  },
};
