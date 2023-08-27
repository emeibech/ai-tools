import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RefObject, useEffect } from "react";

interface UseFormLogicArgs {
  schema: {
    [key: string]: z.ZodString;
  };
  defaultValues: {
    [key: string]: string;
  };
  mode: "all" | "onBlur" | "onTouched" | "onSubmit" | "onChange";
  refs: RefObject<HTMLElement>[];
  resetLabelState: () => void;
}

export default function useFormLogic({
  schema,
  defaultValues,
  mode,
  refs,
  resetLabelState,
}: UseFormLogicArgs) {
  const FormSchema = z.object(schema);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
    mode: mode,
  });

  const { reset, formState, getFieldState } = form;

  function getValidationStyles(invalid: boolean) {
    if (!invalid) return;
    return "focus-visible:ring-destructive focus-visible:border-none border-destructive";
  }

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset(defaultValues);
      resetLabelState();
      refs.forEach((ref) => {
        ref.current?.blur();
      });
    }
  }, [formState, reset, defaultValues, refs, resetLabelState]);

  return {
    form,
    FormSchema,
    getFieldState,
    getValidationStyles,
  };
}