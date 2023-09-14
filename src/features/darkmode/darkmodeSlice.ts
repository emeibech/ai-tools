import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

export interface DarkmodeState {
  value: boolean;
}

const initialState: DarkmodeState = {
  value: false,
};

export const darkmodeSlice = createSlice({
  name: 'darkmode toggler',
  initialState,
  reducers: {
    turnOnDarkmode: (state) => {
      state.value = true;
    },
    turnOffDarkmode: (state) => {
      state.value = false;
    },
  },
});

export const { turnOnDarkmode, turnOffDarkmode } = darkmodeSlice.actions;
export const darkModeStatus = (state: RootState) => state.darkmode.value;
export default darkmodeSlice.reducer;
