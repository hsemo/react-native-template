import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SearchIcon = ({ width, height, size, ...props }: SvgPropsExtended) => (
  <Svg
    width={size ?? width}
    height={size ?? height}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12m-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10"
      fill="currentColor"
    />
  </Svg>
);

export default SearchIcon;
