import { useRef } from 'react';

export default function useScrollToNewMessage() {
  const messagesRef = useRef<Map<string, HTMLElement>>(new Map());

  function getMap() {
    if (!messagesRef.current) {
      messagesRef.current = new Map();
    }
    return messagesRef.current;
  }

  function scrollToId(itemId: string) {
    const map = getMap();
    const node = map.get(itemId);
    node?.scrollIntoView({ behavior: 'smooth' });
  }

  return { messagesRef, getMap, scrollToId };
}
