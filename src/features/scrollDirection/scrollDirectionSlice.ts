import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

export interface ScrollDirection {
  value: 'up' | 'down';
}

const initialState: ScrollDirection = {
  value: 'up',
};

export const scrollDirSlice = createSlice({
  name: 'scrollDirection',
  initialState,
  reducers: {
    setScrollDir: (state, action) => {
      if (state.value !== action.payload) {
        state.value = action.payload;
      }
    },
  },
});

export const currentDirection = createSelector(
  (state) => state.scrollDirection.value,
  (value) => value,
);

export const { setScrollDir } = scrollDirSlice.actions;
export const direction = (state: RootState) => state.scrollDirection.value;
export default scrollDirSlice.reducer;
