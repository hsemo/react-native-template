import React from 'react';
import { Text } from 'react-native';

import useStyles from '@src/customHooks/useStyles';

import stylesFunc from './styles';

/**
 * ThemedText component is a styled text component that allows for custom styling
 * and additional props to be passed to the underlying Text component from React Native.
 *
 * Props:
 * - children (ReactNode, **required**): The content to be displayed within the text component.
 * - style (object, **optional**): Additional styles to be applied to the text component.
 * - props (any, **optional**): Any additional props to be passed to the Text component, should be passed directly to the `ThemedText`.
 *
 */
const UIText: React.FunctionComponent<UITextProps> = ({
  children,
  style,
  isError,
  ...props
}) => {
  // const {t} = useTranslation(); // Todo: Add Translation Plugin support
  const styles = useStyles(stylesFunc);

  const textStyle = isError
    ? [styles.text, styles.errorText, style]
    : [styles.text, style];

  return (
    <Text allowFontScaling={false} style={textStyle} {...props}>
      {children}
    </Text>
  );
};

export default UIText;
