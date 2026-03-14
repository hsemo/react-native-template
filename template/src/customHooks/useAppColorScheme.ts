import { useColorScheme } from 'react-native';

import { AppThemeValue } from '@src/constants/enums';
import { useAppSelector } from '@src/store';
import { selectAppTheme } from '@src/store/slices/appSlice';
import useAppState from '@src/store/zustand/placeholder';

function useAppColorScheme() {
  const deviceTheme = useColorScheme();
  /* @if withRedux */
  const appTheme = useAppSelector(selectAppTheme);
  /* @endif */
  /* @if withZustand */
  const appTheme = useAppState(state => state.appTheme);
  /* @endif */

  if (appTheme === AppThemeValue.System) {
    return deviceTheme as AppThemeValue;
  }

  return appTheme;
}

export default useAppColorScheme;
