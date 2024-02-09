import {
  codeAnalyzerPrompt,
  codeAnalyzerPromptAppended,
  codeAnalyzerPromptReset,
  imgTranslatorPrompt,
  imgTranslatorPromptAppended,
  imgTranslatorPromptReset,
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
  imgTranslatorResponse,
  imgTranslatorResponseAppended,
  imgTranslatorResponseReset,
} from './toolsResponsesSlices';
import type { Tool } from '@/types/features';

export function getResponsesState(tool: Tool) {
  if (tool === 'codeanalyzer') return codeAnalyzerResponse;
  if (tool === 'tonechanger') return toneChangeResponse;
  if (tool === 'imagetranslator') return imgTranslatorResponse;
  return storyGeneratorResponse;
}

export function getPromptsState(tool: Tool) {
  if (tool === 'codeanalyzer') return codeAnalyzerPrompt;
  if (tool === 'tonechanger') return toneChangePrompt;
  if (tool === 'imagetranslator') return imgTranslatorPrompt;
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

  if (tool === 'imagetranslator')
    return {
      responseAppended: imgTranslatorResponseAppended,
      responseReset: imgTranslatorResponseReset,
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

  if (tool === 'imagetranslator')
    return {
      promptAppended: imgTranslatorPromptAppended,
      promptReset: imgTranslatorPromptReset,
    };

  return {
    promptAppended: storyGeneratorPromptAppended,
    promptReset: storyGeneratorPromptReset,
  };
}
