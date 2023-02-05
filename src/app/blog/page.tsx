import { getPageInfos } from '@/lib/notion';
import tw from 'tailwind-styled-components';
import Link from 'next/link';

type Props = {};

export default async function Page({}: Props) {
  const pageInfos = await getPageInfos();

  return (
    <PostList>
      {pageInfos.map(({ pageID, tags, title }, key) => (
        <PostItem key={key}>
          <PostLink href={`/blog/${pageID}`}>{title}</PostLink>
          <TagBox>
            {tags.map((tag, tagKey) => (
              <Tag key={tagKey}>{tag}</Tag>
            ))}
          </TagBox>
        </PostItem>
      ))}
    </PostList>
  );
}

const PostList = tw.li`
  flex flex-col gap-y-2
`;

const PostItem = tw.ul`
  flex justify-between items-center
  w-full
  p-2
`;

const PostLink = tw(Link)`
  
`;

const TagBox = tw.ul`
  flex gap-x-4
`;

const Tag = tw.li`
  bg
`;
