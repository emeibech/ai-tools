import { useEffect } from 'react';
import { getCatchError } from '@/common/lib/utils';
import { getMessagesActions } from '@/features/chats/messagesSliceutils';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import useAutoScroll from '@/common/hooks/useAutoScroll';
import useGetScrollDir from '@/common/hooks/useGetScrollDir';
import type {
  ChatApiArgs,
  GetModelParams,
  Messages,
  MessagesParam,
  Name,
  TrimMessages,
} from '@/types/features';
import {
  getStatusActions,
  getStatusState,
} from '../requestStatus/requestStatusSlicesUtils';
import { clientStatus, clientStatusReset } from '@/features/client/clientSlice';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/common/components/ui/use-toast';
import { retryRequestStatus } from '../retryRequest/retryRequestSlice';

const baseUrl = import.meta.env.VITE_AI_URL;

export default function useChatApi(chatApiArgs: ChatApiArgs) {
  const status = useAppSelector(getStatusState(chatApiArgs.chatInterface));
  const dispatch = useAppDispatch();
  const { scrollDir, setScrollDir } = useGetScrollDir();
  const { userStatus, act } = useAppSelector(clientStatus);
  const { toast } = useToast();
  const navigate = useNavigate();
  const retry = useAppSelector(retryRequestStatus);

  const setChunkSentCount = useAutoScroll({
    status,
    scrollDir,
  });

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
    // const { messageRemoved } = getMessagesActions(chatApiArgs.chatInterface);
    const statusChanged = getStatusActions(chatInterface);
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
    const body = { userContent: trimmedMessages, act };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    async function streamData() {
      try {
        const response = await fetch(url, requestOptions);
        const decoder = new TextDecoder();
        dispatch(statusChanged('streaming'));

        if (response.status === 401) {
          dispatch(statusChanged('idle'));
          dispatch(clientStatusReset());
          navigate('/login');
          return;
        }

        if (response.status === 429) {
          const data = await response.json();
          toast({ title: 'Error', description: data.message });
          dispatch(statusChanged('error'));

          return;
        }

        if (!response.ok) {
          toast({
            title: 'Error',
            description: `${response.status}: ${response.statusText}. `,
          });

          dispatch(statusChanged('error'));

          return;
        }

        if (response.body) {
          const reader = response.body.getReader();
          let done = false;

          while (!done) {
            const { value, done: readerDone } = await reader.read();

            if (readerDone) {
              done = true;
            } else {
              dispatch(
                messageAppended({
                  id: responseId,
                  content: decoder.decode(value),
                }),
              );

              setChunkSentCount((prev) => prev + 1);
            }
          }

          setChunkSentCount(0);
        }

        dispatch(statusChanged('idle'));
      } catch (error) {
        toast({
          title: 'Error',
          description: getCatchError(error),
        });

        dispatch(statusChanged('error'));
      }
    }

    // This condition is so it doesn't run on first mount
    if (submitCount > 0 || retry > 0) {
      setScrollDir('down');
      dispatch(statusChanged('requesting'));
      streamData();
    }
  }, [
    dispatch,
    setChunkSentCount,
    setScrollDir,
    navigate,
    toast,
    chatApiArgs,
    userStatus,
    act,
    retry,
  ]);
}

function getUrlParams(name: Name) {
  if (name === 'Coding Assistant') return '/ai/codingassistant?model=';
  if (name === 'General Assistant') return '/ai/generalassistant';
  if (name === "Explain Like I'm 5") return '/ai/eli5';
  return '';
}

/* According to OpenAI documentation, 1 token is about 4 characters. 
  This function will be used to decide whether to change model (this only 
  applies to codingassistant since higher context costs more and I can
  only afford to use it on this one) or to cut some of the old messages */
function getTokenEstimate(messages: MessagesParam[]) {
  const combinedMessages = messages.reduce(
    (acc, cur) => (acc += cur.content),
    '',
  );

  return combinedMessages.length / 4;
}

/* Recursively removes the first message object in messages array until the 
entire message history is less than the approximate tokenLimit param. 
This is to avoid getting token limit error. */
function trimMessages({ messages, tokenLimit }: TrimMessages): MessagesParam[] {
  const estimatedTokens = getTokenEstimate(messages);
  if (estimatedTokens < tokenLimit) return messages;
  const trimmedMessages = messages.slice(1);
  return trimMessages({ messages: trimmedMessages, tokenLimit });
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
