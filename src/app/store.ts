import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import darkmodeReducer from '../features/darkmode/darkmodeSlice';

export const store = configureStore({
  reducer: {
    darkmodeToggler: darkmodeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
