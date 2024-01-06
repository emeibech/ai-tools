import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useToast } from '@/common/components/ui/use-toast';
import type { Name } from '@/types/features';
import { useEffect } from 'react';
import { getConversationsActions } from './conversationsSliceUtils';
import { getCatchError } from '@/common/lib/utils';
import { clientStatus } from '../client/clientSlice';
import { getChatInterface } from './utils';

const baseUrl = import.meta.env.VITE_AI_URL;

export default function useFetchConversations(name: Name) {
  console.log('useFetchConversations');
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const client = useAppSelector(clientStatus);

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
          `${baseUrl}/ai/conversations?chatinterface=${getChatInterface(name)}`,
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
        console.log(error);
        toast({
          title: 'Error',
          description: getCatchError(error),
        });
      }
    }

    if (client.userStatus === 'user') {
      fetchConversations();
    }
  }, [dispatch, toast, name, client]);
}
