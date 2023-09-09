import { cn } from '@/common/lib/utils';
import StoryGeneratorForm from './StoryGeneratorForm';

export default function StoryGenerator() {
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
        Story Generator
      </h2>

      <p>
        Need less-than-mediocre stories in a pinch? Say no more. Story Generator
        coughs up basic but coherent stories that sounds good enough as you're
        reading them until you realize that the content is actually trash.
        Nevertheless, they can still serve as a template or a source of ideas to
        jumpstart the creation of a good story. If you just want trash, though,
        you can also just use them as is.
      </p>

      <StoryGeneratorForm />
    </main>
  );
}
