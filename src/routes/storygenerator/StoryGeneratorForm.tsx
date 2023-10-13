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
import { Tool, getResponsesActions } from '@/features/tools/toolsSlicesUtils';
import useApi, { ApiArgs } from '@/features/tools/useApi';
import { useAppDispatch } from '@/app/hooks';

const schema = {
  subject: z.string().min(2).max(100),
  style: z.string().min(0).max(100),
  context: z.string().min(0).max(5000),
};

const defaultValues = {
  subject: '',
  style: '',
  context: '',
};

interface FormatStoryGeneratorPromptArgs {
  subject: string;
  style?: string;
  context?: string;
}

function formatStoryGeneratorPrompt({
  subject,
  style,
  context,
}: FormatStoryGeneratorPromptArgs) {
  return `Subject: ${subject}\nStyle: ${style}\nContext: ${context}`;
}

interface StoryGeneratorFormProps {
  route: Tool;
  setPrompt: (prompt: string) => void;
}

export default function StoryGeneratorForm({
  route,
  setPrompt,
}: StoryGeneratorFormProps) {
  const subjectRef = useRef(null);
  const styleRef = useRef(null);
  const contextRef = useRef(null);
  const dispatch = useAppDispatch();
  const { responseReset } = getResponsesActions(route);

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
    console.log(values);
    dispatch(responseReset());
    setPrompt(
      formatStoryGeneratorPrompt({
        subject: values.subject,
        style: values.style,
        context: values.context,
      }),
    );

    setApiArgs({
      route,
      submitCount: apiArgs.submitCount + 1,
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
          Generate Story
        </Button>
      </form>
    </Form>
  );
}
