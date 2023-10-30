import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '@/app/hooks';
import { setCurrentRoute } from '@/features/currentRoute/currentRouteSlice';
import type { Route } from '@/types/features';

export default function useNavigation() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    console.log('useNavigation effect');
    dispatch(setCurrentRoute({ route: location.pathname.slice(1) as Route }));
  }, [dispatch, location.pathname]);
}
