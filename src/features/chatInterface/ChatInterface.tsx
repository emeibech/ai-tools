import { useState } from "react";
import { cn, generateKeys } from "@/common/lib/utils";
import useGetScrollDir from "@/common/hooks/useGetScrollDir";
import ChatMessage from "./ChatMessage";
import ChatInterfaceForm from "./ChatInterfaceForm";

interface ChatInterfaceProps {
  name: string;
  initialMessage: string;
}

export interface Messages {
  id: string;
  role: "assistant" | "user";
  content: string;
}

export default function ChatInterface({ name }: ChatInterfaceProps) {
  const scrollDirection = useGetScrollDir();
  const [messages, setMessages] = useState<Messages[]>([]);
  const messagesKeys = generateKeys(messages);

  const listMessages = messages.map((message, index) => (
    <ChatMessage key={messagesKeys[index]} data-id={messagesKeys[index]}>
      ID: {message.id}
      <br />
      <br />
      Message: {message.content}
    </ChatMessage>
  ));

  return (
    <section className="relative max-w-[1024px]">
      <div
        className={cn(
          scrollDirection === "down" ? "-translate-y-full" : "-translate-y-0",
          "sticky top-10 lg:top-0 py-1 bg-background z-10 border-b",
          "transition-transform duration-300",
        )}
      >
        <h2 className={cn("sm:text-2xl font-medium min-w-full text-center")}>
          {name}
        </h2>
      </div>

      <section className={cn("min-h-[85vh] max-w-[768px] mx-auto")}>
        <ChatMessage>
          The Snake and the Farmer: This story often attributed to Lincoln
          involves a farmer who found a frozen snake and brought it home. After
          reviving the snake by the fire, it bit the farmer's wife. When the
          farmer asked why, the snake replied, "You knew I was a snake when you
          picked me up." Lincoln used this story to illustrate the dangers of
          trusting those who have shown themselves to be untrustworthy.
        </ChatMessage>
        <ChatMessage>
          The Judge's Ruling: Lincoln would tell a story about a judge who made
          a confusing and contradictory ruling in a case. When asked about it,
          the judge replied, "I have a right to change my mind; I'm not a bound
          man." Lincoln used this story to highlight the importance of
          consistency and fairness in judgment.
        </ChatMessage>
        <ChatMessage>
          The Dog's Tail: Lincoln would tell a tale about a man who had his
          dog's tail cut off bit by bit each day, thinking it wouldn't hurt the
          dog as much as cutting it all at once. Lincoln used this story to
          discuss the issue of slavery, comparing it to the gradual abolition of
          the institution.
        </ChatMessage>
        <ChatMessage>
          The Two-Faced Calf: Lincoln often told a humorous story about a farmer
          who had a two-faced calf—one head at each end. When visitors asked how
          it ate, the farmer replied, "I don't rightly know, but it gets there."
          Lincoln used this story to humorously illustrate the idea that the
          country would get through its challenges, even if things seemed odd or
          difficult.
        </ChatMessage>
        <ChatMessage>
          The Misplaced Knife: Lincoln would recount a story about a man who
          claimed his knife had the same blade for 40 years, having only
          replaced the handle 10 times and the blade 5 times. He used this story
          to talk about change and how sometimes what's essential remains even
          if the outward appearance changes.
        </ChatMessage>
        <ChatMessage>
          The Borrowed Ax: Lincoln would share a story about a man who borrowed
          his neighbor's ax and ended up breaking it. Instead of denying
          responsibility, he admitted to it and offered to either fix or replace
          the ax. This story exemplified Lincoln's belief in honesty and taking
          responsibility for one's actions.
        </ChatMessage>
        {listMessages}
      </section>

      <ChatInterfaceForm messages={messages} setMessages={setMessages} />
    </section>
  );
}
