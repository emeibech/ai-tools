import { useEffect, useState } from 'react';
import { scrollToBottom } from '../lib/utils';
import type { AutoScrollArgs } from '@/types/hooks';

export default function useAutoScroll({ status, scrollDir }: AutoScrollArgs) {
  const [chunkSentCount, setChunkSentCount] = useState(0);

  useEffect(() => {
    const isScrolling = chunkSentCount > 0;

    if (status === 'streaming' && scrollDir === 'down' && isScrolling) {
      scrollToBottom();
    }
  }, [status, scrollDir, chunkSentCount]);

  return setChunkSentCount;
}
