import { cn } from '@/common/lib/utils';
import ToneChangerForm from './ToneChangerForm';
import useSetScrollPosition from '@/common/hooks/useSetScrollPosition';
import { useAppSelector } from '@/app/hooks';
import {
  getPromptsState,
  getResponsesState,
} from '@/features/tools/toolsSlicesUtils';
import { Separator } from '@/common/components/ui/separator';
import RequestIndicator from '@/features/requestStatus/RequestIndicator';
import { clientStatus } from '@/features/client/clientSlice';
import { Navigate } from 'react-router-dom';

export default function ToneChanger() {
  const response = useAppSelector(getResponsesState('tonechanger'));
  const prompt = useAppSelector(getPromptsState('tonechanger'));
  const { userStatus } = useAppSelector(clientStatus);

  useSetScrollPosition('tonechanger');

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
            Tone Changer
          </h2>

          <p>
            Tone Changer rewrites your message in whatever tone you want. Aside
            from regular tones (e.g., friendly, sad, professional), you can also
            put a certain type of person (e.g., lawyer, medieval knight) in the
            Tone input to make your message sound like it has been written by
            that type of person. The result varies in quality, but most of them
            are good jumping-off points.
          </p>

          <ToneChangerForm route="tonechanger" name="Tone Changer" />

          <section className="max-w-[920px] mx-auto min-w-full">
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

            <article className="mt-8">
              <div className="whitespace-pre-wrap">
                {response}
                <RequestIndicator name="Tone Changer" />
              </div>
            </article>
          </section>
        </>
      )}

      {userStatus === 'guest' && <Navigate to={'/login'} replace={true} />}
    </main>
  );
}
