import { cn } from '@/common/lib/utils';
import StoryGeneratorForm from './StoryGeneratorForm';
import useSetScrollPosition from '@/common/hooks/useSetScrollPosition';
import {
  getPromptsState,
  getResponsesState,
} from '@/features/tools/toolsSlicesUtils';
import { useAppSelector } from '@/app/hooks';
import { Separator } from '@/common/components/ui/separator';
import RequestIndicator from '@/features/requestStatus/RequestIndicator';
import { clientStatus } from '@/features/client/clientSlice';
import { Navigate } from 'react-router-dom';

export default function StoryGenerator() {
  const response = useAppSelector(getResponsesState('storygenerator'));
  const prompt = useAppSelector(getPromptsState('storygenerator'));
  const { userStatus } = useAppSelector(clientStatus);

  useSetScrollPosition('storygenerator');

  return (
    <main
      className={cn(
        'mt-20 px-2 flex flex-col items-start gap-8 max-w-[920px] mx-auto',
        'min-[360px]:px-4 lg:p-8 lg:mt-2',
        '2xl:p-12',
      )}
    >
      {userStatus === 'user' && (
        <>
          <h2
            className={cn(
              'self-start text-4xl font-semibold max-w-[640px]',
              'sm:text-5xl',
            )}
          >
            Story Generator
          </h2>

          <p className="text-lg">
            Need less-than-mediocre stories in a pinch? Say no more. Story
            Generator coughs up basic but coherent stories that sounds good
            enough as you're reading them until you realize that the content is
            actually trash. Nevertheless, they can still serve as a template or
            a source of ideas to jumpstart the creation of a good story. If you
            just want trash, though, you can also just use them as is.
          </p>

          <StoryGeneratorForm route="storygenerator" name="Story Generator" />

          <section className="max-w-[824px] mx-auto min-w-full text-lg">
            <article>
              {prompt !== '' && (
                <>
                  <p className="whitespace-pre-wrap text-card-foreground">
                    {prompt}
                  </p>
                  <Separator className="mt-8" />
                </>
              )}
            </article>

            <article className="mt-8 overflow-x-auto">
              <div className="whitespace-pre-wrap">
                {response}
                <RequestIndicator name="Story Generator" />
              </div>
            </article>
          </section>
        </>
      )}

      {userStatus === 'guest' && <Navigate to={'/login'} replace={true} />}
    </main>
  );
}
