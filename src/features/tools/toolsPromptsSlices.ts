import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

const initialState: string = '';

const reducers = {
  promptReset: () => initialState,
  promptAppended: (state: string, action: PayloadAction<string>) => {
    return state + action.payload;
  },
};

export const codeAnalyzerPromptSlice = createSlice({
  name: 'codeAnalyzerPrompt',
  initialState,
  reducers,
});

export const toneChangerPromptSlice = createSlice({
  name: 'toneChangerPrompt',
  initialState,
  reducers,
});

export const storyGeneratorPromptSlice = createSlice({
  name: 'storyGeneratorPrompt',
  initialState,
  reducers,
});

export const {
  promptReset: codeAnalyzerPromptReset,
  promptAppended: codeAnalyzerPromptAppended,
} = codeAnalyzerPromptSlice.actions;

export const {
  promptReset: toneChangerPromptReset,
  promptAppended: toneChangerPromptAppended,
} = toneChangerPromptSlice.actions;

export const {
  promptReset: storyGeneratorPromptReset,
  promptAppended: storyGeneratorPromptAppended,
} = storyGeneratorPromptSlice.actions;

export const codeAnalyzerPrompt = (state: RootState) => {
  return state.codeAnalyzerPromptSlice;
};

export const toneChangePrompt = (state: RootState) => {
  return state.toneChangerPromptSlice;
};

export const storyGeneratorPrompt = (state: RootState) => {
  return state.storyGeneratorPromptSlice;
};

export default {
  codeAnalyzerPromptSlice: codeAnalyzerPromptSlice.reducer,
  toneChangerPromptSlice: toneChangerPromptSlice.reducer,
  storyGeneratorPromptSlice: storyGeneratorPromptSlice.reducer,
};
