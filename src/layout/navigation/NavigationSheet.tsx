import { cn } from '@/common/lib/utils';
import Footer from '../footer/Footer';
import HamburgerBtn from '../header/HamburgerBtn';
import SiteTitle from '../header/SiteTitle';
import Nav from './Nav';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/common/components/ui/sheet';
import { useState } from 'react';

export default function NavigationSheet(props: {
  side?: 'top' | 'bottom' | 'left' | 'right' | null | undefined;
  className?: string;
  'data-darkmode': boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
      <SheetTrigger asChild>
        <HamburgerBtn />
      </SheetTrigger>
      <SheetContent
        side={props.side}
        className={cn(
          props.className,
          'grid grid-flow-row grid-rows-[1fr_6fr_1fr] py-4',
        )}
        data-darkmode={props['data-darkmode']}
      >
        <SheetHeader>
          <SiteTitle setIsOpen={setIsOpen} />
        </SheetHeader>
        <Nav setIsOpen={setIsOpen} />
        <Footer />
      </SheetContent>
    </Sheet>
  );
}
