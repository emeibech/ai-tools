import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { cn } from '../common/lib/utils';
import Header from '../layout/header/Header';
import Nav from '../layout/navigation/Nav';
import SiteTitle from '../layout/header/SiteTitle';
import Footer from '../layout/footer/Footer';
import './App.css';
import useDarkmodeToggler from '@/common/hooks/useDarkmodeToggler';
import useSetLocalStorageData from '@/common/hooks/useSetLocalStorageData';
import useSaveToLocalStorage from '@/common/hooks/useSaveToLocalStorage';
// import useInitialLoad from '@/common/hooks/useInitialLoad';

export default function App({ children }: { children?: ReactNode }) {
  // useInitialLoad();
  useSaveToLocalStorage();
  useSetLocalStorageData();
  useDarkmodeToggler();

  return (
    <div
      className={cn(
        'bg-background text-foreground',
        'lg:grid lg:grid-cols-[260px_1fr_80px]',
      )}
    >
      <Header
        className={cn(
          'col-start-3 row-start-1 row-span-3 bg-background',
          'fixed top-0 z-20 min-w-full',
          'grid grid-cols-2',
          'lg:justify-end lg:static',
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
            'grid grid-flow-row grid-rows-[1fr_6fr_1fr] py-4',
          )}
        >
          <SiteTitle />
          <Nav />
          <Footer />
        </div>
      </section>

      <Outlet />
      {children}
    </div>
  );
}
