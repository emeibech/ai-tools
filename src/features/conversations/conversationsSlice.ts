import { RootState } from '@/app/store';
import type { Conversation, ConversationsSlice } from '@/types/features';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: ConversationsSlice = {
  conversations: [],
  activeConversation: null,
  msgsFetchStatus: 'idle',
  addMsgQ: [],
};

const reducers = {
  stateReset: () => initialState,
  msgsFetchStatusSet: (
    state: ConversationsSlice,
    action: PayloadAction<'fetching' | 'idle'>,
  ) => {
    state.msgsFetchStatus = action.payload;
  },
  msgPushedToAddQ: (
    state: ConversationsSlice,
    action: PayloadAction<string[]>,
  ) => {
    state.addMsgQ = [...state.addMsgQ, ...action.payload];
  },
  addQCleared: (state: ConversationsSlice) => {
    state.addMsgQ = initialState.addMsgQ;
  },
  activeConversationSet: (
    state: ConversationsSlice,
    action: PayloadAction<number | null>,
  ) => {
    state.activeConversation = action.payload;
  },
  conversationMovedToTop: (
    state: ConversationsSlice,
    action: PayloadAction<number>,
  ) => {
    const index = state.conversations.findIndex(
      (item) => item.id === action.payload,
    );

    const [deleted] = state.conversations.splice(index, 1);
    state.conversations.unshift(deleted);
  },
  conversationsSet: (
    state: ConversationsSlice,
    action: PayloadAction<Conversation[]>,
  ) => {
    state.conversations = action.payload;
  },
  conversationAdded: (
    state: ConversationsSlice,
    action: PayloadAction<
      { id: number; title: string; last_updated: number }[]
    >,
  ) => {
    state.conversations = [...state.conversations, ...action.payload];
  },
  conversationRemoved: (
    state: ConversationsSlice,
    action: PayloadAction<number>,
  ) => {
    const index = state.conversations.findIndex(
      (item) => item.id === action.payload,
    );

    state.conversations.splice(index, 1);
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
  activeConversationSet: caActiveConversationSet,
  conversationsSet: caConversationsSet,
  conversationRemoved: caConversationRemoved,
  titleChanged: caTitleChanged,
  addQCleared: caAddQCleared,
  conversationAdded: caConversationAdded,
  msgsFetchStatusSet: caMsgsFetchStatusSet,
  conversationMovedToTop: caConversationMovedToTop,
} = caConversationsSlice.actions;

export const {
  stateReset: gaConversationsReset,
  msgPushedToAddQ: gaMsgPushedToAddQ,
  activeConversationSet: gaActiveConversationSet,
  conversationsSet: gaConversationsSet,
  conversationRemoved: gaConversationRemoved,
  titleChanged: gaTitleChanged,
  addQCleared: gaAddQCleared,
  conversationAdded: gaConversationAdded,
  msgsFetchStatusSet: gaMsgsFetchStatusSet,
  conversationMovedToTop: gaConversationMovedToTop,
} = gaConversationsSlice.actions;

export const {
  stateReset: eli5ConversationsReset,
  msgPushedToAddQ: eli5MsgPushedToAddQ,
  activeConversationSet: eli5ActiveConversationSet,
  conversationsSet: eli5ConversationsSet,
  conversationRemoved: eli5ConversationRemoved,
  titleChanged: eli5TitleChanged,
  addQCleared: eli5AddQCleared,
  conversationAdded: eli5ConversationAdded,
  msgsFetchStatusSet: eli5MsgsFetchStatusSet,
  conversationMovedToTop: eli5ConversationMovedToTop,
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
