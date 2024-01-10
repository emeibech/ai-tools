import { useAppDispatch } from '@/app/hooks';
import { useToast } from '@/common/components/ui/use-toast';
import { clientStatusSet } from '@/features/client/clientSlice';
import { ReqStatus } from '@/types/routes';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

const baseUrl = import.meta.env.VITE_AI_URL;

export default function useLoginWithGoogle() {
  const [reqStatus, setReqStatus] = useState<ReqStatus>('idle');
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  useEffect(() => {
    async function login() {
      const response = await fetch(`${baseUrl}/auth/googlelogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user?.email }),
      });

      if (!response.ok) {
        setReqStatus('error');
        toast({
          title: 'Error',
          description: 'An error occured while authenticating with Google',
        });

        return;
      }

      const data = await response.json();
      dispatch(clientStatusSet({ userStatus: 'user', act: data.act }));
      setReqStatus('success');
    }

    if (isAuthenticated) {
      setReqStatus('requesting');
      login();
    }
  }, [dispatch, toast, isAuthenticated, user]);

  return { reqStatus };
}
