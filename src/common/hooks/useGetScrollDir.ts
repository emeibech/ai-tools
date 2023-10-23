import { useEffect, useState } from 'react';
import type { ScrollDirection } from '@/types/hooks';

export default function useGetScrollDir() {
  const [scrollDir, setScrollDir] = useState<ScrollDirection>('down');

  useEffect(() => {
    console.log('useGetScrollDirection Effect');

    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (prevScrollPos > currentScrollPos) {
        setScrollDir('up');
      } else {
        setScrollDir('down');
      }
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      console.log('getScrollRemoved');
    };
  }, []);

  return { scrollDir, setScrollDir };
}
