import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getPageInfos, getNotionPage } from '@/lib/notion';
import NotionMD from '@/components/notion/NotionMD';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    postNum: string;
  };
};

export async function generateStaticParams() {
  const pageInfos = await getPageInfos();
  return pageInfos.map(({ postNum }) => ({ postNum: String(postNum) }));
}

export default async function BlogPostPage({ params: { postNum } }: Props) {
  const notionPage = await getNotionPage(postNum);

  if (!notionPage) {
    notFound();
  }

  return <NotionMD title={notionPage.title} content={notionPage.content} codeTheme={dark} />;
}
