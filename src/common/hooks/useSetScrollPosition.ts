import { useEffect } from 'react';
import { setScrollPosition } from '@/features/scrollPosition/scrollPositionSlice';
import { useAppDispatch } from '@/app/hooks';
import type { Route } from '@/types/features';

export default function useSetScrollPosition(route: Route) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    function handleScroll() {
      dispatch(setScrollPosition({ route, position: window.scrollY }));
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch, route]);
}
