import { StyleSheet } from 'react-native';

const stylesFunc = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.PRIMARY,
    },

    contentContainer: {
      backgroundColor: colors.PRIMARY,
    },

    statusBar: {},
  });

export default stylesFunc;
