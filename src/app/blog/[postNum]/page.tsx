import ReactMarkdown from 'react-markdown';
import { getPageMDContent } from '@/lib/notion';
import styles from './styles.module.css';

type Props = {
  params: {
    postNum: string;
  };
};

export default async function BlogPost({ params: { postNum } }: Props) {
  const notionMDString = await getPageMDContent(postNum);
  return (
    <ReactMarkdown
      className={styles.notionMarkdown}
      components={{
        pre: ({ children }) => <h2>{children}</h2>,
      }}
    >
      {notionMDString}
    </ReactMarkdown>
  );
}
