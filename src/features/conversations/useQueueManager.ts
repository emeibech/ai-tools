import { useEffect, useMemo } from 'react';
import type { Name } from '@/types/features';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  getConversationsActions,
  getConversationsState,
} from './conversationsSliceUtils';
import {
  getMessagesActions,
  getMessagesState,
} from '../chats/messagesSliceutils';
import { getChatInterface } from './utils';
import { clientStatus } from '../client/clientSlice';
import { useToast } from '@/common/components/ui/use-toast';
import { getCatchError } from '@/common/lib/utils';

const baseUrl = import.meta.env.VITE_AI_URL;

export default function useQueueManager(name: Name) {
  console.log('useQueueManager');
  const messages = useAppSelector(getMessagesState(name));
  const dispatch = useAppDispatch();
  const client = useAppSelector(clientStatus);
  const { toast } = useToast();
  const { addMsgQ, activeConversation } = useAppSelector(
    getConversationsState(name),
  );

  const msgsToBePushed = useMemo(() => {
    return addMsgQ.map((id) => {
      const message = messages.find((item) => item.id === id);
      return { role: message?.role, content: message?.content };
    });
  }, [addMsgQ, messages]);

  useEffect(() => {
    const date = new Date();
    const { dbidAdded } = getMessagesActions(name);
    const {
      addQCleared,
      activeConversationSet,
      conversationAdded,
      conversationMovedToTop,
    } = getConversationsActions(name);

    async function pushToDb() {
      try {
        let conversationId = activeConversation;

        if (activeConversation === null) {
          try {
            const titleResponse = await fetch(`${baseUrl}/ai/titlecreator`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ userContent: msgsToBePushed }),
            });

            const data = await titleResponse.json();

            const body = {
              chatInterface: getChatInterface(name),
              title:
                data.message ||
                `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
            };

            const requestOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: client.act ?? '',
              },
              body: JSON.stringify(body),
            };

            const response = await fetch(
              `${baseUrl}/ai/conversations`,
              requestOptions,
            );

            if (!response.ok) {
              toast({
                title: 'Error',
                description: `${response.status}: ${response.statusText}`,
              });
            }

            const { conversation } = await response.json();
            conversationId = conversation.id;
            dispatch(conversationAdded([conversation]));
            dispatch(activeConversationSet(conversation.id));
          } catch (error) {
            toast({
              title: 'Error',
              description: getCatchError(error),
            });
          }
        }

        dispatch(conversationMovedToTop(Number(conversationId)));

        const body = { messages: msgsToBePushed };
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: client.act ?? '',
          },
          body: JSON.stringify(body),
        };

        const response = await fetch(
          `${baseUrl}/ai/conversations/messages?conversationid=${conversationId}`,
          requestOptions,
        );

        if (!response.ok)
          toast({ title: 'Error', description: response.statusText });

        const { ids } = await response.json();

        ids.forEach((dbid: number, index: number) => {
          dispatch(dbidAdded({ id: addMsgQ[index], dbid }));
        });

        fetch(`${baseUrl}/ai/conversations/${conversationId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: client.act ?? '',
          },
          body: JSON.stringify({ lastUpdated: Date.now() }),
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: getCatchError(error),
        });
      }
    }

    if (addMsgQ.length > 0) {
      try {
        pushToDb();
        dispatch(addQCleared());
      } catch (error) {
        toast({
          title: 'Error',
          description: getCatchError(error),
        });
      }
    }
  }, [
    dispatch,
    toast,
    name,
    addMsgQ,
    msgsToBePushed,
    activeConversation,
    client,
  ]);
}
