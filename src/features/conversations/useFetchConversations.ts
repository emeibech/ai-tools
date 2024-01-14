import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useToast } from '@/common/components/ui/use-toast';
import type { Name } from '@/types/features';
import { useEffect } from 'react';
import { getConversationsActions } from './conversationsSliceUtils';
import { getCatchError } from '@/common/lib/utils';
import { clientStatus } from '../client/clientSlice';
import { getChatInterface } from './utils';
import { getLoadMoreState } from './loadMoreSliceUtils';

const baseUrl = import.meta.env.VITE_SERVER_URL;

export default function useFetchConversations(name: Name) {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const client = useAppSelector(clientStatus);
  const { lastConversation } = useAppSelector(getLoadMoreState(name));

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: client.act ?? '',
      },
    };

    async function fetchConversations() {
      const { conversationsSet } = getConversationsActions(name);
      try {
        const response = await fetch(
          `${baseUrl}/ai/conversations?chatinterface=${getChatInterface(
            name,
          )}&page=1&length=15`,
          requestOptions,
        );

        if (!response.ok) {
          toast({
            title: 'Error',
            description: 'Failed to retrieve conversations',
          });

          return;
        }

        const { conversationData } = await response.json();
        dispatch(conversationsSet(conversationData));
      } catch (error) {
        toast({
          title: 'Error',
          description: getCatchError(error),
        });
      }
    }

    if (!lastConversation) {
      fetchConversations();
    }
  }, [dispatch, toast, name, client, lastConversation]);
}
