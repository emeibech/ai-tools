import { useState } from 'react';
import { Check, ClipboardCopy } from 'lucide-react';
import { Button } from '@/common/components/ui/button';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Highlight, themes } from 'prism-react-renderer';
import { useAppSelector } from '@/app/hooks';
import { darkModeStatus } from '../darkmode/darkmodeSlice';
import { cn } from '@/common/lib/utils';
import type { CodeProps } from '@/types/features';

function extractLanguage(code: string) {
  const linebreakIndex = code.indexOf('\n');
  const language = code.slice(0, linebreakIndex);
  const codeBlock = code.slice(linebreakIndex, -1);
  return { language: language, codeBlock };
}

export default function Code({ code }: CodeProps) {
  const [copied, setCopied] = useState(false);
  const darkmode = useAppSelector(darkModeStatus);
  const { language, codeBlock } = extractLanguage(code);

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

      <Highlight
        language="javascript"
        theme={darkmode ? themes.vsDark : themes.github}
        code={codeBlock}
      >
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            style={style}
            className={cn('p-4 overflow-auto text-xs rounded-md', 'sm:text-sm')}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </pre>
  );
}