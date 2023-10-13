import { useAppSelector } from '@/app/hooks';
import { darkModeStatus } from '@/features/darkmode/darkmodeSlice';
import { useEffect } from 'react';

export default function useDarkmodeToggler() {
  const darkmode = useAppSelector(darkModeStatus);

  useEffect(() => {
    console.log('darkmode toggler');
    if (darkmode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkmode]);
}
