import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Button } from '@/common/components/ui/button';
import { cn } from '@/common/lib/utils';
import { clientStatus, clientStatusReset } from '@/features/client/clientSlice';
import { useAuth0 } from '@auth0/auth0-react';
import { LogOutIcon } from 'lucide-react';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_SERVER_URL;

export default function Logout() {
  const { userStatus } = useAppSelector(clientStatus);
  const { act } = useAppSelector(clientStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, logout } = useAuth0();

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ act }),
  };

  const url = `${baseUrl}/auth/logout`;

  function handleClick(event: MouseEvent) {
    event.preventDefault();
    dispatch(clientStatusReset());
    fetch(url, requestOptions);

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
