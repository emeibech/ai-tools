import { combineReducers } from '@reduxjs/toolkit';
import darkmodeReducer from '../features/darkmode/darkmodeSlice';
import messagesReducer from '../features/chats/messagesSlice';
import scrollPositionReducer from '@/features/scrollPosition/scrollPositionSlice';
import toolsResponsesReducer from '../features/tools/toolsResponsesSlices';
import toolsPromptsReducer from '../features/tools/toolsPromptsSlices';
import requestStatusReducer from '../features/requestStatus/requestStatusSlices';

const rootReducer = combineReducers({
  darkmodeStatus: darkmodeReducer,
  scrollPositions: scrollPositionReducer,
  ...messagesReducer,
  ...toolsResponsesReducer,
  ...toolsPromptsReducer,
  ...requestStatusReducer,
});

export default rootReducer;
