import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

export interface ScrollPositions {
  home: number;
  codeanalyzer: number;
  codingassistant: number;
  eli5: number;
  storygenerator: number;
  tonechanger: number;
  generalassistant: number;
}

export type Route =
  | 'home'
  | 'codeanalyzer'
  | 'codingassistant'
  | 'eli5'
  | 'storygenerator'
  | 'tonechanger'
  | 'generalassistant';

const initialState: ScrollPositions = {
  home: 0,
  codeanalyzer: 0,
  codingassistant: 0,
  eli5: 0,
  storygenerator: 0,
  tonechanger: 0,
  generalassistant: 0,
};

export const scrollPositionsSlice = createSlice({
  name: 'scroll positions',
  initialState,
  reducers: {
    setScrollPosition: (
      state,
      action: { payload: { route: Route; position: number } },
    ) => {
      const { route, position } = action.payload;
      state[route] = position;
    },
  },
});

export const { setScrollPosition } = scrollPositionsSlice.actions;
export const positions = (state: RootState) => state.scrollPositions;
export default scrollPositionsSlice.reducer;
