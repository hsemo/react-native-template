import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

import useThemeColors from '@src/customHooks/useThemeColors';

const SuccessIcon = (props: SvgProps) => {
  const colors = useThemeColors();

  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 24 24"
      color={colors.SUCCESS_GREEN}
      {...props}
    >
      <Path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"
        fill="currentColor"
      />
    </Svg>
  );
};

export default SuccessIcon;
