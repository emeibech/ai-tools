import { getStatusActions, getStatusState } from './requestStatusSlicesUtils';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Button } from '@/common/components/ui/button';
import type { RequestIndicatorProps, RequestStatus } from '@/types/features';
import { MouseEvent, MouseEventHandler } from 'react';

export default function RequestIndicator({
  name,
  hideStreamIndicator = false,
}: RequestIndicatorProps) {
  const dispatch = useAppDispatch();
  const requestStatus = useAppSelector(getStatusState(name));

  function handleClick(event: MouseEvent) {
    event.preventDefault();
    const statusChanged = getStatusActions(name);
    dispatch(statusChanged('requesting'));
  }

  return <>{renderStatus(requestStatus, hideStreamIndicator, handleClick)}</>;
}

function renderStatus(
  status: RequestStatus,
  hideStreamIndicator: boolean,
  onClick: MouseEventHandler<HTMLButtonElement>,
) {
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

  if (status === 'error') {
    return (
      <div className="min-w-full flex pr-6">
        <Button variant={'outline'} className="m-auto" onClick={onClick}>
          Retry request
        </Button>
      </div>
    );
  }
}
