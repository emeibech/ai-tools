import { cn } from '@/common/lib/utils';
import useSetScrollPosition from '@/common/hooks/useSetScrollPosition';
import { useAppSelector } from '@/app/hooks';
import { Separator } from '@/common/components/ui/separator';
import RequestIndicator from '@/features/requestStatus/RequestIndicator';
import { clientStatus } from '@/features/client/clientSlice';
import { Navigate } from 'react-router-dom';
import ImageTranslatorForm from './ImageTranslatorForm';
import {
  getPromptsState,
  getResponsesState,
} from '@/features/tools/toolsSlicesUtils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/common/components/ui/accordion';
import { useState } from 'react';

export default function ImageTranslator() {
  const response = useAppSelector(getResponsesState('imagetranslator'));
  const prompt = useAppSelector(getPromptsState('imagetranslator'));
  const { userStatus } = useAppSelector(clientStatus);
  const [img, setImg] = useState({ src: '', alt: '' });

  useSetScrollPosition('imagetranslator');
  console.log(28, userStatus);
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
            Image Translator
          </h2>

          <article>
            <p className="text-lg">
              Translate foreign texts in an image to English. Useful in
              situations in which you need translation but you cannot copy-paste
              the text. Like when you're traveling in another country and found
              yourself in a countryside bar or restaurant and cannot read the
              menu. I wouldn't know. I'm poor.
            </p>
            <br />
            <Accordion type="multiple" className={'w-full'}>
              <AccordionItem value="faq-1">
                <AccordionTrigger className="text-left text-xl">
                  <strong className="text-lg">Tips and disclaimers</strong>
                </AccordionTrigger>
                <AccordionContent className="text-card-foreground text-lg">
                  <ul className="list-disc ml-8 flex flex-col gap-4">
                    <li>
                      Crop the image first to only include the texts you want
                      translated.
                    </li>
                    <li>
                      Properly orient the image so that it can be read from left
                      to right.
                    </li>
                    <li>
                      You can provide additional instructions to the AI. For
                      example, you can instruct it to ignore other text in the
                      background, or perhaps to provide you with extra
                      information about the image, or explicitly tell the AI the
                      language of the text if you know it.
                    </li>
                    <li>
                      The AI model used for this tool is still in its infancy
                      and currently struggles with non-Latin characters,
                      especially Kanji, so the response is not always accurate.
                    </li>
                    <li>
                      I do not save any of your images to my database, neither
                      does OpenAI.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </article>

          <ImageTranslatorForm
            route="imagetranslator"
            name="Image Translator"
            setImg={setImg}
          />

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
                <figure className="grid place-content-center mb-8">
                  <img src={img.src} alt={img.alt} />
                  <figcaption
                    className={cn(
                      'text-center overflow-hidden',
                      'text-muted-foreground',
                    )}
                  >
                    {img.alt}
                  </figcaption>
                </figure>
                {response}
                <RequestIndicator name="Image Translator" />
              </div>
            </article>
          </section>
        </>
      )}

      {userStatus === 'guest' && <Navigate to={'/login'} replace={true} />}
    </main>
  );
}
