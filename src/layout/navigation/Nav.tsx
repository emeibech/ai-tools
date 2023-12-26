import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { cn, generateKeys, scrollWindowTo } from '@/common/lib/utils';
import { positions } from '@/features/scrollPosition/scrollPositionSlice';
import { Link } from 'react-router-dom';
import {
  currentRoute,
  setCurrentRoute,
} from '@/features/currentRoute/currentRouteSlice';
import useNavigation from '@/common/hooks/useNavigation';
import type { Route } from '@/types/features';
import type {
  GenerateListJsx,
  HandleClickParams,
  NavProps,
} from '@/types/layout';

const toolsNav = ['Code Analyzer', 'Story Generator', 'Tone Changer'];
const toolsKeys = generateKeys(toolsNav);
const chatsNav = ['Coding Assistant', 'General Assistant', 'Eli5'];
const chatsKeys = generateKeys(chatsNav);

export default function Nav({ setIsOpen }: NavProps) {
  const scrollPositions = useAppSelector(positions);
  const selectedRoute = useAppSelector(currentRoute);
  const dispatch = useAppDispatch();

  useNavigation();

  const tools = generateListJsx({
    scrollPositions,
    setIsOpen,
    nav: toolsNav,
    keys: toolsKeys,
  });

  const chats = generateListJsx({
    scrollPositions,
    setIsOpen,
    nav: chatsNav,
    keys: chatsKeys,
  });

  function generateListJsx({
    nav,
    keys,
    setIsOpen,
    scrollPositions,
  }: GenerateListJsx) {
    const links = nav.map((item, index) => {
      const route = formatPath(item);
      return (
        <li
          key={keys[index]}
          className={cn('flex flex-col gap-1 cursor-pointer', 'lg:gap-2')}
          onClick={() => {
            handleClick({ item: route, scrollPositions });
            dispatch(setCurrentRoute({ route }));
            if (setIsOpen) setIsOpen(false);
          }}
        >
          <Link
            className={cn(
              selectedRoute === route ? 'bg-secondary' : '',
              'px-4 py-2 rounded text-sm',
              'hover:bg-secondary active:bg-secondary',
            )}
            to={formatPath(item)}
          >
            {item}
          </Link>
        </li>
      );
    });

    return links;
  }

  return (
    <nav className={cn('flex flex-col gap-8 px-0 lg:px-6')}>
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-muted-foreground px-4">
          Tools
        </h3>
        <ul className="flex flex-col gap-0.5">{tools}</ul>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-muted-foreground px-4">
          Chats
        </h3>
        <ul className="flex flex-col gap-0.5">{chats}</ul>
      </div>
    </nav>
  );
}

function formatPath(path: string) {
  return path.toLowerCase().replace(/\s/g, '') as Route;
}

function handleClick({ item, scrollPositions }: HandleClickParams) {
  const top = scrollPositions[item];
  scrollWindowTo({ top });
}
