import { z } from 'zod';
import { Button } from '@/common/components/ui/button';
import { Form, FormField } from '@/common/components/ui/form';
import { Input } from '@/common/components/ui/input';
import useFormLogic from '@/common/hooks/useFormLogic';
import useLabelAnimation from '@/common/hooks/useLabelAnimation';
import { cn } from '@/common/lib/utils';
import FormUnit from '@/features/formUnit/FormUnit';
import { useRef } from 'react';

const schema = {
  email: z
    .string()
    .email()
    .min(8, { message: 'Email must be at least 6 characters' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
};

const defaultValues = {
  email: '',
  password: '',
};

export default function LoginForm({ className }: { className?: string }) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { form, FormSchema, getFieldState, getValidationStyles } = useFormLogic(
    {
      schema,
      defaultValues,
      mode: 'onSubmit',
      resetLabelState,
      refs: [emailRef, passwordRef],
    },
  );

  const emailLabel = useLabelAnimation({
    isDirty: getFieldState('email').isDirty,
    isInvalid: getFieldState('email').invalid,
    initialPosition: 6,
  });

  const passwordLabel = useLabelAnimation({
    isDirty: getFieldState('password').isDirty,
    isInvalid: getFieldState('password').invalid,
    initialPosition: 6,
  });

  function resetLabelState() {
    emailLabel.resetState();
    passwordLabel.resetState();
  }

  function handleSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        action="http://localhost:3000/login"
        method="post"
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn('flex flex-col gap-6', className)}
      >
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormUnit label="Email" labelAnimator={emailLabel}>
              <Input
                {...field}
                ref={emailRef}
                type="email"
                className={cn(
                  getValidationStyles(getFieldState('email').invalid),
                  'max-w-[420px] h-12',
                )}
              />
            </FormUnit>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormUnit label="Password" labelAnimator={passwordLabel}>
              <Input
                {...field}
                ref={passwordRef}
                type="password"
                className={cn(
                  getValidationStyles(getFieldState('password').invalid),
                  'max-w-[420px] h-12',
                )}
              />
            </FormUnit>
          )}
        />

        <Button
          type="submit"
          size={'custom'}
          className={cn(
            'py-3 px-8 mt-2 text-md',
            'justify-self-end',
            'transition duration-300',
            'max-w-[420px]',
          )}
        >
          Log in
        </Button>
      </form>
    </Form>
  );
}
