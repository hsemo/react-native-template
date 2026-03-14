import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@src/store';
import { AppThemeValue } from '@src/constants/enums';

interface AppState {
  appTheme: AppThemeValue;
}

const initialState: AppState = {
  appTheme: AppThemeValue.System,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppTheme: (state: AppState, action: PayloadAction<AppThemeValue>) => {
      state.appTheme = action.payload;
    },
  },
});

const appSliceReducer = appSlice.reducer;

export const {
  setAppTheme,
} = appSlice.actions;

export const selectAppTheme = (state: RootState) => state.app.appTheme;

export default appSliceReducer;
