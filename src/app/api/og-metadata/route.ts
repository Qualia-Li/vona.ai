import { NextResponse } from 'next/server';
import { JSDOM } from 'jsdom';

// Default Reddit thumbnail based on the subreddit or fallback to the Reddit logo
const getRedditFallbackImage = (url: string) => {
  const urlObj = new URL(url);
  const pathParts = urlObj.pathname.split('/');
  const subreddit = pathParts[2]; // /r/subreddit/...
  
  if (subreddit) {
    // Try to get subreddit icon first
    return `https://styles.redditmedia.com/t5_${subreddit}/styles/communityIcon_*.png` ||
      // Fallback to the Reddit logo
      'https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png';
  }
  
  return 'https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png';
};

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    
    // Special handling for YouTube URLs
    if (url.includes('youtube.com')) {
      const videoId = url.includes('/watch?v=') 
        ? new URL(url).searchParams.get('v')
        : url.split('/').pop();
      if (videoId) {
        return NextResponse.json({
          ogImage: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          ogTitle: '', // Will be filled by the client-side title
          ogDescription: ''
        });
      }
    }

    // Special handling for Reddit URLs
    if (url.includes('reddit.com')) {
      // Reddit requires .json at the end of the URL to get the data
      const redditJsonUrl = url.endsWith('.json') ? url : `${url}.json`;
      const response = await fetch(redditJsonUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; EnceptionBot/1.0; +https://enception.ai)',
        },
      });
      const data = await response.json();
      
      // Extract thumbnail from Reddit's JSON response
      const post = data[0]?.data?.children[0]?.data;
      if (post) {
        return NextResponse.json({
          // Use post thumbnail if available and valid, otherwise use fallback
          ogImage: (post.thumbnail && post.thumbnail !== 'self' && post.thumbnail !== 'default') 
            ? post.thumbnail 
            : getRedditFallbackImage(url),
          ogTitle: post.title,
          ogDescription: post.selftext?.substring(0, 200)
        });
      }
    }

    // Default handling for other URLs
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