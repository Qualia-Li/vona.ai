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