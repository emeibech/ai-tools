import { useEffect, useState } from 'react';
import { handleCatchError } from '../lib/utils';
import { getMessagesActions } from '@/features/chatInterface/messagesSliceutils';
import { useAppDispatch } from '@/app/hooks';
import { type ReadableStream } from 'web-streams-polyfill';
import {
  type Messages,
  type Name,
  type ChatApiArgs,
} from '@/features/chatInterface/ChatInterface';
import useAutoScroll from './useAutoScroll';

function getUrlParams(name: Name) {
  if (name === 'Coding Assistant') return '/codingassistant?model=';
  if (name === 'General Assistant') return '/generalassistant';
  if (name === "Explain Like I'm 5") return '/eli5';
  return '';
}

/* According to OpenAI documentation, 1 token is about 4 characters. 
  This function will be used to decide whether to change model (this only 
  applies to codingassistant since higher context costs more and I can
  only afford to use it on this one) or to cut some of the old messages */
function getTokenEstimate(messages: Messages[] | MessagesParam[]) {
  const combinedMessages = messages.reduce(
    (acc, cur) => (acc += cur.content),
    '',
  );

  return combinedMessages.length / 4;
}

type MessagesParam = {
  role: 'user' | 'assistant';
  content: string;
};

interface TrimMessages {
  messages: MessagesParam[];
  tokenLimit: 3000 | 15000;
}

/* Recursively removes the first message object in messages array until the 
entire message history is less than the approximate tokenLimit param. 
This is to avoid getting token limit error. */
function trimMessages({ messages, tokenLimit }: TrimMessages) {
  const estimatedTokens = getTokenEstimate(messages);
  if (estimatedTokens < tokenLimit) return messages;
  const trimmedMessages = messages.slice(1);
  return trimMessages({ messages: trimmedMessages, tokenLimit });
}

interface GetModelParams {
  chatInterface: Name;
  tokenEstimate: number;
}

function getModel({ chatInterface, tokenEstimate }: GetModelParams) {
  if (chatInterface === 'Coding Assistant') {
    return tokenEstimate > 3000 ? 'gpt-3.5-turbo-16k' : 'gpt-3.5-turbo';
  }

  return '';
}

function removeIds(messages: Messages[]) {
  const noIds = messages.map(({ role, content }) => ({ role, content }));
  return noIds;
}

const baseUrl = import.meta.env.VITE_AI_URL;

export default function useChatApi(chatApiArgs: ChatApiArgs) {
  const [isDone, setIsDone] = useState(true);
  const dispatch = useAppDispatch();
  const setChunkCount = useAutoScroll(isDone);

  useEffect(() => {
    console.log('useChatApi Effect');
    const {
      chatInterface,
      prompt,
      chatHistory,
      model,
      responseId,
      submitCount,
    } = chatApiArgs;
    const { messageAppended } = getMessagesActions(chatInterface);
    const tokenLimit = chatInterface === 'Coding Assistant' ? 15000 : 3000;
    const noIdsHistory = removeIds(chatHistory);

    /* Using messages inside this useEffect will run this effect indefinitely
    since it's writing new data to messages. To avoid the loop, I'm creating 
    a non-state variable from submitData properties instead*/
    const messagesPrompt: MessagesParam[] = [
      ...noIdsHistory,
      { role: 'user', content: prompt },
    ];

    /* I can't afford using high-context models for all the chatbots 
    so I'm cutting the chat history down. */
    const trimmedMessages = trimMessages({
      messages: messagesPrompt,
      tokenLimit,
    });

    const modelParam =
      model ||
      getModel({
        chatInterface,
        tokenEstimate: getTokenEstimate(trimmedMessages),
      });

    const url = `${baseUrl}${getUrlParams(chatInterface)}${modelParam}`;

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trimmedMessages),
    };

    async function streamData() {
      try {
        const response = await fetch(url, requestOptions);
        const decoder = new TextDecoder();

        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }

        for await (const chunk of response.body as ReadableStream) {
          dispatch(
            messageAppended({
              id: responseId,
              content: decoder.decode(chunk),
            }),
          );

          setChunkCount((prev) => prev + 1);
        }

        setChunkCount(0);
        setIsDone(true);
      } catch (error) {
        handleCatchError(error);
      }
    }

    // This condition is so it doesn't run on first mount
    if (submitCount > 0) {
      setIsDone(false);
      streamData();
    }
  }, [dispatch, setChunkCount, chatApiArgs]);
}
