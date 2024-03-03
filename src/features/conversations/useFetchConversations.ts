import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useToast } from '@/common/components/ui/use-toast';
import type { Name } from '@/types/features';
import { useEffect } from 'react';
import { getConversationsActions } from './conversationsSliceUtils';
import { getCatchError } from '@/common/lib/utils';
import { clientStatusReset } from '../client/clientSlice';
import { getChatInterface } from './utils';
import { getLoadMoreActions, getLoadMoreState } from './loadMoreSliceUtils';
import { useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_SERVER_URL;

export default function useFetchConversations(name: Name) {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { lastConversation } = useAppSelector(getLoadMoreState(name));

  useEffect(() => {
    async function fetchConversations() {
      const { conversationsSet } = getConversationsActions(name);
      const { lastConversationSet } = getLoadMoreActions(name);
      try {
        const response = await fetch(
          `${baseUrl}/ai/conversations?chatinterface=${getChatInterface(
            name,
          )}&page=1&length=15`,
          { method: 'GET', credentials: 'include' },
        );

        if (response.status === 401 || response.status === 403) {
          dispatch(clientStatusReset());
          navigate('/login');
          toast({
            title: 'Error',
            description:
              'Session has expired. Please log in again to continue.',
          });

          return;
        }

        if (!response.ok) {
          toast({
            title: 'Error',
            description: 'Failed to retrieve conversations',
          });

          return;
        }

        const { conversationData, end } = await response.json();
        if (end) dispatch(lastConversationSet(true));

        dispatch(conversationsSet(conversationData));
      } catch (error) {
        toast({
          title: 'Error',
          description: getCatchError(error),
        });
      }
    }

    if (!lastConversation) fetchConversations();
  }, [dispatch, toast, navigate, name, lastConversation]);
}
