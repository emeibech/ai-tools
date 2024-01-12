import type { Dispatch, ReactNode } from 'react';
import type { UserStatus, FieldState } from './hooks';

// RateLimiter
export interface RateLimiter {
  remainingUsage: number;
  timestamp: number | null;
  limitExceeded: boolean;
}

// currentRouteSlice
export interface CurrentRouteState {
  value: Route;
}

// toolsResponsesSlice
export interface ToolsResponsesSlice {
  response: string;
}

// toolsPromptsSlice
export interface ToolsPromptSlice {
  prompt: string;
}

// darkmodeSlice
export interface DarkmodeSlice {
  value: boolean;
}

// messagesSlice
export interface MessagesSlice {
  messages: Message[];
}

// requestStatusSlices
export type RequestStatus = 'idle' | 'requesting' | 'streaming' | 'error';

export interface RequestStatusSlice {
  status: RequestStatus;
}

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
export interface Message {
  id: string;
  dbid?: number | undefined;
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
  chatHistory: Message[];
  assistantId: string;
  userId: string;
  prompt: string;
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
  dbid?: number | undefined;
  renderCodeBlocks?: boolean;
  initialMessage?: boolean;
  requestIndicator?: boolean;
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

// useApi
export interface ApiArgs {
  name: Name;
  prompt: string;
  route: Tool;
}

// userSlice
export interface Client {
  userStatus: UserStatus;
  act: string | null;
}

// retryRequestSlice
export interface RetryRequest {
  value: number;
}

// Conversations
export interface Conversation {
  id: number;
  title: string;
  last_updated: number;
}

// ConversationsSheet
export interface ConversationsProps {
  name: Name;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
}

// conversationsSlice
export interface ConversationsSlice {
  conversations: Conversation[];
  activeConversation: number | null;
  addMsgQ: string[];
  msgsFetchStatus: 'fetching' | 'idle';
}

// ConversationsSheet
export interface ConversationsSheet {
  name: Name;
  side?: 'top' | 'bottom' | 'left' | 'right' | undefined;
  className?: string;
  children: ReactNode;
}

// ConversationForm
export interface ConversationForm {
  title: string;
  name: Name;
  id: number;
  setCurrentlyEditing: Dispatch<React.SetStateAction<number | null>>;
}

// loadMoreSlice
export interface LoadMoreSlice {
  nextPage: number;
  lastConversation: boolean;
}
