import { darkThemeColors, lightThemeColors } from '@src/theme/colors';
import { AppThemeValue } from '@src/constants/enums';

import useAppColorScheme from './useAppColorScheme';

function useThemeColors(): Colors {
  const appTheme = useAppColorScheme();

  return appTheme === AppThemeValue.Light ? lightThemeColors : darkThemeColors;
}

export default useThemeColors;
