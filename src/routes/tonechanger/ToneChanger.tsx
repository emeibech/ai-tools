import { cn } from '@/common/lib/utils';
import ToneChangerForm from './ToneChangerForm';

export default function ToneChanger() {
  return (
    <main
      className={cn(
        'mt-10 px-4 flex flex-col items-start gap-8 max-w-[920px] mx-auto',
        'min-[320px]:p-4 lg:p-8 lg:mt-2',
        '2xl:p-12'
      )}
    >
      <h2
        className={cn(
          'self-start text-4xl font-semibold max-w-[640px]',
          'sm:text-5xl'
        )}
      >
        Tone Changer
      </h2>

      <p>
        Tone Changer rewrites your message in whatever tone you want. Aside from
        regular tones (e.g., friendly, sad, professional), you can also put a
        certain type of person (e.g., lawyer, medieval knight) in the Tone input
        to make your message sound like it has been written by that type of
        person. The result varies in quality, but most of them are good
        jumping-off points.
      </p>

      <ToneChangerForm />
    </main>
  );
}
