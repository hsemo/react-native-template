import { StyleSheet } from 'react-native';

import { styles } from '@src/theme/ViewStyles';
import { fontSizes } from '@src/theme/fonts';

const stylesFunc = (COLORS: Colors) =>
  StyleSheet.create({
    container: {
      ...styles.container,
      ...styles.centered,
      padding: 20,
      backgroundColor: COLORS.WHITE,
    },
    title: {
      fontSize: fontSizes.f20,
      marginBottom: 10,
      color: COLORS.BLACK,
    },
    message: {
      textAlign: 'center',
      color: COLORS.DISABLE_GRAY,
      fontSize: fontSizes.f14,
      marginBottom: 20,
    },
    timestamp: {
      fontSize: fontSizes.f12,
      color: COLORS.CARD_GRAY,
    },
    button: {
      backgroundColor: COLORS.PRIMARY_GREEN,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: COLORS.WHITE,
      fontSize: fontSizes.f15,
    },
    image: {
      width: 200,
      height: 150,
      marginBottom: 40,
    },
  });

export default stylesFunc;
