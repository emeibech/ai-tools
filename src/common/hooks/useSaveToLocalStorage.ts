import { useEffect, useRef } from 'react';
import ls from 'localstorage-slim';
import { useAppSelector } from '@/app/hooks';
import { darkModeStatus } from '@/features/darkmode/darkmodeSlice';
import { clientStatus } from '@/features/client/clientSlice';

/* During development, React enforces what's called StrictMode, 
a feature that will render components twice on first mount 
to help catch potential bugs. StrictMode gets removed in the production build 
when you do "npm run build." This means the initMount variable used to check 
for first mount has to change value depending on whether NODE_ENV in .env file is 
set to production or development. */
const applicationMode = import.meta.env.VITE_NODE_ENV;
const initMount = applicationMode === 'production' ? 1 : 2;
ls.config.encrypt = true;

export default function useSaveToLocalStorage() {
  const darkmode = useAppSelector(darkModeStatus);
  const client = useAppSelector(clientStatus);

  /* Why mountCounter? Becase global state will reset to default on page reload. 
  This ensures the effect saves to local storage only
  after the initial render, ignoring the first one, and the second one, too, if 
  NODE_ENV is set to development. */
  const mountCounter = useRef<number>(0);

  useEffect(() => {
    if (mountCounter.current >= initMount) {
      console.log('useSaveToLocalStorage');
      ls.set('darkmode', darkmode);
      ls.set('clientStatus', client);
    }

    mountCounter.current += 1;
  }, [darkmode, client]);
}
