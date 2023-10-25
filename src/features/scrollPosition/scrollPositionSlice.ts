import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import type { Route, ScrollPositions } from '@/types/features';

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
  name: 'scrollPositions',
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
