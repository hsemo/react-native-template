import { StyleSheet } from 'react-native';

const stylesFunc = (colors: Colors) =>
  StyleSheet.create({
    container: {
      position: 'relative',
    },

    labelContainer: {
      position: 'relative',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    arrowIconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },

    optionsContaienr: {
      backgroundColor: colors.PRIMARY,
      overflow: 'hidden',
      borderRadius: 10,
      elevation: 4,
    },

    optionsSubContainer: {
      backgroundColor: colors.PRIMARY,
      padding: 10,
      gap: 10,
    },

    optionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10,
      backgroundColor: colors.SECONDARY,
      padding: 10,
      borderRadius: 10,
    },
  });

export default stylesFunc;
