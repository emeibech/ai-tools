import { getStatusState } from './requestStatusSlicesUtils';
import { useAppSelector } from '@/app/hooks';
import type { RequestIndicatorProps, Status } from '@/types/features';

export default function RequestIndicator({
  name,
  hideStreamIndicator = false,
}: RequestIndicatorProps) {
  const requestStatus = useAppSelector(getStatusState(name));
  return <>{renderStatus(requestStatus, hideStreamIndicator)}</>;
}

function renderStatus(status: Status, hideStreamIndicator: boolean) {
  if (status === 'idle') return null;
  if (status === 'requesting') {
    return (
      <article className="flex items-center gap-2">
        Generating Response
        <div className="h-3 w-3 bg-foreground animate-spin"></div>
      </article>
    );
  }
  if (status === 'streaming' && !hideStreamIndicator) {
    return (
      <span className="bg-foreground ml-2 text-xs rounded-full animate-ping">
        .....
      </span>
    );
  }
}
