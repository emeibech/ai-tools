import { useEffect, useRef } from 'react';

const baseUrl = import.meta.env.VITE_AI_URL;
const productionMode = import.meta.env.VITE_NODE_ENV;
const initMount = productionMode === 'production' ? 0 : 1;
const options = { method: 'POST' };

export default function useInitialLoad() {
  const mountCounter = useRef<number>(0);

  useEffect(() => {
    console.log('initialLoad effect');
    console.log(mountCounter);

    if (mountCounter.current >= initMount) {
      try {
        fetch(`${baseUrl}/ai/checkid`, options);
      } catch (error) {
        console.log(`Error: ${error}`);
        throw error;
      }
    }

    mountCounter.current += 1;
  }, []);
}
