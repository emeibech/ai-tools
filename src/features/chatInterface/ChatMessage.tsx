import { Button } from '@/common/components/ui/button';
import { cn } from '@/common/lib/utils';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { MinusCircle } from 'lucide-react';
import { ReactNode, forwardRef } from 'react';
import chatBot from './imgs/chatbot.png';
import { Separator } from '@/common/components/ui/separator';
import Code from './Code';

interface ChatMessageProps {
  children: ReactNode;
}

function formatMessage(message: ReactNode): JSX.Element {
  const messageString = `${message}`;
  const codeBlocks = messageString.split('```');

  const formattedMessage = codeBlocks.map((block, index) => {
    if (index % 2 === 0) {
      return <p key={`text-${index}`}>{block}</p>;
    } else {
      return <Code key={`code-${index}`} code={block} />;
    }
  });

  return <>{formattedMessage}</>;
}

const ChatMessage = forwardRef<HTMLElement, ChatMessageProps>(
  ({ children }, ref) => {
    return (
      <>
        <article
          ref={ref}
          className={cn(
            'min-h-[120px] min-w-full py-6',
            'grid grid-cols-[32px_1fr]',
            'min-[375px]:grid-cols-[40px_1fr_16px]',
          )}
        >
          <Avatar className=" justify-self-center py-4">
            <AvatarImage src={chatBot} className="bg-accent rounded-full" />
          </Avatar>

          <div
            className={cn(
              'px-2 py-4 text-sm overflow-auto whitespace-pre-wrap',
              'min-[375px]:text-base sm:px-6',
            )}
          >
            {formatMessage(children)}
          </div>

          <div
            className={cn(
              ' col-span-2 row-span-1 justify-self-end self-center max-h-[1rem]',
              'min-[375px]:col-span-1 min-[375px]:self-start',
            )}
          >
            <Button
              variant={'custom'}
              size={'custom'}
              className={cn(
                'text-muted-foreground opacity-75',
                'hover:text-destructive active:text-destructive',
              )}
            >
              <MinusCircle width="16px" height="16px" />
            </Button>
          </div>
        </article>

        <Separator />
      </>
    );
  },
);

export default ChatMessage;
