import { useEffect } from 'react';
import {
  type Route,
  setScrollPosition,
} from '@/features/scrollPosition/scrollPositionSlice';
import { useAppDispatch } from '@/app/hooks';

export default function useSetScrollPosition(route: Route) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    function handleScroll() {
      dispatch(setScrollPosition({ route, position: window.scrollY }));
      console.log('setScrollPosition effect');
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch, route]);
}
