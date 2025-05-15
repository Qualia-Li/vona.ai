import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    if (!process.env.SERP_API_KEY) {
      throw new Error('SERP API key is not configured');
    }

    const response = await fetch(
      `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${process.env.SERP_API_KEY}`,
    );
    const data = await response.json();
    // console.log("SERP API response:", data);

    if (!data.ai_overview) {
      console.error('Invalid response from SERP API.');
      throw new Error('Invalid response from SERP API');
    }

    // If serpapi_link exists, fetch additional data
    if (data.ai_overview.serpapi_link) {
      const detailResponse = await fetch(`${data.ai_overview.serpapi_link}&api_key=${process.env.SERP_API_KEY}`);
      const detailData = await detailResponse.json();

      if (detailData.ai_overview) {
        return NextResponse.json(detailData.ai_overview);
      } else {
        console.log('AI Overview not available, detail data:', detailData);
      }
    }

    console.log('AI Overview not available, SERP API link:', data.ai_overview.serpapi_link);

    throw new Error('Failed to fetch AI overview data');
  } catch (error) {
    console.error('AI Overview API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch AI overview data' },
      { status: 500 },
    );
  }
}
