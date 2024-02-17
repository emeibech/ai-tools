import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/common/components/ui/sheet';
import type { ConversationsSheet } from '@/types/features';
import Conversations from './Conversations';
import { type KeyboardEvent, useState } from 'react';
import { Separator } from '@/common/components/ui/separator';

export default function ConversationsSheet({
  name,
  side,
  className,
  children,
}: ConversationsSheet) {
  const [isOpen, setIsOpen] = useState(false);

  function handleKeyUp(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'Enter' || event.key === ' ') setIsOpen(true);
  }

  return (
    <Sheet open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
      <SheetTrigger asChild onKeyUp={handleKeyUp}>
        {children}
      </SheetTrigger>
      <SheetContent side={side} className={className}>
        <SheetHeader>
          <h3 className="text-lg sm:text-2xl font-medium my-4 py-4">
            Conversations
          </h3>
          <Separator decorative />
        </SheetHeader>
        <Conversations name={name} setIsOpen={setIsOpen} />
      </SheetContent>
    </Sheet>
  );
}
