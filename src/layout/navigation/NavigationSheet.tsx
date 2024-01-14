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
import Logout from '../../features/client/Logout';

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
        onCloseAutoFocus={(event) => event.preventDefault()}
        onOpenAutoFocus={(event) => event.preventDefault()}
        onFocus={(event) => event.currentTarget.blur()}
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
        <Logout />
        <Footer />
      </SheetContent>
    </Sheet>
  );
}
