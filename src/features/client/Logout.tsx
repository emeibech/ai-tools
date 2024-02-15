import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Button } from '@/common/components/ui/button';
import { useToast } from '@/common/components/ui/use-toast';
import { cn, getCatchError } from '@/common/lib/utils';
import { clientStatus, clientStatusReset } from '@/features/client/clientSlice';
import { useAuth0 } from '@auth0/auth0-react';
import { LogOutIcon } from 'lucide-react';
import { MouseEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_SERVER_URL;

export default function Logout() {
  const { userStatus } = useAppSelector(clientStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { isAuthenticated, logout } = useAuth0();

  const logoutReq = useCallback(async () => {
    const url = `${baseUrl}/auth/logout`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.status === 401 || response.status === 403) {
        dispatch(clientStatusReset());
        navigate('/login');
        return;
      }

      if (!response.ok) {
        toast({
          title: 'Error',
          description: `${response.status}: ${response.statusText}`,
        });
      } else {
        dispatch(clientStatusReset());
      }
    } catch (error) {
      toast({ title: 'Error', description: getCatchError(error) });
    }
  }, [dispatch, navigate, toast]);

  function handleClick(event: MouseEvent) {
    event.preventDefault();
    logoutReq();

    if (isAuthenticated) {
      logout();
    } else {
      navigate('/');
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
