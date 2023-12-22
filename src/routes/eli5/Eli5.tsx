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
  useSetScrollPosition('eli5');
  return (
    <main
      className={cn(
        'mt-4 px-2 flex flex-col items-center gap-4 mx-auto',
        'min-[360px]:px-4 lg:px-8 lg:mt-0',
        '2xl:p-12 2xl:py-0',
      )}
    >
      {userStatus === 'user' && (
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
      )}

      {userStatus === 'guest' && <Navigate to={'/login'} replace={true} />}
    </main>
  );
}
