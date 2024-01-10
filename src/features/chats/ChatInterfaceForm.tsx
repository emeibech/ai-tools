import {
  type ChangeEvent,
  type KeyboardEvent,
  type FormEvent,
  useRef,
  useState,
} from 'react';
import { SendIcon } from '@/common/components/ui/Icons';
import { Button } from '@/common/components/ui/button';
import { Textarea } from '@/common/components/ui/textarea';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { darkModeStatus } from '@/features/darkmode/darkmodeSlice';
import { nanoid } from '@reduxjs/toolkit';
import { cn, scrollToBottom } from '@/common/lib/utils';
import useTextareaAutoresize from '@/common/hooks/useTextareaAutoresize';
import useResizeListener from '@/common/hooks/useResizeListener';
import { getMessagesActions, getMessagesState } from './messagesSliceutils';
import useChatApi from './useChatApi';
import type {
  ChatApiArgs,
  ChatInterfaceFormProps,
  Model,
} from '@/types/features';
import {
  getStatusActions,
  getStatusState,
} from '../requestStatus/requestStatusSlicesUtils';
import { MessageSquarePlusIcon, MessagesSquareIcon } from 'lucide-react';
import ConversationsSheet from '../conversations/ConversationsSheet';
import { getConversationsActions } from '../conversations/conversationsSliceUtils';

export default function ChatInterfaceForm({ name }: ChatInterfaceFormProps) {
  const darkmode = useAppSelector(darkModeStatus);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textarea = useTextareaAutoresize(textareaRef);
  const dispatch = useAppDispatch();
  const { messageAdded, messagesReset } = getMessagesActions(name);
  const [value, setValue] = useState<string>('');
  const msgs = getMessagesState(name);
  const messages = useAppSelector(msgs);
  const statusChanged = getStatusActions(name);
  const requestStatus = useAppSelector(getStatusState(name));
  const { activeConversationSet } = getConversationsActions(name);
  const [chatApiArgs, setChatApiArgs] = useState<ChatApiArgs>({
    chatInterface: name,
    chatHistory: [],
    assistantId: '',
    userId: '',
    prompt: '',
    model: '',
  });

  useResizeListener(textarea.adjustTextareaHeight);
  useChatApi(chatApiArgs);

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setValue(event.target.value);
    textarea.adjustTextareaHeight();
  }

  function handleSubmit(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    const prompt = name === 'Coding Assistant' ? cleanText(value) : value;

    if (value.length > 0) {
      setValue('');
      textarea.resetTextareaHeight();
      console.log('submitted');

      const userId = `user-${nanoid()}`;
      const assistantId = `assistant-${nanoid()}`;

      dispatch(
        messageAdded({
          id: userId,
          role: 'user',
          content: prompt,
        }),
      );

      dispatch(
        messageAdded({
          id: assistantId,
          role: 'assistant',
          content: '',
        }),
      );

      dispatch(statusChanged('requesting'));

      setChatApiArgs({
        userId,
        assistantId,
        prompt,
        chatInterface: name,
        chatHistory: messages,
        model: extractModel(value),
      });

      scrollToBottom();
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
        'grid grid-cols-2 mt-8 bg-background',
        'px-4 md:px-20',
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
            'min-h-[2rem] py-1 pl-4 rounded-xl resize-none',
            'sm: pr-14',
          )}
          cols={70}
          rows={1}
          value={value}
          ref={textareaRef}
          data-name="textarea"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={
            requestStatus === 'requesting' || requestStatus === 'streaming'
          }
        />
      </div>

      <div
        className={cn(
          'col-start-2 row-start-1',
          'justify-self-end self-end mr-4 mb-2 z-0',
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

      <div className={cn('grid grid-cols-2', 'py-2 col-span-2 gap-2 mt-1')}>
        <div className="grid grid-cols-2 gap-1 col-span-2">
          <Button
            variant={'ghost'}
            className="min-h-full flex gap-2 px-1"
            onClick={() => {
              dispatch(messagesReset());
              dispatch(activeConversationSet(null));
            }}
          >
            <span
              className={cn(
                'min-w-full flex justify-center gap-2',
                'items-center',
              )}
            >
              <p className="text-sm sm:text-base">New chat</p>
              <MessageSquarePlusIcon height="20px" width="20px" />
            </span>
          </Button>

          <ConversationsSheet
            name={name}
            side="right"
            className="sm:px-8 overflow-y-auto"
          >
            <Button variant={'ghost'} className="min-h-full flex gap-2 px-1">
              <span
                className={cn(
                  'min-w-full flex justify-center gap-2',
                  'items-center',
                )}
              >
                <p className="text-sm sm:text-base">Conversations</p>
                <MessagesSquareIcon height="20px" width="20px" />
              </span>
            </Button>
          </ConversationsSheet>
        </div>
      </div>
    </form>
  );
}

function extractModel(text: string) {
  const commandIndex = text.indexOf('use-gpt-4');
  if (commandIndex === -1) return '';
  return text.slice(commandIndex + 4, commandIndex + 9) as Model;
}

function cleanText(text: string) {
  const commandIndex = text.indexOf('use-gpt-4');
  if (commandIndex === -1) return text;
  return text.replace('use-gpt-4', '').trim();
}
