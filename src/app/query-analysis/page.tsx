'use client';

import { useEffect, useState } from 'react';
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import AIOverviewCard from '@/components/AIOverview/AIOverviewCard';
import CompetitorAnalysis from '@/components/CompetitorAnalysis/CompetitorAnalysis';
import FAQ from '@/components/FAQ/FAQ';
import OptimizationAnalysis from '@/components/OptimizationAnalysis/OptimizationAnalysis';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useKeywordsStore } from '@/lib/store/keywordsStore';
import { useAIOverview } from '@/lib/store/useAIOverview';

import { fetchAIOverview } from '@/lib/api/aiOverview';

interface LocationData {
  city: string;
  state: string;
  country: string;
}

export default function QueryAnalysisPage() {
  const { aiOverviewData, setAiOverviewData } = useAIOverview();
  const { keywords } = useKeywordsStore();
  const [query, setQuery] = useState('');
  const [questionWord, setQuestionWord] = useState('what is the best');
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [timeFilter, setTimeFilter] = useState('none');
  const [locationFilter, setLocationFilter] = useState('none');
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      const locationTimeout = setTimeout(() => {
        console.warn('Location request timed out');
      }, 10000);

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          clearTimeout(locationTimeout);
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
            );
            
            if (!response.ok) {
              throw new Error('Failed to fetch location data');
            }
            
            const data = await response.json();
            setUserLocation({
              city: data.city,
              state: data.principalSubdivision,
              country: data.countryCode
            });
          } catch (error) {
            console.error('Error getting location details:', error);
          }
        },
        (error) => {
          clearTimeout(locationTimeout);
          console.error('Geolocation error:', error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    }
  }, []);

  // Generate time options based on current date
  const generateTimeOptions = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0-11

    return [
      { value: 'none', label: 'No time filter' },
      { value: currentYear.toString(), label: `In ${currentYear}` },
      { 
        value: `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}`,
        label: `In ${currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}`
      }
    ];
  };

  // Generate location options based on user's location
  const generateLocationOptions = () => {
    if (!userLocation) {
      return [{ value: 'none', label: 'No location filter' }];
    }

    return [
      { value: 'none', label: 'No location filter' },
      { value: 'country', label: `In ${userLocation.country}` },
      { value: 'state', label: `In ${userLocation.state}, ${userLocation.country}` },
      { value: 'city', label: `In ${userLocation.city}, ${userLocation.state}, ${userLocation.country}` }
    ];
  };

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
    {
      question: 'Which websites and platforms are most effective for AI Overviews?',
      answer:
        'Google tends to favor content from YouTube, Medium, Quora, Reddit, and sometimes LinkedIn. These platforms are considered the most effective channels for AI visibility due to their high-quality user-generated content and established authority.',
    },
    {
      question: 'How long does it take to see optimization results?',
      answer:
        'The optimization process takes time to show results. Google typically needs 1 month to index new content, followed by approximately 3 months to rank and summarize it. Around this time, you should see an increase in traffic proportional to your keyword volume.',
    },
    {
      question: 'Do different AI search engines prefer different sources?',
      answer:
        'Yes, different search engines have different preferences. For example, Grok tends to favor X (Twitter) posts. However, Reddit and Quora content are generally accessible and favored by most AI search engines due to their comprehensive discussion format.',
    },
    {
      question: 'How is content hosted for brand optimization?',
      answer:
        'Content follows two approaches: "off-page SEO" content (like Reddit posts) is hosted on third-party platforms, while "on-page SEO" content is typically hosted on the brand\'s website. Our team can also provide hosting solutions with minor redirection changes if needed.',
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

      {error && (
        <Alert variant='destructive' className='mb-4'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className='space-y-6'>
        {/* Search Input Section */}
        <div className='flex gap-2'>
          <Select value={questionWord} onValueChange={setQuestionWord}>
            <SelectTrigger className='w-[240px]'>
              <SelectValue placeholder='Select prefix' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='what is the best'>What is/are the best</SelectItem>
              <SelectItem value='what is'>What is/are</SelectItem>
              <SelectItem value='review of the best'>Review of the best</SelectItem>
              <SelectItem value='review of'>Review of</SelectItem>
              <SelectItem value='how to'>How to</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder='Enter keyword to analyze...'
            className='max-w-xl'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* Simplified Time Filter */}
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Time filter' />
            </SelectTrigger>
            <SelectContent>
              {generateTimeOptions().map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Updated Location Filter */}
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className='w-[250px]'>
              <SelectValue placeholder='Location filter' />
            </SelectTrigger>
            <SelectContent>
              {generateLocationOptions().map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button
            onClick={async () => {
              try {
                setIsAnalyzing(true);
                setError(null);
                setAiOverviewData([], []);
                let fullQuery = `${questionWord} ${query}`.trim();

                // Add time filter to query if selected
                if (timeFilter !== 'none') {
                  const [year, month] = timeFilter.split('-');
                  if (month) {
                    const date = new Date(parseInt(year), parseInt(month) - 1);
                    fullQuery += ` in ${date.toLocaleString('en-US', { month: 'long', year: 'numeric' })}`;
                  } else {
                    fullQuery += ` in ${year}`;
                  }
                }

                // Add location filter to query if selected
                if (locationFilter !== 'none' && userLocation) {
                  let locationString = '';
                  switch (locationFilter) {
                    case 'country':
                      locationString = userLocation.country;
                      break;
                    case 'state':
                      locationString = `${userLocation.state}, ${userLocation.country}`;
                      break;
                    case 'city':
                      locationString = `${userLocation.city}, ${userLocation.state}, ${userLocation.country}`;
                      break;
                  }
                  if (locationString) {
                    fullQuery += ` in ${locationString}`;
                  }
                }

                console.log('Fetching AI Overview for query:', fullQuery);
                const data = await fetchAIOverview(fullQuery);
                setAiOverviewData(data.text_blocks, data.references);
              } catch (error) {
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
              } finally {
                setIsAnalyzing(false);
              }
            }}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze'}
          </Button>
        </div>

        {/* Suggested Keywords */}
        <div className='space-y-2'>
          <p className='text-sm text-muted-foreground'>Your keywords:</p>
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
