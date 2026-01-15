import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import appSliceReducer from './slices/appSlice';

const combinedReducer = combineReducers({
  app: appSliceReducer,
});

const store = configureStore({
  reducer: combinedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export default store;
