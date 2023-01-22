import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

const notion = new Client({ auth: process.env.NOTION_API_SECRET_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });

const PageIDMap: Record<string, string> = {
  '1': process.env.NOTION_PAGE_ID_1 as string,
};

export async function getPageMDContent(pageNum: number | string) {
  const mdBlocks = await n2m.pageToMarkdown(PageIDMap[String(pageNum)]);
  return n2m.toMarkdownString(mdBlocks);
}
