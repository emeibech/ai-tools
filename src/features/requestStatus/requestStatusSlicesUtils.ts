import {
  codeAnalyzerStatus,
  codeAnalyzerStatusChanged,
  toneChangerStatus,
  toneChangerStatusChanged,
  storyGeneratorStatus,
  storyGeneratorStatusChanged,
  codingAssistantStatus,
  codingAssistantStatusChanged,
  generalAssistantStatus,
  generalAssistantStatusChanged,
  eli5Status,
  eli5StatusChanged,
} from './requestStatusSlices';
import type { Name } from '@/types/features';

const statusMap = {
  'Code Analyzer': {
    status: codeAnalyzerStatus,
    statusChanged: codeAnalyzerStatusChanged,
  },
  'Tone Changer': {
    status: toneChangerStatus,
    statusChanged: toneChangerStatusChanged,
  },
  'Story Generator': {
    status: storyGeneratorStatus,
    statusChanged: storyGeneratorStatusChanged,
  },
  'Coding Assistant': {
    status: codingAssistantStatus,
    statusChanged: codingAssistantStatusChanged,
  },
  'General Assistant': {
    status: generalAssistantStatus,
    statusChanged: generalAssistantStatusChanged,
  },
  "Explain Like I'm 5": {
    status: eli5Status,
    statusChanged: eli5StatusChanged,
  },
};

export function getStatusState(name: Name) {
  return statusMap[name]?.status;
}

export function getStatusActions(name: Name) {
  return statusMap[name]?.statusChanged;
}
