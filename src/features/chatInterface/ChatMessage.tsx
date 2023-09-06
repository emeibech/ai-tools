import { Button } from "@/common/components/ui/button";
import { cn } from "@/common/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { MinusCircle } from "lucide-react";
import { ReactNode, forwardRef } from "react";
import chatBot from "./imgs/chatbot.png";
import { Separator } from "@/common/components/ui/separator";

interface ChatMessageProps {
  children: ReactNode;
}

const ChatMessage = forwardRef<HTMLElement, ChatMessageProps>(
  ({ children }, ref) => {
    return (
      <>
        <article
          ref={ref}
          className={cn(
            " min-h-[120px] min-w-full py-6",
            "grid grid-cols-[32px_1fr]",
            "min-[375px]:grid-cols-[40px_1fr_16px]",
          )}
        >
          <Avatar className=" justify-self-center py-4">
            <AvatarImage src={chatBot} className="bg-accent rounded-full" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>

          <p
            className={cn(
              " px-2 py-4 text-sm overflow-auto",
              "min-[375px]:text-base sm:px-6",
            )}
          >
            {children}
          </p>

          <div
            className={cn(
              " col-span-2 row-span-1 justify-self-end self-center max-h-[1rem]",
              "min-[375px]:col-span-1 min-[375px]:self-start",
            )}
          >
            <Button
              variant={"custom"}
              size={"custom"}
              className={cn(
                "text-muted-foreground opacity-75",
                "hover:text-destructive active:text-destructive",
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
