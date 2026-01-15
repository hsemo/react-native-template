import Svg, { Path } from 'react-native-svg';

const ArrowHeadRight = ({
  width,
  height,
  size,
  ...props
}: SvgPropsExtended) => (
  <Svg
    width={size ?? width}
    height={size ?? height}
    viewBox="15.27 9.13 17 32"
    {...props}
  >
    <Path
      fill="currentColor"
      d="M15.563 40.836a.997.997 0 0 0 1.414 0l15-15a1 1 0 0 0 0-1.414l-15-15a.999.999 0 1 0-1.414 1.414l14.293 14.293-14.293 14.293a1 1 0 0 0 0 1.414"
    />
  </Svg>
);

export default ArrowHeadRight;
