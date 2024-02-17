import { Input } from '@/common/components/ui/input';
import { FormEvent, useCallback, useRef } from 'react';
import { getConversationsActions } from './conversationsSliceUtils';
import type { ConversationForm } from '@/types/features';
import { useAppDispatch } from '@/app/hooks';
import { Button } from '@/common/components/ui/button';
import { CheckIcon } from 'lucide-react';
import { toast } from '@/common/components/ui/use-toast';
import { getCatchError } from '@/common/lib/utils';
import { clientStatusReset } from '../client/clientSlice';
import { useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_SERVER_URL;

export default function ConversationForm({
  title,
  name,
  id,
  setCurrentlyEditing,
}: ConversationForm) {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { titleChanged } = getConversationsActions(name);

  const changeTitle = useCallback(
    async (title: string) => {
      try {
        const response = await fetch(`${baseUrl}/ai/conversations/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title }),
          credentials: 'include',
        });

        if (response.status === 401 || response.status === 403) {
          dispatch(clientStatusReset());
          navigate('/login');
          toast({
            title: 'Error',
            description:
              'Your has session expired. Please log in again to continue.',
          });

          return;
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: getCatchError(error),
        });
      }
    },
    [navigate, dispatch, id],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (inputRef.current) {
      const newTitle = inputRef.current.value;
      if (newTitle === title) {
        setCurrentlyEditing(null);
        return;
      }

      if (inputRef.current.value.length < 1) {
        setCurrentlyEditing(null);
        return;
      }

      changeTitle(newTitle);
      dispatch(titleChanged({ id, newTitle }));
    }
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
        className="border absolute top-0 right-0 px-1 rounded-l-none"
      >
        <CheckIcon height="18px" />
      </Button>
    </form>
  );
}
