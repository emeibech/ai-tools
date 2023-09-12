import { ChangeEvent, KeyboardEvent, FormEvent, useRef, useState } from 'react';
import { SendIcon } from '@/common/components/ui/Icons';
import { Button } from '@/common/components/ui/button';
import { Textarea } from '@/common/components/ui/textarea';
import { useAppSelector } from '@/app/hooks';
import { darkModeStatus } from '@/features/darkmode/darkmodeSlice';
import { nanoid } from '@reduxjs/toolkit';
import { cn, scrollToBottom } from '@/common/lib/utils';
import useTextareaAutoresize from '@/common/hooks/useTextareaAutoresize';
import useResizeListener from '@/common/hooks/useResizeListener';
import { useDispatch } from 'react-redux';
import { messageAdded } from './messagesSlice';
import { flushSync } from 'react-dom';
import useMockApi from '@/common/hooks/useMockApi';

export interface SubmitData {
  submitCount: number;
  id: string;
}

export default function ChatInterfaceForm() {
  const darkmode = useAppSelector(darkModeStatus);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState<string>('');
  const textarea = useTextareaAutoresize(textareaRef);
  const dispatch = useDispatch();
  const [submitData, setSubmitData] = useState<SubmitData>({
    submitCount: 0,
    id: '',
  });

  useResizeListener(textarea.adjustTextareaHeight);
  useMockApi(submitData);

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setValue(event.target.value);
    textarea.adjustTextareaHeight();
  }

  function handleSubmit(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    if (value.length > 0) {
      setValue('');
      textarea.resetTextareaHeight();
      console.log('submitted');

      const userId = `user-${nanoid()}`;
      const assistantId = `assistant-${nanoid()}`;

      flushSync(() => {
        dispatch(
          messageAdded({
            id: userId,
            role: 'user',
            content: value,
          }),
        );

        dispatch(
          messageAdded({
            id: assistantId,
            role: 'assistant',
            content: '',
          }),
        );
      });

      scrollToBottom();

      setSubmitData({
        submitCount: submitData.submitCount + 1,
        id: assistantId,
      });
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'grid grid-cols-2 mt-2 bg-background',
        'pb-12 px-4 md:px-20',
        'sticky bottom-0 inset-x-40',
      )}
    >
      <div
        className={cn(
          darkmode
            ? 'drop-shadow-[0_-1rem_1rem_rgba(0,0,0,0.9)]'
            : 'drop-shadow-[0_-1rem_1rem_rgba(255,255,255,0.9)]',
          'col-start-1 col-end-3 row-start-1',
          'bg-field rounded-xl py-2',
        )}
      >
        <Textarea
          className={cn(
            textarea.getTaiwindClasses(),
            'text-base bg-field border-none focus-visible:ring-0',
            'min-h-[2rem] py-1 pl-4 pr-12 rounded-xl resize-none',
          )}
          cols={70}
          rows={1}
          value={value}
          ref={textareaRef}
          data-name="textarea"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div
        className={cn(
          'col-start-2 row-start-1',
          'justify-self-end self-end mr-2 mb-2 z-0',
        )}
      >
        <Button
          disabled={value.length === 0}
          variant={'custom'}
          size={'custom'}
          className={cn('bg-cyan-500 p-1.5')}
        >
          <SendIcon height="20px" />
        </Button>
      </div>
    </form>
  );
}
