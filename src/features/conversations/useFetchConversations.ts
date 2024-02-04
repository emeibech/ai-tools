import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useToast } from '@/common/components/ui/use-toast';
import type { Name } from '@/types/features';
import { useEffect } from 'react';
import { getConversationsActions } from './conversationsSliceUtils';
import { getCatchError } from '@/common/lib/utils';
import { clientStatus, clientStatusReset } from '../client/clientSlice';
import { getChatInterface } from './utils';
import { getLoadMoreState } from './loadMoreSliceUtils';
import { useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_SERVER_URL;

export default function useFetchConversations(name: Name) {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const client = useAppSelector(clientStatus);
  const { lastConversation } = useAppSelector(getLoadMoreState(name));
  const navigate = useNavigate();

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

        if (response.status === 401) {
          dispatch(clientStatusReset());
          navigate('/login');
          toast({
            title: 'Error',
            description: 'Session has expired. Please log in again.',
          });
        }

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
  }, [dispatch, toast, navigate, name, client, lastConversation]);
}
