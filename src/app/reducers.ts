import { combineReducers } from '@reduxjs/toolkit';
import darkmodeReducer from '../features/darkmode/darkmodeSlice';
import messagesReducers from '../features/chatInterface/messagesSlice';
import scrollDirectionReducer from '../features/scrollDirection/scrollDirectionSlice';

const rootReducer = combineReducers({
  darkmode: darkmodeReducer,
  scrollDirection: scrollDirectionReducer,
  ...messagesReducers,
});

export default rootReducer;
