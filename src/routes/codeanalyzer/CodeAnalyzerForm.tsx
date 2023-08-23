import { useRef } from "react";
import * as z from "zod";
import { Textarea } from "@/common/components/ui/textarea";
import { Button } from "@/common/components/ui/button";
import { cn } from "@/common/lib/utils";
import useLabelAnimation from "@/common/hooks/useLabelAnimation";
import { Form, FormField } from "@/common/components/ui/form";
import FormUnit from "@/features/formUnit/FormUnit";
import useFormLogic from "@/common/hooks/useFormLogic";

const schema = { code: z.string().min(5).max(5000) };
const defaultValues = { code: "" };

export default function CodeAnalyzerForm() {
  const codeRef = useRef<HTMLTextAreaElement>(null);

  const { form, FormSchema, getFieldState, getValidationStyles } = useFormLogic(
    {
      schema,
      defaultValues,
      mode: "onSubmit",
      resetLabelState,
      refs: [codeRef],
    },
  );

  const codeLabel = useLabelAnimation({
    isDirty: getFieldState("code").isDirty,
    isInvalid: getFieldState("code").invalid,
  });

  function resetLabelState() {
    codeLabel.resetState();
  }

  function handleSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 relative"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          name="code"
          control={form.control}
          render={({ field }) => (
            <FormUnit label="Code" labelAnimator={codeLabel}>
              <Textarea
                {...field}
                className={cn(
                  getValidationStyles(getFieldState("code").invalid),
                  "resize-none",
                )}
                cols={100}
                rows={10}
                ref={codeRef}
              />
            </FormUnit>
          )}
        />
        <Button
          type="submit"
          size={"custom"}
          className={cn(
            "p-2 px-8 mx-auto",
            "justify-self-end max-w-max",
            "transition duration-300",
          )}
        >
          Analyze Code
        </Button>
      </form>
    </Form>
  );
}
