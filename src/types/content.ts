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