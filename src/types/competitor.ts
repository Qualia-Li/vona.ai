export interface Competitor {
  id: string;
  name: string;
  website: string;
  // Optional fields that might be useful for competitor analysis
  description?: string;
  strengths?: string[];
  weaknesses?: string[];
  lastAnalyzed?: string; // ISO date string
} 