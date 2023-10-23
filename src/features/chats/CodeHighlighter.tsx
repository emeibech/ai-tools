import Code from './Code';
import type { CodeHighlighterProps } from '@/types/features';

export function CodeHighlighter({
  children,
}: CodeHighlighterProps): JSX.Element {
  const messageString = String(children);
  const codeBlocks = messageString.split('```');

  const formattedMessage = codeBlocks.map((block, index) => {
    if (index % 2 === 0) {
      return <p key={`text-${index}`}>{block}</p>;
    } else {
      return <Code key={`code-${index}`} code={block} />;
    }
  });

  return <>{formattedMessage}</>;
}
