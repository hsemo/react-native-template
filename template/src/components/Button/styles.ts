import { StyleSheet } from 'react-native';

import { scalingMetricsProvider } from '@utility/scaling';
import { Fonts, fontFamilies, fontSizes } from '@src/theme/fonts';

const { scaleSize } = scalingMetricsProvider();

const stylesFunc = (COLORS: Colors) =>
  StyleSheet.create({
    button: {
      paddingVertical: scaleSize(10),
      paddingHorizontal: scaleSize(20),
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    solidButton: {
      backgroundColor: COLORS.TERTIARY,
    },
    outlineButton: {
      borderColor: COLORS.TERTIARY,
      borderWidth: 1,
      backgroundColor: COLORS.TERTIARY,
    },
    flatButton: {
      backgroundColor: 'transparent',
    },
    buttonText: {
      fontSize: fontSizes.textSubSmall,
      color: COLORS.ON_TERTIARY,
      fontFamily: Fonts.IBMPlexMono.REGULAR,
    },
    outlineButtonText: {
      color: COLORS.ON_PRIMARY,
    },
    disabledButton: {
      backgroundColor: COLORS.PRIMARY,
    },

    btnTitle: {
      color: COLORS.ON_PRIMARY,
      fontFamily: fontFamilies.DEFAULT.bold,
    },
  });

export default stylesFunc;
