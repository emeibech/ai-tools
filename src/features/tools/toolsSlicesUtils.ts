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
} from './toolsSlices';

export type Tool =
  | 'codeanalyzer'
  | 'tonechanger'
  | 'storygenerator'
  | undefined;

export function getResponsesState(tool: Tool) {
  if (tool === 'codeanalyzer') return codeAnalyzerResponse;
  if (tool === 'tonechanger') return toneChangeResponse;
  return storyGeneratorResponse;
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
};
