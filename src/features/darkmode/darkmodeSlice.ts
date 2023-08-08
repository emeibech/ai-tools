import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";

export interface CounterState {
  value: boolean;
}

const initialState: CounterState = {
  value: false,
};

export const darkmodeSlice = createSlice({
  name: "darkmodeToggler",
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
export const darkModeStatus = (state: RootState) => state.darkmodeToggler.value;
export default darkmodeSlice.reducer;
