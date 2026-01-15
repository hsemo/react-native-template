import ArrowLeft from '@src/components/svgComponents/ArrowLeftIcon';
import DeleteBinIcon from '@src/components/svgComponents/DeleteBinIcon';

import BUTTON_ICON_NAMES from './buttonIconsNames';

type ButtonIcons = Record<IconNames, React.FC<SvgPropsExtended>>;

const Icons: ButtonIcons = {
  [BUTTON_ICON_NAMES.LEFT_ARROW]: ArrowLeft,
  [BUTTON_ICON_NAMES.DELETE_BIN]: DeleteBinIcon,
};

export default Icons;
