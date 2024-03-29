import { cn, scrollToBottom } from '@/common/lib/utils';
import * as z from 'zod';
import { Textarea } from '@/common/components/ui/textarea';
import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';
import useLabelAnimation from '@/common/hooks/useLabelAnimation';
import { Form, FormField } from '@/common/components/ui/form';
import FormUnit from '@/features/formUnit/FormUnit';
import useFormLogic from '@/common/hooks/useFormLogic';
import { useRef, useState } from 'react';
import useApi from '@/features/tools/useApi';
import {
  getPromptsActions,
  getResponsesActions,
} from '@/features/tools/toolsSlicesUtils';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import type { FormatStoryGeneratorPrompt, ToolProp } from '@/types/routes';
import type { ApiArgs } from '@/types/features';
import {
  getStatusActions,
  getStatusState,
} from '@/features/requestStatus/requestStatusSlicesUtils';

const schema = {
  subject: z
    .string()
    .min(2, { message: 'Subject must contain at least 2 characters' })
    .max(100, { message: 'Subject must contain at most 100 characters' }),
  style: z
    .string()
    .min(0)
    .max(100, { message: 'Style must contain at most 100 characters' }),
  context: z
    .string()
    .min(0)
    .max(5000, { message: 'Context must contain at most 5000 characters' }),
};

const defaultValues = {
  subject: '',
  style: '',
  context: '',
};

export default function StoryGeneratorForm({ route, name }: ToolProp) {
  const subjectRef = useRef(null);
  const styleRef = useRef(null);
  const contextRef = useRef(null);
  const dispatch = useAppDispatch();
  const { responseReset } = getResponsesActions(route);
  const { promptAppended, promptReset } = getPromptsActions(route);
  const statusChanged = getStatusActions(name);
  const requestStatus = useAppSelector(getStatusState(name));
  const [apiArgs, setApiArgs] = useState<ApiArgs>({
    name,
    route,
    prompt: '',
  });

  useApi(apiArgs);

  const { form, FormSchema, getFieldState, getValidationStyles } = useFormLogic(
    {
      schema,
      defaultValues,
      mode: 'onTouched',
      resetLabelState,
      refs: [subjectRef, styleRef, contextRef],
    },
  );

  const subjectLabel = useLabelAnimation({
    isDirty: getFieldState('subject').isDirty,
    isInvalid: getFieldState('subject').invalid,
  });

  const styleLabel = useLabelAnimation({
    isDirty: getFieldState('style').isDirty,
    isInvalid: getFieldState('style').invalid,
  });

  const contextLabel = useLabelAnimation({
    isDirty: getFieldState('context').isDirty,
    isInvalid: getFieldState('context').invalid,
  });

  function resetLabelState() {
    subjectLabel.resetState();
    styleLabel.resetState();
    contextLabel.resetState();
  }

  function handleSubmit(values: z.infer<typeof FormSchema>) {
    dispatch(responseReset());
    dispatch(promptReset());
    dispatch(
      promptAppended(
        formatStoryGeneratorPrompt({
          subject: values.subject,
          style: values.style,
          context: values.context,
        }),
      ),
    );

    dispatch(statusChanged('requesting'));

    setApiArgs({
      name,
      route,
      prompt: formatStoryGeneratorPrompt({
        subject: values.subject,
        style: values.style,
        context: values.context,
      }),
    });

    scrollToBottom();
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-10 relative"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          name="subject"
          control={form.control}
          render={({ field }) => (
            <FormUnit
              label="Subject"
              description="What is the story about?"
              labelAnimator={subjectLabel}
            >
              <Input
                {...field}
                type="text"
                className={cn(
                  getValidationStyles(getFieldState('subject').invalid),
                  'max-w-[420px]',
                )}
                ref={subjectRef}
                disabled={
                  requestStatus === 'requesting' ||
                  requestStatus === 'streaming'
                }
              />
            </FormUnit>
          )}
        />

        <FormField
          name="style"
          control={form.control}
          render={({ field }) => (
            <FormUnit
              label="Style (optional)"
              description="In what style should it be written?"
              labelAnimator={styleLabel}
            >
              <Input
                {...field}
                type="text"
                className={cn(
                  getValidationStyles(getFieldState('style').invalid),
                  'max-w-[420px]',
                )}
                ref={styleRef}
                disabled={
                  requestStatus === 'requesting' ||
                  requestStatus === 'streaming'
                }
              />
            </FormUnit>
          )}
        />

        <FormField
          name="context"
          control={form.control}
          render={({ field }) => (
            <FormUnit
              label="Context (optional)"
              description="Provide some details (setting, premise, etc.)"
              labelAnimator={contextLabel}
            >
              <Textarea
                {...field}
                className={cn(
                  getValidationStyles(getFieldState('context').invalid),
                  'resize-none',
                )}
                cols={100}
                rows={5}
                ref={contextRef}
                disabled={
                  requestStatus === 'requesting' ||
                  requestStatus === 'streaming'
                }
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
          disabled={
            requestStatus === 'requesting' || requestStatus === 'streaming'
          }
        >
          Generate Story
        </Button>
      </form>
    </Form>
  );
}

function formatStoryGeneratorPrompt({
  subject,
  style,
  context,
}: FormatStoryGeneratorPrompt) {
  return `Subject: ${subject}\nStyle: ${style}\nContext: ${context}`;
}
