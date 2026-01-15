import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

import useThemeColors from './useThemeColors';

function useStyles<T>(themedStyleFunc: (colors: Colors) => T): T {
  // to handle the change of orientation
  const dimensions = useWindowDimensions();
  const colors = useThemeColors();

  const styles = useMemo(() => {
    return themedStyleFunc(colors);
  }, [dimensions, colors]);

  return styles;
}

export default useStyles;
