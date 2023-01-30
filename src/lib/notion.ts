import _ from 'lodash';
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { getNotionPageContentMock, getNotionPageTitleMock } from '~/mock/notionPagesMock';
import { isDev } from '@/lib/utils';

const notion = new Client({ auth: process.env.NOTION_API_SECRET_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });

const PageIDMap: string[] = [
  process.env.NOTION_PAGE_ID_1 as string,
  process.env.NOTION_PAGE_ID_2 as string,
];

async function getPageTitle(pageID: string) {
  if (isDev()) {
    const title = getNotionPageTitleMock(pageID);
    if (title) return title;
  }
  const { properties } = (await notion.pages.retrieve({ page_id: pageID })) as any;
  return properties[properties['title'] ? 'title' : '이름'].title[0].plain_text;
}

async function getPageContent(pageID: string) {
  if (isDev()) {
    const content = getNotionPageContentMock(pageID);
    if (content) return content;
  }

  const pageBlocks = await n2m.pageToMarkdown(pageID);
  if (!pageBlocks) return null;
  return n2m.toMarkdownString(pageBlocks);
}

export async function getNotionPage(pageNum: number) {
  const pageID = _.get(PageIDMap, pageNum - 1, null);
  if (pageID === null) return null;

  const title = await getPageTitle(pageID);
  if (!title) return null;

  const content = await getPageContent(pageID);
  if (!content) return null;

  return {
    title,
    content,
  };
}
