'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { AlertCircle, Download, RefreshCw, Loader2, XCircle, CheckCircle2 } from 'lucide-react';
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
import { OrganicResult, Reference } from '@/types/aiOverview';
import { useBrandStore } from '@/lib/store/brandStore';

import { fetchAIOverview } from '@/lib/api/aiOverview';

interface LocationData {
  city: string;
  state: string;
  country: string;
}

function QueryAnalysisContent() {
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
  const [exportProgress, setExportProgress] = useState<string>('');
  const [isExporting, setIsExporting] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportProgress, setReportProgress] = useState<string>('');
  const { brand } = useBrandStore();

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

  const addHeaderToPdf = (pdf: any, reportType: string) => {
    const pageWidth = pdf.internal.pageSize.width;
    const margin = 20;

    // Add brand name and report type
    pdf.setFontSize(20);
    pdf.setTextColor(0, 0, 0);
    if (brand?.name) {
      pdf.text(brand.name, margin, 20);
    }
    pdf.setFontSize(16);
    pdf.text(reportType, margin, brand?.name ? 30 : 20);

    // Add date
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    pdf.setFontSize(10);
    pdf.setTextColor(128, 128, 128);
    pdf.text(date, pageWidth - margin, brand?.name ? 30 : 20, { align: 'right' });

    // Add separator line
    pdf.setDrawColor(230, 230, 230);
    pdf.line(margin, brand?.name ? 35 : 25, pageWidth - margin, brand?.name ? 35 : 25);

    // Return the Y position for content to start
    return brand?.name ? 45 : 35;
  };

  const addLogoToPdf = async (pdf: any) => {
    try {
      // Create an Image element to load the logo
      const img = new Image();
      img.src = brand?.logo || '/images/enception_logo.png';
      
      // Wait for the image to load
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Calculate dimensions to maintain aspect ratio (smaller size)
      const imgWidth = 15; // mm - small size
      const imgHeight = (img.height * imgWidth) / img.width;

      // Add logo to all pages
      const pageCount = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        // Add logo at the bottom right of each page
        pdf.addImage(
          img, 
          'PNG', 
          pdf.internal.pageSize.width - imgWidth - 5, // 5mm from right
          pdf.internal.pageSize.height - imgHeight - 5, // 5mm from bottom
          imgWidth, 
          imgHeight
        );
        
        // Add "Generated with Enception.AI" text
        pdf.setFontSize(6); // Smaller text
        pdf.setTextColor(128, 128, 128);
        pdf.text(
          'Generated with Enception.AI', 
          pdf.internal.pageSize.width - 5, 
          pdf.internal.pageSize.height - 3, 
          { align: 'right' }
        );
      }
    } catch (error) {
      console.error('Failed to add logo:', error);
    }
  };

  // Add this reusable function for organic results
  const addOrganicResultsToPdf = (pdf: any, results: OrganicResult[], startY: number) => {
    let yPosition = startY;

    if (results?.length) {
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = 20;
      }
      yPosition += 10;
      pdf.setFontSize(18);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Organic Results', 20, yPosition);
      yPosition += 10;

      results.forEach((result, index) => {
        if (yPosition > 250) {
          pdf.addPage();
          yPosition = 20;
        }

        // Title with rank
        pdf.setFontSize(12);
        pdf.setTextColor(brand?.color || '#6659df');
        const titleLines = pdf.splitTextToSize(`${index + 1}. ${result.title}`, 170);
        pdf.text(titleLines, 20, yPosition);
        yPosition += titleLines.length * 5;

        // URL
        if (result.displayed_link) {
          pdf.setFontSize(10);
          pdf.setTextColor(100, 100, 100);
          pdf.text(result.displayed_link, 20, yPosition);
          yPosition += 5;
        }

        // Snippet
        if (result.snippet) {
          pdf.setFontSize(11);
          pdf.setTextColor(0, 0, 0);
          const snippetLines = pdf.splitTextToSize(result.snippet, 170);
          pdf.text(snippetLines, 20, yPosition);
          yPosition += snippetLines.length * 5;
        }

        // Rich snippet info
        if (result.rich_snippet?.bottom?.detected_extensions) {
          const ext = result.rich_snippet.bottom.detected_extensions;
          pdf.setFontSize(10);
          pdf.setTextColor(100, 100, 100);
          if (ext.rating) {
            pdf.text(`Rating: ${ext.rating}/5 (${ext.reviews} reviews)`, 20, yPosition);
            yPosition += 5;
          }
          if (ext.price) {
            pdf.text(`Price: ${ext.currency}${ext.price}`, 20, yPosition);
            yPosition += 5;
          }
        }

        // Sitelinks
        if (result.sitelinks?.list?.length) {
          pdf.setFontSize(10);
          pdf.setTextColor(brand?.color || '#6659df');
          pdf.text('Sitelinks:', 20, yPosition);
          yPosition += 5;
          result.sitelinks.list.forEach(link => {
            if (link.title) {
              pdf.text(`- ${link.title}`, 25, yPosition);
              yPosition += 5;
            }
          });
        }

        yPosition += 10; // Space between results
      });
    }
    return yPosition;
  };

  // Add reusable function for optimization analysis
  const addOptimizationAnalysisToPdf = (pdf: any, references: Reference[], startY: number) => {
    let yPosition = startY;

    if (references?.length) {
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = 20;
      }
      yPosition += 10;
      pdf.setFontSize(18);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Optimization Analysis', 20, yPosition);
      yPosition += 10;

      // Reference Analysis
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Reference Analysis', 20, yPosition);
      const domains = new Set(references.map(ref => new URL(ref.link).hostname));
      pdf.text(`Number of unique source domains: ${domains.size}`, 20, yPosition + 5);
      pdf.text(`Total references: ${references.length}`, 20, yPosition + 10);
      yPosition += 15;

      // Competitor Analysis
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Competitor Analysis', 20, yPosition);
      yPosition += 5;

      const competitors = references.reduce((acc, ref) => {
        const domain = new URL(ref.link).hostname;
        acc[domain] = (acc[domain] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      Object.entries(competitors)
        .sort(([, a], [, b]) => (b as number) - (a as number))
        .slice(0, 5)
        .forEach(([domain, count]) => {
          pdf.text(`• ${domain}: ${count} references`, 20, yPosition);
          yPosition += 5;
        });
      yPosition += 5;
    }
    return yPosition;
  };

  // Add reusable function for references
  const addReferencesToPdf = (pdf: any, references: Reference[], startY: number) => {
    let yPosition = startY;

    if (references?.length) {
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = 20;
      }
      yPosition += 10;
      pdf.setFontSize(18);
      pdf.setTextColor(0, 0, 0);
      pdf.text('References', 20, yPosition);
      yPosition += 10;

      references.forEach((ref, index) => {
        if (yPosition > 250) {
          pdf.addPage();
          yPosition = 20;
        }
        if (ref.title) {
          pdf.setFontSize(11);
          pdf.setTextColor(0, 0, 0);
          const titleLines = pdf.splitTextToSize(`${index + 1}. ${ref.title}`, 170);
          pdf.text(titleLines, 20, yPosition);
          yPosition += titleLines.length * 5;

          if (ref.snippet) {
            pdf.setTextColor(100, 100, 100);
            const snippetLines = pdf.splitTextToSize(ref.snippet, 170);
            pdf.text(snippetLines, 20, yPosition);
            yPosition += snippetLines.length * 5;
          }

          if (ref.source) {
            pdf.setFontSize(9);
            pdf.text(`Source: ${ref.source}`, 20, yPosition);
            yPosition += 8;
          }

          pdf.setTextColor(0, 0, 0);
        }
      });
    }
    return yPosition;
  };

  const handleExportReport = async () => {
    if (!query || !aiOverviewData?.text_blocks) {
      alert('No analysis results to export. Please analyze a query first.');
      return;
    }

    try {
      setIsExporting(true);
      setExportError(null);
      const jsPDF = (await import('jspdf')).default;
      const finalPdf = new jsPDF();

      // Add header with brand and report info
      let yPosition = addHeaderToPdf(finalPdf, 'Query Analysis Report');

      // Add query info
      finalPdf.setFontSize(14);
      finalPdf.setTextColor(brand?.color || '#6659df');
      finalPdf.text(`Query: ${query}`, 20, yPosition);
      yPosition += 10;

      // AI Overview Section
      if (aiOverviewData?.text_blocks?.length) {
        finalPdf.setFontSize(18);
        finalPdf.setTextColor(0, 0, 0);
        finalPdf.text('AI Overview', 20, yPosition);
        yPosition += 10;

        aiOverviewData.text_blocks.forEach(block => {
          if (block.type === 'paragraph' && block.snippet) {
            finalPdf.setFontSize(12);
            finalPdf.setTextColor(0, 0, 0);
            const lines = finalPdf.splitTextToSize(block.snippet, 170);
            if (yPosition + (lines.length * 5) > 280) {
              finalPdf.addPage();
              yPosition = 20;
            }
            finalPdf.text(lines, 20, yPosition);
            yPosition += lines.length * 5 + 5;
          } else if (block.type === 'list' && block.list) {
            block.list.forEach(item => {
              if (yPosition > 270) {
                finalPdf.addPage();
                yPosition = 20;
              }
              if (item.title) {
                finalPdf.setFontSize(12);
                finalPdf.text(`• ${item.title}`, 20, yPosition);
                yPosition += 5;
                if (item.snippet) {
                  finalPdf.setTextColor(100, 100, 100);
                  const lines = finalPdf.splitTextToSize(item.snippet, 160);
                  finalPdf.text(lines, 25, yPosition);
                  yPosition += lines.length * 5;
                  finalPdf.setTextColor(0, 0, 0);
                }
                yPosition += 5;
              }
            });
          }
        });
      }

      // Add Optimization Analysis Section
      if (aiOverviewData?.references) {
        yPosition = addOptimizationAnalysisToPdf(finalPdf, aiOverviewData.references, yPosition);
      }

      // Add References Section
      if (aiOverviewData?.references) {
        yPosition = addReferencesToPdf(finalPdf, aiOverviewData.references, yPosition);
      }

      // Add Organic Results Section
      yPosition = addOrganicResultsToPdf(finalPdf, organicResults, yPosition);

      // Add logo to all pages
      await addLogoToPdf(finalPdf);

      // Save with formatted name
      const date = new Date().toISOString().split('T')[0];
      const brandPrefix = brand?.name ? `${brand.name}-` : '';
      finalPdf.save(`${brandPrefix}query-analysis-${query}-${date}.pdf`);
      setExportProgress('Export completed successfully!');
    } catch (error) {
      console.error('Failed to generate report:', error);
      setExportError(error instanceof Error ? error.message : 'Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
      setTimeout(() => setExportProgress(''), 3000);
    }
  };

  const handleGenerateFullReport = async () => {
    if (!keywords.length) {
      alert('No keywords available. Please add some keywords first.');
      return;
    }

    try {
      setIsGeneratingReport(true);
      const jsPDF = (await import('jspdf')).default;
      const finalPdf = new jsPDF();

      // Add header with brand and report info
      let yPosition = addHeaderToPdf(finalPdf, 'Full Keywords Analysis Report');

      // Add report summary
      finalPdf.setFontSize(12);
      finalPdf.setTextColor(0, 0, 0);
      finalPdf.text(`Total Keywords: ${keywords.length}`, 20, yPosition);
      yPosition += 10;

      // Analyze each keyword
      for (let i = 0; i < keywords.length; i++) {
        const keyword = keywords[i];
        setReportProgress(`Analyzing keyword ${i + 1}/${keywords.length}: ${keyword.term}`);

        try {
          // Add page break except for first keyword
          if (i > 0) {
            finalPdf.addPage();
            yPosition = 20;
          }

          // Fetch analysis data for this keyword
          const data = await fetchAIOverview(keyword.term);

          // Add keyword header
          finalPdf.setFontSize(16);
          finalPdf.setTextColor(0, 0, 0);
          finalPdf.text(`Keyword Analysis: ${keyword.term}`, 20, yPosition);
          yPosition += 10;

          // Add metrics
          finalPdf.setFontSize(12);
          finalPdf.text(`Volume: ${keyword.volume || 'N/A'}`, 20, yPosition);
          yPosition += 5;
          finalPdf.text(`AI Overview Likelihood: ${keyword.aiOverviewLikelihood || 'N/A'}%`, 20, yPosition);
          yPosition += 5;
          finalPdf.text(`Optimization Difficulty: ${keyword.optimizationDifficulty || 'N/A'}%`, 20, yPosition);
          yPosition += 5;
          if (keyword.purchaseIntent !== undefined && keyword.purchaseIntent !== null) {
            finalPdf.text(`Purchase Intent: ${keyword.purchaseIntent}%`, 20, yPosition);
            yPosition += 5;
          }
          yPosition += 5;

          // Add AI Overview content if available
          if (data?.ai_overview?.text_blocks?.length) {
            finalPdf.setFontSize(14);
            finalPdf.text('AI Overview', 20, yPosition);
            yPosition += 10;

            data.ai_overview.text_blocks.forEach(block => {
              if (yPosition > 250) {
                finalPdf.addPage();
                yPosition = 20;
              }

              if (block.type === 'paragraph' && block.snippet) {
                finalPdf.setFontSize(11);
                const lines = finalPdf.splitTextToSize(block.snippet, 170);
                finalPdf.text(lines, 20, yPosition);
                yPosition += lines.length * 5 + 5;
              } else if (block.type === 'list' && block.list) {
                block.list.forEach(item => {
                  if (yPosition > 250) {
                    finalPdf.addPage();
                    yPosition = 20;
                  }
                  if (item.title) {
                    finalPdf.setFontSize(11);
                    finalPdf.text(`• ${item.title}`, 20, yPosition);
                    yPosition += 5;
                    if (item.snippet) {
                      finalPdf.setTextColor(100, 100, 100);
                      const lines = finalPdf.splitTextToSize(item.snippet, 160);
                      finalPdf.text(lines, 25, yPosition);
                      yPosition += lines.length * 5;
                      finalPdf.setTextColor(0, 0, 0);
                    }
                    yPosition += 5;
                  }
                });
              }
            });
          }

          // Add Optimization Analysis if available
          if (data?.ai_overview?.references) {
            yPosition = addOptimizationAnalysisToPdf(finalPdf, data.ai_overview.references, yPosition);
          }

          // Add References if available
          if (data?.ai_overview?.references) {
            yPosition = addReferencesToPdf(finalPdf, data.ai_overview.references, yPosition);
          }

          // Add organic results if available
          if (data?.organic_results?.length) {
            yPosition = addOrganicResultsToPdf(finalPdf, data.organic_results, yPosition);
          }

        } catch (error) {
          console.error(`Error analyzing keyword "${keyword.term}":`, error);
          if (yPosition > 250) {
            finalPdf.addPage();
            yPosition = 20;
          }
          finalPdf.setFontSize(12);
          finalPdf.setTextColor(255, 0, 0);
          finalPdf.text(`Error analyzing keyword: ${error instanceof Error ? error.message : 'Unknown error'}`, 20, yPosition);
          finalPdf.setTextColor(0, 0, 0);
          yPosition += 10;
        }
      }

      // Add logo to all pages
      await addLogoToPdf(finalPdf);

      // Save with formatted name
      const date = new Date().toISOString().split('T')[0];
      const brandPrefix = brand?.name ? `${brand.name}-` : '';
      finalPdf.save(`${brandPrefix}full-analysis-report-${date}.pdf`);
      setReportProgress('Report generated successfully!');
    } catch (error) {
      console.error('Failed to generate full report:', error);
      alert('Failed to generate full report. Please try again.');
    } finally {
      setIsGeneratingReport(false);
      setTimeout(() => setReportProgress(''), 3000);
    }
  };

  return (
    <div>
      <div className='mb-8'>
        <div className='flex flex-col gap-4'>
          <div>
            <h1 className='text-4xl font-bold'>Query Analysis</h1>
            <p className='text-muted-foreground mt-2'>
              Detailed analysis of your target queries and their potential in AI search results.
            </p>
          </div>
          <div className='flex gap-2'>
            {query && aiOverviewData?.text_blocks && (
              <Button variant='outline' onClick={handleExportReport} disabled={isLoading || isExporting || isGeneratingReport}>
                {isExporting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {exportProgress || 'Generating PDF...'}
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Export Current Keyword
                  </>
                )}
              </Button>
            )}
            {keywords.length > 0 && (
              <Button 
                variant='outline' 
                onClick={handleGenerateFullReport} 
                disabled={isLoading || isExporting || isGeneratingReport}
              >
                {isGeneratingReport ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing keywords...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Export Report ({keywords.length} Keywords)
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Status Message for Export */}
      {(isExporting || isGeneratingReport) && (
        <div className='flex items-center gap-2 justify-end mb-4'>
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 bg-blue-50 text-blue-700`}
          >
            <RefreshCw className='h-5 w-5 animate-spin' />
          </div>
          <span className='text-sm text-blue-700'>
            {isExporting ? exportProgress || 'Generating PDF...' : reportProgress || 'Analyzing keywords...'}
          </span>
        </div>
      )}

      {/* Success/Error Message */}
      {!isExporting && !isGeneratingReport && (exportProgress || exportError) && (
        <div className='flex items-center gap-2 justify-end mb-4'>
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
              exportError ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
            }`}
          >
            {exportError ? (
              <XCircle className='h-5 w-5' />
            ) : (
              <CheckCircle2 className='h-5 w-5' />
            )}
          </div>
          <span className={`text-sm ${exportError ? 'text-red-700' : 'text-green-700'}`}>
            {exportError || exportProgress}
          </span>
        </div>
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

export default function QueryAnalysisPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading query analysis...</span>
        </div>
      </div>
    }>
      <QueryAnalysisContent />
    </Suspense>
  );
}
