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
  caLoadMoreReset,
  gaLoadMoreReset,
  eli5LoadMoreReset,
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
      loadMoreReset: caLoadMoreReset,
      lastConversationSet: caLastConversationSet,
      nextPageIncremented: caNextPageIncremented,
    };

  if (name === 'General Assistant')
    return {
      loadMoreReset: gaLoadMoreReset,
      nextPageIncremented: gaNextPageIncremented,
      lastConversationSet: gaLastConversationSet,
    };
  return {
    loadMoreReset: eli5LoadMoreReset,
    nextPageIncremented: eli5NextPageIncremented,
    lastConversationSet: eli5LastConversationSet,
  };
}
