import { ReactNode, useState } from 'react';
import { cn, generateKeys } from '@/common/lib/utils';
import useGetScrollDir from '@/common/hooks/useGetScrollDir';
import ChatMessage from './ChatMessage';
import ChatInterfaceForm from './ChatInterfaceForm';
import useScrollToNewMessage from '@/common/hooks/useScrollToNewMessage';

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
  const [messages, setMessages] = useState<Messages[]>([]);
  const messagesKeys = generateKeys(messages);
  const getMap = useScrollToNewMessage(messages);

  const listMessages: JSX.Element[] = messages.map((message, index) => {
    return (
      <ChatMessage
        key={messagesKeys[index]}
        data-id={messagesKeys[index]}
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
          'transition-transform duration-300'
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

      <ChatInterfaceForm messages={messages} setMessages={setMessages} />
    </section>
  );
}
