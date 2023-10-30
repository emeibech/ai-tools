import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import type { CurrentRouteState, Route } from '@/types/features';

const initialState: CurrentRouteState = {
  value: 'home',
};

export const currentRouteSlice = createSlice({
  name: 'currentRoute',
  initialState,
  reducers: {
    setCurrentRoute: (
      state: CurrentRouteState,
      action: PayloadAction<{ route: Route }>,
    ) => {
      const { route } = action.payload;
      state.value = route;
    },
  },
});

export const { setCurrentRoute } = currentRouteSlice.actions;
export const currentRoute = (state: RootState) => state.currentRoute.value;
export default currentRouteSlice.reducer;
