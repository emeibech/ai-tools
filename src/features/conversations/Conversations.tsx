import { useMemo, useState } from 'react';
import { Button } from '@/common/components/ui/button';
import { cn, generateKeys, getCatchError } from '@/common/lib/utils';
import {
  getConversationsActions,
  getConversationsState,
} from './conversationsSliceUtils';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Edit3Icon, X } from 'lucide-react';
import ConversationForm from './ConversationForm';
import { useToast } from '@/common/components/ui/use-toast';
import { nanoid } from '@reduxjs/toolkit';
import { getMessagesActions } from '../chats/messagesSliceutils';
import type { ConversationsProps, Message } from '@/types/features';
import { getChatInterface } from './utils';
import { ReqStatus } from '@/types/routes';
import { getLoadMoreActions, getLoadMoreState } from './loadMoreSliceUtils';
import { clientStatusReset } from '../client/clientSlice';
import { useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_SERVER_URL;

export default function Conversations({ name, setIsOpen }: ConversationsProps) {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { conversations } = useAppSelector(getConversationsState(name));
  const [currentlyEditing, setCurrentlyEditing] = useState<number | null>(null);
  const { activeConversation } = useAppSelector(getConversationsState(name));
  const [reqStatus, setReqStatus] = useState<ReqStatus>('idle');
  const { nextPage, lastConversation } = useAppSelector(getLoadMoreState(name));
  const navigate = useNavigate();

  const list = useMemo(() => {
    const { activeConversationSet, conversationRemoved } =
      getConversationsActions(name);
    const { messagesSet } = getMessagesActions(name);

    async function handleClickTitle(id: number) {
      setIsOpen(false);

      try {
        const response = await fetch(
          `${baseUrl}/ai/conversations/messages?conversationid=${id}`,
          {
            method: 'GET',
            credentials: 'include',
          },
        );

        if (response.status === 401 || response.status === 403) {
          dispatch(clientStatusReset());
          navigate('/login');
          toast({
            title: 'Error',
            description:
              'Your has session expired. Please log in again to continue.',
          });

          return;
        }

        if (!response.ok) {
          toast({
            title: 'Error',
            description: 'An error occured while fetching messages',
          });
        }

        const data = await response.json();
        const messages = data.messages.map((item: Message) => {
          return {
            role: item.role,
            content: item.content,
            dbid: item.id,
            id:
              item.role === 'user'
                ? `user-${nanoid()}`
                : `assistant-${nanoid()}`,
          };
        });

        dispatch(messagesSet(messages));
        dispatch(activeConversationSet(id));
      } catch (error) {
        toast({
          title: 'Error',
          description: getCatchError(error),
        });
      }
    }

    async function handleClickDelete(id: number) {
      const { messagesReset } = getMessagesActions(name);
      try {
        const response = await fetch(`${baseUrl}/ai/conversations/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        if (response.status === 401 || response.status === 403) {
          dispatch(clientStatusReset());
          navigate('/login');
          toast({
            title: 'Error',
            description:
              'Your has session expired. Please log in again to continue.',
          });

          return;
        }

        dispatch(conversationRemoved(id));

        if (activeConversation === id) {
          dispatch(activeConversationSet(null));
          dispatch(messagesReset());
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: getCatchError(error),
        });
      }
    }

    function generateListJsx() {
      if (conversations.length === 0) return;
      const keys = generateKeys(conversations);

      const list = conversations.map((item, index) => {
        return (
          <li id={item.id.toString()} key={keys[index]}>
            <div className="grid grid-cols-[5fr_1fr]">
              {currentlyEditing !== item.id && (
                <Button
                  className="py-0 justify-start px-1"
                  variant={'custom'}
                  onClick={() => handleClickTitle(item.id)}
                >
                  <p
                    className={cn(
                      'line-clamp-2 text-start text-xs min-[400px]:text-sm',
                      'hover:underline hover:text-accent',
                      'active:underline active:text-accent',
                      activeConversation === item.id
                        ? 'underline text-accent'
                        : '',
                    )}
                  >
                    {item.title}
                  </p>
                </Button>
              )}

              {currentlyEditing === item.id && (
                <ConversationForm
                  title={item.title}
                  name={name}
                  id={item.id}
                  setCurrentlyEditing={setCurrentlyEditing}
                />
              )}

              <div className="flex items-center justify-center">
                <Button
                  className="h-4 px-0"
                  variant={'custom'}
                  onClick={() => {
                    setCurrentlyEditing(item.id);
                  }}
                >
                  <Edit3Icon height="16px" />
                </Button>
                <Button
                  className="h-4 px-0"
                  variant={'custom'}
                  onClick={() => handleClickDelete(item.id)}
                >
                  <X height="18px" />
                </Button>
              </div>
            </div>
          </li>
        );
      });

      return <>{list}</>;
    }

    return generateListJsx();
  }, [
    dispatch,
    toast,
    navigate,
    setIsOpen,
    conversations,
    currentlyEditing,
    name,
    activeConversation,
  ]);

  async function handleClickLoadMore() {
    try {
      const { conversationAdded } = getConversationsActions(name);
      const { nextPageIncremented, lastConveresationSet } =
        getLoadMoreActions(name);

      setReqStatus('requesting');

      const response = await fetch(
        `${baseUrl}/ai/conversations?chatinterface=${getChatInterface(
          name,
        )}&page=${nextPage}&length=15`,
        { method: 'GET', credentials: 'include' },
      );

      if (response.status === 401 || response.status === 403) {
        setReqStatus('idle');
        dispatch(clientStatusReset());
        navigate('/login');
        toast({
          title: 'Error',
          description:
            'Your has session expired. Please log in again to continue.',
        });

        return;
      }

      if (!response.ok) {
        setReqStatus('error');
        toast({
          title: 'Error',
          description: response.statusText,
        });
      }

      const { conversationData, end } = await response.json();

      if (end) dispatch(lastConveresationSet(true));

      dispatch(conversationAdded(conversationData));
      dispatch(nextPageIncremented());
      setReqStatus('success');
    } catch (error) {
      setReqStatus('error');
      toast({
        title: 'Error',
        description: 'An error occured while fetching conversations.',
      });
    }
  }

  function renderLoadMore() {
    return (
      reqStatus !== 'requesting' &&
      !lastConversation &&
      conversations.length >= 15
    );
  }

  return (
    <section className="mt-4">
      <ul className="grid gap-[10px]">
        {conversations.length === 0 && (
          <p className="text-center text-sm sm:text-base">Wow, such empty.</p>
        )}

        {conversations.length !== 0 && list}
      </ul>

      <div className="text-center mt-6">
        {renderLoadMore() && (
          <Button
            variant={'link'}
            className="h-auto py-1"
            onClick={handleClickLoadMore}
          >
            <strong className="font-medium text-sm">Load more</strong>
          </Button>
        )}

        {reqStatus === 'requesting' && (
          <span className="flex gap-1 justify-center">
            <div
              className={cn(
                'h-2 w-2 rounded-full bg-foreground',
                'animate-bounce',
              )}
            ></div>
            <div
              className={cn(
                'h-2 w-2 rounded-full bg-foreground',
                'animate-bounce delay-150',
              )}
            ></div>
            <div
              className={cn(
                'h-2 w-2 rounded-full bg-foreground',
                'animate-bounce delay-300',
              )}
            ></div>
          </span>
        )}
      </div>
    </section>
  );
}
