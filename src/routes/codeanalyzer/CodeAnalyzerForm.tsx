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
    setIsButtonDisabled(inputLength <= 4);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-2 relative">
      <Textarea
        onChange={handleInputChange}
        ref={codeRef}
        placeholder="Put your code here"
        rows={12}
        cols={100}
        className="resize-none"
      />
      <Button
        disabled={isButtonDisabled}
        variant={"ghost"}
        className={cn(
          "justify-self-end max-w-max px-2.5 rounded-full",
          "absolute bottom-3 right-3",
          "transition-color transition-opacity duration-300",
        )}
      >
        <SendIcon height="20px" />
      </Button>
    </form>
  );
}
