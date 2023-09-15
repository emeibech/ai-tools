import { combineReducers } from '@reduxjs/toolkit';
import darkmodeReducer from '../features/darkmode/darkmodeSlice';
import messagesReducers from '../features/chatInterface/messagesSlice';
import scrollDirectionReducer from '../features/scrollDirection/scrollDirectionSlice';
import scrollPositionReducer from '@/features/scrollPosition/scrollPositionSlice';

const rootReducer = combineReducers({
  darkmode: darkmodeReducer,
  scrollPositions: scrollPositionReducer,
  scrollDirection: scrollDirectionReducer,
  ...messagesReducers,
});

export default rootReducer;
