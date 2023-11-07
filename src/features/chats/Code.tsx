import { useState } from 'react';
import { Check, ClipboardCopy } from 'lucide-react';
import { Button } from '@/common/components/ui/button';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useAppSelector } from '@/app/hooks';
import { darkModeStatus } from '../darkmode/darkmodeSlice';
import { cn } from '@/common/lib/utils';
import type { CodeProps } from '@/types/features';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java';
import cpp from 'react-syntax-highlighter/dist/esm/languages/prism/cpp';
import csharp from 'react-syntax-highlighter/dist/esm/languages/prism/csharp';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';
import c from 'react-syntax-highlighter/dist/esm/languages/prism/c';
import go from 'react-syntax-highlighter/dist/esm/languages/prism/go';
import php from 'react-syntax-highlighter/dist/esm/languages/prism/php';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css-extras';

SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('cpp', cpp);
SyntaxHighlighter.registerLanguage('csharp', csharp);
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('c', c);
SyntaxHighlighter.registerLanguage('go', go);
SyntaxHighlighter.registerLanguage('php', php);
SyntaxHighlighter.registerLanguage('css', css);

const supportedLanguages = [
  'jsx',
  'python',
  'java',
  'cpp',
  'csharp',
  'tsx',
  'sql',
  'c',
  'go',
  'php',
  'css',
];

export default function Code({ code }: CodeProps) {
  const [copied, setCopied] = useState(false);
  const darkmode = useAppSelector(darkModeStatus);
  const { language, codeBlock } = extractLanguage(code);
  const formattedLang = formatLanguage(language);

  return (
    <pre className="whitespace-pre-wrap relative">
      <div
        className={cn(
          'flex justify-between bg-secondary text-secondary-foreground',
          'absolute min-w-full text-sm px-4 py-1 rounded-tr-md rounded-tl-md',
        )}
      >
        <span className="font-sans">{language}</span>
        <span className="flex items-center">
          <CopyToClipboard
            text={codeBlock.slice(1)}
            onCopy={() => {
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 2000);
            }}
          >
            <Button
              size="custom"
              variant="custom"
              className="font-sans font-normal text-sm"
            >
              {copied ? (
                <Check height="16px" />
              ) : (
                <ClipboardCopy height="16px" />
              )}
              {copied ? 'Copied' : 'Copy code'}
            </Button>
          </CopyToClipboard>
        </span>
      </div>

      <SyntaxHighlighter
        language={isSupported(formattedLang) ? formattedLang : 'jsx'}
        style={darkmode ? oneDark : oneLight}
      >
        {codeBlock}
      </SyntaxHighlighter>
    </pre>
  );
}

function extractLanguage(code: string) {
  const linebreakIndex = code.indexOf('\n');
  const language = code.slice(0, linebreakIndex);
  const codeBlock = code.slice(linebreakIndex, -1);
  return { language: language, codeBlock };
}

function formatLanguage(language: string) {
  const lowerCasedLang = language.toLowerCase();

  switch (lowerCasedLang) {
    case 'js':
    case 'javascript':
      return 'jsx';
    case 'ts':
    case 'typescript':
      return 'tsx';
    case 'py':
      return 'python';
    case 'c++':
      return 'cpp';
    case 'c#':
      return 'csharp';
    default:
      return language;
  }
}

function isSupported(formattedLang: string) {
  return supportedLanguages.includes(formattedLang);
}
