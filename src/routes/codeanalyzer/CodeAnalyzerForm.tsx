import { useRef, useState } from "react";
import { Textarea } from "@/common/components/ui/textarea";
import { Button } from "@/common/components/ui/button";
import { SendIcon } from "@/common/components/ui/Icons";
import { cn } from "@/common/lib/utils";
import { Label } from "@/common/components/ui/label";
import useLabelAnimation from "@/common/hooks/useLabelAnimation";

export default function CodeAnalyzerForm() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const codeRef = useRef<HTMLTextAreaElement>(null);
  const codeLabel = useLabelAnimation(isDirty);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    console.log(codeRef.current?.value);
    codeRef.current!.value = "";
    setIsButtonDisabled(true);
    codeLabel.resetState();
    setIsDirty(false);
  }

  function handleInputChange() {
    const inputLength = codeRef.current?.value.length ?? 0;
    setIsButtonDisabled(inputLength <= 4 || inputLength >= 5001);
    setIsDirty(inputLength > 0);
    if (isDirty) codeLabel.remainUp();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-y-2 relative">
      <Label
        className={cn(
          codeLabel.getStyle(),
          "transition-all ease-out",
          "absolute left-3 -top-2 px-1",
          "font-normal",
          "bg-background",
        )}
      >
        Code
      </Label>
      <Textarea
        onFocus={() => codeLabel.floatUp()}
        onBlur={() => codeLabel.floatDown()}
        onChange={handleInputChange}
        ref={codeRef}
        rows={10}
        cols={100}
        className="resize-none transition"
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
          "transition-all duration-300",
        )}
      >
        <SendIcon height="18px" />
      </Button>
    </form>
  );
}
