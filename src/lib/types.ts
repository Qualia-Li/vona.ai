export interface Website {
  url: string;
  metadata: {
    title: string;
    description: string;
    category: string;
  };
  searchVisibility: {
    rank: number;
    visibility: number;
  };
}

export interface Keyword {
  id: string;
  term: string;
  volume: number;
  aiOverviewLikelihood: number; // 0-100
  optimizationDifficulty: number; // 0-100
  purchaseIntent?: number; // 0-100, optional for non-ecommerce
  isCustom?: boolean;
}

export interface QueryAnalysis {
  keyword: string;
  aiTriggerPotential: number;
  contentGaps: string[];
  optimizationDifficulty: number;
  conversionDifficulty: number;
  competitorAnalysis: string[];
}

export interface ContentPlatform {
  id: string;
  name: string;
  url: string;
  type: 'reddit' | 'quora' | 'medium' | 'other';
}

export interface GeneratedContent {
  id: string;
  keyword: string;
  platform: ContentPlatform;
  content: string;
  status: 'draft' | 'approved' | 'published';
  engagement: {
    views: number;
    likes: number;
    comments: number;
  };
}

export interface PerformanceMetrics {
  date: string;
  keywords: {
    keyword: string;
    rank: number;
    aiOverviewRate: number;
    impressions: number;
    clicks: number;
  }[];
  platforms: {
    platform: string;
    engagement: number;
    conversions: number;
  }[];
}
