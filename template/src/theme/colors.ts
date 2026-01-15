export const COLORS = {
  PRIMARY_GREEN: '#1D7874',
  LIGHT_SHADE_PRIMARY_GREEN: '#329C98',
  GREEN_BACKGROUND: '#EDFAF7',
  PRIMARY_GREEN_TRANSPARENT: 'rgba(29, 120, 116, 0.35)',
  PRIMARY_GREEN_LIGHT: '#329C98',
  BLACK: '#444E5B',
  BLACK_TRANSPARENT: '#0000008a',
  TRANSPARENT: '#00000000',
  BLACK_LIGHT_TRANSPARENT: 'rgba(0, 0, 0, 0.2)',
  LINE_COLOR: '#E6E6E6',
  DISABLE_GRAY: '#B1B1B1',
  LIGHT_GRAY: '#F9F9F9',
  BUTTON_BACKGROUND_GRAY: '#F3F3F3',
  CARD_GRAY: '#F4F4F6',
  MEDIUM_GRAY: '#454E5B33',
  WHITE: '#fff',
  BLUE_WHITE: '#F1FCFB',
  RED: '#FF7474',
  RED_BACKGROUND: '#F9EDED',
  LIGHT_RED: '#FFD9D9',
  LIGHT_GREEN: '#D2F6D1',
  BLUE: '#5865F2',
  YELLOW: '#FF9933',
  WARNING: '#FFF9D3',
  TEXT_PRIMARY: '#1D7874',
  TEXT_DARK: '#555',
  GRAY_TEXT: '#738599',
  PRIMARY: '#FFFFFF',
  SECONDARY: '#DB8570',
  TERTIARY: '#CE3232',
  ON_PRIMARY: '#45464A',
  ON_SECONDARY: '#0C0C0C',
  ON_TERTIARY: '#FFFFFF',
  SUCCESS_GREEN: '#2E7D32',
  ERROR_RED: '#D32F2F',
  INFO_BLUE: '#0288D1',
  INFO_BACKGROUND: '#E1F5FE',
} as const;

export const lightThemeColors = { ...COLORS };

export const darkThemeColors = {
  // Brand Colors (Lightened for visibility on dark backgrounds)
  PRIMARY_GREEN: '#4DB6AC', // Lighter Teal/Aqua for better contrast
  LIGHT_SHADE_PRIMARY_GREEN: '#80CBC4',
  GREEN_BACKGROUND: '#152423', // Very dark green tint
  PRIMARY_GREEN_TRANSPARENT: 'rgba(77, 182, 172, 0.25)',
  PRIMARY_GREEN_LIGHT: '#80CBC4',

  // Text & Basics (Inverted)
  BLACK: '#E3E3E3', // Main Text (Off-white)
  BLACK_TRANSPARENT: '#ffffff8a',
  TRANSPARENT: '#00000000',
  BLACK_LIGHT_TRANSPARENT: 'rgba(255, 255, 255, 0.2)',

  // Structure & Dividers
  LINE_COLOR: '#2F2F2F', // Dark gray dividers
  DISABLE_GRAY: '#5C5C5C',

  // Background Surfaces
  LIGHT_GRAY: '#121212', // Main Background (replaces White/Light Gray)
  BUTTON_BACKGROUND_GRAY: '#2C2C2C', // Lighter than bg for inputs/buttons
  CARD_GRAY: '#1E1E1E', // Card surface (Elevation 1)
  MEDIUM_GRAY: '#ffffff33',
  WHITE: '#121212', // Base Background
  BLUE_WHITE: '#1A2323', // Subtle cool tint background

  // Functional/Status Colors
  RED: '#EF5350', // Softer red
  RED_BACKGROUND: '#381E1E', // Dark muted red background
  LIGHT_RED: '#5C2B2B',
  LIGHT_GREEN: '#1B3824', // Dark green status background
  BLUE: '#7986CB', // Desaturated blue
  YELLOW: '#FFB74D', // Warm amber
  WARNING: '#3E2723', // Dark brownish-yellow background

  // Text Variants
  TEXT_PRIMARY: '#80CBC4', // Matches Primary Light Green
  TEXT_DARK: '#B0B0B0', // Secondary text
  GRAY_TEXT: '#8A9AA9',

  // UI Layers
  PRIMARY: '#1E1E1E', // Component Primary
  SECONDARY: '#A35C4A', // Muted secondary
  TERTIARY: '#B74D4D',

  // Content on Colored Backgrounds
  ON_PRIMARY: '#FFFFFF',
  ON_SECONDARY: '#FFFFFF',
  ON_TERTIARY: '#FFFFFF',

  // success/error/info colors
  SUCCESS_GREEN: '#66BB6A',
  ERROR_RED: '#F44336',
  INFO_BLUE: '#29B6F6',
  INFO_BACKGROUND: '#102A38',
};
