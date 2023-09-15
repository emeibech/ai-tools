import { cn } from '@/common/lib/utils';
import { Link } from 'react-router-dom';

export default function SiteTitle({ onClick }: { onClick: () => void }) {
  return (
    <h1
      onClick={onClick}
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
