import { useState } from 'react';
import { Pressable } from 'react-native';
import Animated, { createAnimatedComponent } from 'react-native-reanimated';

import useThemeColors from '@src/customHooks/useThemeColors';

const AnimatedPressable = createAnimatedComponent(Pressable);

function AnimatedSwitch({
  value,
  bodyHeight,
  bodyWidth,
  bodyStyle,
  bodyPadding,
  handleStyle,
  onValueChange,
}: AnimatedSwitchProps) {
  const [isPressInProgress, setIsPressInProgress] = useState(false);

  const colors = useThemeColors();

  bodyWidth = bodyWidth ?? 80;
  bodyHeight = bodyHeight ?? 40;
  const handleWidth = bodyHeight / 2;
  const bodyBorderWidth = 2;
  const padding = bodyPadding ?? 10;

  /* eslint-disable react-native/no-inline-styles */
  return (
    <AnimatedPressable
      style={[
        {
          width: bodyWidth,
          height: bodyHeight,
          borderRadius: 50,
          position: 'relative',
          transitionProperty: ['backgroundColor', 'scaleX', 'borderWidth'],
          transitionDuration: 200,
          backgroundColor: value ? colors.SECONDARY : colors.PRIMARY,
          borderWidth: value ? 0 : bodyBorderWidth,
          borderColor: colors.DISABLE_GRAY,
        },
        bodyStyle,
      ]}
      onPress={() => onValueChange?.(!value)}
      onPressIn={() => setIsPressInProgress(true)}
      onPressOut={() => setIsPressInProgress(false)}
    >
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: value ? padding : padding - bodyBorderWidth,
            bottom: value ? padding : padding - bodyBorderWidth,
            width: handleWidth,
            backgroundColor: value ? colors.TERTIARY : colors.SECONDARY,
            borderRadius: 50,
            transitionProperty: ['left', 'backgroundColor', 'transform'],
            transitionDuration: 200,
            left: value ? bodyWidth - handleWidth - padding : padding,
            transform: [{ scale: isPressInProgress || value ? 1.5 : 1 }],
          },
          handleStyle,
        ]}
      />
    </AnimatedPressable>
  );
  /* eslint-enable react-native/no-inline-styles */
}

export default AnimatedSwitch;
