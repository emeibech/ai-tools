import { useAppSelector } from '@/app/hooks';
import useSetScrollPosition from '@/common/hooks/useSetScrollPosition';
import { cn } from '@/common/lib/utils';
import ChatInterface from '@/features/chats/ChatInterface';
import ChatMessage from '@/features/chats/ChatMessage';
import { clientStatus } from '@/features/client/clientSlice';
import { nanoid } from '@reduxjs/toolkit';
import { Navigate } from 'react-router-dom';

const id = nanoid();

export default function GeneralAssistant() {
  const { userStatus } = useAppSelector(clientStatus);
  useSetScrollPosition('generalassistant');

  return (
    <main
      className={cn(
        'mt-4 px-2 flex flex-col items-center gap-4 mx-auto',
        'min-[360px]:px-4 lg:px-8 lg:mt-0',
        '2xl:p-12 2xl:py-0',
      )}
    >
      {userStatus === 'user' && (
        <ChatInterface name="General Assistant" route="generalassistant">
          <article className="pt-4">
            <ChatMessage
              id={`assistant-${id}`}
              name="General Assistant"
              initialMessage={true}
            >
              <p>
                Oh, hi. I'm your{' '}
                <strong className="text-accent">General Assistant</strong>, a
                vanilla chatbot that serves as a fallback if none of the tools
                fit your needs.
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
