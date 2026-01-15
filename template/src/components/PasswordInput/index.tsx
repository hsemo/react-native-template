import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import useThemeColors from '@src/customHooks/useThemeColors';

import { Input } from '../Input';
import EyeIcon from '../svgComponents/EyeIcon';
import stylesFunc from './styles';
import useStyles from '@src/customHooks/useStyles';

const RenderPwdVisibleIcon = ({ isVisible, onPress }: PwdIconProps) => {
  const COLORS = useThemeColors();
  const styles = useStyles(stylesFunc);

  return (
    <TouchableOpacity style={styles.eyeIcon} onPress={onPress}>
      <EyeIcon
        width={20}
        height={20}
        color={COLORS.TERTIARY}
        closed={isVisible}
      />
    </TouchableOpacity>
  );
};

/**
 * PasswordInput component is a wrapper around the custom Input component
 * that provides the password show/hide functionality with a toggle-able visibility icon.
 *
 * Props:
 * - props (InputProps, **required**): The props to be passed to the Input component.
 *
 */
export const PasswordInput = (props: InputProps) => {
  const [isPwdVisible, setIsPwdVisible] = useState(true);

  const handlePwdVisibleToggle = () => {
    setIsPwdVisible(prevVal => !prevVal);
  };

  const LeftIcon = (
    <RenderPwdVisibleIcon
      isVisible={isPwdVisible}
      onPress={handlePwdVisibleToggle}
    />
  );

  return (
    <Input {...props} secureTextEntry={isPwdVisible} leftIcon={LeftIcon} />
  );
};
