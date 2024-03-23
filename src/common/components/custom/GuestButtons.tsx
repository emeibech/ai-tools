import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { ReqStatus } from '@/types/routes';
import { useCallback, useState } from 'react';
import { useToast } from '../ui/use-toast';
import { useAppDispatch } from '@/app/hooks';
import { clientStatusSet } from '@/features/client/clientSlice';
import { cn, getCatchError } from '@/common/lib/utils';

const baseUrl = import.meta.env.VITE_SERVER_URL;
const email = import.meta.env.VITE_TRIAL_EMAIL;
const password = import.meta.env.VITE_TRIAL_PASSWORD;

export default function GuestButtons() {
  const [reqStatus, setReqStatus] = useState<ReqStatus>('idle');
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = useCallback(async () => {
    try {
      const body = { email, password };

      setReqStatus('requesting');

      const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        setReqStatus('idle');
        toast({ title: 'Error', description: data.message });
        return;
      }

      setReqStatus('success');
      dispatch(clientStatusSet('user'));
      navigate('/login');
    } catch (error) {
      toast({ title: 'Error', description: getCatchError(error) });
      setReqStatus('idle');
    }
  }, [toast, dispatch, navigate]);

  return (
    <div
      className={cn(
        'grid grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] gap-8',
        '',
      )}
    >
      <Button className="h-8 p-0 xl:h-10 text-base">
        <Link
          to={'/login'}
          className="min-w-full min-h-full grid place-content-center"
        >
          <p>Login</p>
        </Link>
      </Button>

      <Button
        onClick={handleClick}
        disabled={reqStatus === 'requesting'}
        className={cn('px-8 h-8 xl:h-10 text-base')}
      >
        Try it!
      </Button>

      {/* <Button className="h-8 p-0 xl:h-10 text-base">
        <Link
          to={'/signup'}
          className="min-w-full min-h-full grid place-content-center"
        >
          <p>Sign up</p>
        </Link>
      </Button> */}

      {/* <Button
        onClick={handleClick}
        disabled={reqStatus === 'requesting'}
        className={cn(
          'px-8 h-8 mx-20 xl:h-10 text-base col-span-2',
          'min-[456px]:col-span-1 min-[456px]:mx-0',
        )}
      >
        Try it!
      </Button> */}
    </div>
  );
}
