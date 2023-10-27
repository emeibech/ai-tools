import { cn } from '@/common/lib/utils';
import ChatMessage from './ChatMessage';
import ChatInterfaceForm from './ChatInterfaceForm';
import { useAppSelector } from '@/app/hooks';
import { getMessagesState } from './messagesSliceutils';
import type { ChatInterfaceProps } from '@/types/features';

export default function ChatInterface({
  name,
  children,
  renderCodeBlocks = false,
}: ChatInterfaceProps) {
  const msgs = getMessagesState(name);
  const messages = useAppSelector(msgs);

  const listMessages: JSX.Element[] = messages.map((message, index) => {
    return (
      <ChatMessage
        name={name}
        key={message.id}
        id={message.id}
        renderCodeBlocks={renderCodeBlocks}
        requestIndicator={index === messages.length - 1}
      >
        {message.content}
      </ChatMessage>
    );
  });

  return (
    <section className="relative max-w-[1280px]">
      <section className={cn('min-h-[85vh] max-w-[90ch] mx-auto')}>
        {children}
        {listMessages}
      </section>

      <ChatInterfaceForm name={name} />
    </section>
  );
}
