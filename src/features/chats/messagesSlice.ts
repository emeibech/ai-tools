import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import type { Messages, MessagesSlice } from '@/types/features';

const initialState: MessagesSlice = { messages: [] };

const reducers = {
  messageAdded: (state: MessagesSlice, action: PayloadAction<Messages>) => {
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
} = codingMessagesSlice.actions;

export const {
  messageAdded: eli5Added,
  messageRemoved: eli5Removed,
  messageAppended: eli5Appended,
} = eli5MessagesSlice.actions;

export const {
  messageAdded: generalAdded,
  messageRemoved: generalRemoved,
  messageAppended: generalAppended,
} = generalMessagesSlice.actions;

export const codingMessages = (state: RootState) =>
  state.codingMessagesSlice.messages;
export const eli5Messages = (state: RootState) =>
  state.eli5MessagesSlice.messages;
export const generalMessages = (state: RootState) =>
  state.generalMessagesSlice.messages;

export default {
  codingMessagesSlice: codingMessagesSlice.reducer,
  eli5MessagesSlice: eli5MessagesSlice.reducer,
  generalMessagesSlice: generalMessagesSlice.reducer,
};
