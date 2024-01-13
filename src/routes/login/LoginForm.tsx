import { z } from 'zod';
import { Button } from '@/common/components/ui/button';
import { Form, FormField } from '@/common/components/ui/form';
import { Input } from '@/common/components/ui/input';
import useFormLogic from '@/common/hooks/useFormLogic';
import useLabelAnimation from '@/common/hooks/useLabelAnimation';
import { cn, getCatchError } from '@/common/lib/utils';
import FormUnit from '@/features/formUnit/FormUnit';
import { useRef, useState } from 'react';
import { useAppDispatch } from '@/app/hooks';
import { clientStatusSet } from '@/features/client/clientSlice';
import type { ReqStatus } from '@/types/routes';
import { useToast } from '@/common/components/ui/use-toast';
import { Link } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_AI_URL;
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
  const dispatch = useAppDispatch();
  const [reqStatus, setReqStatus] = useState<ReqStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const { toast } = useToast();

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

  async function handleSubmit(values: z.infer<typeof FormSchema>) {
    try {
      const { email, password } = values;
      const body = { email, password };

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      };

      setReqStatus('requesting');

      const response = await fetch(`${baseUrl}/auth/login`, requestOptions);
      const data = await response.json();
      if (!response.ok) {
        setErrorMsg(data.message);
        setReqStatus('idle');
        setTimeout(() => {
          setErrorMsg('');
        }, 5000);
        return;
      }
      setReqStatus('success');
      dispatch(clientStatusSet({ userStatus: 'user', act: data.act }));
    } catch (error) {
      toast({ title: 'Error', description: getCatchError(error) });
      setReqStatus('idle');
    }
  }

  return (
    <Form {...form}>
      <form
        action="http://localhost:3000/login"
        method="post"
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn('flex flex-col gap-6 relative', className)}
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

        <p className="text-destructive text-sm absolute bottom-14 self-center">
          {errorMsg}
        </p>

        <Button
          type="submit"
          size={'custom'}
          disabled={reqStatus === 'requesting' ? true : false}
          className={cn(
            'py-3 px-8 mt-4 text-md',
            'justify-self-end',
            'transition duration-300',
            'max-w-full',
          )}
        >
          {getLoginBtnText(reqStatus)}
        </Button>
      </form>

      <article className="text-center mt-4">
        <span>Need an account? </span>
        <Link to={'/signup'} className="text-accent hover:underline">
          Sign up
        </Link>
        .
      </article>
    </Form>
  );
}

function getLoginBtnText(reqStatus: ReqStatus) {
  const btnTexts = {
    idle: 'Log in to account',
    requesting: 'Logging in...',
    error: 'Log in',
    success: 'Login successful!',
  };

  return btnTexts[reqStatus];
}
