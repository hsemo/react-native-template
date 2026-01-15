import { StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useStyles from '@src/customHooks/useStyles';
import useAppColorScheme from '@src/customHooks/useAppColorScheme';
import { AppThemeValue } from '@src/constants/enums';

import stylesFunc from './styles';

function CommonScreen({
  statusBarHidden = false,
  statusBarStyle,
  statusBarBGColor,
  style,
  contentContainerStyle,
  children,
}: CommonScreenProps) {
  const { top } = useSafeAreaInsets();

  const styles = useStyles(stylesFunc);
  const appTheme = useAppColorScheme();
  const barStyle =
    statusBarStyle ?? appTheme === AppThemeValue.Dark
      ? 'light-content'
      : 'dark-content';

  return (
    <View style={[styles.container, style]}>
      {!statusBarHidden ? (
        <View
          style={[
            { height: top },
            { backgroundColor: statusBarBGColor },
            styles.statusBar,
          ]}
        />
      ) : null}

      <StatusBar hidden={statusBarHidden} barStyle={barStyle} animated />

      <View style={[styles.contentContainer, contentContainerStyle]}>
        {children}
      </View>
    </View>
  );
}

export default CommonScreen;
