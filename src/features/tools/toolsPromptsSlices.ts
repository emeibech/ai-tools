import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

const initialState: string = '';

const reducers = {
  promptReset: () => initialState,
  promptAppended: (state: string, action: PayloadAction<string>) => {
    return state + action.payload;
  },
};

export const codeAnalyzerPromptSlice = createSlice({
  name: 'code analyzer prompt',
  initialState,
  reducers,
});

export const toneChangerPromptSlice = createSlice({
  name: 'tone changer prompt',
  initialState,
  reducers,
});

export const storyGeneratorPromptSlice = createSlice({
  name: 'story generator prompt',
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
  return state.codeAnalyzerPrompt;
};

export const toneChangePrompt = (state: RootState) => {
  return state.toneChangerPrompt;
};

export const storyGeneratorPrompt = (state: RootState) => {
  return state.storyGeneratorPrompt;
};

export default {
  codeAnalyzerPrompt: codeAnalyzerPromptSlice.reducer,
  toneChangerPrompt: toneChangerPromptSlice.reducer,
  storyGeneratorPrompt: storyGeneratorPromptSlice.reducer,
};
