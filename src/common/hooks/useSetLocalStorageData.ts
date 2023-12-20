import { useEffect, useRef } from 'react';
import { isLocalStorageAvailable } from '../lib/utils';
import { useAppDispatch } from '@/app/hooks';
import {
  turnOffDarkmode,
  turnOnDarkmode,
} from '@/features/darkmode/darkmodeSlice';
import { clientStatusSet } from '@/features/client/clientSlice';
import type { Client } from '@/types/features';

const darkmodeDefault = false;
const clientStatusDefault: Client = { userStatus: 'guest', act: null };

export default function useSetLocalStorageData() {
  const lsDarkmode = useRef<boolean>(darkmodeDefault);
  const lsClientStatus = useRef<Client>(clientStatusDefault);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('useSetLocalStorageData');
    function setLSData() {
      if (isLocalStorageAvailable()) {
        const darkmode = localStorage.getItem('darkmode');
        const clientStatus = localStorage.getItem('clientStatus');
        lsDarkmode.current = darkmode ? JSON.parse(darkmode) : darkmodeDefault;
        lsClientStatus.current = clientStatus
          ? JSON.parse(clientStatus)
          : clientStatusDefault;
      }

      dispatch(lsDarkmode.current ? turnOnDarkmode() : turnOffDarkmode());
      dispatch(clientStatusSet(lsClientStatus.current));
    }

    setLSData();
  }, [dispatch]);
}
