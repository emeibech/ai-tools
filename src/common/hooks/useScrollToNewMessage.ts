import { useEffect, useRef } from 'react';
import { Messages } from '@/features/chatInterface/ChatInterface';

export default function useScrollToNewMessage(messages: Messages[]) {
  const messagesRef = useRef<Map<string, HTMLElement>>(new Map());

  function getMap() {
    if (!messagesRef.current) {
      messagesRef.current = new Map();
    }
    return messagesRef.current;
  }

  useEffect(() => {
    function scrollToId(itemId: string) {
      const map = getMap();
      const node = map.get(itemId);
      node?.scrollIntoView({ behavior: 'smooth' });
    }

    if (messages) scrollToId(messages[messages.length - 1]?.id);
  }, [messages]);

  return getMap;
}
