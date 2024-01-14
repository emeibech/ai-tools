import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEffect } from 'react';
import useGetScrollDir from '@/common/hooks/useGetScrollDir';
import useAutoScroll from '@/common/hooks/useAutoScroll';
import { getCatchError } from '@/common/lib/utils';
import { getResponsesActions } from '@/features/tools/toolsSlicesUtils';
import type { ApiArgs } from '@/types/features';
import {
  getStatusActions,
  getStatusState,
} from '../requestStatus/requestStatusSlicesUtils';
import { clientStatus, clientStatusReset } from '@/features/client/clientSlice';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/common/components/ui/use-toast';

const baseUrl = import.meta.env.VITE_SERVER_URL;

export default function useApi(apiArgs: ApiArgs) {
  const status = useAppSelector(getStatusState(apiArgs.name));
  const dispatch = useAppDispatch();
  const { scrollDir, setScrollDir } = useGetScrollDir();
  const { userStatus, act } = useAppSelector(clientStatus);
  const setChunkSentCount = useAutoScroll({ status, scrollDir });
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { route, name, prompt } = apiArgs;
    const { responseAppended } = getResponsesActions(route);
    const statusChanged = getStatusActions(name);
    const url = `${baseUrl}/ai/${route}`;
    const body = {
      userContent: [{ role: 'user', content: prompt }],
      act,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    async function streamData() {
      try {
        const response = await fetch(url, requestOptions);
        const decoder = new TextDecoder();
        dispatch(statusChanged('streaming'));

        if (response.status === 401) {
          dispatch(statusChanged('idle'));
          dispatch(clientStatusReset());
          navigate('/login');
          return;
        }

        if (response.status === 429) {
          const data = await response.json();
          toast({ title: 'Error', description: data.message });
          dispatch(statusChanged('error'));

          return;
        }

        if (!response.ok) {
          toast({
            title: 'Error',
            description: `${response.status}: ${response.statusText}. `,
          });

          dispatch(statusChanged('error'));

          return;
        }

        if (response.body) {
          const reader = response.body.getReader();
          let done = false;

          while (!done) {
            const { value, done: readerDone } = await reader.read();

            if (readerDone) {
              done = true;
            } else {
              dispatch(responseAppended(decoder.decode(value)));
              setChunkSentCount((prev) => prev + 1);
            }
          }

          setChunkSentCount(0);
        }

        dispatch(statusChanged('idle'));
      } catch (error) {
        toast({ title: 'Error', description: getCatchError(error) });
        dispatch(statusChanged('error'));
      }
    }

    if (status === 'requesting') {
      setScrollDir('down');
      streamData();
    }
  }, [
    dispatch,
    setChunkSentCount,
    setScrollDir,
    navigate,
    toast,
    apiArgs,
    userStatus,
    act,
    status,
  ]);
}
