import { useState } from 'react';
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
import type { NavigationSheetProps } from '@/types/layout';

export default function NavigationSheet({
  side,
  className,
}: NavigationSheetProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
      <SheetTrigger asChild>
        <HamburgerBtn />
      </SheetTrigger>
      <SheetContent
        side={side}
        className={cn(
          className,
          'grid grid-flow-row grid-rows-[1fr_6fr_1fr] py-4',
        )}
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
