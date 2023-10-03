import { useEffect, useState } from 'react';
import { scrollToBottom } from '../lib/utils';
import { type SubmitData } from '@/features/chatInterface/ChatInterface';
import { direction } from '@/features/scrollDirection/scrollDirectionSlice';
import {
  getMessagesActions,
  getMessagesState,
} from '@/features/chatInterface/messagesSliceutils';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

const mockData = [
  'The ',
  'quick ',
  'brown ',
  'fox ',
  'jumps ',
  'over ',
  'the ',
  'lazy ',
  'dog. ',
];

function mockStreamingApi(mockData: unknown[], maxDelay: number = 100) {
  return new ReadableStream({
    start(controller) {
      let index = 0;

      const pushData = () => {
        if (index < mockData.length) {
          controller.enqueue(mockData[index]);
          index++;
          setTimeout(pushData, Math.floor(Math.random() * maxDelay));
        } else {
          controller.close();
        }
      };

      pushData();
    },
  });
}

export default function useMockApi(submitData: SubmitData) {
  const [isDone, setIsDone] = useState(true);
  const scrollDirection = useAppSelector(direction);
  const msgs = getMessagesState(submitData.name);
  const messages = useAppSelector(msgs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('useMockApi Effect');
    if (submitData.submitCount > 0) {
      const { messageAppended } = getMessagesActions(submitData.name);
      const fetchData = async () => {
        const reader = mockStreamingApi([
          ...mockData,
          ...mockData,
          ...mockData,
          ...mockData,
          ...mockData,
          ...mockData,
          ...mockData,
          ...mockData,
          ...mockData,
          ...mockData,
        ]).getReader();

        async function processStream(
          result: ReadableStreamReadResult<string>,
        ): Promise<void> {
          const { done, value } = result;

          if (done) {
            console.log('Stream complete');
            setIsDone(true);
            return;
          } else {
            setIsDone(false);
          }

          const chunk = value;

          dispatch(
            messageAppended({
              id: submitData.id,
              content: chunk,
            }),
          );

          return reader.read().then(processStream);
        }

        reader.read().then(processStream);
      };

      fetchData();
    }
  }, [dispatch, submitData]);

  useEffect(() => {
    console.log('scrollController effect');
    if (!isDone && scrollDirection === 'down') scrollToBottom();
  }, [isDone, scrollDirection, messages]);
}
