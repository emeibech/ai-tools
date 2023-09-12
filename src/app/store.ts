import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import darkmodeReducer from '../features/darkmode/darkmodeSlice';
import messagesReducer from '../features/chatInterface/messagesSlice';
import scrollDirectionReducer from '../features/scrollDirection/scrollDirectionSlice';

export const store = configureStore({
  reducer: {
    darkmodeToggler: darkmodeReducer,
    messages: messagesReducer,
    scrollDirection: scrollDirectionReducer,
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
