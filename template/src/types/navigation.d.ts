import { StackNavigationProp } from '@react-navigation/stack';

import {
  BottomTabsScreens,
  StackScreens,
} from '@src/navigation/RoutesConstants';

const { BottomTabs } = StackScreens;
const { HOME } = BottomTabsScreens;

declare global {
  type MainStackScreenNames = keyof typeof StackScreens;
  type MainStackScreensParamsList = {
    [BottomTabs]: undefined;
  };

  type MainStackNavigationProp =
    StackNavigationProp<MainStackScreensParamsList>;

  type BottomTabsScreenNames = keyof typeof BottomTabsScreens;

  type BottomTabsParamsList = {
    [HOME]: undefined;
  };
}
