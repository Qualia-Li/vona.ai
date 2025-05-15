import { Website, PerformanceMetrics } from '@/types';

export async function analyzeWebsite(url: string): Promise<Website> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    url,
    metadata: {
      title: 'Sample Website',
      description: 'An example e-commerce website',
      category: 'E-commerce',
    },
    searchVisibility: {
      rank: 45,
      visibility: 0.67,
    },
  };
}

export async function getPerformanceMetrics(startDate: string, endDate: string): Promise<PerformanceMetrics> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

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
