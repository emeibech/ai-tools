import { cn } from '@/common/lib/utils';
import { InfoClusterProps } from '@/types/routes';

export default function InfoCluster({
  className,
  ariaLabel,
  role,
  children,
}: InfoClusterProps) {
  return (
    <div
      className={cn(
        `${className}`,
        'flex flex-col mx-auto max-w-[640px] gap-2',
        '2xl:min-h-[180px] text-lg',
      )}
      aria-label={ariaLabel}
      role={role}
    >
      {children}
    </div>
  );
}
