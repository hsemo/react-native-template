import { createStackNavigator } from '@react-navigation/stack';

import { StackScreens } from './RoutesConstants';
import BottomTabsNavigator from './BottomTabsNavigator';
import HomeScreen from '@src/screens/home/Home';

const { BottomTabs, HOME } = StackScreens;

const MainStack = createStackNavigator<MainStackScreensParamsList>();

function StackNavigator() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name={BottomTabs} component={BottomTabsNavigator} />
      <MainStack.Screen name={HOME} component={HomeScreen} />
    </MainStack.Navigator>
  );
}

export default StackNavigator;
