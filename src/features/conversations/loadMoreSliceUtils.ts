import {
  caLastConveresationSet,
  caLoadMore,
  caNextPageIncremented,
  gaLastConveresationSet,
  gaLoadMore,
  gaNextPageIncremented,
  eli5LastConveresationSet,
  eli5LoadMore,
  eli5NextPageIncremented,
} from './loadMoreSlice';
import type { Name } from '@/types/features';

export function getLoadMoreState(name: Name) {
  if (name === 'Code Analyzer') return caLoadMore;
  if (name === 'General Assistant') return gaLoadMore;
  return eli5LoadMore;
}

export function getLoadMoreActions(name: Name) {
  if (name === 'Code Analyzer')
    return {
      lastConveresationSet: caLastConveresationSet,
      nextPageIncremented: caNextPageIncremented,
    };

  if (name === 'General Assistant')
    return {
      nextPageIncremented: gaNextPageIncremented,
      lastConveresationSet: gaLastConveresationSet,
    };
  return {
    nextPageIncremented: eli5NextPageIncremented,
    lastConveresationSet: eli5LastConveresationSet,
  };
}
