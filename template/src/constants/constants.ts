import { Dimensions } from 'react-native';

import { AppThemeNames, AppThemeValue } from './enums';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('window');

export const DATE_FORMAT_YYYY_MM_DD = 'YYYY-MM-DD';
export const DATE_FORMAT_DD_MMM_YYYY = 'DD MMMM, YYYY';
export const DATE_FORMAT_READABLE = 'DD MMMM, YYYY, hh:mm A';

export const BUTTON_TYPES: { [k: string]: ButtonType } = {
  FLAT: 'flat',
  SOLID: 'solid',
  OUTLINE: 'outline',
};

export const API_METHODS_TYPE = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT',
};

export const INVALIDATE_QUERIES_KEYS = {
  USERS: 'users',
};

export const DATE_FORMATS = {
  DATE_OF_MONTH_YEAR: 'Do MMMM YYYY',
  DATE_MONTH_YEAR: 'dd MMM yyyy',
  MOMENT_DATE_MONTH_YEAR: 'DD MMM yyyy',
  HR_MIN_TIME: 'hh:mm a',
  MONTH_YEAR: 'MMM yyyy',
  YEAR: 'yyyy',
  MONTH_DATE_YEAR: 'MMM dd, yyyy',
  MOMENT_MONTH_DATE_YEAR: 'MMM DD, yyyy',
  YEAR_MONTH_DATE: 'yyyy-MM-dd',
  DATE_MONTH: 'dd MMM',
  YEAR_MONTH_DT_TIME: 'yyyy-MM-dd hh:mm:ss',
  MOMENT_YEAR_MONTH_DATE: 'YYYY-MM-DD',
};

export const REACT_QUERY_KEYS = {
  USERS: 'users',
};

export const SPACING = {
  XS_SPACING: 2,
  SM_SPACING: 4,
  MD_SPACING: 8,
  LG_SPACING: 12,
  XL_SPACING: 24,
};

export const MARGIN = {
  XS_MARGIN: 5,
  SM_MARGIN: 10,
  MD_MARGIN: 15,
  LG_MARGIN: 20,
};

export const AppThemeDropDownOptions: DropDownOptionObj[] = [
  { name: AppThemeNames.System, value: AppThemeValue.System },
  { name: AppThemeNames.Light, value: AppThemeValue.Light },
  { name: AppThemeNames.Dark, value: AppThemeValue.Dark },
];

export const PASSWORD_ENCRYPTION_ALGORITHM = 'aes-256-cbc';

export const DECRYPTION_AUTH_TEXT = '91daa96d-1f76-449b-8f8f-945c8c32d6c3';
