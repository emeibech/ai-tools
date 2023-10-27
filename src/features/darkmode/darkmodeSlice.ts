import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import type { DarkmodeSlice } from '@/types/features';

const initialState: DarkmodeSlice = {
  darkmode: false,
};

export const darkmodeSlice = createSlice({
  name: 'darkmodeToggler',
  initialState,
  reducers: {
    turnOnDarkmode: (state: DarkmodeSlice) => {
      state.darkmode = true;
    },
    turnOffDarkmode: (state: DarkmodeSlice) => {
      state.darkmode = false;
    },
  },
});

export const { turnOnDarkmode, turnOffDarkmode } = darkmodeSlice.actions;
export const darkModeStatus = (state: RootState) =>
  state.darkmodeStatus.darkmode;
export default darkmodeSlice.reducer;
