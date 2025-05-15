import { Website, Keyword, QueryAnalysis } from '@/types';

export async function suggestKeywords(website: Website): Promise<Keyword[]> {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return [
    {
      id: '1',
      term: 'best online shopping',
      volume: 1000,
      aiOverviewLikelihood: 85,
      optimizationDifficulty: 65,
      purchaseIntent: 90,
    },
    {
      id: '2',
      term: 'discount electronics',
      volume: 1000,
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