import { useEffect } from 'react';
import { getCatchError, removeIds } from '@/common/lib/utils';
import { getMessagesActions } from '@/features/chats/messagesSliceutils';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import useAutoScroll from '@/common/hooks/useAutoScroll';
import useGetScrollDir from '@/common/hooks/useGetScrollDir';
import {
  getStatusActions,
  getStatusState,
} from '../requestStatus/requestStatusSlicesUtils';
import { clientStatusReset } from '@/features/client/clientSlice';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/common/components/ui/use-toast';
import { getConversationsActions } from '../conversations/conversationsSliceUtils';
import type {
  ChatApiArgs,
  MessagesParam,
  Name,
  TrimMessages,
} from '@/types/features';

const baseUrl = import.meta.env.VITE_SERVER_URL;

export default function useChatApi(chatApiArgs: ChatApiArgs) {
  const status = useAppSelector(getStatusState(chatApiArgs.chatInterface));
  const dispatch = useAppDispatch();
  const { scrollDir, setScrollDir } = useGetScrollDir();
  const { toast } = useToast();
  const navigate = useNavigate();

  const setChunkSentCount = useAutoScroll({
    status,
    scrollDir,
  });

  useEffect(() => {
    const { chatInterface, prompt, chatHistory, model, assistantId, userId } =
      chatApiArgs;
    const { messageAppended } = getMessagesActions(chatInterface);
    const statusChanged = getStatusActions(chatInterface);
    const { msgPushedToAddQ } = getConversationsActions(chatInterface);
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

    const url = `${baseUrl}${getUrlParams(chatInterface)}${model}`;
    const body = { userContent: trimmedMessages };

    async function streamData() {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          credentials: 'include',
        });
        const decoder = new TextDecoder();
        dispatch(statusChanged('streaming'));

        if (response.status === 401 || response.status === 403) {
          dispatch(statusChanged('idle'));
          dispatch(clientStatusReset());
          navigate('/login');
          toast({
            title: 'Error',
            description:
              'Session has expired. Please log in again to continue.',
          });

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
                  id: assistantId,
                  content: decoder.decode(value),
                }),
              );

              setChunkSentCount((prev) => prev + 1);
            }
          }

          setChunkSentCount(0);
        }

        dispatch(statusChanged('idle'));
        dispatch(msgPushedToAddQ([userId, assistantId]));
      } catch (error) {
        toast({
          title: 'Error',
          description: getCatchError(error),
        });

        dispatch(statusChanged('error'));
      }
    }

    // This condition is so it doesn't run on first mount
    if (status === 'requesting') {
      requestAnimationFrame(() => setScrollDir('down'));
      streamData();
    }
  }, [
    dispatch,
    setChunkSentCount,
    setScrollDir,
    navigate,
    toast,
    chatApiArgs,
    status,
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

// function getModel({ chatInterface, tokenEstimate }: GetModelParams) {
//   if (chatInterface === 'Coding Assistant') {
//     return tokenEstimate > 3000 ? 'gpt-3.5-turbo-16k' : 'gpt-3.5-turbo';
//   }

//   return '';
// }
