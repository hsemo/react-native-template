import * as React from 'react';
import { StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';

import useThemeColors from '@src/customHooks/useThemeColors';

import InfoIcon from './InfoIcon';

const ErrorIcon = (props: SvgProps) => {
  const colors = useThemeColors();

  return (
    <InfoIcon color={colors.ERROR_RED} style={styles.errorIcon} {...props} />
  );
};

const styles = StyleSheet.create({
  errorIcon: {
    transform: [{ rotate: '180deg' }],
  },
});

export default ErrorIcon;
