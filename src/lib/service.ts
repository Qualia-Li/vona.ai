import { Website, Keyword, QueryAnalysis, GeneratedContent, PerformanceMetrics, ContentPlatform } from './types';

export async function analyzeWebsite(url: string): Promise<Website> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    url,
    metadata: {
      title: "Sample Website",
      description: "An example e-commerce website",
      category: "E-commerce",
    },
    searchVisibility: {
      rank: 45,
      visibility: 0.67,
    },
  };
}

export async function suggestKeywords(website: Website): Promise<Keyword[]> {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return [
    {
      id: '1',
      term: 'best online shopping',
      aiOverviewLikelihood: 85,
      optimizationDifficulty: 65,
      purchaseIntent: 90,
    },
    {
      id: '2',
      term: 'discount electronics',
      aiOverviewLikelihood: 75,
      optimizationDifficulty: 45,
      purchaseIntent: 85,
    },
  ];
}

export async function analyzeQuery(keyword: string): Promise<QueryAnalysis> {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    keyword,
    aiTriggerPotential: 78,
    contentGaps: ['Pricing comparison', 'Technical specifications'],
    optimizationDifficulty: 65,
    conversionDifficulty: 45,
    competitorAnalysis: ['Strong presence on Reddit', 'Limited Quora coverage'],
  };
}

export async function getSuggestedPlatforms(): Promise<ContentPlatform[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    { id: '1', name: 'Reddit', url: 'https://reddit.com', type: 'reddit' },
    { id: '2', name: 'Quora', url: 'https://quora.com', type: 'quora' },
  ];
}

export async function generateContent(keyword: string, platform: ContentPlatform): Promise<GeneratedContent> {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
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

export async function getPerformanceMetrics(startDate: string, endDate: string): Promise<PerformanceMetrics> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    date: new Date().toISOString(),
    keywords: [
      {
        keyword: 'best online shopping',
        rank: 12,
        aiOverviewRate: 0.45,
        impressions: 1200,
        clicks: 180,
      },
    ],
    platforms: [
      {
        platform: 'Reddit',
        engagement: 850,
        conversions: 25,
      },
    ],
  };
} 