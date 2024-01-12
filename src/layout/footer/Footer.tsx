import { cn } from '@/common/lib/utils';
import { ClassName } from '@/types/layout';

export default function Footer({ className }: ClassName) {
  return (
    <footer
      className={cn(
        className,
        'text-xs text-muted-foreground text-center row-start-4',
        'self-end',
      )}
    >
      <article>Copyright © 2024 emeibech AI.</article>
      <article>All rights reserved.</article>
    </footer>
  );
}
