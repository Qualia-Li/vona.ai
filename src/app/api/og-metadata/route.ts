import { NextResponse } from 'next/server';
import { JSDOM } from 'jsdom';

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
    const doc = dom.window.document;

    // Extract Open Graph metadata
    const metadata = {
      ogImage: doc.querySelector('meta[property="og:image"]')?.getAttribute('content') ||
              doc.querySelector('meta[name="twitter:image"]')?.getAttribute('content'),
      ogTitle: doc.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
              doc.querySelector('meta[name="twitter:title"]')?.getAttribute('content') ||
              doc.querySelector('title')?.textContent,
      ogDescription: doc.querySelector('meta[property="og:description"]')?.getAttribute('content') ||
                    doc.querySelector('meta[name="twitter:description"]')?.getAttribute('content') ||
                    doc.querySelector('meta[name="description"]')?.getAttribute('content'),
    };

    return NextResponse.json(metadata);
  } catch (error) {
    console.error('Error fetching OG metadata:', error);
    return NextResponse.json({ error: 'Failed to fetch metadata' }, { status: 500 });
  }
} 