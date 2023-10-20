import useSetScrollPosition from '@/common/hooks/useSetScrollPosition';
import { cn } from '@/common/lib/utils';
import ChatInterface from '@/features/chats/ChatInterface';
import ChatMessage from '@/features/chats/ChatMessage';
import { nanoid } from '@reduxjs/toolkit';

const id = nanoid();

export default function CodingAssistant() {
  useSetScrollPosition('eli5');
  return (
    <main
      className={cn(
        'mt-10 px-4 flex flex-col items-center gap-4 mx-auto',
        'min-[320px]:px-4 lg:px-8 lg:mt-0',
        '2xl:p-12 2xl:py-0',
      )}
    >
      <ChatInterface name="Explain Like I'm 5">
        <article className="pt-4">
          <ChatMessage
            id={`assistant-${id}`}
            name="Explain Like I'm 5"
            initialMessage={true}
          >
            <p>Oh, hi!</p>

            <p className="mt-4">
              I'm your ELI5 assistant, a chatbot designed to explain stuff in
              layperson's terms using simple analogies.
            </p>

            <p className="mt-4">What do you want to know?</p>
          </ChatMessage>
        </article>
      </ChatInterface>
    </main>
  );
}
