import { createStackNavigator } from '@react-navigation/stack';

import { StackScreens } from './RoutesConstants';
/** @if withBottomTabs */
import BottomTabsNavigator from './BottomTabsNavigator';
/** @endif */
import HomeScreen from '@src/screens/home/Home';

/** @if withBottomTabs */
const { BottomTabs } = StackScreens;
/** @endif */
/** @if !withBottomTabs */
const { HOME } = StackScreens;
/** @endif */

const MainStack = createStackNavigator<MainStackScreensParamsList>();

function StackNavigator() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      /* @if withBottomTabs */
      <MainStack.Screen name={BottomTabs} component={BottomTabsNavigator} />
      /* @else */
      <MainStack.Screen name={HOME} component={HomeScreen} />
      /* @endif */
    </MainStack.Navigator>
  );
}

export default StackNavigator;
