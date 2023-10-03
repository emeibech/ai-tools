import { useEffect, useState } from 'react';
import { handleCatchError, scrollToBottom } from '../lib/utils';
import { direction } from '@/features/scrollDirection/scrollDirectionSlice';
import {
  getMessagesActions,
  getMessagesState,
} from '@/features/chatInterface/messagesSliceutils';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { type ReadableStream } from 'web-streams-polyfill';
import {
  type Name,
  type SubmitData,
} from '@/features/chatInterface/ChatInterface';

function getUrlParams(name: Name) {
  if (name === 'Coding Assistant') return '/codingassistant?prompt=';
  if (name === 'General Assistant') return '/generalassistant?prompt=';
  if (name === "Explain Like I'm 5") return '/eli5?prompt=';
  throw new Error('name variable is undefined in getUrlParams');
}

export default function useCallApi(submitData: SubmitData) {
  const [isDone, setIsDone] = useState(true);
  const scrollDirection = useAppSelector(direction);
  const msgs = getMessagesState(submitData.name);
  const messages = useAppSelector(msgs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('useCallApi Effect');
    const { name, value, submitCount, id } = submitData;
    const { messageAppended } = getMessagesActions(name);
    const baseUrl = import.meta.env.VITE_AI_URL;
    const url = `${baseUrl}${getUrlParams(name)}${encodeURIComponent(value)}`;

    async function streamData() {
      try {
        const response = await fetch(url);
        const decoder = new TextDecoder();

        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }

        for await (const chunk of response.body as ReadableStream) {
          dispatch(
            messageAppended({
              id,
              content: decoder.decode(chunk),
            }),
          );
        }

        setIsDone(true);
      } catch (error) {
        handleCatchError(error);
      }
    }

    if (submitCount > 0) {
      setIsDone(false);
      streamData();
    }
  }, [dispatch, submitData]);

  useEffect(() => {
    console.log('scrollController effect');
    if (!isDone && scrollDirection === 'down') scrollToBottom();
  }, [isDone, scrollDirection, messages]);
}
