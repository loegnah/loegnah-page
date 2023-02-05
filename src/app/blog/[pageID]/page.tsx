import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getPageInfos, getNotionPage } from '@/lib/notion';
import NotionMD from '@/components/notion/NotionMD';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    pageID: string;
  };
};

export async function generateStaticParams() {
  const pageInfos = await getPageInfos();
  return pageInfos.map(({ pageID }) => ({ pageID }));
}

export default async function BlogPostPage({ params: { pageID } }: Props) {
  const notionPage = await getNotionPage(pageID);

  if (!notionPage) {
    notFound();
  }

  return <NotionMD title={notionPage.title} content={notionPage.content} codeTheme={dark} />;
}
