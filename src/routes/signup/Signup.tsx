import { useRef, useState } from 'react';
import { z } from 'zod';
import { Form, FormField } from '@/common/components/ui/form';
import useFormLogic from '@/common/hooks/useFormLogic';
import useLabelAnimation from '@/common/hooks/useLabelAnimation';
import FormUnit from '@/features/formUnit/FormUnit';
import { Input } from '@/common/components/ui/input';
import { cn } from '@/common/lib/utils';
import { Button } from '@/common/components/ui/button';
import BirthDatePicker from './BirthDatePicker';
import { useToast } from '@/common/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { ReqStatus } from '@/types/routes';
import AccountCreated from './AccountCreated';
import { useAppDispatch } from '@/app/hooks';
import { clientStatusSet } from '@/features/client/clientSlice';

const baseUrl = import.meta.env.VITE_SERVER_URL;

const schema = {
  firstname: z.string().min(1, { message: 'First name is required' }),
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
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [reqStatus, setReqStatus] = useState<ReqStatus>('idle');

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

  async function handleSubmit(values: z.infer<typeof FormSchema>) {
    setReqStatus('requesting');

    requestAnimationFrame(() => {
      form.resetField('day');
      form.resetField('month');
      form.resetField('year');
    });

    const body = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
      dateOfBirth: `${values.year}-${values.month}-${values.day}`,
    };

    try {
      const response = await fetch(`${baseUrl}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include',
      });

      const { message } = await response.json();

      if (response.status === 400) {
        setReqStatus('idle');
        toast({
          title: 'Error',
          description: message,
        });

        return;
      }

      if (response.status === 409) {
        setReqStatus('idle');
        toast({
          title: 'Error',
          description: message,
        });

        return;
      }

      if (!response.ok) {
        setReqStatus('idle');
        toast({
          title: 'Error',
          description: 'An error occured while creating new user',
        });

        return;
      }

      setReqStatus('success');
      dispatch(clientStatusSet('user'));

      setTimeout(() => {
        navigate('/login');
      }, 4000);
    } catch (error) {
      setReqStatus('idle');
      toast({ title: 'Error', description: `${error}` });
    }
  }

  return (
    <main
      className={cn(
        reqStatus === 'success'
          ? '2xl:min-w-[920px] min-[678px]:max-w-[640px] min-w-full 2xl:mt-20'
          : '',
        'min-w-[240px] max-w-[300px]',
        'p-4 sm:min-w-[360px]',
        'grid place-items-center mx-auto mt-24 2xl:mt-40',
      )}
    >
      {reqStatus !== 'success' && (
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
              disabled={reqStatus === 'requesting'}
              type="submit"
              className={cn(
                'py-3 px-8 mt-2 text-md',
                'justify-self-end',
                'transition duration-300',
                'max-w-[360px]',
              )}
            >
              {getSubmitBtnText(reqStatus)}
            </Button>
          </form>
        </Form>
      )}

      {reqStatus === 'success' && <AccountCreated />}
    </main>
  );
}

function getSubmitBtnText(reqStatus: ReqStatus) {
  const btnTexts = {
    idle: 'Create account',
    requesting: 'Creating account...',
    error: 'Create account',
    success: 'Account created!',
  };

  return btnTexts[reqStatus];
}
