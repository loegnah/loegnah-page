'use client';

import ReactMarkdown from 'react-markdown';
import tw from 'tailwind-styled-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

type Props = {
  content: string;
  title: string;
  codeTheme: any;
};

export default function NotionMD({ content, title, codeTheme }: Props) {
  return (
    <Wrapper>
      <TitleBox>
        <Title>{title}</Title>
      </TitleBox>
      <ReactMarkdown
        components={{
          h2: ({ children, ...otherProps }) => <H2 {...otherProps}>{children}</H2>,
          h3: ({ children, ...otherProps }) => <H3 {...otherProps}>{children}</H3>,
          a: ({ children, ...otherProps }) => <A {...otherProps}>{children}</A>,
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <CodeBlockBox>
                <SyntaxHighlighter style={codeTheme} language={match[1]} PreTag="div" {...props}>
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </CodeBlockBox>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </Wrapper>
  );
}

const Wrapper = tw.main`
`;

const TitleBox = tw.div`
  border-b-2 border-black border-dashed
  border-themeA-shadow
  mb-4
`;

const Title = tw.div`
  text-4xl font-black leading-loose
`;

const H2 = tw.h2`
  mt-8 mb-3
  text-2xl font-bold
`;

const H3 = tw.h3`
  mt-4 mb-2
  text-xl font-bold
`;

const CodeBlockBox = tw.div`
`;

const A = tw.a`
  font-bold underline 
  decoration-dotted decoration-from-font underline-offset-4
`;
