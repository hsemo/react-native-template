import React from 'react';
import { Pressable, ActivityIndicator } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import useStyles from '@src/customHooks/useStyles';
import useThemeColors from '@src/customHooks/useThemeColors';
import { BUTTON_TYPES } from '@constants/constants';

import { UIText } from '../UIText';
import stylesFunc from './styles';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * Button component for rendering a customizable button.
 *
 * This component allows for different button types (solid, outline, flat),
 * and supports loading states, icons, and custom styles. It can be disabled
 * to prevent user interaction.
 *
 * Props:
 * - title (string, **required**): The text to display on the button.
 * - onPress (function, **required**): The function to call when the button is pressed.
 * - type (string, **optional**): The type of button to render. Options include:
 *   - BUTTON_TYPES.SOLID
 *   - BUTTON_TYPES.OUTLINE
 *   - BUTTON_TYPES.FLAT
 * - disabled (boolean, **optional**): If true, the button will be disabled and not respond to presses.
 * - buttonStyle (object, **optional**): Additional styles to apply to the button.
 * - textStyle (object, **optional**): Additional styles to apply to the button text.
 * - isLoading (boolean, **optional**): If true, shows a loading indicator instead of the button content.
 * - icon (ReactNode, **optional**): An optional icon to display on the right side of the button.
 * - leftIcon (ReactNode, **optional**): An optional icon to display on the left side of the button.
 *
 */
export const UIButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  type = BUTTON_TYPES.SOLID,
  disabled = false,
  buttonStyle,
  textStyle,
  isLoading,
  icon,
  leftIcon,
}) => {
  const styles = useStyles(stylesFunc);
  const COLORS = useThemeColors();

  const btnStyles = [
    styles.button,
    type === BUTTON_TYPES.SOLID && styles.solidButton,
    type === BUTTON_TYPES.OUTLINE && styles.outlineButton,
    type === BUTTON_TYPES.FLAT && styles.flatButton,
    disabled && type !== BUTTON_TYPES.FLAT && styles.disabledButton,
    buttonStyle,
  ];

  const scale = useSharedValue(1);

  const animatedBtnStyles = useAnimatedStyle(() => {
    const reducedStyles = btnStyles.reduce(
      (prev, current) => ({ ...prev, ...current }),
      {},
    );
    return { ...reducedStyles, transform: [{ scale: scale.value }] };
  });

  const txtStyles = [
    styles.buttonText,
    [BUTTON_TYPES.OUTLINE, BUTTON_TYPES.FLAT].includes(type) &&
      styles.outlineButtonText,
    textStyle,
  ];

  const content = isLoading ? (
    <ActivityIndicator size={'small'} color={COLORS.ON_TERTIARY} />
  ) : (
    <>
      {leftIcon || null}
      <UIText style={txtStyles}>{title}</UIText>
      {icon || null}
    </>
  );

  const handlePressIn = () => {
    scale.value = withTiming(0.9, { duration: 200 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 200 });
  };

  return (
    <AnimatedPressable
      style={animatedBtnStyles}
      onPress={onPress}
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {content}
    </AnimatedPressable>
  );
};
