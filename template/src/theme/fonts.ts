import { Dimensions } from 'react-native';

export const FONT_WEIGHT = {
  REGULAR: 'REGULAR',
  MEDIUM: 'MEDIUM',
  SEMI_BOLD: 'SEMI_BOLD',
  BOLD: 'BOLD',
} as const;

export const FONT_FAMILY = {
  DEFAULT: 'DEFAULT',
  IBM_PLEX_MONO: 'IBMPlexMono',
} as const;

const { REGULAR, MEDIUM, SEMI_BOLD, BOLD } = FONT_WEIGHT;
const { DEFAULT, IBM_PLEX_MONO } = FONT_FAMILY;

export const Fonts = {
  [IBM_PLEX_MONO]: {
    [REGULAR]: 'IBMPlexMonoRegular',
    [MEDIUM]: 'IBMPlexMonoMedium',
    [SEMI_BOLD]: 'IBMPlexMonoSemiBold',
    [BOLD]: 'IBMPlexMonoBold',
  },
  [DEFAULT]: {
    [REGULAR]: 'IBMPlexSansRegular',
    [MEDIUM]: 'IBMPlexSansMedium',
    [SEMI_BOLD]: 'IBMPlexSansSemiBold',
    [BOLD]: 'IBMPlexSansBold',
  },
};

export const { width: screenWidth, height: screenHeight } =
  Dimensions.get('screen');

export const fontFamilies = {
  DEFAULT: {
    normal: 'Manrope_Regular',
    medium: 'Manrope_Medium',
    bold: 'Manrope_Bold',
    semiBold: 'Manrope_SemiBold',
    extraBold: 'Manrope_ExtraBold',
  },
};

export const fontSizes = {
  f12: 12,
  f14: 14,
  f15: 15,
  f16: 16,
  f18: 18,
  f20: 20,
  f22: 22,
  f24: 24,
  f26: 26,
};
