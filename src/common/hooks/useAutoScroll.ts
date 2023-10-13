import { useEffect, useState } from 'react';
import { scrollToBottom } from '../lib/utils';
import { type ScrollDirection } from './useGetScrollDir';

export interface AutoScrollArgs {
  isDone: boolean;
  scrollDir: ScrollDirection;
}

export default function useAutoScroll({ isDone, scrollDir }: AutoScrollArgs) {
  const [chunkSentCount, setChunkSentCount] = useState(0);

  useEffect(() => {
    console.log('autoScroll effect');
    const isScrolling = chunkSentCount > 0;

    if (!isDone && scrollDir === 'down' && isScrolling) scrollToBottom();
  }, [isDone, scrollDir, chunkSentCount]);

  return setChunkSentCount;
}
