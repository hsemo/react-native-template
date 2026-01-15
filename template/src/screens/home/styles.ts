import { StyleSheet } from 'react-native';

import { fontSizes } from '@src/theme/fonts';

const stylesFunc = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.PRIMARY,
      position: 'relative',
    },

    title: {
      textAlign: 'center',
      fontSize: fontSizes.f22,
    },
  });

export default stylesFunc;
