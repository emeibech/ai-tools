import { useMemo } from 'react';
import { cn } from '@/common/lib/utils';
import ChatMessage from './ChatMessage';
import ChatInterfaceForm from './ChatInterfaceForm';
import { useAppSelector } from '@/app/hooks';
import { getMessagesState } from './messagesSliceutils';
import type { ChatInterfaceProps } from '@/types/features';
import useFetchConversations from '../conversations/useFetchConversations';
import useQueueManager from '../conversations/useQueueManager';
import { currentRoute } from '../currentRoute/currentRouteSlice';

export default function ChatInterface({
  name,
  route,
  children,
  renderCodeBlocks = false,
}: ChatInterfaceProps) {
  const msgs = getMessagesState(name);
  const messages = useAppSelector(msgs);
  const selectedRoute = useAppSelector(currentRoute);

  useFetchConversations(name);
  useQueueManager(name);
  const listMessages: JSX.Element[] = useMemo(
    () =>
      messages.map((message, index) => {
        return (
          <ChatMessage
            dbid={message.dbid}
            name={name}
            key={message.id}
            id={message.id}
            renderCodeBlocks={renderCodeBlocks}
            requestIndicator={
              selectedRoute === route && index === messages.length - 1
            }
          >
            {message.content}
          </ChatMessage>
        );
      }),
    [messages, name, route, selectedRoute, renderCodeBlocks],
  );

  return (
    <section className={cn('max-w-[1440px]')}>
      <div className={cn('max-w-[876px] mx-auto relative')}>
        <article className="svh">
          {children}
          {listMessages}
        </article>

        <ChatInterfaceForm name={name} />
      </div>
    </section>
  );
}
