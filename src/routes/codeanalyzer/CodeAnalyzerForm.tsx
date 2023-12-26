import { useRef, useState } from 'react';
import * as z from 'zod';
import { Textarea } from '@/common/components/ui/textarea';
import { Button } from '@/common/components/ui/button';
import { cn, scrollToBottom } from '@/common/lib/utils';
import useLabelAnimation from '@/common/hooks/useLabelAnimation';
import { Form, FormField } from '@/common/components/ui/form';
import FormUnit from '@/features/formUnit/FormUnit';
import useFormLogic from '@/common/hooks/useFormLogic';
import {
  getPromptsActions,
  getResponsesActions,
} from '@/features/tools/toolsSlicesUtils';
import useApi from '@/features/tools/useApi';
import { useAppDispatch } from '@/app/hooks';
import type { ToolProp } from '@/types/routes';
import type { ApiArgs } from '@/types/features';
import { getStatusActions } from '@/features/requestStatus/requestStatusSlicesUtils';

const schema = {
  code: z
    .string()
    .min(5, { message: 'Code must contain at least 5 characters' })
    .max(5000, { message: 'Code must contain at most 5000 characters' }),
};
const defaultValues = { code: '' };

export default function CodeAnalyzerForm({ route, name }: ToolProp) {
  const codeRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();
  const { responseReset } = getResponsesActions(route);
  const { promptAppended, promptReset } = getPromptsActions(route);
  const statusChanged = getStatusActions(name);
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
      mode: 'onSubmit',
      resetLabelState,
      refs: [codeRef],
    },
  );

  const codeLabel = useLabelAnimation({
    isDirty: getFieldState('code').isDirty,
    isInvalid: getFieldState('code').invalid,
  });

  function resetLabelState() {
    codeLabel.resetState();
  }

  function handleSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values);
    dispatch(responseReset());
    dispatch(promptReset());
    dispatch(promptAppended(values.code));
    dispatch(statusChanged('requesting'));

    setApiArgs({
      name,
      route,
      prompt: values.code,
    });

    scrollToBottom();
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
                  getValidationStyles(getFieldState('code').invalid),
                  'resize-none',
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
          size={'custom'}
          className={cn(
            'p-2 px-8 mx-auto',
            'justify-self-end max-w-max',
            'transition duration-300',
          )}
        >
          Analyze Code
        </Button>
      </form>
    </Form>
  );
}
