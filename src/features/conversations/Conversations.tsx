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
import { clientStatus } from '../client/clientSlice';
import { nanoid } from '@reduxjs/toolkit';
import { getMessagesActions } from '../chats/messagesSliceutils';
import type { ConversationsProps, Message } from '@/types/features';

const baseUrl = import.meta.env.VITE_AI_URL;

export default function Conversations({ name, setIsOpen }: ConversationsProps) {
  const { conversations } = useAppSelector(getConversationsState(name));
  const [currentlyEditing, setCurrentlyEditing] = useState<number | null>(null);
  const { act } = useAppSelector(clientStatus);
  const { activeConversation } = useAppSelector(getConversationsState(name));
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const list = useMemo(() => {
    async function handleClick(id: number) {
      setIsOpen(false);

      try {
        const { activeConversationSet } = getConversationsActions(name);
        const { messagesSet } = getMessagesActions(name);

        const requestOptions = {
          method: 'GET',
          headers: {
            Authorization: act ?? '',
          },
        };

        const response = await fetch(
          `${baseUrl}/ai/conversations/messages?conversationid=${id}`,
          requestOptions,
        );

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
            dbit: item.id,
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
                  onClick={() => handleClick(item.id)}
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
                <Button className="h-4 px-0" variant={'custom'}>
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
    setIsOpen,
    conversations,
    currentlyEditing,
    name,
    act,
    activeConversation,
  ]);

  return (
    <section>
      <ul className="grid gap-2">
        {conversations.length === 0 && (
          <p className="text-center text-sm sm:text-base">Wow, such empty.</p>
        )}

        {conversations.length !== 0 && list}
      </ul>
    </section>
  );
}
