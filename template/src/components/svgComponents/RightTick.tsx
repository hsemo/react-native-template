import Svg, { Path } from 'react-native-svg';

const RightTick = ({ width, height, size, ...props }: SvgPropsExtended) => (
  <Svg
    width={size ?? width}
    height={size ?? height}
    viewBox="0 0 15 15"
    fill="none"
    {...props}
  >
    <Path d="m1 7 4.5 4.5L14 3" stroke="currentColor" strokeLinecap="square" />
  </Svg>
);

export default RightTick;
