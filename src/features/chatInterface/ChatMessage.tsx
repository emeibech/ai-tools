import { Button } from "@/common/components/ui/button";
import { cn } from "@/common/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Delete } from "lucide-react";
import { ReactNode } from "react";
import chatBot from "./imgs/chatbot.png";

interface ChatMessageProps {
  children: ReactNode;
}

export default function ChatMessage({ children }: ChatMessageProps) {
  return (
    <article
      className={cn(
        " min-h-[120px] min-w-full py-4",
        "grid grid-cols-[40px_1fr]",
        "min-[375px]:grid-cols-[40px_1fr_24px]",
      )}
    >
      <Avatar className=" justify-self-center">
        <AvatarImage src={chatBot} className="bg-accent rounded-full" />
        <AvatarFallback>AI</AvatarFallback>
      </Avatar>

      <p className={cn(" px-2 text-sm", "min-[375px]:text-base sm:px-6")}>
        {children}
      </p>

      <div
        className={cn(
          " col-span-2 row-span-1 justify-self-end self-center mt-4",
          "min-[375px]:col-span-1 min-[375px]:self-start min-[375px]:mt-0",
        )}
      >
        <Button
          variant={"custom"}
          size={"custom"}
          className="text-muted-foreground"
        >
          <Delete height="18px" />
        </Button>
      </div>
    </article>
  );
}
