import { useCallback, useMemo, useRef, useState } from 'react';
import { cn, getCatchError, scrollToBottom } from '@/common/lib/utils';
import * as z from 'zod';
import { Textarea } from '@/common/components/ui/textarea';
import { Button } from '@/common/components/ui/button';
import useLabelAnimation from '@/common/hooks/useLabelAnimation';
import { Form, FormField } from '@/common/components/ui/form';
import FormUnit from '@/features/formUnit/FormUnit';
import useFormLogic from '@/common/hooks/useFormLogic';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import type { ImageTranslatorProps, PreviewState } from '@/types/routes';
import Dropzone from 'react-dropzone';
import { clientStatus, clientStatusReset } from '@/features/client/clientSlice';
import { useToast } from '@/common/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import useGetScrollDir from '@/common/hooks/useGetScrollDir';
import useAutoScroll from '@/common/hooks/useAutoScroll';
import {
  getStatusActions,
  getStatusState,
} from '@/features/requestStatus/requestStatusSlicesUtils';
import {
  getPromptsActions,
  getResponsesActions,
} from '@/features/tools/toolsSlicesUtils';

const schema = {
  instructions: z
    .string()
    .min(0, { message: 'Instructions must contain at least 2 characters' })
    .max(5000, { message: 'Instructions must contain at most 100 characters' }),
};

const defaultValues = {
  instructions: '',
};

const baseUrl = import.meta.env.VITE_SERVER_URL;

export default function ImageTranslatorForm({
  route,
  name,
  setImg,
}: ImageTranslatorProps) {
  const instructionsRef = useRef(null);
  const dispatch = useAppDispatch();
  const { responseReset } = getResponsesActions(route);
  const { promptAppended, promptReset } = getPromptsActions(route);
  const statusChanged = getStatusActions(name);
  const requestStatus = useAppSelector(getStatusState(name));
  const { act } = useAppSelector(clientStatus);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { scrollDir, setScrollDir } = useGetScrollDir();
  const setChunkSentCount = useAutoScroll({ status: requestStatus, scrollDir });
  const formData = useMemo(() => new FormData(), []);
  const [preview, setPreview] = useState<PreviewState>({
    url: '',
    name: '',
  });

  const streamResponse = useCallback(async () => {
    try {
      const { responseAppended } = getResponsesActions(route);
      const statusChanged = getStatusActions(name);
      const response = await fetch(`${baseUrl}/ai/imagetranslator`, {
        method: 'POST',
        headers: {
          Authorization: act ?? '',
        },
        body: formData,
      });

      const decoder = new TextDecoder();
      dispatch(statusChanged('streaming'));

      if (response.status === 401) {
        dispatch(statusChanged('idle'));
        dispatch(clientStatusReset());
        navigate('/login');

        return;
      }

      if (response.status === 429) {
        const data = await response.json();
        toast({ title: 'Error', description: data.message });
        dispatch(statusChanged('error'));

        return;
      }

      if (!response.ok) {
        toast({
          title: 'Error',
          description: `${response.status}: ${response.statusText}. `,
        });

        dispatch(statusChanged('error'));

        return;
      }

      if (response.body) {
        const reader = response.body.getReader();
        let done = false;

        while (!done) {
          const { value, done: readerDone } = await reader.read();

          if (readerDone) {
            done = true;
          } else {
            dispatch(responseAppended(decoder.decode(value)));
            setChunkSentCount((prev) => prev + 1);
          }
        }

        setChunkSentCount(0);
      }

      dispatch(statusChanged('idle'));
    } catch (error) {
      toast({ title: 'Error', description: getCatchError(error) });
      dispatch(statusChanged('error'));
    } finally {
      formData.delete('image');
      formData.delete('instructions');
      setPreview({ url: '', name: '' });
    }
  }, [
    dispatch,
    toast,
    navigate,
    setChunkSentCount,
    act,
    formData,
    name,
    route,
    statusChanged,
  ]);

  const { form, FormSchema, getFieldState, getValidationStyles } = useFormLogic(
    {
      schema,
      defaultValues,
      mode: 'onTouched',
      resetLabelState,
      refs: [instructionsRef],
    },
  );

  const instructionsLabel = useLabelAnimation({
    isDirty: getFieldState('instructions').isDirty,
    isInvalid: getFieldState('instructions').invalid,
  });

  function resetLabelState() {
    instructionsLabel.resetState();
  }

  function onSubmit(values: z.infer<typeof FormSchema>) {
    if (preview.url === '') {
      toast({ title: 'Error', description: 'No file selected.' });
      return;
    }

    formData.append('instructions', values.instructions);
    dispatch(promptReset());
    dispatch(responseReset());
    dispatch(promptAppended(values.instructions));
    setImg({ src: preview.url, alt: preview.name });
    dispatch(statusChanged('requesting'));
    scrollToBottom();
    requestAnimationFrame(() => setScrollDir('down'));
    streamResponse();
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-8 relative"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Dropzone
          accept={{
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
            'image/webp': ['.webp'],
          }}
          onDropAccepted={(acceptedFiles) => {
            const image = acceptedFiles[0];
            formData.append('image', image);
            setPreview({
              url: URL.createObjectURL(image),
              name: image.name,
            });
          }}
          onDropRejected={(rejected) => {
            console.log(rejected[0].errors[0].code);
          }}
          multiple={false}
          maxSize={5 * 1000 * 1000}
        >
          {({ getRootProps, getInputProps }) => (
            <section
              className={cn('border border-input rounded-md cursor-pointer')}
            >
              <div
                {...getRootProps({
                  'aria-label': 'Drag and drop/File triger area',
                })}
                className="grid place-content-center min-h-60"
              >
                <input {...getInputProps({ accept: 'image/jpeg' })} />
                {preview.url === '' && (
                  <>
                    <p className="text-xl px-4 text-center mb-2">
                      Drag and drop or click to select image
                    </p>

                    <p className="px-4 text-sm text-center text-muted-foreground">
                      Accepts jpeg, png, and webp
                    </p>
                    <p className="px-4 text-sm text-center text-muted-foreground">
                      One image per request
                    </p>
                    <p className="px-4 text-sm text-center text-muted-foreground">
                      5mb maximum
                    </p>
                  </>
                )}

                {preview.url !== '' && (
                  <figure className="grid place-items-center">
                    <img
                      src={preview.url}
                      alt={preview.name}
                      className="max-h-[200px]"
                    />
                    <figcaption className="overflow-hidden">
                      {preview.name}
                    </figcaption>
                  </figure>
                )}
              </div>
            </section>
          )}
        </Dropzone>

        <FormField
          name="instructions"
          control={form.control}
          render={({ field }) => (
            <FormUnit
              label="Instructions (optional)"
              labelAnimator={instructionsLabel}
            >
              <Textarea
                {...field}
                className={cn(
                  getValidationStyles(getFieldState('instructions').invalid),
                  'resize-none',
                )}
                cols={75}
                rows={3}
                ref={instructionsRef}
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
          Translate
        </Button>
      </form>
    </Form>
  );
}
