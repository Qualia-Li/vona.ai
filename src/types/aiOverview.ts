export type TextBlockType = 'paragraph' | 'list';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Reference {
  title: string;
  link: string;
  snippet: string;
  source: string;
  index: number;
  difficulty: Difficulty;
}

export interface ListItem {
  title: string;
  snippet: string;
  reference_indexes: number[];
}

export interface TextBlock {
  type: TextBlockType;
  snippet?: string;
  reference_indexes?: number[];
  list?: ListItem[];
}

export interface AIOverview {
  text_blocks: TextBlock[];
  references: Reference[];
} 