import RequestIndicator from '../requestStatus/RequestIndicator';
import Code from './Code';
import type { CodeHighlighterProps } from '@/types/features';

export function CodeHighlighter({
  children,
  name,
}: CodeHighlighterProps): JSX.Element {
  const messageString = String(children);
  const codeBlocks = messageString.split('```');

  const formattedMessage = codeBlocks.map((block, index) => {
    return (
      <article key={`code-${index}`}>
        {index % 2 === 0 ? block : <Code code={block} />}
        {name && <RequestIndicator name={name} hideStreamIndicator={true} />}
      </article>
    );
  });

  return <>{formattedMessage}</>;
}
