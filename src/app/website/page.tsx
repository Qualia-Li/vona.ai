'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useKeywordsStore } from '@/lib/store/keywordsStore';
import { AnalysisLinks } from '@/components/ui/analysis-links';

interface KeywordResponse {
  url: string;
  keywords: string[];
  success: boolean;
  message: string;
}

export default function WebsiteInputPage() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const addKeywords = useKeywordsStore((state) => state.addKeywords);
  const setKeywords = useKeywordsStore((state) => state.setKeywords);
  const existingKeywords = useKeywordsStore((state) => state.keywords);
  const clearKeywords = useKeywordsStore((state) => state.clearKeywords);
  const [keywordResults, setKeywordResults] = useState<KeywordResponse | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Normalize URL if it doesn't start with http:// or https://
      let normalizedUrl = url;
      if (url.includes('.') && !url.startsWith('http://') && !url.startsWith('https://')) {
        normalizedUrl = `https://${url}`;
        setUrl(normalizedUrl); // Update the input field
      }

      const response = await fetch('/api/keywords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: normalizedUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze website');
      }

      const data = await response.json();
      setKeywordResults(data);
      setKeywords(data.keywords.map((keyword: string) => ({
        id: Math.random().toString(36).substring(7),
        term: keyword,
        volume: 0,
        aiOverviewLikelihood: 0,
        optimizationDifficulty: 0,
        purchaseIntent: 0,
      })));
    } catch (error) {
      console.error('Error analyzing website:', error);
      alert('Failed to analyze website. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='max-w-2xl mx-auto'>
      <h1 className='text-4xl font-bold mb-4'>Get Started with Enception</h1>
      <p className='text-muted-foreground mb-8'>
        Enter your website URL to begin optimizing your content for AI search engines.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Website Analysis</CardTitle>
          <CardDescription>
            We'll analyze your website's metadata, content, and generate relevant keywords.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAnalyze} className='space-y-4'>
            <div className='flex gap-2'>
              <Input
                type='text'
                placeholder='https://your-website.com'
                className='flex-1'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
              <Button type='submit' disabled={isLoading}>
                {isLoading ? 'Analyzing...' : 'Analyze'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {keywordResults && (
        <>
          <Card className='mt-8'>
            <CardHeader>
              <CardTitle>Generated Keywords</CardTitle>
              <CardDescription>
                {keywordResults.success ? `Keywords generated for ${keywordResults.url}` : keywordResults.message}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {keywordResults.keywords.length > 0 ? (
                <div className='grid gap-2'>
                  {keywordResults.keywords.map((keyword, index) => (
                    <div key={index} className='p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors'>
                      <div className='font-medium'>{keyword}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className='text-muted-foreground'>No keywords generated.</p>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {existingKeywords.length > 0 && (
        <Card className='mt-8'>
          <CardHeader>
            <CardTitle>Existing Queries</CardTitle>
            <CardDescription>Queries from previous analyses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex justify-end'>
                <Button variant='outline' onClick={clearKeywords}>
                  Clear All
                </Button>
              </div>
              <div className='grid gap-2'>
                {existingKeywords.map((keyword) => (
                  <div key={keyword.id} className='p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors'>
                    <div className='font-medium'>{keyword.term}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className='mt-8'>
        <AnalysisLinks url={url} />
      </div>
      
      <div className='mt-8 grid gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>How it Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid gap-4'>
              <div className='flex gap-4 items-start'>
                <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center'>1</div>
                <div>
                  <h3 className='font-medium'>Website Scan</h3>
                  <p className='text-sm text-muted-foreground'>
                    We analyze your website's current content and metadata.
                  </p>
                </div>
              </div>
              <div className='flex gap-4 items-start'>
                <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center'>2</div>
                <div>
                  <h3 className='font-medium'>AI Analysis</h3>
                  <p className='text-sm text-muted-foreground'>
                    Our AI evaluates your site's potential for AI search visibility.
                  </p>
                </div>
              </div>
              <div className='flex gap-4 items-start'>
                <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center'>3</div>
                <div>
                  <h3 className='font-medium'>Optimization Plan</h3>
                  <p className='text-sm text-muted-foreground'>
                    Get a customized plan to improve your AI search presence.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
