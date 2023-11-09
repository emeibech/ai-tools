import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import type { RateLimiter } from '@/types/features';

const initialState: RateLimiter = {
  remainingUsage: 5,
  timestamp: null,
  limitExceeded: false,
};

export const rateLimiterSlice = createSlice({
  name: 'rateLimiter',
  initialState,
  reducers: {
    remainingUsageDecremented: (state: RateLimiter) => {
      if (state.remainingUsage === 0) return;
      state.remainingUsage -= 1;
    },
    remainingUsageSet: (state: RateLimiter, action: PayloadAction<number>) => {
      state.remainingUsage = action.payload;
    },
    timestampSet: (
      state: RateLimiter,
      action: PayloadAction<number | null>,
    ) => {
      state.timestamp = action.payload;
    },
    rateLimitCalculated: (state: RateLimiter) => {
      const timeNow = Date.now() / 1000;

      if (state.timestamp === null) {
        state.timestamp = timeNow;
      }

      if (state.timestamp && timeNow - state.timestamp >= 86400) {
        state.remainingUsage = 5;
        state.timestamp = timeNow;
        state.limitExceeded = false;
      }

      if (state.remainingUsage < 1) {
        state.limitExceeded = true;
      }
    },
  },
});

export const {
  remainingUsageDecremented,
  remainingUsageSet,
  rateLimitCalculated,
  timestampSet,
} = rateLimiterSlice.actions;
export const rateLimiter = (state: RootState) => state.rateLimiter;
export default rateLimiterSlice.reducer;
