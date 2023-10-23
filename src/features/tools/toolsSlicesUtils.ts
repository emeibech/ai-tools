import {
  codeAnalyzerPrompt,
  codeAnalyzerPromptAppended,
  codeAnalyzerPromptReset,
  storyGeneratorPrompt,
  storyGeneratorPromptAppended,
  storyGeneratorPromptReset,
  toneChangePrompt,
  toneChangerPromptAppended,
  toneChangerPromptReset,
} from './toolsPromptsSlices';
import {
  codeAnalyzerResponse,
  toneChangeResponse,
  storyGeneratorResponse,
  codeAnalyzerResponseAppended,
  codeAnalyzerResponseReset,
  toneChangerResponseAppended,
  toneChangerResponseReset,
  storyGeneratorResponseAppended,
  storyGeneratorResponseReset,
} from './toolsResponsesSlices';
import type { Tool } from '@/types/features';

export function getResponsesState(tool: Tool) {
  if (tool === 'codeanalyzer') return codeAnalyzerResponse;
  if (tool === 'tonechanger') return toneChangeResponse;
  return storyGeneratorResponse;
}

export function getPromptsState(tool: Tool) {
  if (tool === 'codeanalyzer') return codeAnalyzerPrompt;
  if (tool === 'tonechanger') return toneChangePrompt;
  return storyGeneratorPrompt;
}

export function getResponsesActions(tool: Tool) {
  if (tool === 'codeanalyzer')
    return {
      responseAppended: codeAnalyzerResponseAppended,
      responseReset: codeAnalyzerResponseReset,
    };

  if (tool === 'tonechanger')
    return {
      responseAppended: toneChangerResponseAppended,
      responseReset: toneChangerResponseReset,
    };

  return {
    responseAppended: storyGeneratorResponseAppended,
    responseReset: storyGeneratorResponseReset,
  };
}

export function getPromptsActions(tool: Tool) {
  if (tool === 'codeanalyzer')
    return {
      promptAppended: codeAnalyzerPromptAppended,
      promptReset: codeAnalyzerPromptReset,
    };

  if (tool === 'tonechanger')
    return {
      promptAppended: toneChangerPromptAppended,
      promptReset: toneChangerPromptReset,
    };

  return {
    promptAppended: storyGeneratorPromptAppended,
    promptReset: storyGeneratorPromptReset,
  };
}

export default {
  codeAnalyzerResponse,
  toneChangeResponse,
  storyGeneratorResponse,
  codeAnalyzerResponseAppended,
  codeAnalyzerResponseReset,
  toneChangerResponseAppended,
  toneChangerResponseReset,
  storyGeneratorResponseAppended,
  storyGeneratorResponseReset,
  codeAnalyzerPrompt,
  codeAnalyzerPromptAppended,
  codeAnalyzerPromptReset,
  storyGeneratorPrompt,
  storyGeneratorPromptAppended,
  storyGeneratorPromptReset,
  toneChangePrompt,
  toneChangerPromptAppended,
  toneChangerPromptReset,
};
