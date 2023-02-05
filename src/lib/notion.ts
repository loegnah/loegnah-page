import _ from 'lodash';
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { getNotionPageContentMock, getNotionPageTitleMock } from '~/mock/notionPagesMock';
import { isDev } from '@/lib/utils';

type DBPage = {
  properties: {
    postNum: { title: [{ plain_text: string }] };
    link: { rich_text: Array<{ mention: { page: { id: string } }; plain_text: string }> };
    tag: {
      multi_select: Array<{
        name: string;
      }>;
    };
  };
};

const notion = new Client({ auth: process.env.NOTION_API_SECRET_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });

function extractDataFromPages(pages: DBPage[]) {
  return _.sortBy(
    pages.map(({ properties: { postNum, tag, link } }) => {
      return {
        postNum: Number(postNum.title[0].plain_text),
        tags: tag.multi_select.map((t) => t['name']),
        pageID: link.rich_text[0].mention.page.id,
        title: link.rich_text[0].plain_text,
      };
    }),
    ['postNum']
  );
}

export async function getPageInfos() {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_DB_ID as string,
  });
  const pages = res.results as any;
  return extractDataFromPages(pages);
}

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

export async function getNotionPage(pageID: string) {
  const title = await getPageTitle(pageID);
  if (!title) return null;

  const content = await getPageContent(pageID);
  if (!content) return null;

  return {
    title,
    content,
  };
}
