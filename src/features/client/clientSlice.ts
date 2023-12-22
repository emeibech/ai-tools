import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import type { Client } from '@/types/features';

const initialState: Client = {
  userStatus: 'guest',
  act: null,
};

export const clientSlice = createSlice({
  name: 'darkmodeToggler',
  initialState,
  reducers: {
    clientStatusReset: () => initialState,
    clientStatusSet: (state: Client, action: PayloadAction<Client>) => {
      const { userStatus, act } = action.payload;
      state.userStatus = userStatus;
      state.act = act;
    },
  },
});

export const { clientStatusReset, clientStatusSet } = clientSlice.actions;
export const clientStatus = (state: RootState) => state.clientStatus;
export default clientSlice.reducer;
