import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { COLORS } from '@theme/colors';
import { fontSizes } from '@src/theme/fonts';

interface Styles {
  shadowStyle: ViewStyle;
  regularText: TextStyle;
  text: TextStyle;
  boldText: TextStyle;
  smallBoldText: TextStyle;
  titleText: TextStyle;
  headerText: TextStyle;
  container: ViewStyle;
  containerWithBg: ViewStyle;
  paddedContainer: ViewStyle;
  row: ViewStyle;
  rowSpread: ViewStyle;
  rowCentered: ViewStyle;
  centered: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  regularText: {
    fontSize: fontSizes.f14,
    color: COLORS.BLACK,
  },
  text: {
    fontSize: fontSizes.f16,
    fontWeight: '500',
  },
  boldText: {
    fontSize: fontSizes.f20,
    fontWeight: '700',
  },
  smallBoldText: {
    fontSize: fontSizes.f12,
    fontWeight: '700',
  },
  titleText: {
    fontSize: fontSizes.f22,
    fontWeight: '700',
  },
  headerText: {
    fontSize: fontSizes.f20,
    fontWeight: '700',
    color: COLORS.BLACK,
  },
  container: { flex: 1 },
  containerWithBg: { flex: 1, backgroundColor: COLORS.WHITE },
  paddedContainer: { flex: 1, backgroundColor: COLORS.WHITE, padding: 15 },
  row: { flexDirection: 'row', alignItems: 'center' },
  rowSpread: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowCentered: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: { alignItems: 'center', justifyContent: 'center' },
});
