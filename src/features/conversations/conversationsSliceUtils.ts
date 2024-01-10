import {
  caConversationRemoved,
  caConversations,
  caActiveConversationSet,
  caConversationsReset,
  caConversationsSet,
  caMsgPushedToAddQ,
  caTitleChanged,
  caAddQCleared,
  caConversationAdded,
  caMsgsFetchStatusSet,
  gaActiveConversationSet,
  gaConversationRemoved,
  gaConversations,
  gaConversationsReset,
  gaConversationsSet,
  gaMsgPushedToAddQ,
  gaTitleChanged,
  gaAddQCleared,
  gaConversationAdded,
  gaMsgsFetchStatusSet,
  eli5ActiveConversationSet,
  eli5ConversationRemoved,
  eli5Conversations,
  eli5ConversationsReset,
  eli5ConversationsSet,
  eli5MsgPushedToAddQ,
  eli5TitleChanged,
  eli5AddQCleared,
  eli5ConversationAdded,
  eli5MsgsFetchStatusSet,
} from './conversationsSlice';
import type { Name } from '@/types/features';

export function getConversationsState(name: Name) {
  if (name === 'Coding Assistant') return caConversations;
  if (name === 'General Assistant') return gaConversations;
  return eli5Conversations;
}

export function getConversationsActions(name: Name) {
  if (name === 'Coding Assistant')
    return {
      activeConversationSet: caActiveConversationSet,
      conversationRemoved: caConversationRemoved,
      conversationsReset: caConversationsReset,
      conversationsSet: caConversationsSet,
      msgPushedToAddQ: caMsgPushedToAddQ,
      titleChanged: caTitleChanged,
      addQCleared: caAddQCleared,
      conversationAdded: caConversationAdded,
      msgsFetchStatusSet: caMsgsFetchStatusSet,
    };

  if (name === 'General Assistant')
    return {
      activeConversationSet: gaActiveConversationSet,
      conversationRemoved: gaConversationRemoved,
      conversationsReset: gaConversationsReset,
      conversationsSet: gaConversationsSet,
      msgPushedToAddQ: gaMsgPushedToAddQ,
      titleChanged: gaTitleChanged,
      addQCleared: gaAddQCleared,
      conversationAdded: gaConversationAdded,
      msgsFetchStatusSet: gaMsgsFetchStatusSet,
    };

  return {
    activeConversationSet: eli5ActiveConversationSet,
    conversationRemoved: eli5ConversationRemoved,
    conversationsReset: eli5ConversationsReset,
    conversationsSet: eli5ConversationsSet,
    msgPushedToAddQ: eli5MsgPushedToAddQ,
    titleChanged: eli5TitleChanged,
    addQCleared: eli5AddQCleared,
    conversationAdded: eli5ConversationAdded,
    msgsFetchStatusSet: eli5MsgsFetchStatusSet,
  };
}
