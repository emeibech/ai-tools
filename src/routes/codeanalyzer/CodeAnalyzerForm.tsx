import { useRef, useState } from "react";
import { Textarea } from "@/common/components/ui/textarea";
import { Button } from "@/common/components/ui/button";
import { SendIcon } from "@/common/components/ui/Icons";
import { cn } from "@/common/lib/utils";

export default function CodeAnalyzerForm() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const codeRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    console.log(codeRef.current?.value);
    codeRef.current!.value = "";
    setIsButtonDisabled(true);
  }

  function handleInputChange() {
    const inputLength = codeRef.current?.value.length ?? 0;
    setIsButtonDisabled(inputLength <= 4 || inputLength >= 5001);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-2 relative">
      <Textarea
        onChange={handleInputChange}
        ref={codeRef}
        rows={10}
        cols={100}
        className="resize-none"
        wrap="hard"
      />
      <p className="text-sm text-muted-foreground">Character limit: 5 - 5000</p>
      <Button
        disabled={isButtonDisabled}
        size={"custom"}
        variant={"custom"}
        className={cn(
          "bg-cyan-500 p-2",
          "justify-self-end max-w-max",
          "absolute bottom-9 right-2",
          "transition-color transition-opacity duration-300",
        )}
      >
        <SendIcon height="18px" />
      </Button>
    </form>
  );
}
