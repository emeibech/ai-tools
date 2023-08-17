import { useRef, useState } from "react";
import { Textarea } from "@/common/components/ui/textarea";
import { Button } from "@/common/components/ui/button";
import { SendIcon } from "@/common/components/ui/Icons";
import { cn } from "@/common/lib/utils";

interface TextareaFormProps {
  minInputLength: number;
  placeholder?: string;
  rows?: number;
  cols?: number;
}

export default function TextareaForm({
  minInputLength,
  placeholder,
  rows,
  cols,
}: TextareaFormProps) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const ref = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    console.log(ref.current?.value);
    ref.current!.value = "";
    setIsButtonDisabled(true);
  }

  function handleInputChange() {
    const inputLength = ref.current?.value.length ?? 0;
    setIsButtonDisabled(inputLength <= minInputLength - 1);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-2 relative">
      <Textarea
        onChange={handleInputChange}
        ref={ref}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        className="resize-none"
        wrap="hard"
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
