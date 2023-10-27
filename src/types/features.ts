import type { ReactNode } from 'react';
import type { FieldState } from './hooks';

// requestStatusSlices
export type RequestStatus = 'idle' | 'requesting' | 'streaming';
export interface RequestIndicatorProps {
  name: Name;
  hideStreamIndicator?: boolean;
}

// useChatApi
export type MessagesParam = {
  role: 'user' | 'assistant';
  content: string;
};

export interface TrimMessages {
  messages: MessagesParam[];
  tokenLimit: 3000 | 15000;
}

export interface GetModelParams {
  chatInterface: Name;
  tokenEstimate: number;
}

// CodeHighlighter
export interface CodeHighlighterProps {
  children: ReactNode;
  name?: Name;
}

// Code
export interface CodeProps {
  code: string;
}

// ChatInterface
export interface Messages {
  id: string;
  role: 'assistant' | 'user';
  content: string;
}

export interface ChatInterfaceProps {
  name: Name;
  children: ReactNode;
  renderCodeBlocks?: boolean;
}

export interface ChatApiArgs {
  chatInterface: Name;
  chatHistory: Messages[];
  responseId: string;
  prompt: string;
  submitCount: number;
  model: Model;
}

export type Name =
  | 'Coding Assistant'
  | "Explain Like I'm 5"
  | 'General Assistant'
  | 'Code Analyzer'
  | 'Tone Changer'
  | 'Story Generator';

// ChatInterfaceForm
export type Model = 'gpt-4' | '';

export interface ChatInterfaceFormProps {
  name: Name;
}

// ChatMessage
export interface ChatMessageProps {
  name: Name;
  children: ReactNode;
  id: string;
  renderCodeBlocks?: boolean;
  initialMessage?: boolean;
  requestIndicator?: boolean;
}

// DarkmodeSlice
export interface DarkmodeState {
  value: boolean;
}

// FormUnit
export interface FormUnitProps {
  label: string;
  description?: string;
  children: ReactNode;
  labelAnimator: {
    onFocus: () => void;
    onBlur: () => void;
    resetState: () => void;
    getFieldState: () => FieldState;
    getAnimationStyles: () => string;
  };
}

// scrollPositionSlice
export interface ScrollPositions {
  home: number;
  codeanalyzer: number;
  codingassistant: number;
  eli5: number;
  storygenerator: number;
  tonechanger: number;
  generalassistant: number;
}

export type Route =
  | 'home'
  | 'codeanalyzer'
  | 'codingassistant'
  | 'eli5'
  | 'storygenerator'
  | 'tonechanger'
  | 'generalassistant';

// toolsSlicesUtils
export type Tool = 'codeanalyzer' | 'tonechanger' | 'storygenerator';

// useChatApi
export type Status = 'idle' | 'requesting' | 'streaming';

// useApi
export interface ApiArgs {
  name: Name;
  prompt: string;
  route: Tool;
  submitCount: number;
}
