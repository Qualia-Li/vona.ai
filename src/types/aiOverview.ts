export type TextBlockType = 'paragraph' | 'list';

export interface Reference {
  title: string;
  link: string;
  snippet: string;
  source: string;
  index: number;
  difficulty: 'easy' | 'medium' | 'hard';
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