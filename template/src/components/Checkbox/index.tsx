import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { checkBoxAnimation } from '@src/constants/animations';
import useThemeColors from '@src/customHooks/useThemeColors';

import AnimatedLottieView from '../AnimatedLottieView';

interface CheckBoxProps {
  checked: boolean;
  size?: number;
  visible?: boolean;
  style?: ViewStyle;
}

function CheckBox({
  checked,
  size = 50,
  visible = true,
  style,
}: CheckBoxProps) {
  const anim = useSharedValue<number | undefined>(0.0);

  const COLORS = useThemeColors();

  const lottieColorFilters = [
    {
      keypath: 'check mark',
      color: COLORS.PRIMARY,
    },
    {
      keypath: 'check mark bg',
      color: COLORS.TERTIARY,
    },
    {
      keypath: 'outline',
      color: COLORS.TERTIARY,
    },
  ];

  useEffect(() => {
    if (checked) {
      anim.value = withTiming(1, { duration: 800 });
    } else {
      anim.value = withTiming(0, { duration: 300 });
    }
  }, [checked]);

  const animatedProps = useAnimatedProps<AnimatedLottieViewProps>(() => ({
    progress: anim.value,
  }));

  if (!visible) return null;

  return (
    <AnimatedLottieView
      source={checkBoxAnimation}
      style={[{ width: size, height: size }, style]}
      colorFilters={lottieColorFilters}
      loop={false}
      autoPlay={false}
      animatedProps={animatedProps}
    />
  );
}

export default CheckBox;
