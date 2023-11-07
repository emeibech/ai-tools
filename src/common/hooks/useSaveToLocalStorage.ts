import { useEffect, useRef } from 'react';
import { isLocalStorageAvailable } from '../lib/utils';
import { useAppSelector } from '@/app/hooks';
import { darkModeStatus } from '@/features/darkmode/darkmodeSlice';
import { apiCallCounter } from '@/features/apiCallCounter/apiCallCounterSlice';

export default function useSaveToLocalStorage() {
  const darkmode = useAppSelector(darkModeStatus);
  const { count, timestamp } = useAppSelector(apiCallCounter);

  /* Why mountCounter? To avoid darkmode state from resetting to default, which
  is defined in the slice. This ensures the effect saves to local storage only
  after the initial render, ignoring the first one. */
  const mountCounter = useRef<number>(0);

  useEffect(() => {
    console.log('useSaveToLocalStorage');

    function saveToLocalStorage() {
      /* Because of react's StrictMode, everything renders twice
      in development on first mount to help catch potential bugs. Change the 
      mountCounter.current > 1 condition to mountCounter > 0 in production. */
      if (isLocalStorageAvailable() && mountCounter.current > 1) {
        localStorage.setItem('darkmode', darkmode.toString());
        localStorage.setItem('count', count.toString());
        localStorage.setItem(
          'timestamp',
          timestamp ? timestamp.toString() : 'null',
        );
      }
    }

    saveToLocalStorage();
    mountCounter.current += 1;
  }, [darkmode, count, timestamp]);
}
