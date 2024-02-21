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
import { clientStatus, clientStatusReset } from '../client/clientSlice';
import { useToast } from '@/common/components/ui/use-toast';
import { getCatchError } from '@/common/lib/utils';
import { useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_SERVER_URL;

export default function useQueueManager(name: Name) {
  const { messages } = useAppSelector(getMessagesState(name));
  const dispatch = useAppDispatch();
  const client = useAppSelector(clientStatus);
  const { toast } = useToast();
  const navigate = useNavigate();
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
            const titleRes = await fetch(`${baseUrl}/ai/titlecreator`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userContent: msgsToBePushed }),
              credentials: 'include',
            });

            if (titleRes.status === 401 || titleRes.status === 403) {
              dispatch(clientStatusReset());
              navigate('/login');
              toast({
                title: 'Error',
                description:
                  'Session has expired. Please log in again to continue.',
              });

              return;
            }

            const data = await titleRes.json();

            const body = {
              chatInterface: getChatInterface(name),
              title:
                data.message ||
                `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
            };

            const conversationsRes = await fetch(
              `${baseUrl}/ai/conversations`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
                credentials: 'include',
              },
            );

            const { status, statusText } = conversationsRes;

            if (status === 401 || status === 403) {
              dispatch(clientStatusReset());
              navigate('/login');
              toast({
                title: 'Error',
                description:
                  'Session has expired. Please log in again to continue.',
              });

              return;
            }

            if (!conversationsRes.ok) {
              toast({
                title: 'Error',
                description: `${status}: ${statusText}`,
              });
            }

            const { conversation } = await conversationsRes.json();
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

        const response = await fetch(
          `${baseUrl}/ai/conversations/messages?conversationid=${conversationId}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            credentials: 'include',
          },
        );

        if (response.status === 401 || response.status === 403) {
          dispatch(clientStatusReset());
          navigate('/login');
          toast({
            title: 'Error',
            description:
              'Session has expired. Please log in again to continue.',
          });

          return;
        }

        if (!response.ok) {
          toast({ title: 'Error', description: response.statusText });
        }

        const { ids } = await response.json();

        ids.forEach((dbid: number, index: number) => {
          dispatch(dbidAdded({ id: addMsgQ[index], dbid }));
        });

        const patchRes = await fetch(
          `${baseUrl}/ai/conversations/${conversationId}`,
          {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lastUpdated: Date.now() }),
            credentials: 'include',
          },
        );

        if (patchRes.status === 401 || patchRes.status === 403) {
          dispatch(clientStatusReset());
          navigate('/login');
          toast({
            title: 'Error',
            description:
              'Session has expired. Please log in again to continue.',
          });

          return;
        }

        if (!patchRes.ok) {
          toast({ title: 'Error', description: patchRes.statusText });
        }
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
    navigate,
    name,
    addMsgQ,
    msgsToBePushed,
    activeConversation,
    client,
  ]);
}
