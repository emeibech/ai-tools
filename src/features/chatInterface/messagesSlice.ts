import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

export interface Messages {
  id: string;
  role: 'assistant' | 'user';
  content: string;
}

const initialState: Messages[] = [];

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    messageAdded: (state, action) => {
      state.push(action.payload);
    },
    messageRemoved: (state, action) => {
      const { id } = action.payload;
      const index = state.findIndex((message) => message.id === id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    messageAppended: (state, action) => {
      const { id, content } = action.payload;
      const index = state.findIndex((message) => message.id === id);
      if (index !== -1) {
        state[index].content += content;
      }
    },
  },
});

export const { messageAdded, messageRemoved, messageAppended } =
  messagesSlice.actions;
export const messages = (state: RootState) => state.messages;
export default messagesSlice.reducer;
