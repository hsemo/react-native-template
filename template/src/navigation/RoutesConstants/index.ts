export const StackScreens = {
  /** @if withBottomTabs */
  BottomTabs: 'BottomTabs',
  /** @else */
  HOME: 'Home',
  /** @endif */
} as const;

/** @if withBottomTabs */
export const BottomTabsScreens = {
  HOME: 'Home',
} as const;
/** @endif */
