import { cn } from '@/common/lib/utils';

export default function Loading({ className }: { className?: string }) {
  return (
    <span className={cn('flex gap-1 justify-center mt-4', className)}>
      <div
        className={cn('h-2 w-2 rounded-full bg-foreground', 'animate-bounce')}
      ></div>
      <div
        className={cn(
          'h-2 w-2 rounded-full bg-foreground',
          'animate-bounce delay-150',
        )}
      ></div>
      <div
        className={cn(
          'h-2 w-2 rounded-full bg-foreground',
          'animate-bounce delay-300',
        )}
      ></div>
    </span>
  );
}
