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
