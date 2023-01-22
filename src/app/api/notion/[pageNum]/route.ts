import { type NextRequest, NextResponse } from 'next/server';
import { getPageMDContent } from '@/lib/notion';

type Params = {
  pageNum: string;
};

export async function GET(req: NextRequest, { params: { pageNum } }: { params: Params }) {
  const notionMDString = await getPageMDContent(pageNum);
  return new NextResponse(notionMDString);
}
