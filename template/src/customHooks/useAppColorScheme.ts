import { useColorScheme } from 'react-native';

import { AppThemeValue } from '@src/constants/enums';
import { useAppSelector } from '@src/store';
import { selectAppTheme } from '@src/store/slices/appSlice';

function useAppColorScheme() {
  const deviceTheme = useColorScheme();

  const appTheme = useAppSelector(selectAppTheme);

  if (appTheme === AppThemeValue.System) {
    return deviceTheme as AppThemeValue;
  }

  return appTheme;
}

export default useAppColorScheme;
