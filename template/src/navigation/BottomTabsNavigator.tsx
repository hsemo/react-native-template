import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import HomeScreen from '@src/screens/home/Home';
import HomeIcon from '@src/components/svgComponents/HomeIcon';
import { fontSizes } from '@src/theme/fonts';
import useThemeColors from '@src/customHooks/useThemeColors';

import { BottomTabsScreens } from './RoutesConstants';

const { HOME } = BottomTabsScreens;

const BottomTabs = createBottomTabNavigator<BottomTabsParamsList>();

function BottomTabsNavigator() {
  const colors = useThemeColors();

  return (
    <BottomTabs.Navigator
      tabBar={props => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        animation: 'shift',
        tabBarActiveTintColor: colors.ON_SECONDARY,
        tabBarLabelStyle: { fontSize: fontSizes.f12 },
        tabBarStyle: {
          backgroundColor: colors.PRIMARY,
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: colors.ON_PRIMARY,
        },
      }}
    >
      <BottomTabs.Screen
        name={HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: props => <HomeIcon {...props} />,
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default BottomTabsNavigator;
