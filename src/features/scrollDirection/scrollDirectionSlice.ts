import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

export interface scrollDirectionState {
  value: 'up' | 'down';
}

const initialState: scrollDirectionState = {
  value: 'up',
};

export const scrollDirSlice = createSlice({
  name: 'scrollDirection',
  initialState,
  reducers: {
    setScrollDirUp: (state) => {
      state.value = 'up';
    },
    setScrollDirDown: (state) => {
      state.value = 'down';
    },
  },
});

export const { setScrollDirUp, setScrollDirDown } = scrollDirSlice.actions;
export const direction = (state: RootState) => state.scrollDirection.value;
export default scrollDirSlice.reducer;