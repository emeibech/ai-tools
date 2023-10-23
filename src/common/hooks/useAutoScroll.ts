import { useEffect, useState } from 'react';
import { scrollToBottom } from '../lib/utils';
import { type ScrollDirection } from './useGetScrollDir';
import { Status } from '@/features/chats/useChatApi';

export interface AutoScrollArgs {
  status: Status;
  scrollDir: ScrollDirection;
}

export default function useAutoScroll({ status, scrollDir }: AutoScrollArgs) {
  const [chunkSentCount, setChunkSentCount] = useState(0);

  useEffect(() => {
    console.log('autoScroll effect');
    const isScrolling = chunkSentCount > 0;

    if (status === 'streaming' && scrollDir === 'down' && isScrolling) {
      scrollToBottom();
    }
  }, [status, scrollDir, chunkSentCount]);

  return setChunkSentCount;
}
