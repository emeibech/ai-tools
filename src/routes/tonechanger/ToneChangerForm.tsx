import { cn, scrollToBottom } from '@/common/lib/utils';
import * as z from 'zod';
import { Textarea } from '@/common/components/ui/textarea';
import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';
import useLabelAnimation from '@/common/hooks/useLabelAnimation';
import { Form, FormField } from '@/common/components/ui/form';
import FormUnit from '@/features/formUnit/FormUnit';
import { useRef, useState } from 'react';
import useFormLogic from '@/common/hooks/useFormLogic';
import {
  getPromptsActions,
  getResponsesActions,
} from '@/features/tools/toolsSlicesUtils';
import useApi from '@/features/tools/useApi';
import { useAppDispatch } from '@/app/hooks';
import type { FormatToneChangerPrompt, RouteProp } from '@/types/routes';
import { ApiArgs } from '@/types/features';

const schema = {
  tone: z
    .string()
    .min(2, { message: 'Tone must contain at least 2 characters' })
    .max(100, { message: 'Tone must contain at most 100 characters' }),
  message: z
    .string()
    .min(5, { message: 'Message must contain at least 5 characters' })
    .max(5000, { message: 'Message must contain at most 5000 characters' }),
};

const defaultValues = {
  tone: '',
  message: '',
};

export default function ToneChangerForm({ route }: RouteProp) {
  const toneRef = useRef(null);
  const messageRef = useRef(null);
  const dispatch = useAppDispatch();
  const { responseReset } = getResponsesActions(route);
  const { promptAppended, promptReset } = getPromptsActions(route);

  const [apiArgs, setApiArgs] = useState<ApiArgs>({
    route,
    prompt: '',
    submitCount: 0,
  });

  useApi(apiArgs);

  const { form, FormSchema, getFieldState, getValidationStyles } = useFormLogic(
    {
      schema,
      defaultValues,
      mode: 'onTouched',
      resetLabelState,
      refs: [toneRef, messageRef],
    },
  );

  const toneLabel = useLabelAnimation({
    isDirty: getFieldState('tone').isDirty,
    isInvalid: getFieldState('tone').invalid,
  });

  const messageLabel = useLabelAnimation({
    isDirty: getFieldState('message').isDirty,
    isInvalid: getFieldState('message').invalid,
  });

  function resetLabelState() {
    toneLabel.resetState();
    messageLabel.resetState();
  }

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values);
    dispatch(promptReset());
    dispatch(responseReset());
    dispatch(
      promptAppended(
        formatToneChangerPrompt({
          tone: values.tone,
          message: values.message,
        }),
      ),
    );

    setApiArgs({
      route,
      submitCount: apiArgs.submitCount + 1,
      prompt: formatToneChangerPrompt({
        tone: values.tone,
        message: values.message,
      }),
    });

    scrollToBottom();
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-8 relative"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="tone"
          control={form.control}
          render={({ field }) => (
            <FormUnit label="Tone" labelAnimator={toneLabel}>
              <Input
                {...field}
                type="text"
                className={cn(
                  getValidationStyles(getFieldState('tone').invalid),
                  'max-w-[460px]',
                )}
                ref={toneRef}
              />
            </FormUnit>
          )}
        />
        <FormField
          name="message"
          control={form.control}
          render={({ field }) => (
            <FormUnit label="Message" labelAnimator={messageLabel}>
              <Textarea
                {...field}
                className={cn(
                  getValidationStyles(getFieldState('message').invalid),
                  'resize-none',
                )}
                cols={100}
                rows={10}
                ref={messageRef}
              />
            </FormUnit>
          )}
        />
        <Button
          type="submit"
          size={'custom'}
          className={cn(
            'p-2 px-8 mx-auto',
            'justify-self-end max-w-max',
            'transition duration-300',
          )}
        >
          Change Tone
        </Button>
      </form>
    </Form>
  );
}

function formatToneChangerPrompt({ tone, message }: FormatToneChangerPrompt) {
  return `Tone: ${tone}\nMessage: ${message}`;
}
