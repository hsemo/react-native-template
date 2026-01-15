import { TouchableOpacity } from 'react-native';

import Icons from '@src/constants/buttonIcons';

function IconButton({
  icon,
  size,
  iconStyle,
  iconProps,
  style,
  ...props
}: IconButtonProps) {
  const Icon = Icons[icon];

  return (
    <TouchableOpacity
      style={[{ width: size, height: size }, style]}
      activeOpacity={0.8}
      {...props}
    >
      <Icon style={iconStyle} {...iconProps} />
    </TouchableOpacity>
  );
}

export default IconButton;
