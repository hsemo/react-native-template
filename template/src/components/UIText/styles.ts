import { StyleSheet } from 'react-native';
import { Fonts, fontSizes } from '@src/theme/fonts';

const stylesFunc = (COLORS: Colors) =>
  StyleSheet.create({
    text: {
      fontFamily: Fonts.DEFAULT.REGULAR,
      color: COLORS.ON_PRIMARY,
      fontSize: fontSizes.f14,
    },
    errorText: {
      color: COLORS.RED,
      marginTop: 5,
    },
  });

export default stylesFunc;
