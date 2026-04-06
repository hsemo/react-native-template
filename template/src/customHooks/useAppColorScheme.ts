import { useColorScheme } from 'react-native';

import { AppThemeValue } from '@src/constants/enums';
import { useAppSelector } from '@src/store';
import { selectAppTheme } from '@src/store/slices/appSlice';
import useAppState from '@src/store/zustand/placeholder';

function useAppColorScheme() {
  const deviceTheme = useColorScheme();
  
  const reduxTheme = useAppSelector(selectAppTheme);
  const zustandTheme = useAppState(state => state.appTheme);
  const appTheme = reduxTheme || zustandTheme;

  if (appTheme === AppThemeValue.System) {
    return deviceTheme as AppThemeValue;
  }

  return appTheme;
}

export default useAppColorScheme;
