import { combineReducers } from '@reduxjs/toolkit';
import darkmodeReducer from '../features/darkmode/darkmodeSlice';
import messagesReducers from '../features/chats/messagesSlice';
import scrollPositionReducer from '@/features/scrollPosition/scrollPositionSlice';
import toolsReducers from '../features/tools/toolsSlices';

const rootReducer = combineReducers({
  darkmode: darkmodeReducer,
  scrollPositions: scrollPositionReducer,
  ...messagesReducers,
  ...toolsReducers,
});

export default rootReducer;
