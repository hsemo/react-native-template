import { useEffect, useMemo } from 'react';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useAppDispatch, useAppSelector } from '@src/store'; // @if withRedux
import useThemeColors from '@src/customHooks/useThemeColors';
import { selectAppTheme, setAppTheme } from '@src/store/slices/appSlice'; // @if withRedux
import { storage } from '@src/storage';
import { STORAGE_KEYS } from '@src/constants/storage';
import { AppThemeValue } from '@src/constants/enums';
import { Fonts } from '@src/theme/fonts';

import StackNavigator from './StackNavigator';
import useAppState from '@src/store/zustand/placeholder'; // @if withZustand

const Routes = () => {
  /* @if withRedux */
  const dispatch = useAppDispatch();
  /* @endif */

  const colors = useThemeColors();

  /* @if withRedux */
  const theme = useAppSelector(selectAppTheme);
  /* @else */
  const theme = useAppState(state => state.appTheme); // @if withZustand
  const theme = AppThemeValue.System; // @if !withZustand
  /* @endif */

  const navigationTheme: Theme = useMemo(() => {
    return {
      colors: {
        background: colors.PRIMARY,
        primary: colors.TERTIARY,
        border: colors.SECONDARY,
        card: colors.PRIMARY,
        notification: colors.PRIMARY,
        text: colors.ON_PRIMARY,
      },
      dark: theme === AppThemeValue.Dark,
      fonts: {
        regular: {
          fontFamily: Fonts.DEFAULT.REGULAR,
          fontWeight: 'normal',
        },
        medium: {
          fontFamily: Fonts.DEFAULT.MEDIUM,
          fontWeight: 'normal',
        },
        bold: {
          fontFamily: Fonts.DEFAULT.BOLD,
          fontWeight: 'normal',
        },
        heavy: {
          fontFamily: Fonts.DEFAULT.SEMI_BOLD,
          fontWeight: 'normal',
        },
      },
    };
  }, [colors, theme]);

  useEffect(() => {
    let appTheme = storage.getString(STORAGE_KEYS.APP_THEME) ?? null;

    if (appTheme === null) {
      storage.set(STORAGE_KEYS.APP_THEME, AppThemeValue.System);
      appTheme = AppThemeValue.System;
    }

    /* @if withRedux */
    dispatch(setAppTheme(appTheme as AppThemeValue));
    /* @endif */
  }, []);

  return (
    <NavigationContainer theme={navigationTheme}>
      <SafeAreaProvider>
        <StackNavigator />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default Routes;
