// import { getPageMDContent } from '@/lib/notion';
import NotionMD from './NotionMD';
import { notionPage1 } from '@/dev/notionPageMock';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type Props = {
  params: {
    postNum: string;
  };
};

export default async function BlogPost({ params: { postNum } }: Props) {
  // const notionMDString = await getPageMDContent(postNum);
  const notionMDString = notionPage1;
  return <NotionMD codeTheme={dark}>{notionMDString}</NotionMD>;
}
