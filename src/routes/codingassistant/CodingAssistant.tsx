import useSetScrollPosition from '@/common/hooks/useSetScrollPosition';
import { cn } from '@/common/lib/utils';
import ChatInterface from '@/features/chats/ChatInterface';
import ChatMessage from '@/features/chats/ChatMessage';
import { nanoid } from '@reduxjs/toolkit';

const id = nanoid();

export default function CodingAssistant() {
  useSetScrollPosition('codingassistant');
  return (
    <main
      className={cn(
        'mt-10 px-4 flex flex-col items-center gap-4 mx-auto',
        'min-[320px]:px-4 lg:px-8 lg:mt-0',
        '2xl:p-12 2xl:py-0',
      )}
    >
      <ChatInterface name="Coding Assistant" renderCodeBlocks>
        <ChatMessage id={`assistant-${id}`} name="Coding Assistant">
          What up?
        </ChatMessage>
      </ChatInterface>
    </main>
  );
}
