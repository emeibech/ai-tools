import { useRef } from 'react';
import { z } from 'zod';
import { Form, FormField } from '@/common/components/ui/form';
import useFormLogic from '@/common/hooks/useFormLogic';
import useLabelAnimation from '@/common/hooks/useLabelAnimation';
import FormUnit from '@/features/formUnit/FormUnit';
import { Input } from '@/common/components/ui/input';
import { cn } from '@/common/lib/utils';
import { Button } from '@/common/components/ui/button';

import BirthDatePicker from './BirthDatePicker';

const schema = {
  firstname: z.string().min(1, { message: 'Firstname is required' }),
  lastname: z.string(),
  email: z
    .string()
    .email()
    .min(6, { message: 'Email should be at least 6 characters' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
  confirm: z.string(),
  year: z.string(),
  month: z.string(),
  day: z.string(),
};

const defaultValues = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirm: '',
  year: '',
  month: '',
  day: '',
};

export default function Signup() {
  const firstnameRef = useRef(null);
  const lastnameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPassRef = useRef(null);

  const { form, FormSchema, getFieldState, getValidationStyles } = useFormLogic(
    {
      schema,
      defaultValues,
      mode: 'onTouched',
      resetLabelState,
      refs: [firstnameRef, lastnameRef, emailRef, passwordRef, confirmPassRef],
    },
  );

  const firstnameLabel = useLabelAnimation({
    isDirty: getFieldState('firstname').isDirty,
    isInvalid: getFieldState('firstname').invalid,
  });

  const lastnameLabel = useLabelAnimation({
    isDirty: getFieldState('lastname').isDirty,
    isInvalid: getFieldState('lastname').invalid,
  });

  const emailLabel = useLabelAnimation({
    isDirty: getFieldState('email').isDirty,
    isInvalid: getFieldState('email').invalid,
  });

  const passwordLabel = useLabelAnimation({
    isDirty: getFieldState('password').isDirty,
    isInvalid: getFieldState('password').invalid,
  });

  const confirmPassLabel = useLabelAnimation({
    isDirty: getFieldState('confirm').isDirty,
    isInvalid: getFieldState('confirm').invalid,
  });

  function resetLabelState() {
    firstnameLabel.resetState();
    lastnameLabel.resetState();
    emailLabel.resetState();
    passwordLabel.resetState();
    confirmPassLabel.resetState();
  }

  function handleSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values);
    form.resetField('day');
    form.resetField('month');
    form.resetField('year');
  }

  return (
    <main
      className={cn(
        'min-w-[240px] max-w-[300px]',
        'p-4 sm:min-w-[360px]',
        'grid place-items-center mx-auto mt-24 2xl:mt-40',
      )}
    >
      <Form {...form}>
        <form
          action="http://localhost:3000/users"
          method="post"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-6 min-w-full"
        >
          <FormField
            name="firstname"
            control={form.control}
            render={({ field }) => (
              <FormUnit label="First name" labelAnimator={firstnameLabel}>
                <Input
                  {...field}
                  ref={firstnameRef}
                  type="text"
                  className={cn(
                    getValidationStyles(getFieldState('firstname').invalid),
                  )}
                />
              </FormUnit>
            )}
          />

          <FormField
            name="lastname"
            control={form.control}
            render={({ field }) => (
              <FormUnit
                label="Last name (optional)"
                labelAnimator={lastnameLabel}
              >
                <Input
                  {...field}
                  ref={lastnameRef}
                  type="text"
                  className={cn(
                    getValidationStyles(getFieldState('lastname').invalid),
                  )}
                />
              </FormUnit>
            )}
          />

          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormUnit label="Email" labelAnimator={emailLabel}>
                <Input
                  {...field}
                  ref={emailRef}
                  type="text"
                  className={cn(
                    getValidationStyles(getFieldState('email').invalid),
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
                  )}
                />
              </FormUnit>
            )}
          />

          <FormField
            name="confirm"
            control={form.control}
            render={({ field }) => (
              <FormUnit
                label="Confirm Password"
                labelAnimator={confirmPassLabel}
              >
                <Input
                  {...field}
                  ref={confirmPassRef}
                  type="password"
                  className={cn(
                    getValidationStyles(getFieldState('confirm').invalid),
                    'max-w-[360px]',
                  )}
                />
              </FormUnit>
            )}
          />

          <BirthDatePicker
            control={form.control}
            label="Date of birth"
            form={form}
          />

          <Button
            type="submit"
            className={cn(
              'py-3 px-8 mt-2 text-md',
              'justify-self-end',
              'transition duration-300',
              'max-w-[360px]',
            )}
          >
            Create account
          </Button>
        </form>
      </Form>
    </main>
  );
}
