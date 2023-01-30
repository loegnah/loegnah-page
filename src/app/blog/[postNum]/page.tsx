import { getNotionPage } from '@/lib/notion';
import NotionMD from '@/components/notion/NotionMD';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type Props = {
  params: {
    postNum: number;
  };
};

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
