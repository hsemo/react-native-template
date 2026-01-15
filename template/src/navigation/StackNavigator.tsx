import { createStackNavigator } from '@react-navigation/stack';

import { StackScreens } from './RoutesConstants';
import BottomTabsNavigator from './BottomTabsNavigator';

const { BottomTabs } = StackScreens;

const MainStack = createStackNavigator<MainStackScreensParamsList>();

function StackNavigator() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name={BottomTabs} component={BottomTabsNavigator} />
    </MainStack.Navigator>
  );
}

export default StackNavigator;
