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

  useEffect(() => {
    console.log('autoScroll effect');
    const isScrolling = chunkSentCount > 0;

    if (!isDone && scrollDirection === 'down' && isScrolling) scrollToBottom();
  }, [isDone, scrollDirection, chunkSentCount]);

  return setChunkSentCount;
}
