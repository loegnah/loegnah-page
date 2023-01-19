import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const res = await fetch('https://loegnah-api-server.fly.dev/', {
    next: { revalidate: 120 },
  });
  const data = await res.text();

  return NextResponse.json({ data });
}
