import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const PlusIcon = (props: SvgProps) => (
  <Svg width={10} height={10} viewBox="0 0 512 512" {...props}>
    <Path
      d="M232 280H64v-48h168V64h48v168h168v48H280v168h-48z"
      fill="currentColor"
    />
  </Svg>
);

export default PlusIcon;
