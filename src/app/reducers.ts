import { combineReducers } from '@reduxjs/toolkit';
import darkmodeReducer from '../features/darkmode/darkmodeSlice';
import messagesReducers from '../features/chatInterface/messagesSlice';
import scrollPositionReducer from '@/features/scrollPosition/scrollPositionSlice';

const rootReducer = combineReducers({
  darkmode: darkmodeReducer,
  scrollPositions: scrollPositionReducer,
  ...messagesReducers,
});

export default rootReducer;
