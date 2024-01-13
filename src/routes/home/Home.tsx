import { cn } from '@/common/lib/utils';
import botImg from './imgs/bot.png';
import InfoCluster from './components/InfoCluster';
import FAQs from './components/FAQs';
import useSetScrollPosition from '@/common/hooks/useSetScrollPosition';
import { useAppSelector } from '@/app/hooks';
import { clientStatus } from '@/features/client/clientSlice';
import GuestButtons from '@/common/components/GuestButtons';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/common/components/ui/popover';
import { Button } from '@/common/components/ui/button';

const chatbotLink = import.meta.env.VITE_CHATBOT_LINK;

export default function Home() {
  const { userStatus } = useAppSelector(clientStatus);
  useSetScrollPosition('home');
  return (
    <main
      className={cn(
        'mt-16 px-4 flex flex-col items-center gap-20',
        'min-[320px]:p-4 lg:p-8 lg:mt-0',
        '2xl:p-12 2xl:gap-40',
      )}
    >
      <section
        className={cn(
          'flex flex-col items-center max-w-[920px]',
          'leading-relaxed gap-10',
          '2xl:flex-row',
        )}
      >
        <section className="flex flex-col gap-4 max-w-[768px]">
          <h2
            className={cn(
              'text-4xl font-semibold max-w-[640px]',
              'sm:text-5xl',
            )}
          >
            Make Your Life Easier with emeibech AI.
          </h2>
          <h3 className="max-w-[640px] text-xl">
            A collection of AI-powered tools to help you finish tasks faster the
            Flash on cocaine so you can get back to doing things that really
            matter, like scrolling mindlessly on your phone. Offload most of the
            thinking to AI and go get yourself more of that sweet, sweet
            dopamine now.
          </h3>

          {userStatus === 'guest' && <GuestButtons />}
        </section>
        <img
          height={'240px'}
          width={'240px'}
          src={botImg}
          alt="AI Chatbot"
          className={cn(
            'max-w-[240px] max-h-[240px] mt-4 leading-loose',
            'lg:mt-0',
          )}
        />
      </section>

      <section
        className={cn(
          ' flex flex-col gap-y-8 max-w-[920px]',
          '2xl:grid 2xl:grid-cols-2  2xl:gap-x-8',
        )}
      >
        <InfoCluster className="place-self-end">
          <h2 className={cn('font-medium')}>It's Free!</h2>
          <p className={cn('text-card-foreground')}>
            The best thing about this app is that it's free. That is right.
            Free. But you can only use it fifty times in twenty-four hours to
            prevent abuse since OpenAI API costs money and this is not an actual
            product.
          </p>
          <Popover>
            <PopoverTrigger className="flex max-w-fit">
              <p
                className={cn(
                  'text-accent underline max-w-fit py-1 px-0 text-lg',
                )}
              >
                See cost
              </p>
            </PopoverTrigger>
            <PopoverContent side="top">
              Current cost is roughly around $0.001 per 1500 characters
            </PopoverContent>
          </Popover>
        </InfoCluster>

        <InfoCluster>
          <h2 className={cn('font-medium')}>Open Source</h2>
          <p className="text-card-foreground">
            If you think this app looks like shit and feels like shit that's
            probably because it is. If you happen to like it and would like to
            create something similar to it, you can clone the repo or fork it or
            whatever.
          </p>
          <a
            href={'https://github.com/emeibech/ai-tools'}
            target="_blank"
            className={cn(
              'text-accent underline max-w-fit py-1 visited:text-purple-400',
            )}
          >
            GitHub
          </a>
        </InfoCluster>

        <InfoCluster>
          <h2 className={cn('font-medium')}>Mobile-friendly</h2>
          <p className={cn('text-card-foreground')}>
            This app works well in mobile devices even though I don't have the
            resources to actually test it on various mobile devices except my
            antiquated iPhone X. This mobile-first design is made easier by
            tailwindcss.
          </p>
          <a
            href={'https://tailwindcss.com/'}
            target="_blank"
            className={cn(
              'text-accent underline max-w-fit py-1 visited:text-purple-400',
            )}
          >
            Learn about tailwindcss
          </a>
        </InfoCluster>

        <InfoCluster className="place-self-end">
          <h2 className={cn('font-medium')}>Powered by OpenAI</h2>
          <p className="text-card-foreground">
            The tools provided are powered by OpenAI API. In case you live under
            a rock, OpenAI is the company that developed ChatGPT, that language
            model AI that everybody in tech and their mother is talking about.
          </p>
          <a
            href={'https://openai.com/'}
            target="_blank"
            className={cn(
              'text-accent underline max-w-fit py-1 visited:text-purple-400',
            )}
          >
            Learn about OpenAI
          </a>
        </InfoCluster>
      </section>

      <section className={cn('min-w-full flex flex-col items-center')}>
        <div
          className={cn(
            'min-w-full',
            '2xl:min-w-[920px]',
            'min-[678px]:min-w-[640px]',
          )}
        >
          <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
          <FAQs
            className={cn(
              'mt-8',
              '2xl:min-w-[920px]',
              'min-[678px]:max-w-[640px]',
              'min-w-full',
            )}
          />
        </div>
      </section>
      <section className="max-w-[920px]">
        <h2 className="text-4xl font-bold">About</h2>
        <article
          className={cn(
            'mt-4 flex flex-col gap-8',
            '2xl:min-w-[920px] min-[678px]:max-w-[640px] min-w-full',
          )}
        >
          <p className="text-xl text-card-foreground">
            emeibechAI is not an actual product. The intended purpose of this
            web application is so I could apply everything I have learned in web
            development so far and for it to serve as a portfolio project that
            is fully-functional, production-ready, and one that incorporates the
            OpenAI API.
          </p>

          <p className="text-xl text-card-foreground">
            Furthermore, I figured it's cheaper to use the OpenAI API instead of
            paying for ChatGPT Plus subscription. I get the important benefits
            of a ChatGPT Plus account and more for a fraction of the price.
          </p>
        </article>
      </section>

      <section className="max-w-[920px] mb-16">
        <h2 className="text-4xl font-bold">Credits Section</h2>
        <article
          className={cn(
            'mt-4 flex flex-col gap-8',
            '2xl:min-w-[920px] min-[678px]:max-w-[640px] min-w-full',
          )}
        >
          <p className="text-xl text-card-foreground">
            The cute artificial intelligence chatbot image I used was created by
            <Button
              variant={'link'}
              className="text-xl px-1 hover:underline active:underline text-accent"
            >
              <a
                href={chatbotLink}
                target="_blank"
                className="visited:text-purple-400"
              >
                macrovector
              </a>
            </Button>
            and is under Free License from
            <Button
              variant={'link'}
              className="text-xl px-1 hover:underline active:underline text-accent"
            >
              <a
                href="https://www.freepik.com"
                target="_blank"
                className="visited:text-purple-400"
              >
                freepik.com
              </a>
            </Button>
            .
          </p>

          <p className="text-xl text-card-foreground">
            The paper bag with a face representing the user in chats is Mumei's
            Friend and is created by
            <Button
              variant={'link'}
              className="text-xl px-1 hover:underline active:underline text-accent"
            >
              <a
                href="https://lateasusual.com/"
                target="_blank"
                className="visited:text-purple-400"
              >
                Lateasusual_
              </a>
            </Button>
            . There is no defined license for this, so on the off chance that
            you happen to see this and would like for me to take it down, you
            can contact me at at my tertiary email at meeseeks42@gmail.com.
          </p>
        </article>
      </section>
    </main>
  );
}
