import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { cn } from '../common/lib/utils';
import Header from '../layout/header/Header';
import Nav from '../layout/navigation/Nav';
import SiteTitle from '../layout/header/SiteTitle';
import './App.css';
import useDarkmodeToggler from '@/common/hooks/useDarkmodeToggler';
import useSetLocalStorageData from '@/common/hooks/useSetLocalStorageData';
import useSaveToLocalStorage from '@/common/hooks/useSaveToLocalStorage';
import Logout from '@/features/client/Logout';
import { Toaster } from '@/common/components/ui/toaster';

export default function App({ children }: { children?: ReactNode }) {
  useSaveToLocalStorage();
  useSetLocalStorageData();
  useDarkmodeToggler();

  return (
    <div
      className={cn(
        'bg-background text-foreground',
        'lg:grid lg:grid-cols-[260px_1fr] 2xl:grid-cols-[260px_1fr_88px]',
      )}
    >
      <Header
        className={cn(
          'col-start-2 bg-background',
          'fixed top-0 z-20 min-w-full',
          'grid grid-cols-2',
        )}
      />

      <section
        className={cn(
          'hidden col-start-1 row-span-3 bg-muted min-h-screen',
          'lg:block',
        )}
      >
        <div
          className={cn(
            'lg:fixed lg:min-w-[260px] min-h-screen',
            'grid grid-flow-row grid-rows-[30px_1fr] py-4',
          )}
        >
          <SiteTitle />
          <Nav />
          <Logout />
        </div>
      </section>

      <Outlet />
      {children}
      <Toaster
        duration={3000}
        className={cn(
          'text-destructive-foreground bg-destructive',
          'opacity-95',
        )}
      />
    </div>
  );
}
