import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import type { ToolsResponsesSlice } from '@/types/features';

const initialState: ToolsResponsesSlice = {
  response: '',
};

const reducers = {
  responseReset: () => initialState,
  responseAppended: (
    state: ToolsResponsesSlice,
    action: PayloadAction<string>,
  ) => {
    state.response += action.payload;
  },
};

export const codeAnalyzerResponseSlice = createSlice({
  name: 'codeAnalyzerResponse',
  initialState,
  reducers,
});

export const toneChangerResponseSlice = createSlice({
  name: 'toneChangerResponse',
  initialState,
  reducers,
});

export const storyGeneratorResponseSlice = createSlice({
  name: 'storyGeneratorResponse',
  initialState,
  reducers,
});

export const {
  responseReset: codeAnalyzerResponseReset,
  responseAppended: codeAnalyzerResponseAppended,
} = codeAnalyzerResponseSlice.actions;

export const {
  responseReset: toneChangerResponseReset,
  responseAppended: toneChangerResponseAppended,
} = toneChangerResponseSlice.actions;

export const {
  responseReset: storyGeneratorResponseReset,
  responseAppended: storyGeneratorResponseAppended,
} = storyGeneratorResponseSlice.actions;

export const codeAnalyzerResponse = (state: RootState) => {
  return state.codeAnalyzerResponseSlice.response;
};

export const toneChangeResponse = (state: RootState) => {
  return state.toneChangerResponseSlice.response;
};

export const storyGeneratorResponse = (state: RootState) => {
  return state.storyGeneratorResponseSlice.response;
};

export default {
  codeAnalyzerResponseSlice: codeAnalyzerResponseSlice.reducer,
  toneChangerResponseSlice: toneChangerResponseSlice.reducer,
  storyGeneratorResponseSlice: storyGeneratorResponseSlice.reducer,
};
