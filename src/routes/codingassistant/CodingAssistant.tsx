import { cn } from "@/common/lib/utils";
import ChatInterface from "@/features/chatInterface/ChatInterface";
import ChatMessage from "@/features/chatInterface/ChatMessage";

export default function CodingAssistant() {
  return (
    <main
      className={cn(
        "mt-10 px-4 flex flex-col items-center gap-4 mx-auto",
        "min-[320px]:px-4 lg:px-8 lg:mt-0",
        "2xl:p-12 2xl:py-0",
      )}
    >
      <ChatInterface name="Coding Assistant">
        <ChatMessage>What up?</ChatMessage>
      </ChatInterface>
    </main>
  );
}
