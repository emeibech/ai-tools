import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect } from 'react';
import type { UseFormLogicArgs } from '@/types/hooks';

export default function useFormLogic({
  schema,
  defaultValues,
  mode,
  refs,
  resetLabelState,
}: UseFormLogicArgs) {
  const FormSchema = getFormSchema(schema);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
    mode: mode,
  });

  const { reset, formState, getFieldState } = form;

  function getValidationStyles(invalid: boolean) {
    if (!invalid) return;
    return 'focus-visible:ring-destructive focus-visible:border-none border-destructive';
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

const nameRegex = /^[a-zA-ZÀ-ÿ\s]*$/;

function getFormSchema(schema: { [key: string]: z.ZodString }) {
  if (schema.confirm) {
    // These are custom validations for the sign up form.
    return z
      .object(schema)
      .refine((schema) => nameRegex.test(schema.firstname), {
        message: 'First name name must only contain letters.',
        path: ['firstname'],
      })
      .refine((schema) => nameRegex.test(schema.lastname), {
        message: 'Last name must only contain letters.',
        path: ['lastname'],
      })
      .refine((data) => data.password === data.confirm, {
        message: "Passwords don't match",
        path: ['confirm'],
      })
      .refine(
        (data) => {
          const { year, month, day } = data;
          const birthDate = new Date(`${year}-${month}-${day}`);
          const epoch = birthDate.getTime();

          return isNaN(epoch) ? true : !isOlderThanMinAge(epoch, 13);
        },
        {
          message: 'Required age is 13, buddy boy.',
          path: ['year'],
        },
      );
  }

  return z.object(schema);
}

function isOlderThanMinAge(epoch: number, minAge: number) {
  const currentDate = new Date().getTime();
  const birthDate = currentDate - minAge * 365.25 * 24 * 60 * 60 * 1000;
  return epoch >= birthDate;
}
