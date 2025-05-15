import { Keyword } from "./keywords";

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

export interface WebsiteAnalysisResponse {
  website: Website;
  keywords: Keyword[];
  success: boolean;
  message?: string;
} 