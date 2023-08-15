import { Textarea } from "@/common/components/ui/textarea";
import { Button } from "@/common/components/ui/button";
import { cn } from "@/common/lib/utils";

export default function CodeAnalyzerForm() {
  function onSubmit(values: string) {
    console.log(values);
  }

  return (
    <form onSubmit={() => onSubmit} className="grid gap-2 relative">
      <Textarea
        placeholder="Put your code here"
        rows={12}
        cols={100}
        wrap="hard"
        className="resize-none"
      />
      <Button
        type="submit"
        className={cn(
          "justify-self-end max-w-max",
          "absolute bottom-2 right-2",
        )}
      >
        Submit
      </Button>
    </form>
  );
}
