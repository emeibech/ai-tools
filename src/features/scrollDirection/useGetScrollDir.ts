import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { direction, setScrollDir } from './scrollDirectionSlice';

export default function useGetScrollDir() {
  const scrollDirection = useAppSelector(direction);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('useGetScrollDirection Effect');
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (prevScrollPos > currentScrollPos) {
        dispatch(setScrollDir('up'));
      } else {
        dispatch(setScrollDir('down'));
      }
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch]);

  return scrollDirection;
}
