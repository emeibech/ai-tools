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

interface GenerateListJsx {
  nav: string[];
  keys: string[];
  scrollPositions: ScrollPositions;
  setIsOpen?: (param: boolean) => void;
}

function generateListJsx({
  nav,
  keys,
  setIsOpen,
  scrollPositions,
}: GenerateListJsx) {
  return nav.map((item, index) => (
    <li
      key={keys[index]}
      className={cn('flex flex-col gap-1 cursor-pointer', 'lg:gap-2')}
      onClick={() => {
        handleClick({ item: formatPath(item) as Route, scrollPositions });
        if (setIsOpen) setIsOpen(false);
      }}
    >
      <Link
        className={cn('px-4 py-2 rounded text-sm', 'hover:bg-secondary')}
        to={formatPath(item)}
      >
        {item}
      </Link>
    </li>
  ));
}

const toolsNav = ['Code Analyzer', 'Story Generator', 'Tone Changer'];
const toolsKeys = generateKeys(toolsNav);
const chatsNav = ['Coding Assistant', 'General Assistant', 'Eli5'];
const chatsKeys = generateKeys(chatsNav);

export interface HandleClickParams {
  item: Route;
  scrollPositions: ScrollPositions;
}

function handleClick({ item, scrollPositions }: HandleClickParams) {
  const top = scrollPositions[item];
  scrollWindowTo({ top });
}

export interface NavProps {
  setIsOpen?: (param: boolean) => void;
}

export default function Nav({ setIsOpen }: NavProps) {
  const scrollPositions = useAppSelector(positions);

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

  return (
    <nav className={cn('flex flex-col gap-8', 'lg:px-6')}>
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-muted-foreground px-4">
          Tools
        </h3>
        <ul>{tools}</ul>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-muted-foreground px-4">
          Chats
        </h3>
        <ul>{chats}</ul>
      </div>
    </nav>
  );
}
