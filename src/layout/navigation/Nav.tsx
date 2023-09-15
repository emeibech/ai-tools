import { useAppSelector } from '@/app/hooks';
import { cn, generateKeys, scrollWindowTo } from '@/common/lib/utils';
import {
  type ScrollPositions,
  type Route,
  positions,
} from '@/features/scrollPosition/scrollPositionSlice';
import { Link } from 'react-router-dom';

function formatPath(path: string) {
  return path.toLowerCase().replace(/\s/g, '');
}

const navList = [
  'Code Analyzer',
  'Coding Assistant',
  'Eli5',
  'Story Generator',
  'Tone Changer',
  'General Assistant',
];

const keys = generateKeys(navList);

export interface HandleClickParams {
  item: Route;
  scrollPositions: ScrollPositions;
}

function handleClick({ item, scrollPositions }: HandleClickParams) {
  const top = scrollPositions[item];
  scrollWindowTo({ top });
}

export default function Nav() {
  const scrollPositions = useAppSelector(positions);

  const listItems = navList.map((item, index) => (
    <li
      key={keys[index]}
      className={cn('flex flex-col gap-1 cursor-pointer', 'lg:gap-2')}
      onClick={() =>
        handleClick({ item: formatPath(item) as Route, scrollPositions })
      }
    >
      <Link
        className={cn('px-4 py-2 rounded text-sm', 'hover:bg-secondary')}
        to={formatPath(item)}
      >
        {item}
      </Link>
    </li>
  ));

  return (
    <nav className={cn('lg:px-6')}>
      <ul>{listItems}</ul>
    </nav>
  );
}
