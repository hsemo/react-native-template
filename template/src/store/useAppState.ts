import { create } from 'zustand';

import { AppThemeValue } from '@src/constants/enums';

interface AppState {
    appTheme: AppThemeValue;
    setAppTheme: (theme: AppThemeValue) => void;
}

const useAppState = create<AppState>((set) => ({
    appTheme: AppThemeValue.System,
    setAppTheme: (theme: AppThemeValue) => set({ appTheme: theme }),
}))

export default useAppState