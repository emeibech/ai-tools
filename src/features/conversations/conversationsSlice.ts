import { RootState } from '@/app/store';
import type { Conversation, ConversationsSlice } from '@/types/features';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: ConversationsSlice = {
  conversations: [{ id: 1, title: 'Sup', timestamp: 'timestamp' }],
  activeConversation: null,
  deleteMsgQ: [],
  addMsgQ: [],
};

const reducers = {
  stateReset: () => initialState,
  msgPushedToAddQ: (
    state: ConversationsSlice,
    action: PayloadAction<string[]>,
  ) => {
    state.addMsgQ = [...state.addMsgQ, ...action.payload];
  },
  addQCleared: (state: ConversationsSlice) => {
    state.addMsgQ = initialState.addMsgQ;
  },
  msgPushedToDeleteQ: (
    state: ConversationsSlice,
    action: PayloadAction<number[]>,
  ) => {
    state.deleteMsgQ = [...state.deleteMsgQ, ...action.payload];
  },
  deleteQCleared: (state: ConversationsSlice) => {
    state.deleteMsgQ = initialState.deleteMsgQ;
  },
  activeConversationSet: (
    state: ConversationsSlice,
    action: PayloadAction<number | null>,
  ) => {
    state.activeConversation = action.payload;
  },
  conversationsSet: (
    state: ConversationsSlice,
    action: PayloadAction<Conversation[]>,
  ) => {
    state.conversations = action.payload;
  },
  conversationAdded: (
    state: ConversationsSlice,
    action: PayloadAction<{ id: number; title: string; timestamp: string }>,
  ) => {
    state.conversations.unshift(action.payload);
  },
  conversationRemoved: (
    state: ConversationsSlice,
    action: PayloadAction<number>,
  ) => {
    state.conversations.splice(action.payload, 1);
  },
  titleChanged: (
    state: ConversationsSlice,
    action: PayloadAction<{ id: number; newTitle: string }>,
  ) => {
    const { id, newTitle } = action.payload;
    const index = state.conversations.findIndex((item) => item.id === id);
    state.conversations[index].title = newTitle;
  },
};

const caConversationsSlice = createSlice({
  name: 'caConversationsSlice',
  initialState,
  reducers,
});

const gaConversationsSlice = createSlice({
  name: 'gaConversationsSlice',
  initialState,
  reducers,
});

const eli5ConversationsSlice = createSlice({
  name: 'eli5ConversationsSlice',
  initialState,
  reducers,
});

export const {
  stateReset: caConversationsReset,
  msgPushedToAddQ: caMsgPushedToAddQ,
  msgPushedToDeleteQ: caMsgPushedToDeleteQ,
  activeConversationSet: caActiveConversationSet,
  conversationsSet: caConversationsSet,
  conversationRemoved: caConversationRemoved,
  titleChanged: caTitleChanged,
  addQCleared: caAddQCleared,
  deleteQCleared: caDeleteQCleared,
  conversationAdded: caConversationAdded,
} = caConversationsSlice.actions;

export const {
  stateReset: gaConversationsReset,
  msgPushedToAddQ: gaMsgPushedToAddQ,
  msgPushedToDeleteQ: gaMsgPushedToDeleteQ,
  activeConversationSet: gaActiveConversationSet,
  conversationsSet: gaConversationsSet,
  conversationRemoved: gaConversationRemoved,
  titleChanged: gaTitleChanged,
  addQCleared: gaAddQCleared,
  deleteQCleared: gaDeleteQCleared,
  conversationAdded: gaConversationAdded,
} = gaConversationsSlice.actions;

export const {
  stateReset: eli5ConversationsReset,
  msgPushedToAddQ: eli5MsgPushedToAddQ,
  msgPushedToDeleteQ: eli5MsgPushedToDeleteQ,
  activeConversationSet: eli5ActiveConversationSet,
  conversationsSet: eli5ConversationsSet,
  conversationRemoved: eli5ConversationRemoved,
  titleChanged: eli5TitleChanged,
  addQCleared: eli5AddQCleared,
  deleteQCleared: eli5DeleteQCleared,
  conversationAdded: eli5ConversationAdded,
} = eli5ConversationsSlice.actions;

export const caConversations = (state: RootState) => state.caConversationsSlice;
export const gaConversations = (state: RootState) => state.gaConversationsSlice;
export const eli5Conversations = (state: RootState) =>
  state.eli5ConversationsSlice;

export default {
  caConversationsSlice: caConversationsSlice.reducer,
  gaConversationsSlice: gaConversationsSlice.reducer,
  eli5ConversationsSlice: eli5ConversationsSlice.reducer,
};
