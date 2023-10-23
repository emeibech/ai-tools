import {
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
    };

  if (name === "Explain Like I'm 5")
    return {
      messageAdded: eli5Added,
      messageAppended: eli5Appended,
      messageRemoved: eli5Removed,
    };

  return {
    messageAdded: generalAdded,
    messageAppended: generalAppended,
    messageRemoved: generalRemoved,
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
