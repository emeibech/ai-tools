import { useEffect, useRef } from 'react';
import { isLocalStorageAvailable } from '../lib/utils';
import { useAppDispatch } from '@/app/hooks';
import {
  turnOffDarkmode,
  turnOnDarkmode,
} from '@/features/darkmode/darkmodeSlice';
import {
  remainingUsageSet,
  timestampSet,
} from '@/features/rateLimiterSlice/rateLimiterSlice';

export default function useSetLocalStorageData() {
  const darkmodeDefault = false;
  const remainingUsageDefault = 5;
  const timestampDefault = null;
  const lsDarkmode = useRef<boolean>(darkmodeDefault);
  const lsRemainingUsage = useRef<number>(remainingUsageDefault);
  const lsTimestamp = useRef<number | null>(timestampDefault);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('useSetLocalStorageData');
    function setLSData() {
      if (isLocalStorageAvailable()) {
        const darkmode = localStorage.getItem('darkmode');
        const remainingUsage = localStorage.getItem('remainingUsage');
        const timestamp = localStorage.getItem('timestamp');
        lsDarkmode.current = darkmode ? JSON.parse(darkmode) : darkmodeDefault;
        lsRemainingUsage.current = remainingUsage
          ? JSON.parse(remainingUsage)
          : remainingUsageDefault;
        lsTimestamp.current = timestamp
          ? JSON.parse(timestamp)
          : timestampDefault;
      }

      dispatch(lsDarkmode.current ? turnOnDarkmode() : turnOffDarkmode());
      dispatch(remainingUsageSet(lsRemainingUsage.current));
      dispatch(timestampSet(lsTimestamp.current));
    }

    setLSData();
  }, [dispatch, darkmodeDefault]);
}
