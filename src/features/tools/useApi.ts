import { useAppDispatch } from '@/app/hooks';
import { useEffect, useState } from 'react';
import useGetScrollDir from '@/common/hooks/useGetScrollDir';
import useAutoScroll from '@/common/hooks/useAutoScroll';
import { handleCatchError } from '@/common/lib/utils';
import {
  type Tool,
  getResponsesActions,
} from '@/features/tools/toolsSlicesUtils';

export interface ApiArgs {
  code: string;
  route: Tool;
  submitCount: number;
}

export default function useApi(apiArgs: ApiArgs) {
  const [isDone, setIsDone] = useState(true);
  const dispatch = useAppDispatch();
  const scrollDirection = useGetScrollDir();
  const setChunkSentCount = useAutoScroll({ isDone, scrollDirection });

  useEffect(() => {
    console.log('useApi effect');
    const { route, code, submitCount } = apiArgs;
    const { responseAppended } = getResponsesActions(route);
    const baseUrl = import.meta.env.VITE_AI_URL;
    const url = `${baseUrl}/${route}`;
    const body = [{ role: 'user', content: code }];
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
          setIsDone(true);
        }
      } catch (error) {
        console.log('catch error');
        handleCatchError(error);
      }
    }

    if (submitCount > 0) {
      setIsDone(false);
      streamData();
    }
  }, [dispatch, setChunkSentCount, apiArgs]);
}
