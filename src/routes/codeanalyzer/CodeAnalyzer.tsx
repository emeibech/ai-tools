import { cn } from '@/common/lib/utils';
import CodeAnalyzerForm from './CodeAnalyzerForm';
import useSetScrollPosition from '@/common/hooks/useSetScrollPosition';
import { useAppSelector } from '@/app/hooks';
import { getResponsesState } from '@/features/tools/toolsSlicesUtils';
import { CodeHighlighter } from '@/features/chats/CodeHighlighter';
import { useState } from 'react';
import Code from '@/features/chats/Code';

export default function CodeAnalyzer() {
  const response = useAppSelector(getResponsesState('codeanalyzer'));
  const [code, setCode] = useState<string>('');

  useSetScrollPosition('codeanalyzer');
  return (
    <main
      className={cn(
        'mt-10 px-4 flex flex-col items-start gap-8 max-w-[920px] mx-auto',
        'min-[320px]:p-4 lg:p-8 lg:mt-2',
        '2xl:p-12',
      )}
    >
      <h2
        className={cn(
          'self-start text-4xl font-semibold max-w-[640px]',
          'sm:text-5xl',
        )}
      >
        Code Analyzer
      </h2>

      <p>
        Code Analyzer helps you understand complex snippets of code or
        not-so-complex-but-hard-to-read ones written by noobs like me. Input the
        code in the box, submit, and you will get a response giving you a brief
        summary and a structured break down of the code.
      </p>

      <CodeAnalyzerForm route="codeanalyzer" setCode={setCode} />

      <section className="max-w-[920px] mx-auto min-w-full">
        <article>{code !== '' && <Code code={`\n${code}`} />}</article>

        <article className="mt-8">
          <p className="whitespace-pre-wrap">
            <CodeHighlighter>{response}</CodeHighlighter>
          </p>
        </article>
      </section>
    </main>
  );
}
