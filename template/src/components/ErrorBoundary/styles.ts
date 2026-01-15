import { StyleSheet } from 'react-native';
import { COLORS } from '@src/theme/colors';
import { styles } from '@src/theme/ViewStyles';
import { fontSizes } from '@src/theme/fonts';

export default StyleSheet.create({
  container: {
    ...styles.paddedContainer,
    ...styles.centered,
    padding: 24,
    backgroundColor: COLORS.WHITE,
  },
  illustration: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  title: {
    fontSize: fontSizes.f20,
    fontWeight: 'bold',
    color: COLORS.TEXT_DARK,
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: fontSizes.f15,
    textAlign: 'center',
    marginBottom: 24,
    color: COLORS.GRAY_TEXT,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: COLORS.PRIMARY_GREEN,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  primaryButtonText: {
    color: COLORS.WHITE,
    fontSize: fontSizes.f15,
  },
});
