import { useEffect } from 'react';
import { useAppDispatch } from '@/app/hooks';
import {
  turnOffDarkmode,
  turnOnDarkmode,
} from '@/features/darkmode/darkmodeSlice';
import ls from 'localstorage-slim';
import { clientStatusSet } from '@/features/client/clientSlice';
import type { Client } from '@/types/features';

export default function useSetLocalStorageData() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    function instanceOfClient(object: unknown): object is Client {
      return (
        typeof object === 'object' &&
        object !== null &&
        'userStatus' in object &&
        'act' in object
      );
    }

    const darkmode = ls.get('darkmode');
    const clientStatus = ls.get('clientStatus');

    if (darkmode !== null && typeof darkmode === 'boolean') {
      dispatch(darkmode ? turnOnDarkmode() : turnOffDarkmode());
    }

    if (instanceOfClient(clientStatus)) {
      dispatch(clientStatusSet(clientStatus));
    }
  }, [dispatch]);
}
