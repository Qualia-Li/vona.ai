'use client';

import { useEffect, useState } from 'react';

import AIOverview from '@/components/AIOverview/AIOverviewCard';
import AIOverviewCard from '@/components/AIOverview/AIOverviewCard';
import CompetitorAnalysis from '@/components/CompetitorAnalysis/CompetitorAnalysis';
import FAQ from '@/components/FAQ/FAQ';
import OptimizationAnalysis from '@/components/OptimizationAnalysis/OptimizationAnalysis';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useKeywordsStore } from '@/lib/store/keywordsStore';
import { useAIOverview } from '@/lib/store/useAIOverview';

import { fetchAIOverview } from '@/lib/api/aiOverview';

export default function QueryAnalysisPage() {
  const { aiOverviewData, setAiOverviewData } = useAIOverview();
  const { keywords } = useKeywordsStore();
  const [query, setQuery] = useState('');
  const [questionWord, setQuestionWord] = useState('what is');

  const handleKeywordClick = (term: string) => {
    setQuery(term);
  };

  const faqItems = [
    {
      question: 'How does the keyword analysis work?',
      answer:
        'Our system analyzes your keywords against AI search patterns, content gaps, and competitor data to provide actionable insights for optimization.',
    },
    {
      question: 'What do the suggested keywords mean?',
      answer:
        'These are trending or relevant keywords in your niche that have shown potential for AI visibility. Click any keyword to analyze it instantly.',
    },
    {
      question: 'How often is the analysis updated?',
      answer:
        "The analysis is updated in real-time when you click 'Analyze', incorporating the latest AI search patterns and competitor data.",
    },
    {
      question: 'How do keyword types affect AI Overview visibility?',
      answer:
        'Informational queries typically have a higher chance of triggering AI Overviews compared to commercial or transactional keywords. Focus on educational and explanatory content for better visibility.',
    },
    {
      question: 'What role does content quality play in AI Overviews?',
      answer:
        'High-quality, comprehensive content that thoroughly addresses user intent is more likely to be featured in AI Overviews. Ensure your content covers the topic in-depth and provides clear value.',
    },
    {
      question: 'How can structured data improve AI Overview chances?',
      answer:
        'Implementing proper schema markup helps AI systems better understand your content context and structure, potentially increasing your chances of appearing in AI Overviews.',
    },
    {
      question: 'Why does my URL placement in AI Overviews change?',
      answer:
        "URL placement in AI Overviews can fluctuate as Google's algorithms evolve. Regular monitoring helps understand these patterns and adapt your content strategy accordingly.",
    },
  ];

  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-4xl font-bold'>Query Analysis</h1>
        <p className='text-muted-foreground mt-2'>
          Detailed analysis of your target keywords and their potential in AI search results.
        </p>
      </div>

      <div className='space-y-6'>
        {/* Search Input Section */}
        <div className='flex gap-2'>
          <Select value={questionWord} onValueChange={setQuestionWord}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select prefix' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='what is'>What is</SelectItem>
              <SelectItem value='how to'>How to</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder='Enter keyword to analyze...'
            className='max-w-xl'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            onClick={() => {
              setAiOverviewData([], []);
              const fullQuery = `${questionWord} ${query}`.trim();
              console.log('Fetching AI Overview for query:', fullQuery);
              fetchAIOverview(fullQuery).then((data) => {
                setAiOverviewData(data.text_blocks, data.references);
              });
            }}
          >
            Analyze
          </Button>
        </div>

        {/* Suggested Keywords */}
        <div className='space-y-2'>
          <p className='text-sm text-muted-foreground'>Suggested keywords for you:</p>
          <div className='flex flex-wrap gap-2'>
            {keywords?.map((keyword, index) => (
              <Badge
                key={index}
                variant='secondary'
                className='cursor-pointer hover:bg-secondary/80'
                onClick={() => handleKeywordClick(keyword.term)}
              >
                {keyword.term}
              </Badge>
            ))}
          </div>
        </div>

        <AIOverviewCard data={aiOverviewData} />

        <Tabs defaultValue='best-online-shopping' className='space-y-4'>
          <TabsContent value='best-online-shopping' className='space-y-4'>
            {/* <Card>
                <CardHeader>
                  <CardTitle>AI Overview Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium mb-2">
                        AI Trigger Potential
                      </div>
                      <Progress value={78} className="h-2" />
                      <div className="text-sm text-muted-foreground mt-1">
                        78%
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-2">
                        Content Gaps
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Pricing comparison</Badge>
                          <span className="text-sm text-muted-foreground">
                            High priority
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            Technical specifications
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            Medium priority
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card> */}

            <OptimizationAnalysis referenceList={aiOverviewData?.references || []} />

            <CompetitorAnalysis references={aiOverviewData?.references || []} />
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <FAQ items={faqItems} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
