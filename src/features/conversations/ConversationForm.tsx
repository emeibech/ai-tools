import { Input } from '@/common/components/ui/input';
import { FormEvent, useRef } from 'react';
import { getConversationsActions } from './conversationsSliceUtils';
import type { ConversationForm } from '@/types/features';
import { useAppDispatch } from '@/app/hooks';
import { Button } from '@/common/components/ui/button';
import { CheckIcon } from 'lucide-react';

export default function ConversationForm({
  title,
  name,
  id,
  setCurrentlyEditing,
}: ConversationForm) {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { titleChanged } = getConversationsActions(name);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(inputRef.current?.value);

    const newTitle = inputRef.current?.value || '';

    // do a patch request to change title in backend here

    // on succeed, run this
    dispatch(titleChanged({ id, newTitle }));
    setCurrentlyEditing(null);

    // on fail, render error
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
