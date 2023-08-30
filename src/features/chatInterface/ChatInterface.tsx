import { useRef } from "react";
import { SendIcon } from "@/common/components/ui/Icons";
import { Button } from "@/common/components/ui/button";
import { Textarea } from "@/common/components/ui/textarea";
import { cn } from "@/common/lib/utils";
import useGetScrollDir from "@/common/hooks/useGetScrollDir";
import ChatMessage from "./ChatMessage";

interface ChatInterfaceProps {
  name: string;
}

export default function ChatInterface({ name }: ChatInterfaceProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function adjustTextareaHeight() {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

      const maxHeight = 224;

      if (textareaRef.current.scrollHeight > maxHeight) {
        textareaRef.current.style.overflowY = "auto";
        textareaRef.current.style.height = `${maxHeight}px`;
      } else {
        textareaRef.current.style.overflowY = "hidden";
      }
    }
  }

  function handleChange() {
    adjustTextareaHeight();
  }

  const scrollDirection = useGetScrollDir();

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
      </section>
      <div
        className={cn(
          "grid grid-cols-2 mt-4 bg-background",
          "pb-6 px-4 md:px-20",
          "sticky bottom-0 inset-x-40",
        )}
      >
        <div
          className={cn(
            "col-start-1 col-end-3 row-start-1",
            "bg-field rounded-xl py-2",
          )}
        >
          <Textarea
            className={cn(
              "text-base bg-field border-none focus-visible:ring-0",
              "min-h-[2rem] h-[auto] py-1 pl-4 pr-12 rounded-xl",
              "md:min-h-[2.5rem] md:py-2",
              "overflow-y-auto text resize-none",
            )}
            cols={75}
            rows={1}
            ref={textareaRef}
            onChange={handleChange}
            data-name="textarea"
          />
        </div>

        <div
          className={cn(
            "col-start-2 row-start-1",
            "justify-self-end self-end mr-2 mb-2 z-0",
            "md:mr-2 md:mb-3",
          )}
        >
          <Button
            variant={"custom"}
            size={"custom"}
            className={cn("bg-cyan-500 p-1.5")}
          >
            <SendIcon height="20px" />
          </Button>
        </div>
      </div>
    </section>
  );
}
