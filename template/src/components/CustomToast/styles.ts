import { StyleSheet } from 'react-native';

import { Fonts, fontSizes } from '@src/theme/fonts';

const stylesFunc = (colors: Colors) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.PRIMARY,
      elevation: 5,
      shadowColor: colors.ON_PRIMARY,
      shadowOpacity: 0.3,
      shadowRadius: 4,
      borderRadius: 10,
      borderLeftWidth: 0,
      gap: 15,
      paddingLeft: 15,
    },
    contentContainer: {
      paddingLeft: 0,
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },

    error: {
      borderLeftColor: colors.ERROR_RED,
    },
    success: {
      borderLeftColor: colors.SUCCESS_GREEN,
    },
    info: {
      borderLeftColor: colors.INFO_BLUE,
    },

    text1: {
      color: colors.ON_PRIMARY,
      fontFamily: Fonts.DEFAULT.MEDIUM,
      fontSize: fontSizes.f14,
    },
    text2: {
      color: colors.ON_PRIMARY,
      fontFamily: Fonts.DEFAULT.REGULAR,
      fontSize: fontSizes.f12,
      opacity: 0.6,
    },
  });
};

export default stylesFunc;
