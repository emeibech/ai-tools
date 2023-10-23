import { cn } from '@/common/lib/utils';
import SiteTitle from './SiteTitle';
import NavigationSheet from '../navigation/NavigationSheet';
import { MoonIcon, SunIcon } from '@/common/components/ui/Icons';
import { Button } from '@/common/components/ui/button';
import { Separator } from '@/common/components/ui/separator';
import { useAppSelector } from '@/app/hooks';
import {
  darkModeStatus,
  turnOffDarkmode,
  turnOnDarkmode,
} from '@/features/darkmode/darkmodeSlice';
import { useDispatch } from 'react-redux';
import type { ClassName } from '@/types/layout';

export default function Header({ className }: ClassName) {
  const darkmode = useAppSelector(darkModeStatus);
  const dispatch = useDispatch();

  function handleClickTheme(mode: boolean) {
    if (mode) {
      dispatch(turnOffDarkmode());
    } else {
      dispatch(turnOnDarkmode());
    }
  }

  return (
    <header className={cn(className)}>
      <section className={cn('flex items-center gap-2', 'lg:hidden')}>
        <NavigationSheet
          side="left"
          className={cn(
            darkmode ? 'dark' : '',
            'w-[240px] min-[360px]:w-[280px]',
            'text-foreground bg-background',
          )}
          data-darkmode={darkmode}
        />
        <SiteTitle />
      </section>
      <Button
        onClick={() => handleClickTheme(darkmode)}
        variant="ghost"
        type="button"
        className={cn(
          'px-2 justify-self-end',
          'lg:fixed lg:mx-6 lg:mt-4',
          'focus-visible:ring-offset-0',
        )}
      >
        {darkmode ? <SunIcon height="24px" /> : <MoonIcon height="24px" />}
      </Button>

      <Separator className={cn('col-span-2', 'lg:hidden')} />
    </header>
  );
}
