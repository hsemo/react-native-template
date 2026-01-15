import { FONT_FAMILY, Fonts } from './fonts';

interface GetFontParams {
  fontWeight: FontWeight;
  fontSize?: number;
  fontFamily?: FontFamily;
}

export function getFont({ fontWeight, fontSize, fontFamily }: GetFontParams) {
  fontFamily = fontFamily || FONT_FAMILY.DEFAULT;

  return {
    fontFamily: Fonts[fontFamily][fontWeight],
    fontSize,
  };
}
