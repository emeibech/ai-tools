import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Button } from '@/common/components/ui/button';
import { useToast } from '@/common/components/ui/use-toast';
import { cn, getCatchError } from '@/common/lib/utils';
import { clientStatus, clientStatusReset } from '@/features/client/clientSlice';
import { LogOutIcon } from 'lucide-react';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_AI_URL;

export default function Logout() {
  const { userStatus } = useAppSelector(clientStatus);
  const { act } = useAppSelector(clientStatus);
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ act }),
  };

  const url = `${baseUrl}/auth/logout`;

  async function handleClick(event: MouseEvent) {
    event.preventDefault();

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        const data = await response.json();
        toast({
          title: 'Error',
          description: data.message,
        });

        return;
      }

      dispatch(clientStatusReset());
      navigate('/');
    } catch (error) {
      console.log(48, getCatchError(error));
      toast({
        title: 'Error',
        description: 'An error occured while logging out.',
      });
    }
  }
  return (
    <>
      {userStatus === 'user' && (
        <div
          className={cn('flex gap-2 items-end mb-4 max-h-min', 'px-0 lg:px-6')}
        >
          <Button
            variant={'custom'}
            className={cn(
              'min-w-full flex justify-start gap-2',
              'hover:bg-secondary active:text-accent',
            )}
            onClick={handleClick}
          >
            <LogOutIcon height="18px" width="18px" className="" />
            <span className="">Logout</span>
          </Button>
        </div>
      )}
    </>
  );
}
