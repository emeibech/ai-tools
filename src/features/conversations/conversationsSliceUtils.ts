import {
  caConversationRemoved,
  caConversations,
  caActiveConversationSet,
  caConversationsReset,
  caConversationsSet,
  caMsgPushedToAddQ,
  caMsgPushedToDeleteQ,
  caTitleChanged,
  caAddQCleared,
  caDeleteQCleared,
  caConversationAdded,
  gaActiveConversationSet,
  gaConversationRemoved,
  gaConversations,
  gaConversationsReset,
  gaConversationsSet,
  gaMsgPushedToAddQ,
  gaMsgPushedToDeleteQ,
  gaTitleChanged,
  gaAddQCleared,
  gaDeleteQCleared,
  gaConversationAdded,
  eli5ActiveConversationSet,
  eli5ConversationRemoved,
  eli5Conversations,
  eli5ConversationsReset,
  eli5ConversationsSet,
  eli5MsgPushedToAddQ,
  eli5MsgPushedToDeleteQ,
  eli5TitleChanged,
  eli5AddQCleared,
  eli5DeleteQCleared,
  eli5ConversationAdded,
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
      msgPushedToDeleteQ: caMsgPushedToDeleteQ,
      titleChanged: caTitleChanged,
      addQCleared: caAddQCleared,
      deleteQCleared: caDeleteQCleared,
      conversationAdded: caConversationAdded,
    };

  if (name === 'General Assistant')
    return {
      activeConversationSet: gaActiveConversationSet,
      conversationRemoved: gaConversationRemoved,
      conversationsReset: gaConversationsReset,
      conversationsSet: gaConversationsSet,
      msgPushedToAddQ: gaMsgPushedToAddQ,
      msgPushedToDeleteQ: gaMsgPushedToDeleteQ,
      titleChanged: gaTitleChanged,
      addQCleared: gaAddQCleared,
      deleteQCleared: gaDeleteQCleared,
      conversationAdded: gaConversationAdded,
    };

  return {
    activeConversationSet: eli5ActiveConversationSet,
    conversationRemoved: eli5ConversationRemoved,
    conversationsReset: eli5ConversationsReset,
    conversationsSet: eli5ConversationsSet,
    msgPushedToAddQ: eli5MsgPushedToAddQ,
    msgPushedToDeleteQ: eli5MsgPushedToDeleteQ,
    titleChanged: eli5TitleChanged,
    addQCleared: eli5AddQCleared,
    deleteQCleared: eli5DeleteQCleared,
    conversationAdded: eli5ConversationAdded,
  };
}

export {
  caConversationRemoved,
  caConversations,
  caActiveConversationSet,
  caConversationsReset,
  caConversationsSet,
  caMsgPushedToAddQ,
  caMsgPushedToDeleteQ,
  gaActiveConversationSet,
  gaConversationRemoved,
  gaConversations,
  gaConversationsReset,
  gaConversationsSet,
  gaMsgPushedToAddQ,
  gaMsgPushedToDeleteQ,
  eli5ActiveConversationSet,
  eli5ConversationRemoved,
  eli5Conversations,
  eli5ConversationsReset,
  eli5ConversationsSet,
  eli5MsgPushedToAddQ,
  eli5MsgPushedToDeleteQ,
};
