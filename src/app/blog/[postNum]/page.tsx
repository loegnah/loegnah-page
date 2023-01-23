import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPageMDContent } from '@/lib/notion';
import ReactMarkdown from 'react-markdown';

type Props = {
  params: {
    postNum: string;
  };
};

export default async function BlogPost({ params: { postNum } }: Props) {
  const notionMDString = await getPageMDContent(postNum);
  return (
    <div className="notionMarkdown">
      {/* @ts-ignore */}
      {/*<MDXRemote source={notionMDString} />*/}
      <ReactMarkdown>{notionMDString}</ReactMarkdown>
    </div>
  );
}
