import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

const initialState: string = '';

const reducers = {
  responseReset: () => initialState,
  responseAppended: (state: string, action: PayloadAction<string>) => {
    return state + action.payload;
  },
};

export const codeAnalyzerResponseSlice = createSlice({
  name: 'code analyzer response',
  initialState,
  reducers,
});

export const toneChangerResponseSlice = createSlice({
  name: 'tone changer response',
  initialState,
  reducers,
});

export const storyGeneratorResponseSlice = createSlice({
  name: 'story generator response',
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
  return state.codeAnalyzerResponse;
};

export const toneChangeResponse = (state: RootState) => {
  return state.toneChangerResponse;
};

export const storyGeneratorResponse = (state: RootState) => {
  return state.storyGeneratorResponse;
};

export default {
  codeAnalyzerResponse: codeAnalyzerResponseSlice.reducer,
  toneChangerResponse: toneChangerResponseSlice.reducer,
  storyGeneratorResponse: storyGeneratorResponseSlice.reducer,
};
