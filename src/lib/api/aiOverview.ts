import { AIOverview, Difficulty, SERPResult } from '@/types/aiOverview';

export async function fetchAIOverview(query: string): Promise<SERPResult> {
  const response = await fetch('/api/serp-ai-overview', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to fetch AI overview data');
  }

  const data = await response.json();

  return data;
}

export function calculateDifficulty(link: string): Difficulty {
  const url = link.toLowerCase();

  if (url.includes('quora.com') || url.includes('reddit.com')) {
    return 'easy';
  }

  if (url.includes('youtube.com') || url.includes('wikipedia.org') || url.includes('medium.com')) {
    return 'medium';
  }

  return 'hard';
}
