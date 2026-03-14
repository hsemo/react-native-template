import { StackNavigationProp } from '@react-navigation/stack';

/** @if withBottomTabs */
import { BottomTabsScreens, StackScreens } from '@src/navigation/RoutesConstants';
/** @endif */
/** @if !withBottomTabs */
import { StackScreens } from '@src/navigation/RoutesConstants';
/** @endif */

/** @if withBottomTabs */
const { BottomTabs } = StackScreens;
const { HOME } = BottomTabsScreens;
/** @else */
const { HOME } = StackScreens;
/** @endif */

declare global {
  type MainStackScreenNames = keyof typeof StackScreens;
  type MainStackScreensParamsList = {
    /** @if withBottomTabs */
    [BottomTabs]: undefined;
    /** @endif */
    /** @if !withBottomTabs */
    [HOME]: undefined;
    /** @endif */
  };

  type MainStackNavigationProp =
    StackNavigationProp<MainStackScreensParamsList>;

  /** @if withBottomTabs */
  type BottomTabsScreenNames = keyof typeof BottomTabsScreens;
  type BottomTabsParamsList = {
    [HOME]: undefined;
  };
  /** @endif */
}
