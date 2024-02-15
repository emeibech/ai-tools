import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import type { UserStatus } from '@/types/hooks';
import type { Client } from '@/types/features';

const initialState: Client = {
  userStatus: 'guest',
};

export const clientSlice = createSlice({
  name: 'clientStatus',
  initialState,
  reducers: {
    clientStatusReset: () => initialState,
    clientStatusSet: (state: Client, action: PayloadAction<UserStatus>) => {
      state.userStatus = action.payload;
    },
  },
});

export const { clientStatusReset, clientStatusSet } = clientSlice.actions;
export const clientStatus = (state: RootState) => state.clientStatus;
export default clientSlice.reducer;
