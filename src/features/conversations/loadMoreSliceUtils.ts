import {
  caLastConversationSet,
  caLoadMore,
  caNextPageIncremented,
  gaLastConversationSet,
  gaLoadMore,
  gaNextPageIncremented,
  eli5LastConversationSet,
  eli5LoadMore,
  eli5NextPageIncremented,
} from './loadMoreSlice';
import type { Name } from '@/types/features';

export function getLoadMoreState(name: Name) {
  if (name === 'Coding Assistant') return caLoadMore;
  if (name === 'General Assistant') return gaLoadMore;
  return eli5LoadMore;
}

export function getLoadMoreActions(name: Name) {
  if (name === 'Coding Assistant')
    return {
      lastConversationSet: caLastConversationSet,
      nextPageIncremented: caNextPageIncremented,
    };

  if (name === 'General Assistant')
    return {
      nextPageIncremented: gaNextPageIncremented,
      lastConversationSet: gaLastConversationSet,
    };
  return {
    nextPageIncremented: eli5NextPageIncremented,
    lastConversationSet: eli5LastConversationSet,
  };
}
