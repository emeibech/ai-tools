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
        <article className="pt-4">
          <ChatMessage
            id={`assistant-${id}`}
            name="Coding Assistant"
            initialMessage={true}
          >
            <p>
              Oh, hi! I'm a chatbot designed to answer programming questions,
              generate code, and provide suggestions or recommendations.
            </p>

            <p className="mt-4">How can I assist you today?</p>
          </ChatMessage>
        </article>
      </ChatInterface>
    </main>
  );
}
