import { View } from 'react-native';
import { BaseToast, ToastConfigParams } from 'react-native-toast-message';

import useStyles from '@src/customHooks/useStyles';

import stylesFunc from './styles';
import ErrorIcon from '../svgComponents/ErrorIcon';
import InfoIcon from '../svgComponents/InfoIcon';
import SuccessIcon from '../svgComponents/SuccessIcon';

type ToastType = 'error' | 'success' | 'info';

const toastIcons = {
  error: ErrorIcon,
  info: InfoIcon,
  success: SuccessIcon,
};

function CustomToast({ type, ...props }: ToastConfigParams<any>) {
  const styles = useStyles(stylesFunc);

  const Icon = toastIcons[type as ToastType];

  return (
    <BaseToast
      {...props}
      style={[styles.container, styles[type as ToastType]]}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
      renderLeadingIcon={() => (
        <View style={styles.iconContainer}>
          <Icon />
        </View>
      )}
    />
  );
}

export default CustomToast;
