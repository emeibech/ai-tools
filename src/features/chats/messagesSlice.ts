import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import type { Message, MessagesSlice } from '@/types/features';

const initialState: MessagesSlice = { messages: [], loading: false };

const reducers = {
  messagesReset: () => initialState,
  messagesSet: (state: MessagesSlice, action: PayloadAction<Message[]>) => {
    state.messages = action.payload;
  },
  messageAdded: (state: MessagesSlice, action: PayloadAction<Message>) => {
    state.messages.push(action.payload);
  },
  messageRemoved: (
    state: MessagesSlice,
    action: PayloadAction<{ id: string }>,
  ) => {
    const { id } = action.payload;
    const index = state.messages.findIndex((message) => message.id === id);
    if (index !== -1) {
      state.messages.splice(index, 1);
    }
  },
  messageAppended: (
    state: MessagesSlice,
    action: PayloadAction<{
      id: string;
      content: string;
    }>,
  ) => {
    const { id, content } = action.payload;
    const index = state.messages.findIndex((message) => message.id === id);
    if (index !== -1) {
      state.messages[index].content += content;
    }
  },
  dbidAdded: (
    state: MessagesSlice,
    action: PayloadAction<{ id: string; dbid: number }>,
  ) => {
    const { id, dbid } = action.payload;
    const messageIndex = state.messages.findIndex((item) => item.id === id);
    state.messages[messageIndex].dbid = dbid;
  },
  msgsLoadingSet: (state: MessagesSlice, action: PayloadAction<boolean>) => {
    state.loading = action.payload;
  },
};

export const codingMessagesSlice = createSlice({
  name: 'codingMessages',
  initialState,
  reducers,
});

export const eli5MessagesSlice = createSlice({
  name: 'eli5Messages',
  initialState,
  reducers,
});

export const generalMessagesSlice = createSlice({
  name: 'generalMessages',
  initialState,
  reducers,
});

export const {
  messageAdded: codingAdded,
  messageRemoved: codingRemoved,
  messageAppended: codingAppended,
  dbidAdded: codingDbidAdded,
  messagesSet: codingMessagesSet,
  messagesReset: codingMessagesReset,
  msgsLoadingSet: codingMsgsLoadingSet,
} = codingMessagesSlice.actions;

export const {
  messageAdded: eli5Added,
  messageRemoved: eli5Removed,
  messageAppended: eli5Appended,
  dbidAdded: eli5DbidAdded,
  messagesSet: eli5MessagesSet,
  messagesReset: eli5MessagesReset,
  msgsLoadingSet: eli5MsgsLoadingSet,
} = eli5MessagesSlice.actions;

export const {
  messageAdded: generalAdded,
  messageRemoved: generalRemoved,
  messageAppended: generalAppended,
  dbidAdded: generalDbidAdded,
  messagesSet: generalMessagesSet,
  messagesReset: generalMessagesReset,
  msgsLoadingSet: generalMsgsLoadingSet,
} = generalMessagesSlice.actions;

export const codingMessages = (state: RootState) => state.codingMessagesSlice;
export const eli5Messages = (state: RootState) => state.eli5MessagesSlice;
export const generalMessages = (state: RootState) => state.generalMessagesSlice;

export default {
  codingMessagesSlice: codingMessagesSlice.reducer,
  eli5MessagesSlice: eli5MessagesSlice.reducer,
  generalMessagesSlice: generalMessagesSlice.reducer,
};
