import { Button } from '@/common/components/ui/button';
import { cn, getCatchError } from '@/common/lib/utils';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { MinusCircle } from 'lucide-react';
import { forwardRef } from 'react';
import chatBot from './imgs/chatbot.png';
import friend from './imgs/friend.png';
import { Separator } from '@/common/components/ui/separator';
import { AvatarFallback } from '@/common/components/ui/avatar';
import { getMessagesActions } from './messagesSliceutils';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { CodeHighlighter } from './CodeHighlighter';
import type { MouseEvent } from 'react';
import type { ChatMessageProps } from '@/types/features';
import RequestIndicator from '../requestStatus/RequestIndicator';
import { getStatusState } from '../requestStatus/requestStatusSlicesUtils';
import { clientStatusReset } from '../client/clientSlice';
import { useToast } from '@/common/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_SERVER_URL;

const ChatMessage = forwardRef<HTMLElement, ChatMessageProps>(
  (
    {
      children,
      name,
      id,
      dbid = undefined,
      renderCodeBlocks = false,
      initialMessage = false,
      requestIndicator = false,
    },
    ref,
  ) => {
    const dispatch = useAppDispatch();
    const { messageRemoved } = getMessagesActions(name);
    const requestStatus = useAppSelector(getStatusState(name));
    const { toast } = useToast();
    const navigate = useNavigate();

    async function handleClick(event: MouseEvent<HTMLButtonElement>) {
      const id = event.currentTarget.id;
      const dbid = event.currentTarget.getAttribute('data-dbid');
      dispatch(messageRemoved({ id }));

      if (dbid) {
        try {
          const response = await fetch(
            `${baseUrl}/ai/conversations/messages/${dbid}`,
            {
              method: 'DELETE',
              credentials: 'include',
            },
          );

          if (response.status === 401 || response.status === 403) {
            dispatch(clientStatusReset());
            navigate('/login');
            toast({
              title: 'Error',
              description:
                'Session has expired. Please log in again to continue.',
            });

            return;
          }

          if (!response.ok) {
            toast({
              title: 'Error',
              description: `${response.status}: ${response.statusText}. `,
            });
          }
        } catch (error) {
          toast({
            title: 'Error',
            description: getCatchError(error),
          });
        }
      }
    }

    return (
      <>
        <article
          id={id}
          data-dbid={dbid}
          ref={ref}
          className={cn(
            'min-h-[120px] min-w-full py-6',
            'grid grid-cols-[32px_1fr]',
            'min-[360px]:grid-cols-[32px_1fr_16px]',
            'min-[420px]:grid-cols-[40px_1fr_16px]',
          )}
        >
          {displayAvatar(id)}

          <div
            className={cn(
              'px-2 py-4 text-sm overflow-auto whitespace-pre-wrap',
              'min-[420px]:text-lg sm:px-6',
            )}
          >
            {renderCodeBlocks && (
              <CodeHighlighter name={requestIndicator ? name : undefined}>
                {children}
              </CodeHighlighter>
            )}

            {!renderCodeBlocks && (
              <>
                {children}
                {requestIndicator && <RequestIndicator name={name} />}
              </>
            )}
          </div>

          <div
            className={cn(
              ' col-span-2 row-span-1 justify-self-end self-center max-h-[1rem]',
              'min-[360px]:col-span-1 min-[360px]:self-start',
            )}
          >
            {!initialMessage && (
              <Button
                data-dbid={dbid}
                onClick={handleClick}
                id={id}
                variant={'custom'}
                size={'custom'}
                className={cn(
                  'text-muted-foreground opacity-75',
                  'hover:text-destructive active:text-destructive',
                )}
                disabled={
                  requestStatus === 'requesting' ||
                  requestStatus === 'streaming'
                }
              >
                <MinusCircle width="16px" height="16px" />
              </Button>
            )}
          </div>
        </article>

        <Separator />
      </>
    );
  },
);

function displayAvatar(id: string) {
  if (!id) return;

  const idSlice = id.slice(0, 4);

  if (idSlice === 'user')
    return (
      <Avatar className="justify-self-center py-4 text-center">
        <AvatarImage
          src={friend}
          height="40px"
          width="40px"
          className="bg-accent rounded-full"
        />
        <AvatarFallback
          className={cn(
            'bg-accent rounded-full w-8 h-8',
            'text-sm font-medium text-background',
            'min-[420px]:w-10 min-[420px]:h-10',
          )}
        >
          User
        </AvatarFallback>
      </Avatar>
    );

  return (
    <Avatar className="justify-self-center py-4 text-center">
      <AvatarImage
        src={chatBot}
        height="40px"
        width="40px"
        className="bg-accent rounded-full"
      />
      <AvatarFallback
        className={cn(
          'bg-accent rounded-full w-8 h-8',
          'text-sm font-medium text-background',
          'min-[420px]:w-10 min-[420px]:h-10',
        )}
      >
        AI
      </AvatarFallback>
    </Avatar>
  );
}

export default ChatMessage;
