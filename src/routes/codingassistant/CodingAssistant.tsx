import { useAppSelector } from '@/app/hooks';
import useSetScrollPosition from '@/common/hooks/useSetScrollPosition';
import { cn } from '@/common/lib/utils';
import ChatInterface from '@/features/chats/ChatInterface';
import ChatMessage from '@/features/chats/ChatMessage';
import { clientStatus } from '@/features/client/clientSlice';
import { nanoid } from '@reduxjs/toolkit';
import { Navigate } from 'react-router-dom';

const id = nanoid();

export default function CodingAssistant() {
  const { userStatus } = useAppSelector(clientStatus);
  useSetScrollPosition('codingassistant');
  return (
    <main
      className={cn(
        'mt-4 px-2 flex flex-col items-center gap-4 mx-auto',
        'min-[360px]:px-4 lg:px-8 lg:mt-0',
        '2xl:p-12 2xl:py-0',
      )}
    >
      {userStatus === 'user' && (
        <ChatInterface
          name="Coding Assistant"
          route="codingassistant"
          renderCodeBlocks
        >
          <article className="pt-4">
            <ChatMessage
              id={`assistant-${id}`}
              name="Coding Assistant"
              initialMessage={true}
            >
              <p>
                Oh, hi. I'm your{' '}
                <strong className="text-accent">Coding Assistant</strong>, a
                chatbot designed to answer programming questions, generate code,
                and provide suggestions or recommendations.
              </p>

              <p className="mt-4">How can I assist you today?</p>
            </ChatMessage>
          </article>
        </ChatInterface>
      )}

      {userStatus === 'guest' && <Navigate to={'/login'} replace={true} />}
    </main>
  );
}
