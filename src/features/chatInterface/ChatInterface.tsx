import { useRef } from "react";
import { SendIcon } from "@/common/components/ui/Icons";
import { Button } from "@/common/components/ui/button";
import { Textarea } from "@/common/components/ui/textarea";
import { cn } from "@/common/lib/utils";

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

  return (
    <section className="relative w-[100%]">
      <div className="sticky top-10 lg:top-0 py-1 bg-background">
        <h2
          className={cn(
            "sm:text-2xl font-medium min-w-full text-center",
            "py-2 bg-muted rounded-xl",
          )}
        >
          {name}
        </h2>
      </div>

      <section className={cn("min-h-[85vh] min-w-full")}></section>
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
            "justify-self-end self-end mr-2 mb-2",
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
