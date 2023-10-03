import { ReactNode } from 'react';
import { cn } from '@/common/lib/utils';
import useGetScrollDir from '../scrollDirection/useGetScrollDir';
import ChatMessage from './ChatMessage';
import ChatInterfaceForm from './ChatInterfaceForm';
import { useAppSelector } from '@/app/hooks';
import { getMessagesState } from './messagesSliceutils';

export interface SubmitData {
  name: Name;
  submitCount: number;
  id: string;
  value: string;
}

export type Name =
  | 'Coding Assistant'
  | "Explain Like I'm 5"
  | 'General Assistant'
  | undefined;

interface ChatInterfaceProps {
  name: Name;
  children: ReactNode;
  renderCodeBlocks?: boolean;
}

export interface Messages {
  id: string;
  role: 'assistant' | 'user';
  content: string;
}

export default function ChatInterface({
  name,
  children,
  renderCodeBlocks = false,
}: ChatInterfaceProps) {
  const scrollDirection = useGetScrollDir();
  const msgs = getMessagesState(name);
  const messages = useAppSelector(msgs);

  const listMessages: JSX.Element[] = messages.map((message) => {
    return (
      <ChatMessage
        name={name}
        key={message.id}
        id={message.id}
        renderCodeBlocks={renderCodeBlocks}
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

      <ChatInterfaceForm name={name} />
    </section>
  );
}
