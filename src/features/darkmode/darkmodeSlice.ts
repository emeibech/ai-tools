import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import type { DarkmodeSlice } from '@/types/features';

const initialState: DarkmodeSlice = {
  value: false,
};

export const darkmodeSlice = createSlice({
  name: 'darkmodeToggler',
  initialState,
  reducers: {
    turnOnDarkmode: (state: DarkmodeSlice) => {
      state.value = true;
    },
    turnOffDarkmode: (state: DarkmodeSlice) => {
      state.value = false;
    },
  },
});

export const { turnOnDarkmode, turnOffDarkmode } = darkmodeSlice.actions;
export const darkModeStatus = (state: RootState) => state.darkmodeStatus.value;
export default darkmodeSlice.reducer;
