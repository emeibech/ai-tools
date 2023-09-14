import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

export interface Messages {
  id: string;
  role: 'assistant' | 'user';
  content: string;
}

const initialState: Messages[] = [];

const reducers = {
  messageAdded: (state: Messages[], action: { payload: Messages }) => {
    state.push(action.payload);
  },
  messageRemoved: (state: Messages[], action: { payload: { id: string } }) => {
    const { id } = action.payload;
    const index = state.findIndex((message) => message.id === id);
    if (index !== -1) {
      state.splice(index, 1);
    }
  },
  messageAppended: (
    state: Messages[],
    action: { payload: { id: string; content: string } },
  ) => {
    const { id, content } = action.payload;
    const index = state.findIndex((message) => message.id === id);
    if (index !== -1) {
      state[index].content += content;
    }
  },
};

export const codingMessagesSlice = createSlice({
  name: 'coding messages',
  initialState,
  reducers,
});

export const eli5MessagesSlice = createSlice({
  name: 'eli5 messages',
  initialState,
  reducers,
});

export const generalMessagesSlice = createSlice({
  name: 'general messages',
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

export const codingMessages = (state: RootState) => state.coding;
export const eli5Messages = (state: RootState) => state.eli5;
export const generalMessages = (state: RootState) => state.general;

export default {
  coding: codingMessagesSlice.reducer,
  eli5: eli5MessagesSlice.reducer,
  general: generalMessagesSlice.reducer,
};
