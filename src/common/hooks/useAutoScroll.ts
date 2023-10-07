import { useAppSelector } from '@/app/hooks';
import { direction } from '@/features/scrollDirection/scrollDirectionSlice';
import { useEffect, useState } from 'react';
import { scrollToBottom } from '../lib/utils';

export default function useAutoScroll(isDone: boolean) {
  const [chunkCount, setChunkCount] = useState(0);
  const scrollDirection = useAppSelector(direction);

  useEffect(() => {
    console.log('autoScroll effect');
    if (!isDone && scrollDirection === 'down' && chunkCount > 0) {
      scrollToBottom();
    }
  }, [isDone, scrollDirection, chunkCount]);

  return setChunkCount;
}
