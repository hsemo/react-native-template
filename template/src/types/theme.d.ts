import { COLORS } from '@src/theme/colors';
import { FONT_FAMILY, FONT_WEIGHT } from '@src/theme/fonts';

declare global {
  type FontWeight = (typeof FONT_WEIGHT)[keyof typeof FONT_WEIGHT];
  type FontFamily = (typeof FONT_FAMILY)[keyof typeof FONT_FAMILY];

  type Colors = Record<keyof typeof COLORS, string>;
}
