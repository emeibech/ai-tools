import { useAppDispatch } from '@/app/hooks';
import {
  codingMessagesReset,
  eli5MessagesReset,
  generalMessagesReset,
} from '@/features/chats/messagesSliceutils';
import {
  caConversationsReset,
  gaConversationsReset,
  eli5ConversationsReset,
} from '@/features/conversations/conversationsSliceUtils';
import {
  caLoadMoreReset,
  eli5LoadMoreReset,
  gaLoadMoreReset,
} from '@/features/conversations/loadMoreSlice';
import { useEffect } from 'react';

export default function LoginSuccessful() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(codingMessagesReset());
    dispatch(eli5MessagesReset());
    dispatch(generalMessagesReset());
    dispatch(caConversationsReset());
    dispatch(gaConversationsReset());
    dispatch(eli5ConversationsReset());
    dispatch(caLoadMoreReset());
    dispatch(gaLoadMoreReset());
    dispatch(eli5LoadMoreReset());
  }, [dispatch]);

  return (
    <main className="grid place-items-center mt-32 2xl:mt-60">
      <h3 className="text-2xl sm:text-5xl">You are logged in!</h3>
      <h2 className="text-lg sm:text-3xl">You now have access to the tools.</h2>
    </main>
  );
}
