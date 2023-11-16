import { cn } from '@/common/lib/utils';
import { Flower } from 'lucide-react';
import { useState } from 'react';

export default function Fallback() {
  const [opacity, setOpacity] = useState('opacity-0');

  /* This is so the fallback doesn't appear on fast connections. Without this,
  switching routes will look like something glitched in the Matrix. */
  setTimeout(() => {
    setOpacity('opacity-100');
  }, 100);

  return (
    <aside
      className={cn(
        opacity,
        'mt-20 px-2 flex flex-col items-center max-w-[920px] mx-auto',
        'min-[360px]:px-4 lg:p-8 lg:mt-2',
        '2xl:p-12',
      )}
    >
      <article className="flex flex-col items-center">
        <Flower width={'100px'} height={'100px'} className="animate-spin" />
        <h2 className="text-2xl sm:text-4xl font-bold animate-pulse">
          We're moomin now...
        </h2>
      </article>
    </aside>
  );
}
