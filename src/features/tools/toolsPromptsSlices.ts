import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import type { ToolsPromptSlice } from '@/types/features';

const initialState: ToolsPromptSlice = {
  prompt: '',
};

const reducers = {
  promptReset: () => initialState,
  promptAppended: (state: ToolsPromptSlice, action: PayloadAction<string>) => {
    state.prompt += action.payload;
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

export const imgTranslatorPromptSlice = createSlice({
  name: 'imgTranslatorPrompt',
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

export const {
  promptReset: imgTranslatorPromptReset,
  promptAppended: imgTranslatorPromptAppended,
} = imgTranslatorPromptSlice.actions;

export const codeAnalyzerPrompt = (state: RootState) => {
  return state.codeAnalyzerPromptSlice.prompt;
};

export const toneChangePrompt = (state: RootState) => {
  return state.toneChangerPromptSlice.prompt;
};

export const storyGeneratorPrompt = (state: RootState) => {
  return state.storyGeneratorPromptSlice.prompt;
};

export const imgTranslatorPrompt = (state: RootState) => {
  return state.imgTranslatorPromptSlice.prompt;
};

export default {
  codeAnalyzerPromptSlice: codeAnalyzerPromptSlice.reducer,
  toneChangerPromptSlice: toneChangerPromptSlice.reducer,
  storyGeneratorPromptSlice: storyGeneratorPromptSlice.reducer,
  imgTranslatorPromptSlice: imgTranslatorPromptSlice.reducer,
};
