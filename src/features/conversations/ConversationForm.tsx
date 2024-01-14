import { Input } from '@/common/components/ui/input';
import { FormEvent, useRef } from 'react';
import { getConversationsActions } from './conversationsSliceUtils';
import type { ConversationForm } from '@/types/features';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Button } from '@/common/components/ui/button';
import { CheckIcon } from 'lucide-react';
import { clientStatus } from '../client/clientSlice';

const baseUrl = import.meta.env.VITE_SERVER_URL;

export default function ConversationForm({
  title,
  name,
  id,
  setCurrentlyEditing,
}: ConversationForm) {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { titleChanged } = getConversationsActions(name);
  const { act } = useAppSelector(clientStatus);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newTitle = inputRef.current?.value || '';

    fetch(`${baseUrl}/ai/conversations/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: act ?? '',
      },
      body: JSON.stringify({ title: newTitle }),
    });

    dispatch(titleChanged({ id, newTitle }));
    setCurrentlyEditing(null);
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Input
        type="text"
        ref={inputRef}
        defaultValue={title}
        autoFocus
        className="pr-10"
      />
      <Button
        variant={'secondary'}
        className="border absolute top-0 right-0 px-1"
      >
        <CheckIcon height="18px" />
      </Button>
    </form>
  );
}
