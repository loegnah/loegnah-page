import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getPageInfos, getNotionPage } from '@/lib/notion';
import NotionMD from '@/components/notion/NotionMD';

type Props = {
  params: {
    postNum: string;
  };
};

export async function generateStaticParams() {
  const pageInfos = await getPageInfos();
  return pageInfos.map(({ postNum }) => ({ postNum: String(postNum) }));
}

export default async function BlogPost({ params: { postNum } }: Props) {
  const notionPage = await getNotionPage(postNum);

  return (
    <>
      {notionPage ? (
        <NotionMD title={notionPage.title} content={notionPage.content} codeTheme={dark} />
      ) : (
        <div>Error</div>
      )}
    </>
  );
}
