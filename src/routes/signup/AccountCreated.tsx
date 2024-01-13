import { cn } from '@/common/lib/utils';

export default function AccountCreated() {
  return (
    <section className="grid place-items-center mt-32 2xl:mt-60">
      <h3 className="text-2xl sm:text-5xl text-center">Account created!</h3>
      <h2 className="text-lg sm:text-3xl text-center">
        You will soon be redirected to the login page.
      </h2>
      <span className="flex gap-1 justify-center mt-4">
        <div
          className={cn('h-2 w-2 rounded-full bg-foreground', 'animate-bounce')}
        ></div>
        <div
          className={cn(
            'h-2 w-2 rounded-full bg-foreground',
            'animate-bounce delay-150',
          )}
        ></div>
        <div
          className={cn(
            'h-2 w-2 rounded-full bg-foreground',
            'animate-bounce delay-300',
          )}
        ></div>
      </span>
    </section>
  );
}
