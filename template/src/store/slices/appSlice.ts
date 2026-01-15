import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { AppThemeValue } from '@src/constants/enums';

interface AppState {
  name: string;
  isAuthenticated: boolean;
  homeFloatBtnOpacity: 0 | 1;
  appTheme: AppThemeValue;
}

const initialState: AppState = {
  name: 'Passwd',
  isAuthenticated: false,
  homeFloatBtnOpacity: 1,
  appTheme: AppThemeValue.System,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppName: (state: AppState, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setIsAuthenticated: (state: AppState, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setHomeFloatBtnOpacity: (state: AppState, action: PayloadAction<0 | 1>) => {
      state.homeFloatBtnOpacity = action.payload;
    },
    setAppTheme: (state: AppState, action: PayloadAction<AppThemeValue>) => {
      state.appTheme = action.payload;
    },
  },
});

const appSliceReducer = appSlice.reducer;

export const {
  setAppName,
  setIsAuthenticated,
  setHomeFloatBtnOpacity,
  setAppTheme,
} = appSlice.actions;

export const selectAppName = (state: RootState) => state.app.name;
export const selectAppState = (state: RootState) => state.app;
export const selectIsAuthenticated = (state: RootState) =>
  state.app.isAuthenticated;
export const selectAppTheme = (state: RootState) => state.app.appTheme;

export default appSliceReducer;
