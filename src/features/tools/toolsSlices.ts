import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

const initialState: string = '';

const reducers = {
  responseReset: () => initialState,
  responseAppended: (state: string, action: PayloadAction<string>) => {
    return state + action.payload;
  },
};

export const codeAnalyzerSlice = createSlice({
  name: 'code analyzer response',
  initialState,
  reducers,
});

export const toneChangerSlice = createSlice({
  name: 'tone changer response',
  initialState,
  reducers,
});

export const storyGeneratorSlice = createSlice({
  name: 'story generator response',
  initialState,
  reducers,
});

export const {
  responseReset: codeAnalyzerResponseReset,
  responseAppended: codeAnalyzerResponseAppended,
} = codeAnalyzerSlice.actions;

export const {
  responseReset: toneChangerResponseReset,
  responseAppended: toneChangerResponseAppended,
} = toneChangerSlice.actions;

export const {
  responseReset: storyGeneratorResponseReset,
  responseAppended: storyGeneratorResponseAppended,
} = storyGeneratorSlice.actions;

export const codeAnalyzerResponse = (state: RootState) => state.codeAnalyzer;
export const toneChangeResponse = (state: RootState) => state.toneChanger;
export const storyGeneratorResponse = (state: RootState) =>
  state.storyGenerator;

export default {
  codeAnalyzer: codeAnalyzerSlice.reducer,
  toneChanger: toneChangerSlice.reducer,
  storyGenerator: storyGeneratorSlice.reducer,
};
