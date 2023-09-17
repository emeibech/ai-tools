import { useAppSelector } from '@/app/hooks';
import { cn, scrollWindowTo } from '@/common/lib/utils';
import { positions } from '@/features/scrollPosition/scrollPositionSlice';
import { Link } from 'react-router-dom';

function handleClick(top: number) {
  scrollWindowTo({ top });
}

export default function SiteTitle() {
  const { home } = useAppSelector(positions);
  return (
    <h1
      onClick={() => handleClick(home)}
      data-name="site-name"
      className={cn(
        'text-xl text-left font-bold rounded-md px-2',
        'lg:text-2xl lg:px-6 lg:py-1',
      )}
    >
      <Link to={'/'} className="p-1">
        emeibech<span className="ml-1">ai</span>
      </Link>
    </h1>
  );
}
