import { useEffect, useRef } from 'react';
import { isLocalStorageAvailable } from '../lib/utils';
import { useAppDispatch } from '@/app/hooks';
import {
  turnOffDarkmode,
  turnOnDarkmode,
} from '@/features/darkmode/darkmodeSlice';
import {
  counterSet,
  timestampSet,
} from '@/features/apiCallCounter/apiCallCounterSlice';

export default function useSetLocalStorageData() {
  const darkmodeDefault = false;
  const countDefault = 0;
  const timestampDefault = null;
  const lsDarkmode = useRef<boolean>(darkmodeDefault);
  const lsCount = useRef<number>(countDefault);
  const lsTimestamp = useRef<number | null>(timestampDefault);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('useSetLocalStorageData');
    function setDarkmode() {
      if (isLocalStorageAvailable()) {
        const darkmode = localStorage.getItem('darkmode');
        const count = localStorage.getItem('count');
        const timestamp = localStorage.getItem('timestamp');
        lsDarkmode.current = darkmode ? JSON.parse(darkmode) : darkmodeDefault;
        lsCount.current = count ? JSON.parse(count) : countDefault;
        lsTimestamp.current = timestamp
          ? JSON.parse(timestamp)
          : timestampDefault;
      }

      dispatch(lsDarkmode.current ? turnOnDarkmode() : turnOffDarkmode());
      dispatch(counterSet(lsCount.current));
      dispatch(timestampSet(lsTimestamp.current));
    }

    window.addEventListener('DOMContentLoaded', setDarkmode);

    return () => window.removeEventListener('DOMContentLoaded', setDarkmode);
  }, [dispatch, darkmodeDefault]);
}
