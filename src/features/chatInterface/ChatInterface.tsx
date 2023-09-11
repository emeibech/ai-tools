import { ReactNode } from 'react';
import { cn } from '@/common/lib/utils';
import useGetScrollDir from '@/common/hooks/useGetScrollDir';
import ChatMessage from './ChatMessage';
import ChatInterfaceForm from './ChatInterfaceForm';
import useScrollToNewMessage from '@/common/hooks/useScrollToNewMessage';
import { useAppSelector } from '@/app/hooks';
import { messages as msgs } from '../messages/messagesSlice';

interface ChatInterfaceProps {
  name: string;
  children: ReactNode;
}

export interface Messages {
  id: string;
  role: 'assistant' | 'user';
  content: string;
}

export default function ChatInterface({ name, children }: ChatInterfaceProps) {
  const scrollDirection = useGetScrollDir();
  const messages = useAppSelector(msgs);
  const { getMap, scrollToId } = useScrollToNewMessage();

  const listMessages: JSX.Element[] = messages.map((message) => {
    return (
      <ChatMessage
        key={message.id}
        id={message.id}
        ref={(node: HTMLElement | null) => {
          const map = getMap();
          if (node) {
            map.set(message.id, node);
          } else {
            map.delete(message.id);
          }
        }}
      >
        {message.content}
      </ChatMessage>
    );
  });

  return (
    <section className="relative max-w-[1280px]">
      <div
        className={cn(
          scrollDirection === 'down' ? '-translate-y-full' : '-translate-y-0',
          'sticky top-10 lg:top-0 py-1 bg-background z-10 border-b',
          'transition-transform duration-300',
        )}
      >
        <h2 className={cn('sm:text-2xl font-medium min-w-full text-center')}>
          {name}
        </h2>
      </div>

      <section className={cn('min-h-[85vh] max-w-[90ch] mx-auto')}>
        {children}
        {listMessages}
      </section>

      <ChatInterfaceForm scrollToId={scrollToId} />
    </section>
  );
}
