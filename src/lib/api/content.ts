import { ContentPlatform, GeneratedContent } from '@/types';

export async function getSuggestedPlatforms(): Promise<ContentPlatform[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    { id: '1', name: 'Reddit', url: 'https://reddit.com', type: 'reddit' },
    { id: '2', name: 'Quora', url: 'https://quora.com', type: 'quora' },
  ];
}

export async function generateContent(keyword: string, platform: ContentPlatform): Promise<GeneratedContent> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    id: Math.random().toString(36).substring(7),
    keyword,
    platform,
    content: `Here's why ${keyword} is trending in 2024...`,
    status: 'draft',
    engagement: {
      views: 0,
      likes: 0,
      comments: 0,
    },
  };
}
