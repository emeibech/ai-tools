import { cn } from "@/common/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "@/common/components/ui/textarea";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { SendIcon } from "@/common/components/ui/Icons";
import useLabelAnimation from "@/common/hooks/useLabelAnimation";
import { Label } from "@/common/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/common/components/ui/form";

const FormSchema = z.object({
  tone: z.string().min(2).max(100),
  message: z.string().min(5).max(5000),
});

export default function ToneChangerForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tone: "",
      message: "",
    },
  });

  const toneLabel = useLabelAnimation(form.getFieldState("tone").isDirty);
  const messageLabel = useLabelAnimation(form.getFieldState("message").isDirty);

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values);
    form.reset();
    toneLabel.resetState();
    messageLabel.resetState();
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 relative"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="tone"
          control={form.control}
          render={({ field }) => (
            <FormItem className="relative">
              <Label
                className={cn(
                  toneLabel.getStyle(),
                  "transition-all ease-out",
                  "absolute left-3 px-1",
                  "font-normal",
                  "bg-background",
                )}
              >
                Tone
              </Label>
              <FormControl
                onFocus={() => toneLabel.floatUp()}
                onBlur={() => toneLabel.floatDown()}
                onChange={() => {
                  if (form.getFieldState("tone").isDirty) toneLabel.remainUp();
                }}
              >
                <Input
                  {...field}
                  type="text"
                  className="max-w-[460px] transition"
                />
              </FormControl>
              <FormDescription>Character limit: 2 - 100</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          name="message"
          control={form.control}
          render={({ field }) => (
            <FormItem className="relative">
              <Label
                className={cn(
                  messageLabel.getStyle(),
                  "transition-all ease-out",
                  "absolute left-3 px-1",
                  "font-normal",
                  "bg-background",
                )}
              >
                Message
              </Label>
              <FormControl
                onFocus={() => messageLabel.floatUp()}
                onBlur={() => messageLabel.floatDown()}
                onChange={() => {
                  if (form.getFieldState("message").isDirty)
                    messageLabel.remainUp();
                }}
              >
                <Textarea
                  {...field}
                  className="resize-none transition"
                  cols={100}
                  rows={10}
                />
              </FormControl>
              <FormDescription>Character limit: 5 - 5000</FormDescription>
            </FormItem>
          )}
        />
        <Button
          disabled={!form.formState.isValid}
          variant={"custom"}
          size={"custom"}
          className={cn(
            "bg-cyan-500 p-2",
            "justify-self-end max-w-max",
            "absolute bottom-9 right-2",
            "transition-color transition-opacity duration-300",
          )}
          type="submit"
        >
          <SendIcon height="18px" />
        </Button>
      </form>
    </Form>
  );
}
