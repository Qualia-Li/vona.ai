import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; EnceptionBot/1.0; +https://enception.ai)',
      },
    });

    const html = await response.text();
    const dom = new JSDOM(html);
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    return NextResponse.json({
      text: article?.textContent || '',
    });
  } catch (error) {
    console.error('Error parsing webpage:', error);
    return NextResponse.json({ text: '' }, { status: 500 });
  }
}
