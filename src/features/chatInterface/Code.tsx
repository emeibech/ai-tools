import { useState } from 'react';
import { Check, ClipboardCopy } from 'lucide-react';
import { Button } from '@/common/components/ui/button';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Highlight, themes } from 'prism-react-renderer';
import { useAppSelector } from '@/app/hooks';
import { darkModeStatus } from '../darkmode/darkmodeSlice';

interface CodeProps {
  code: string;
}

export default function Code({ code }: CodeProps) {
  const [copied, setCopied] = useState(false);
  const darkmode = useAppSelector(darkModeStatus);

  return (
    <pre className="whitespace-pre-wrap relative">
      <span className="flex items-center absolute right-0 top-4">
        <CopyToClipboard
          text={code}
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
            type="button"
            className="font-sans font-normal px-4"
          >
            {copied ? <Check height="1rem" /> : <ClipboardCopy height="1rem" />}
            {copied ? 'Copied' : 'Copy code'}
          </Button>
        </CopyToClipboard>
      </span>

      <Highlight
        language="tsx"
        theme={darkmode ? themes.vsDark : themes.vsLight}
        code={code}
      >
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style} className="p-4 overflow-auto text-xs sm:text-sm">
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
