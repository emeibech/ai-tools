import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEffect } from 'react';
import useGetScrollDir from '@/common/hooks/useGetScrollDir';
import useAutoScroll from '@/common/hooks/useAutoScroll';
import { handleCatchError } from '@/common/lib/utils';
import { getResponsesActions } from '@/features/tools/toolsSlicesUtils';
import type { ApiArgs } from '@/types/features';
import {
  getStatusActions,
  getStatusState,
} from '../requestStatus/requestStatusSlicesUtils';

export default function useApi(apiArgs: ApiArgs) {
  const status = useAppSelector(getStatusState(apiArgs.name));
  const dispatch = useAppDispatch();
  const { scrollDir, setScrollDir } = useGetScrollDir();
  const setChunkSentCount = useAutoScroll({ status, scrollDir });

  useEffect(() => {
    console.log('useApi effect');
    const { route, name, prompt, submitCount } = apiArgs;
    const { responseAppended } = getResponsesActions(route);
    const statusChanged = getStatusActions(name);
    const baseUrl = import.meta.env.VITE_AI_URL;
    const url = `${baseUrl}/${route}`;
    const body = [{ role: 'user', content: prompt }];
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

        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
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
          dispatch(statusChanged('idle'));
        }
      } catch (error) {
        console.log('catch error');
        handleCatchError(error);
      }
    }

    if (submitCount > 0) {
      setScrollDir('down');
      dispatch(statusChanged('requesting'));
      streamData();
    }
  }, [dispatch, setChunkSentCount, setScrollDir, apiArgs]);
}
