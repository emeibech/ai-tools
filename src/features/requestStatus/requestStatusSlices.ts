import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import type { RequestStatus } from '@/types/features';

const initialState: RequestStatus = 'idle';

const reducers = {
  statusChanged: (
    state: RequestStatus,
    action: PayloadAction<RequestStatus>,
  ) => {
    state = action.payload;
  },
};

const codeAnalyzerStatusSlice = createSlice({
  name: 'codeAnalyzerStatus',
  initialState,
  reducers,
});

const toneChangerStatusSlice = createSlice({
  name: 'toneChangerStatus',
  initialState,
  reducers,
});

const storyGeneratorStatusSlice = createSlice({
  name: 'storyGeneratorStatus',
  initialState,
  reducers,
});

const codingAssistantStatusSlice = createSlice({
  name: 'codingAssistantStatus',
  initialState,
  reducers,
});

const generalAssistantStatusSlice = createSlice({
  name: 'generalAssistantStatus',
  initialState,
  reducers,
});

const eli5StatusSlice = createSlice({
  name: 'eli5Status',
  initialState,
  reducers,
});

export const { statusChanged: codeAnalyzerStatusChanged } =
  codeAnalyzerStatusSlice.actions;

export const { statusChanged: toneChangerStatusChanged } =
  toneChangerStatusSlice.actions;

export const { statusChanged: storyGeneratorStatusChanged } =
  storyGeneratorStatusSlice.actions;

export const { statusChanged: codingAssistantStatusChanged } =
  codingAssistantStatusSlice.actions;

export const { statusChanged: generalAssistantStatusChanged } =
  generalAssistantStatusSlice.actions;

export const { statusChanged: eli5StatusChanged } = eli5StatusSlice.actions;

export const codeAnalyzerStatus = (state: RootState) =>
  state.codeAnalyzerStatusSlice;

export const toneChangerStatus = (state: RootState) =>
  state.toneChangerStatusSlice;

export const storyGeneratorStatus = (state: RootState) =>
  state.storyGeneratorStatusSlice;

export const codingAssistantStatus = (state: RootState) =>
  state.codingAssistantStatusSlice;

export const eli5Status = (state: RootState) => state.eli5StatusSlice;

export const generalAssistantStatus = (state: RootState) =>
  state.generalAssistantStatusSlice;

export default {
  codeAnalyzerStatusSlice: codeAnalyzerStatusSlice.reducer,
  toneChangerStatusSlice: toneChangerStatusSlice.reducer,
  storyGeneratorStatusSlice: storyGeneratorStatusSlice.reducer,
  codingAssistantStatusSlice: codingAssistantStatusSlice.reducer,
  eli5StatusSlice: eli5StatusSlice.reducer,
  generalAssistantStatusSlice: generalAssistantStatusSlice.reducer,
};
