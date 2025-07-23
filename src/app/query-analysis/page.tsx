'use client';

import { useEffect, useState, useRef } from 'react';
import { AlertCircle, Download, RefreshCw } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import AIOverviewCard from '@/components/AIOverview/AIOverviewCard';
import CompetitorAnalysis from '@/components/CompetitorAnalysis/CompetitorAnalysis';
import FAQ from '@/components/FAQ/FAQ';
import OptimizationAnalysis from '@/components/OptimizationAnalysis/OptimizationAnalysis';
import OrganicResults from '@/components/OrganicResults/OrganicResults';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useKeywordsStore } from '@/lib/store/keywordsStore';
import { useSearchResults } from '@/lib/store/searchResultsStore';
import { OrganicResult } from '@/types/aiOverview';

import { fetchAIOverview } from '@/lib/api/aiOverview';

interface LocationData {
  city: string;
  state: string;
  country: string;
}

export default function QueryAnalysisPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { 
    currentQuery,
    setCurrentQuery,
    aiOverviewData, 
    organicResults, 
    isLoading, 
    setAiOverviewData, 
    setOrganicResults, 
    setIsLoading,
    clearResults 
  } = useSearchResults();
  const [query, setQuery] = useState(currentQuery);
  const { keywords } = useKeywordsStore();
  const [questionWord, setQuestionWord] = useState('what is the best');
  const [error, setError] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState('none');
  const [locationFilter, setLocationFilter] = useState('none');
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);
  const [defaultTab, setDefaultTab] = useState(aiOverviewData?.text_blocks ? 'ai-overview' : 'organic-results');
  const contentRef = useRef<HTMLDivElement>(null);
  const [exportError, setExportError] = useState<string | null>(null);
  // Handle URL query parameter on mount and changes
  useEffect(() => {
    const urlQuery = searchParams.get('query');
    
    if (urlQuery) {
      // If URL has query, use it and trigger search
      setQuery(urlQuery);
      handleAnalysis(urlQuery);
    } else if (!currentQuery) {
      // If no URL query and no current query, clear results
      clearResults();
    }
    // If there's a current query but no URL query, keep showing stored results
  }, [searchParams]);

  useEffect(() => {
    if (aiOverviewData?.text_blocks && !isLoading) {
      setDefaultTab('ai-overview');
    } else {
      setDefaultTab('organic-results');
    }
  }, [aiOverviewData?.text_blocks, isLoading]);

  // Get user's location
  useEffect(() => {
    const handleLocationError = () => {
      // Set a default location as fallback
      setUserLocation({
        city: 'San Francisco',
        state: 'California',
        country: 'US',
      });
      console.warn('Using default location as fallback');
    };

    if (navigator.geolocation) {
      const locationTimeout = setTimeout(() => {
        console.warn('Location request timed out');
        handleLocationError();
      }, 10000);

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          clearTimeout(locationTimeout);
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`,
            );

            if (!response.ok) {
              throw new Error('Failed to fetch location data');
            }

            const data = await response.json();
            setUserLocation({
              city: data.city || 'San Francisco',
              state: data.principalSubdivision || 'California',
              country: data.countryCode || 'US',
            });
          } catch (error) {
            console.error('Error getting location details:', error);
            handleLocationError();
          }
        },
        (error) => {
          clearTimeout(locationTimeout);
          console.error('Geolocation error:', error.message);
          handleLocationError();
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      );
    } else {
      // Browser doesn't support geolocation
      handleLocationError();
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
        label: `In ${currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}`,
      },
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
      { value: 'city', label: `In ${userLocation.city}, ${userLocation.state}, ${userLocation.country}` },
    ];
  };

  const handleKeywordClick = (term: string) => {
    setQuery(term);
    router.push(`/query-analysis?query=${encodeURIComponent(term)}`);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const faqItems = [
    {
      question: 'How does the query analysis work?',
      answer:
        'Our system analyzes your queries against AI search patterns, content gaps, and competitor data to provide actionable insights for optimization.',
    },
    {
      question: 'What do the suggested queries mean?',
      answer:
        'These are trending or relevant queries in your niche that have shown potential for AI visibility. Click any query to analyze it instantly.',
    },
    {
      question: 'How often is the analysis updated?',
      answer:
        "The analysis is updated in real-time when you click 'Analyze', incorporating the latest AI search patterns and competitor data.",
    },
    {
      question: 'How do query types affect AI Overview visibility?',
      answer:
        'Informational queries typically have a higher chance of triggering AI Overviews compared to commercial or transactional queries. Focus on educational and explanatory content for better visibility.',
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
        'The optimization process takes time to show results. Google typically needs 1 month to index new content, followed by approximately 3 months to rank and summarize it. Around this time, you should see an increase in traffic proportional to your query volume.',
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

  const handleAnalysis = async (queryToAnalyze = query) => {
    try {
      if (queryToAnalyze) {
        router.push(`/query-analysis?query=${encodeURIComponent(queryToAnalyze)}`);
        setCurrentQuery(queryToAnalyze);
      } else {
        clearResults();
        return;
      }
      
      setIsLoading(true);
      setError(null);
      let fullQuery = `${questionWord} ${queryToAnalyze}`.trim();

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
      if (data?.ai_overview?.text_blocks) {
        setAiOverviewData(data?.ai_overview?.text_blocks, data?.ai_overview?.references);
        setDefaultTab('ai-overview');
      } else {
        setAiOverviewData([], []);
        setDefaultTab('organic-results');
      }
      setOrganicResults(data?.organic_results || []);
      setCurrentQuery(fullQuery);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async () => {
    if (!query || !aiOverviewData?.text_blocks) {
      alert('No analysis results to export. Please analyze a query first.');
      return;
    }

    try {
      setIsLoading(true);
      setExportError(null);

      const jsPDF = (await import('jspdf')).default;
      const pdf = new jsPDF();

      let yPosition = 20;
      const margin = 20;
      const pageWidth = 210; // A4 width
      const contentWidth = pageWidth - (margin * 2);

      const addHeading = (text: string, size = 24) => {
        if (yPosition > 270) {
          pdf.addPage();
          yPosition = 20;
        }
        pdf.setFontSize(size);
        pdf.setTextColor(0, 0, 0);
        pdf.text(text, margin, yPosition);
        yPosition += size / 2 + 3; // Reduced spacing
      };

      const addText = (text: string | undefined, size = 12) => {
        if (!text) return; // Skip undefined text
        pdf.setFontSize(size);
        const lines = pdf.splitTextToSize(text, contentWidth);
        if (yPosition + (lines.length * 5) > 280) { // Reduced line height
          pdf.addPage();
          yPosition = 20;
        }
        pdf.text(lines, margin, yPosition);
        yPosition += lines.length * 5 + 3; // Reduced spacing
      };

      const addProgressBar = (label: string, value: number) => {
        if (yPosition > 270) {
          pdf.addPage();
          yPosition = 20;
        }
        pdf.setFontSize(10);
        pdf.text(`${label}: ${value}%`, margin, yPosition);
        
        // Draw progress bar background
        pdf.setDrawColor(200, 200, 200);
        pdf.setFillColor(200, 200, 200);
        pdf.rect(margin, yPosition + 2, 100, 3, 'F');
        
        // Draw progress bar value
        pdf.setDrawColor(102, 89, 223);
        pdf.setFillColor(102, 89, 223);
        pdf.rect(margin, yPosition + 2, value, 3, 'F');
        
        yPosition += 8; // Reduced spacing
      };

      // Title and Query
      addHeading('Query Analysis Report');
      pdf.setTextColor(102, 89, 223);
      addText(`Query: ${query}`, 16);
      yPosition += 5;

      // AI Overview Section
      if (aiOverviewData.text_blocks?.length) {
        addHeading('AI Overview', 20);
        
        aiOverviewData.text_blocks.forEach(block => {
          if (block.type === 'paragraph' && block.snippet) {
            addText(block.snippet);
          } else if (block.type === 'list' && block.list) {
            block.list.forEach((item, i) => {
              if (item.title) {
                addText(`• ${item.title}`);
                if (item.snippet) {
                  pdf.setTextColor(100, 100, 100);
                  addText(item.snippet, 10);
                  pdf.setTextColor(0, 0, 0);
                }
              }
            });
          }
        });
      }

      // Optimization Analysis Section
      if (aiOverviewData.references?.length) {
        yPosition += 3;
        addHeading('Optimization Analysis', 20);

        // Overall Optimization
        addText('Overall Optimization Recommendations', 14);
        const recommendations = [
          'Content Quality: Ensure comprehensive coverage of the topic',
          'Source Authority: Include references from trusted domains',
          'Content Structure: Use clear headings and organized sections',
          'Rich Media: Include relevant images, videos, or diagrams',
          'User Experience: Optimize page load speed and mobile responsiveness'
        ];
        recommendations.forEach(rec => addText(`• ${rec}`, 11));
        yPosition += 3;

        // Reference Analysis
        addText('Reference Analysis', 14);
        const domains = new Set(aiOverviewData.references.map(ref => new URL(ref.link).hostname));
        addText(`Number of unique source domains: ${domains.size}`, 11);
        addText(`Total references: ${aiOverviewData.references.length}`, 11);
        yPosition += 3;

        // Competitor Analysis
        addText('Competitor Analysis', 14);
        const competitors = aiOverviewData.references.reduce((acc, ref) => {
          const domain = new URL(ref.link).hostname;
          acc[domain] = (acc[domain] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        Object.entries(competitors)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .forEach(([domain, count]) => {
            addText(`• ${domain}: ${count} references`, 11);
          });
      }

      // References Section
      if (aiOverviewData.references?.length) {
        yPosition += 3;
        addHeading('References', 20);
        
        aiOverviewData.references.forEach((ref, index) => {
          if (ref.title) {
            const refText = `${index + 1}. ${ref.title}`;
            addText(refText, 11);
            pdf.setTextColor(100, 100, 100);
            if (ref.snippet) addText(ref.snippet, 10);
            addText(`Source: ${ref.source}`, 9);
            pdf.setTextColor(0, 0, 0);
            yPosition += 2;
          }
        });
      }

      // SERP Analysis Section
      if (organicResults.length) {
        yPosition += 3;
        addHeading('SERP Analysis', 20);

        // SERP Features
        addText('SERP Features', 14);
        const features = {
          'Organic Results': organicResults.length,
          'Rich Snippets': organicResults.filter(r => r.rich_snippet?.bottom?.detected_extensions).length,
          'Sitelinks': organicResults.filter(r => (r.sitelinks?.list?.length || 0) > 0).length
        };

        Object.entries(features).forEach(([label, value]) => {
          addText(`${label}: ${value}`, 11);
        });

        // Content Types
        yPosition += 3;
        addText('Content Types', 14);
        const contentTypes = {
          'Visual Content': organicResults.filter(r => r.thumbnail).length,
          'Reviews': organicResults.filter(r => r.rich_snippet?.bottom?.detected_extensions?.rating).length,
          'Products': organicResults.filter(r => r.rich_snippet?.bottom?.detected_extensions?.price).length
        };

        Object.entries(contentTypes).forEach(([label, value]) => {
          addText(`${label}: ${value}`, 11);
        });
      }

      // Organic Results Section
      if (organicResults.length) {
        yPosition += 5;
        addHeading('Organic Results', 20);
        
        organicResults.forEach((result, index) => {
          if (yPosition > 250) {
            pdf.addPage();
            yPosition = 20;
          }

          pdf.setTextColor(102, 89, 223);
          addText(`${index + 1}. ${result.title}`, 12);
          if (result.displayed_link) {
            pdf.setTextColor(100, 100, 100);
            addText(result.displayed_link, 10);
          }
          pdf.setTextColor(0, 0, 0);
          if (result.snippet) {
            addText(result.snippet, 11);
          }

          // Add rich snippet info if available
          if (result.rich_snippet?.bottom?.detected_extensions) {
            const ext = result.rich_snippet.bottom.detected_extensions;
            if (ext.rating) addText(`Rating: ${ext.rating}/5 (${ext.reviews} reviews)`, 10);
            if (ext.price) addText(`Price: ${ext.currency}${ext.price}`, 10);
          }

          // Add sitelinks if available
          if (result.sitelinks?.list?.length) {
            addText('Sitelinks:', 10);
            result.sitelinks.list.forEach(link => {
              if (link.title) {
                pdf.setTextColor(102, 89, 223);
                addText(`- ${link.title}`, 9);
              }
            });
            pdf.setTextColor(0, 0, 0);
          }

          yPosition += 3;
        });
      }

      pdf.save(`query-analysis-${query}-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Failed to export PDF:', error);
      setExportError(error instanceof Error ? error.message : 'Failed to export PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className='mb-8'>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-4xl font-bold'>Query Analysis</h1>
            <p className='text-muted-foreground mt-2'>
              Detailed analysis of your target queries and their potential in AI search results.
            </p>
          </div>
          {query && aiOverviewData?.text_blocks && (
            <Button variant='outline' onClick={handleExport} disabled={isLoading}>
              <Download className='h-4 w-4 mr-2' />
              {isLoading ? 'Exporting...' : 'Export PDF'}
            </Button>
          )}
        </div>
      </div>

      {exportError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{exportError}</AlertDescription>
        </Alert>
      )}

      <div ref={contentRef} className='space-y-6'>
        {/* Search Input Section */}
        <div className='flex gap-2'>
          <Select value={questionWord} onValueChange={setQuestionWord}>
            <SelectTrigger className='w-[240px]'>
              <SelectValue placeholder='Select prefix' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=' '>(None)</SelectItem>
              <SelectItem value='what is the best'>What is/are the best</SelectItem>
              <SelectItem value='what is'>What is/are</SelectItem>
              <SelectItem value='review of the best'>Review of the best</SelectItem>
              <SelectItem value='review of'>Review of</SelectItem>
              <SelectItem value='how to'>How to</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder='Enter query to analyze...'
            className='max-w-xl'
            value={query}
            onChange={handleQueryChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isLoading) {
                handleAnalysis();
              }
            }}
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
            onClick={() => handleAnalysis()} 
            disabled={isLoading}>
            {isLoading ? 'Analyzing...' : 'Analyze'}
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

        <Tabs defaultValue={defaultTab} className='space-y-2'>
          <p className='text-sm text-muted-foreground'>
            {currentQuery ? `Results for: ${currentQuery}` : 'Enter a query to analyze'}
          </p>
          <TabsList>
            <TabsTrigger value='organic-results'>Organic Results</TabsTrigger>
            <TabsTrigger value='ai-overview'>Google AI Overview</TabsTrigger>
            <TabsTrigger value='serp-analysis'>SERP Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value='ai-overview' className='space-y-4'>
            <AIOverviewCard data={aiOverviewData} />
            <OptimizationAnalysis referenceList={aiOverviewData?.references || []} />
            <CompetitorAnalysis references={aiOverviewData?.references || []} />
          </TabsContent>

          <TabsContent value='serp-analysis' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>SERP Analysis</CardTitle>
                <p className='text-sm text-muted-foreground'>Detailed analysis of search engine results page</p>
              </CardHeader>
              <CardContent>
                <div className='space-y-6'>
                  {/* SERP Features */}
                  <div>
                    <h3 className='text-lg font-semibold mb-4'>SERP Features</h3>
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                      {organicResults.length > 0 ? (
                        <>
                          <div className='p-4 border rounded-lg'>
                            <div className='text-2xl font-bold'>{organicResults.length}</div>
                            <div className='text-sm text-muted-foreground'>Organic Results</div>
                          </div>
                          <div className='p-4 border rounded-lg'>
                            <div className='text-2xl font-bold'>
                              {organicResults.filter((r) => r.rich_snippet?.bottom?.detected_extensions).length}
                            </div>
                            <div className='text-sm text-muted-foreground'>Rich Snippets</div>
                          </div>
                          <div className='p-4 border rounded-lg'>
                            <div className='text-2xl font-bold'>
                              {organicResults.filter((r) => (r.sitelinks?.list?.length || 0) > 0).length}
                            </div>
                            <div className='text-sm text-muted-foreground'>Sitelinks</div>
                          </div>
                        </>
                      ) : (
                        <div className='col-span-3 text-center text-muted-foreground py-8'>
                          Run a query to see SERP features analysis
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content Types */}
                  <div>
                    <h3 className='text-lg font-semibold mb-4'>Content Types</h3>
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                      {organicResults.length > 0 ? (
                        <>
                          <div className='p-4 border rounded-lg'>
                            <div className='text-2xl font-bold'>{organicResults.filter((r) => r.thumbnail).length}</div>
                            <div className='text-sm text-muted-foreground'>Visual Content</div>
                          </div>
                          <div className='p-4 border rounded-lg'>
                            <div className='text-2xl font-bold'>
                              {organicResults.filter((r) => r.rich_snippet?.bottom?.detected_extensions?.rating).length}
                            </div>
                            <div className='text-sm text-muted-foreground'>Reviews</div>
                          </div>
                          <div className='p-4 border rounded-lg'>
                            <div className='text-2xl font-bold'>
                              {organicResults.filter((r) => r.rich_snippet?.bottom?.detected_extensions?.price).length}
                            </div>
                            <div className='text-sm text-muted-foreground'>Products</div>
                          </div>
                        </>
                      ) : (
                        <div className='col-span-3 text-center text-muted-foreground py-8'>
                          Run a query to see content type analysis
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='organic-results' className='space-y-4'>
            <OrganicResults results={organicResults} />
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
