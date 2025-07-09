export type TextBlockType = 'paragraph' | 'list';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Reference {
  title: string;
  link: string;
  snippet: string;
  source: string;
  index: number;
  // difficulty: Difficulty;
}

export interface ListItem {
  title: string;
  snippet: string;
  reference_indexes: number[];
}

export interface Video {
  link: string;
  date: string;
  source: string;
  thumbnail: string;
}

export interface TextBlock {
  type: TextBlockType;
  snippet?: string;
  reference_indexes?: number[];
  list?: ListItem[];
  video?: Video;
}

export interface AIOverview {
  text_blocks: TextBlock[];
  references: Reference[];
}

export interface OrganicResult {
  position: number;
  title: string;
  link: string;
  redirect_link: string;
  displayed_link: string;
  thumbnail?: string;
  favicon?: string;
  date?: string;
  snippet: string;
  snippet_highlighted_words?: string[];
  source: string;
  rich_snippet?: {
    bottom?: {
      detected_extensions?: {
        price?: number;
        currency?: string;
        rating?: number;
        reviews?: number;
      };
      extensions?: string[];
    };
  };
  sitelinks?: {
    list?: Array<{
      title: string;
      link: string;
      answer_count?: number;
      date?: string;
    }>;
  };
  images?: string[];
}

export interface SERPResult {
  ai_overview: AIOverview;
  organic_results: OrganicResult[];
}