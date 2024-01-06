import {
  codingMessages,
  codingAdded,
  codingAppended,
  codingRemoved,
  codingDbidAdded,
  codingMessagesSet,
  codingMessagesReset,
  eli5Messages,
  eli5Added,
  eli5Appended,
  eli5Removed,
  eli5DbidAdded,
  eli5MessagesSet,
  eli5MessagesReset,
  generalMessages,
  generalAdded,
  generalAppended,
  generalRemoved,
  generalDbidAdded,
  generalMessagesSet,
  generalMessagesReset,
} from './messagesSlice';
import type { Name } from '@/types/features';

export function getMessagesState(name: Name) {
  if (name === 'Coding Assistant') return codingMessages;
  if (name === "Explain Like I'm 5") return eli5Messages;
  return generalMessages;
}

export function getMessagesActions(name: Name) {
  if (name === 'Coding Assistant')
    return {
      messageAdded: codingAdded,
      messageAppended: codingAppended,
      messageRemoved: codingRemoved,
      dbidAdded: codingDbidAdded,
      messagesSet: codingMessagesSet,
      messagesReset: codingMessagesReset,
    };

  if (name === "Explain Like I'm 5")
    return {
      messageAdded: eli5Added,
      messageAppended: eli5Appended,
      messageRemoved: eli5Removed,
      dbidAdded: eli5DbidAdded,
      messagesSet: eli5MessagesSet,
      messagesReset: eli5MessagesReset,
    };

  return {
    messageAdded: generalAdded,
    messageAppended: generalAppended,
    messageRemoved: generalRemoved,
    dbidAdded: generalDbidAdded,
    messagesSet: generalMessagesSet,
    messagesReset: generalMessagesReset,
  };
}

export default {
  codingMessages,
  codingAdded,
  codingAppended,
  codingRemoved,
  eli5Messages,
  eli5Added,
  eli5Appended,
  eli5Removed,
  generalMessages,
  generalAdded,
  generalAppended,
  generalRemoved,
};
