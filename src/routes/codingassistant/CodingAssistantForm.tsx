import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/common/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RadioGroup, RadioGroupItem } from "@/common/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/common/components/ui/textarea";
import { Button } from "@/common/components/ui/button";

const formSchema = z.object({
  codeArea: z.string().min(5, {
    message: "Put code in the box before submitting.",
  }),
});

export default function CodingAssistant() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codeArea: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="codeArea"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Prioritize</FormLabel>
                <FormControl>
                  <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label htmlFor="option-one">
                        Readability and maintainability
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two">Performance</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Put your code here"
                    {...field}
                  ></Textarea>
                </FormControl>
              </FormItem>
            </>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
