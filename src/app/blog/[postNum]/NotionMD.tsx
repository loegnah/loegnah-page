'use client';

import ReactMarkdown from 'react-markdown';
import tw from 'tailwind-styled-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

type Props = {
  children: string;
  codeTheme: any;
};

export default function NotionMD({ children, codeTheme }: Props) {
  return (
    <ReactMarkdown
      components={{
        h2: ({ children }) => <H2>{children}</H2>,
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter style={codeTheme} language={match[1]} PreTag="div" {...props}>
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

const H2 = tw.h2`
  text-2xl leading-relaxed mt-6
`;
