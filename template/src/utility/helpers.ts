import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';

export function isIOS(): boolean {
  return Platform.OS === 'ios';
}

export function checkAndroidAndReturn<T, R>(object: T, or: R): T | R {
  if (!isIOS()) return object;

  return or;
}

export function checkIOSAndReturn<T, R>(object: T, or: R): T | R {
  if (isIOS()) return object;

  return or;
}

export const showErrorToast = (title?: string, desc?: string) => {
  Toast.show({ type: 'error', text1: title, text2: desc });
};

export const showSuccessToast = (title?: string, desc?: string) => {
  Toast.show({ type: 'success', text1: title, text2: desc });
};

export const showInfoToast = (title?: string, desc?: string) => {
  Toast.show({ type: 'info', text1: title, text2: desc });
};
