import { combineReducers } from '@reduxjs/toolkit';
import darkmodeReducer from '../features/darkmode/darkmodeSlice';
import messagesReducer from '../features/chats/messagesSlice';
import scrollPositionReducer from '@/features/scrollPosition/scrollPositionSlice';
import toolsResponsesReducer from '../features/tools/toolsResponsesSlices';
import toolsPromptsReducer from '../features/tools/toolsPromptsSlices';
import requestStatusReducer from '../features/requestStatus/requestStatusSlices';
import currentRouteReducer from '../features/currentRoute/currentRouteSlice';
import apiCallCounterReducer from '../features/apiCallCounter/apiCallCounterSlice';

const rootReducer = combineReducers({
  darkmodeStatus: darkmodeReducer,
  scrollPositions: scrollPositionReducer,
  currentRoute: currentRouteReducer,
  apiCallCounter: apiCallCounterReducer,
  ...messagesReducer,
  ...toolsResponsesReducer,
  ...toolsPromptsReducer,
  ...requestStatusReducer,
});

export default rootReducer;
