import { useEffect, useRef } from 'react';

export default function useResizeListener(callback: () => void | unknown) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    function handleResize() {
      console.log('resized');
      callbackRef.current();
    }

    window.addEventListener('resize', handleResize);

    return () => {
      console.log('useResizeListener cleanup');
      window.removeEventListener('resize', handleResize);
    };
  }, []);
}
