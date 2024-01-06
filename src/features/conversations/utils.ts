import type { Name } from '@/types/features';

export function getChatInterface(name: Name) {
  if (name === 'Coding Assistant') return 'codingassistant';
  if (name === 'General Assistant') return 'generalassistant';
  return 'eli5';
}
