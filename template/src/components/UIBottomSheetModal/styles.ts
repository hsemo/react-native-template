import { StyleSheet } from 'react-native';

const stylesFunc = (COLORS: Colors) =>
  StyleSheet.create({
    modalView: {
      paddingHorizontal: 20,
      backgroundColor: COLORS.PRIMARY,
    },

    bottomSheetHandle: {
      backgroundColor: COLORS.PRIMARY,
      borderTopLeftRadius: 14,
      borderTopRightRadius: 14,
    },

    bottomSheetHandleIndicator: {
      backgroundColor: COLORS.MEDIUM_GRAY,
    },
  });

export default stylesFunc;
