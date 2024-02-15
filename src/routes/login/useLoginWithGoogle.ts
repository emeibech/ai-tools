import { useAppDispatch } from '@/app/hooks';
import { useToast } from '@/common/components/ui/use-toast';
import { clientStatusSet } from '@/features/client/clientSlice';
import { ReqStatus } from '@/types/routes';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

const baseUrl = import.meta.env.VITE_SERVER_URL;

export default function useLoginWithGoogle() {
  const [reqStatus, setReqStatus] = useState<ReqStatus>('idle');
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  useEffect(() => {
    async function login() {
      const response = await fetch(`${baseUrl}/auth/googlelogin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user?.email }),
        credentials: 'include',
      });

      if (!response.ok) {
        setReqStatus('error');
        toast({
          title: 'Error',
          description: 'An error occured while authenticating with Google',
        });

        return;
      }

      dispatch(clientStatusSet('user'));
      setReqStatus('success');
    }

    if (isAuthenticated) {
      setReqStatus('requesting');
      login();
    }
  }, [dispatch, toast, isAuthenticated, user]);

  return { reqStatus };
}
