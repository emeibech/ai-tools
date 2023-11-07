import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import type { ApiCallCounterSlice } from '@/types/features';

const initialState: ApiCallCounterSlice = {
  count: 0,
  timestamp: null,
  maxCount: 13,
};

export const apiCallCounterSlice = createSlice({
  name: 'apiCallCounter',
  initialState,
  reducers: {
    counterIncremented: (state: ApiCallCounterSlice) => {
      state.count += 1;
    },
    counterSet: (state: ApiCallCounterSlice, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    timestampSet: (
      state: ApiCallCounterSlice,
      action: PayloadAction<number | null>,
    ) => {
      state.timestamp = action.payload;
    },
    timestampCreated: (state: ApiCallCounterSlice) => {
      const timeNow = Date.now() / 1000;

      if (state.timestamp === null) {
        state.timestamp = timeNow;
      } else if (state.timestamp && timeNow - state.timestamp > 86399) {
        state.count = 0;
        state.timestamp = timeNow;
      }
    },
  },
});

export const {
  counterIncremented,
  timestampCreated,
  counterSet,
  timestampSet,
} = apiCallCounterSlice.actions;
export const apiCallCounter = (state: RootState) => state.apiCallCounter;
export default apiCallCounterSlice.reducer;
