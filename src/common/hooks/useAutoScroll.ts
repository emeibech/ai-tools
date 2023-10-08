import { useEffect, useState } from 'react';
import { scrollToBottom } from '../lib/utils';
import { type ScrollDirection } from './useGetScrollDir';

export interface AutoScrollArgs {
  isDone: boolean;
  scrollDirection: ScrollDirection;
}

export default function useAutoScroll({
  isDone,
  scrollDirection,
}: AutoScrollArgs) {
  const [chunkSentCount, setChunkSentCount] = useState(0);
  const isScrolling = chunkSentCount > 0;

  useEffect(() => {
    console.log('autoScroll effect');
    if (!isDone && scrollDirection === 'down' && isScrolling) {
      scrollToBottom();
      console.log(chunkSentCount);
    }
  }, [isDone, scrollDirection, isScrolling, chunkSentCount]);

  return setChunkSentCount;
}
