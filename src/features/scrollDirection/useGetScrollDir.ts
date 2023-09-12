import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  direction,
  setScrollDirDown,
  setScrollDirUp,
} from './scrollDirectionSlice';

export default function useGetScrollDir() {
  const scrollDirection = useSelector(direction);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('useGetScrollDirection Effect');
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (prevScrollPos > currentScrollPos) {
        dispatch(setScrollDirUp());
      } else {
        dispatch(setScrollDirDown());
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
