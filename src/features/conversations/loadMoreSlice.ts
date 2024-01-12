import { RootState } from '@/app/store';
import { LoadMoreSlice } from '@/types/features';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: LoadMoreSlice = {
  nextPage: 2,
  lastConversation: false,
};

const reducers = {
  nextPageIncremented: (state: LoadMoreSlice) => {
    state.nextPage++;
  },
  lastConveresationSet: (
    state: LoadMoreSlice,
    action: PayloadAction<boolean>,
  ) => {
    state.lastConversation = action.payload;
  },
};

const caLoadMoreSlice = createSlice({
  name: 'caLoadMoreSlice',
  initialState,
  reducers,
});

const gaLoadMoreSlice = createSlice({
  name: 'caLoadMoreSlice',
  initialState,
  reducers,
});

const eli5LoadMoreSlice = createSlice({
  name: 'caLoadMoreSlice',
  initialState,
  reducers,
});

export const {
  nextPageIncremented: caNextPageIncremented,
  lastConveresationSet: caLastConveresationSet,
} = caLoadMoreSlice.actions;

export const {
  nextPageIncremented: gaNextPageIncremented,
  lastConveresationSet: gaLastConveresationSet,
} = gaLoadMoreSlice.actions;

export const {
  nextPageIncremented: eli5NextPageIncremented,
  lastConveresationSet: eli5LastConveresationSet,
} = eli5LoadMoreSlice.actions;

export const caLoadMore = (state: RootState) => state.caLoadMoreSlice;
export const gaLoadMore = (state: RootState) => state.gaLoadMoreSlice;
export const eli5LoadMore = (state: RootState) => state.eli5LoadMoreSlice;

export default {
  caLoadMoreSlice: caLoadMoreSlice.reducer,
  gaLoadMoreSlice: gaLoadMoreSlice.reducer,
  eli5LoadMoreSlice: eli5LoadMoreSlice.reducer,
};
