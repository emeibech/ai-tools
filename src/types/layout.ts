import type { Route, ScrollPositions } from './features';

// Generic prop containing className
export interface ClassName {
  className?: string;
}

// SiteTitle
export interface SiteTitleProps {
  setIsOpen?: (param: boolean) => void;
}

// NavigationSheet
export interface NavigationSheetProps {
  side?: 'top' | 'bottom' | 'left' | 'right' | null | undefined;
  className?: string;
}

// Nav
export interface GenerateListJsx {
  nav: string[];
  keys: string[];
  scrollPositions: ScrollPositions;
  setIsOpen?: (param: boolean) => void;
}

export interface HandleClickParams {
  item: Route;
  scrollPositions: ScrollPositions;
}

export interface NavProps {
  setIsOpen?: (param: boolean) => void;
}
