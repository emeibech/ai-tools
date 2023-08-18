import { cn } from "@/common/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "@/common/components/ui/textarea";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { SendIcon } from "@/common/components/ui/Icons";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
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

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);
    form.reset();
  };

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
            <FormItem>
              <FormLabel>Tone</FormLabel>
              <FormControl>
                <Input type="text" {...field} className="max-w-[460px]" />
              </FormControl>
              <FormDescription>Min: 2 | Max: 100</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          name="message"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="resize-none"
                  cols={100}
                  rows={10}
                />
              </FormControl>
              <FormDescription>Min: 5 | Max: 5000</FormDescription>
            </FormItem>
          )}
        />
        <Button
          disabled={!form.formState.isValid}
          variant={"ghost"}
          className={cn(
            "justify-self-end max-w-max px-2.5 rounded-full",
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
