import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/common/components/ui/sheet';
import type { ConversationsSheet } from '@/types/features';
import Conversations from './Conversations';
import { useState } from 'react';
import { Separator } from '@/common/components/ui/separator';

export default function ConversationsSheet({
  name,
  side,
  className,
  children,
}: ConversationsSheet) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side={side}
        className={className}
        /* These two props prevent default behaviors that triggers when pressing
        enter when editing conversation title */
        onCloseAutoFocus={(event) => event.preventDefault()}
        onOpenAutoFocus={(event) => event.preventDefault()}
        onFocus={(event) => event.currentTarget.blur()}
      >
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
