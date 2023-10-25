import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import type { Messages } from '@/types/features';

const initialState: Messages[] = [];

const reducers = {
  messageAdded: (state: Messages[], action: PayloadAction<Messages>) => {
    state.push(action.payload);
  },
  messageRemoved: (state: Messages[], action: PayloadAction<Messages>) => {
    const { id } = action.payload;
    const index = state.findIndex((message) => message.id === id);
    if (index !== -1) {
      state.splice(index, 1);
    }
  },
  messageAppended: (state: Messages[], action: PayloadAction<Messages>) => {
    const { id, content } = action.payload;
    const index = state.findIndex((message) => message.id === id);
    if (index !== -1) {
      state[index].content += content;
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

export const codingMessages = (state: RootState) => state.codingMessagesSlice;
export const eli5Messages = (state: RootState) => state.eli5MessagesSlice;
export const generalMessages = (state: RootState) => state.generalMessagesSlice;

export default {
  codingMessagesSlice: codingMessagesSlice.reducer,
  eli5MessagesSlice: eli5MessagesSlice.reducer,
  generalMessagesSlice: generalMessagesSlice.reducer,
};
