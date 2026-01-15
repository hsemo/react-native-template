import { StyleSheet } from 'react-native';

import { scalingMetricsProvider } from '@utility/scaling';
import { Fonts, fontFamilies, fontSizes } from '@src/theme/fonts';

const { scaleSize } = scalingMetricsProvider();

const stylesFunc = (COLORS: Colors) =>
  StyleSheet.create({
    container: {
      marginBottom: scaleSize(15),
    },
    label: {
      fontSize: fontSizes.f14,
      fontFamily: fontFamilies.DEFAULT.normal,
      marginBottom: scaleSize(5),
      color: COLORS.BLACK,
    },

    labelCont: {
      flexDirection: 'row',
    },

    input: {
      borderWidth: 1,
      borderColor: COLORS.LINE_COLOR,
      borderRadius: 5,
      padding: scaleSize(10),
      paddingHorizontal: scaleSize(15),
      fontSize: fontSizes.f14,
      color: COLORS.BLACK,
      backgroundColor: COLORS.WHITE,
      fontFamily: Fonts.DEFAULT.REGULAR,
    },

    inputFocused: {
      borderColor: COLORS.TERTIARY,
    },

    required: {
      color: COLORS.RED,
      fontSize: fontSizes.f12,
      textAlignVertical: 'top',
      margin: 1,
    },

    error: {
      marginTop: scaleSize(5),
      color: COLORS.RED,
      fontSize: fontSizes.f12,
    },

    inputCont: {
      position: 'relative',
      justifyContent: 'center',
    },

    leftIconCont: {
      position: 'absolute',
      right: scaleSize(10),
    },
  });

export default stylesFunc;
