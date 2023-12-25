import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import { RetryRequest } from '@/types/features';

const initialState: RetryRequest = {
  value: 0,
};

export const retryRequestSlice = createSlice({
  name: 'retryRequest',
  initialState,
  reducers: {
    retryValueIncremented: (state: RetryRequest) => {
      state.value += 1;
    },
  },
});

export const { retryValueIncremented } = retryRequestSlice.actions;
export const retryRequestStatus = (state: RootState) =>
  state.retryRequestStatus.value;
export default retryRequestSlice.reducer;
