'use client';

import { ArrowUpDown, LayoutGrid, Plus, Table as TableIcon, RefreshCw, CheckCircle2, XCircle, Hourglass, Trash2, Download } from 'lucide-react';
import { useState, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Toggle } from '@/components/ui/toggle';
import { useKeywordsStore } from '@/lib/store/keywordsStore';
import { analyzeQuery } from '@/lib/api/keywords';
import { Keyword } from '@/types/keywords';

type SortField = 'volume' | 'aiOverviewLikelihood' | 'optimizationDifficulty' | 'purchaseIntent';
type SortOrder = 'asc' | 'desc';
type ViewMode = 'table' | 'card';
type AnalysisStatus = 'idle' | 'analyzing' | 'success' | 'error';

interface KeywordWithStatus extends Keyword {
  analysisStatus?: AnalysisStatus;
  analysisMessage?: string;
}

export default function KeywordsPage() {
  const router = useRouter();
  const keywords = useKeywordsStore((state) => state.keywords) as KeywordWithStatus[];
  const deleteKeyword = useKeywordsStore((state) => state.deleteKeyword);
  const addKeyword = useKeywordsStore((state) => state.addKeyword);
  const updateKeyword = useKeywordsStore((state) => state.updateKeyword);
  const clearKeywords = useKeywordsStore((state) => state.clearKeywords);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');
  const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatus>('idle');
  const [analysisMessage, setAnalysisMessage] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  const sortedKeywords = useMemo(() => {
    if (!sortField) {
      // If no sort field specified, maintain original order
      return keywords;
    }

    return [...keywords].sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      const aValue = a[sortField] || 0;
      const bValue = b[sortField] || 0;
      const comparison = (aValue - bValue) * multiplier;
      
      // If values are equal, maintain original order using array index
      if (comparison === 0) {
        return keywords.indexOf(a) - keywords.indexOf(b);
      }
      
      return comparison;
    });
  }, [keywords, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Add a function to clear sorting
  const clearSort = () => {
    setSortField(null as any);
  };

  const handleAddKeyword = () => {
    if (!newKeyword.trim()) return;

    addKeyword({
      id: crypto.randomUUID(),
      term: newKeyword.trim(),
      volume: 0,
      aiOverviewLikelihood: 0,
      optimizationDifficulty: 0,
      isCustom: true
    });

    setNewKeyword('');
    setIsDialogOpen(false);
  };

  const handleAnalyzeAll = async () => {
    if (keywords.length === 0) {
      setAnalysisStatus('error');
      setAnalysisMessage('No keywords to analyze. Add some keywords first.');
      return;
    }

    setAnalysisStatus('analyzing');
    setAnalysisMessage(`Starting analysis of ${keywords.length} keywords...`);

    // Mark all keywords as pending analysis
    keywords.forEach(keyword => {
      updateKeyword(keyword.id, {
        analysisStatus: 'analyzing',
        analysisMessage: 'Waiting...'
      } as Partial<KeywordWithStatus>);
    });

    let completedCount = 0;
    const totalCount = keywords.length;

    try {
      // Create an array of promises but don't wait for all
      keywords.forEach(async (keyword, index) => {
        try {
          // Update status to show this query is being processed
          updateKeyword(keyword.id, {
            analysisStatus: 'analyzing',
            analysisMessage: 'Analyzing...'
          } as Partial<KeywordWithStatus>);

          // Analyze this individual query
          const result = await analyzeQuery(keyword.term);
          
          // Update this keyword immediately with its results
          if (result.success) {
            updateKeyword(keyword.id, {
              volume: result.volume,
              aiOverviewLikelihood: result.ai_likelihood,
              optimizationDifficulty: result.difficulty,
              purchaseIntent: result.purchase_intent === null ? null : parseFloat(result.purchase_intent),
              analysisStatus: 'success',
              analysisMessage: result.message
            } as Partial<KeywordWithStatus>);
          } else {
            updateKeyword(keyword.id, {
              analysisStatus: 'error',
              analysisMessage: result.message
            } as Partial<KeywordWithStatus>);
          }

          // Update overall progress
          completedCount++;
          setAnalysisMessage(`Analyzed ${completedCount} of ${totalCount} keywords`);

          // If this was the last query, update the final status
          if (completedCount === totalCount) {
            setAnalysisStatus('success');
            setAnalysisMessage(`Completed analysis of ${totalCount} keywords`);
            setTimeout(() => setAnalysisStatus('idle'), 3000);
          }
        } catch (error) {
          console.error(`Failed to analyze keyword "${keyword.term}":`, error);
          updateKeyword(keyword.id, {
            analysisStatus: 'error',
            analysisMessage: 'Analysis failed'
          } as Partial<KeywordWithStatus>);

          // Update overall progress even for failed queries
          completedCount++;
          if (completedCount === totalCount) {
            setAnalysisStatus('error');
            setAnalysisMessage(`Analysis completed with some errors`);
            setTimeout(() => setAnalysisStatus('idle'), 3000);
          }
        }
      });
    } catch (error) {
      console.error('Failed to start analysis:', error);
      setAnalysisStatus('error');
      setAnalysisMessage('Failed to start analysis. Please try again.');
      setTimeout(() => setAnalysisStatus('idle'), 3000);

      // Mark all unprocessed keywords as error
      keywords.forEach(keyword => {
        if (keyword.analysisStatus === 'analyzing') {
          updateKeyword(keyword.id, {
            analysisStatus: 'error',
            analysisMessage: 'Analysis failed to start'
          } as Partial<KeywordWithStatus>);
        }
      });
    }
  };

  const handleClearAll = () => {
    clearKeywords();
    setIsClearDialogOpen(false);
  };

  const handleQueryClick = (query: string) => {
    router.push(`/query-analysis?query=${encodeURIComponent(query)}`);
  };

  const getStatusIcon = (keyword: KeywordWithStatus) => {
    if (!keyword.analysisStatus || keyword.analysisStatus === 'idle') {
      return '🔍'; // Not analyzed yet
    }
    if (keyword.analysisStatus === 'analyzing') {
      return <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />;
    }
    if (keyword.analysisStatus === 'success') {
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    }
    return <XCircle className="h-4 w-4 text-red-500" />;
  };

  const aiVisibilityScore = useMemo(() => {
    // Only include keywords that have been successfully analyzed
    const analyzedKeywords = keywords.filter(k => 
      k.analysisStatus === 'success' &&
      k.volume !== undefined && 
      k.aiOverviewLikelihood !== undefined && 
      k.optimizationDifficulty !== undefined
    );

    if (analyzedKeywords.length === 0) return null;

    // Find max volume for normalization
    const maxVolume = Math.max(...analyzedKeywords.map(k => k.volume || 0));
    
    const validScores = analyzedKeywords.map(keyword => {
      // Normalize volume to 1-100
      const normalizedVolume = maxVolume ? ((keyword.volume || 0) / maxVolume) * 100 : 0;
      
      // Calculate individual scores
      const volumeScore = normalizedVolume;
      const aiScore = keyword.aiOverviewLikelihood || 0;
      const difficultyScore = 100 - (keyword.optimizationDifficulty || 0); // Invert difficulty
      
      // Only include purchase intent if it exists and is a number
      const purchaseIntent = typeof keyword.purchaseIntent === 'number' ? keyword.purchaseIntent : null;
      const hasIntent = purchaseIntent !== null;
      const totalFactors = hasIntent ? 4 : 3;
      
      // Sum all available scores
      const totalScore = (
        volumeScore + 
        aiScore + 
        difficultyScore + 
        (hasIntent ? purchaseIntent : 0)
      ) / totalFactors; // Divide by number of factors actually used

      return totalScore;
    });

    // Calculate average of valid scores
    const averageScore = validScores.reduce((acc, score) => acc + score, 0) / validScores.length;
    
    // Round to 2 decimal places
    return Math.round(averageScore * 100) / 100;
  }, [keywords]);

  const handleExport = async () => {
    if (!contentRef.current) return;

    try {
      // Dynamically import the libraries only when needed
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      // Show loading state
      setAnalysisStatus('analyzing');
      setAnalysisMessage('Generating PDF...');

      // Create export-friendly version of the content
      const exportDiv = document.createElement('div');
      exportDiv.style.cssText = 'background: white; padding: 32px; width: 1000px; position: fixed; left: -9999px;';
      
      // Create score section
      const scoreSection = document.createElement('div');
      scoreSection.style.cssText = 'margin-bottom: 32px; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;';
      
      const scoreHeader = document.createElement('div');
      scoreHeader.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;';
      
      const scoreTitle = document.createElement('h2');
      scoreTitle.textContent = 'AI Visibility Score';
      scoreTitle.style.cssText = 'font-size: 24px; font-weight: 600; color: #000;';
      
      const scoreValue = document.createElement('div');
      scoreValue.style.cssText = 'font-size: 36px; font-weight: 700; color: #6659df;';
      scoreValue.textContent = aiVisibilityScore !== null ? `${aiVisibilityScore}/100` : '—';
      
      scoreHeader.appendChild(scoreTitle);
      scoreHeader.appendChild(scoreValue);
      scoreSection.appendChild(scoreHeader);

      // Create table section
      const tableSection = document.createElement('div');
      tableSection.style.cssText = 'border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;';
      
      const table = document.createElement('table');
      table.style.cssText = 'width: 100%; border-collapse: collapse;';
      
      // Add table header
      const thead = document.createElement('thead');
      thead.innerHTML = `
        <tr style="background: #f9fafb;">
          <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb;">Status</th>
          <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb;">Query</th>
          <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb;">Volume</th>
          <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb;">AI Likelihood</th>
          <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb;">Difficulty</th>
          <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb;">Purchase Intent</th>
        </tr>
      `;
      
      // Add table body
      const tbody = document.createElement('tbody');
      sortedKeywords.forEach(keyword => {
        const tr = document.createElement('tr');
        tr.style.cssText = 'border-bottom: 1px solid #e5e7eb;';
        
        // Status cell
        const statusCell = document.createElement('td');
        statusCell.style.cssText = 'padding: 12px;';
        statusCell.textContent = keyword.analysisStatus === 'success' ? '✓' : 
                                keyword.analysisStatus === 'error' ? '✗' : 
                                keyword.analysisStatus === 'analyzing' ? '⟳' : '○';
        
        // Query cell
        const queryCell = document.createElement('td');
        queryCell.style.cssText = 'padding: 12px; font-weight: 500;';
        queryCell.textContent = keyword.term;
        
        // Volume cell
        const volumeCell = document.createElement('td');
        volumeCell.style.cssText = 'padding: 12px;';
        volumeCell.textContent = keyword.volume?.toLocaleString() || '—';
        
        // AI Likelihood cell
        const aiCell = document.createElement('td');
        aiCell.style.cssText = 'padding: 12px;';
        aiCell.textContent = keyword.aiOverviewLikelihood !== undefined ? `${keyword.aiOverviewLikelihood}%` : '—';
        
        // Difficulty cell
        const difficultyCell = document.createElement('td');
        difficultyCell.style.cssText = 'padding: 12px;';
        difficultyCell.textContent = keyword.optimizationDifficulty !== undefined ? `${keyword.optimizationDifficulty}%` : '—';
        
        // Purchase Intent cell
        const intentCell = document.createElement('td');
        intentCell.style.cssText = 'padding: 12px;';
        intentCell.textContent = keyword.purchaseIntent !== undefined && keyword.purchaseIntent !== null ? 
          `${keyword.purchaseIntent}%` : 'N/A';
        
        tr.appendChild(statusCell);
        tr.appendChild(queryCell);
        tr.appendChild(volumeCell);
        tr.appendChild(aiCell);
        tr.appendChild(difficultyCell);
        tr.appendChild(intentCell);
        tbody.appendChild(tr);
      });
      
      table.appendChild(thead);
      table.appendChild(tbody);
      tableSection.appendChild(table);

      // Combine all sections
      exportDiv.appendChild(scoreSection);
      exportDiv.appendChild(tableSection);
      document.body.appendChild(exportDiv);

      // Create canvas from the simplified content
      const canvas = await html2canvas(exportDiv, {
        scale: 2,
        logging: false,
        backgroundColor: '#ffffff',
      });

      // Remove the temporary export div
      document.body.removeChild(exportDiv);

      // Calculate dimensions to fit on A4
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);

      // Download the PDF
      pdf.save(`keyword-analysis-${new Date().toISOString().split('T')[0]}.pdf`);

      // Reset status
      setAnalysisStatus('success');
      setAnalysisMessage('PDF exported successfully');
    } catch (error) {
      console.error('Failed to export PDF:', error);
      setAnalysisStatus('error');
      setAnalysisMessage('Failed to export PDF. Please try again.');
    }
  };

  return (
    <div>
      <div className='space-y-4 mb-8'>
        <div>
          <h1 className='text-4xl font-bold'>Query Overview</h1>
          <p className='text-muted-foreground mt-2'>
            Customize and manage your target conversational queries for AI optimization.
          </p>
        </div>

        {/* Action Buttons */}
        <div className='flex items-center gap-4 justify-end'>
          <Button onClick={handleAnalyzeAll} disabled={analysisStatus === 'analyzing' || keywords.length === 0}>
            <RefreshCw className={`h-4 w-4 mr-2 ${analysisStatus === 'analyzing' ? 'animate-spin' : ''}`} />
            {analysisStatus === 'analyzing' ? 'Analyzing...' : 'Analyze All'}
          </Button>

          {/* change view mode */}
          <div className='flex items-center border rounded-md p-1 h-9 shadow-sm'>
            <Toggle
              pressed={viewMode === 'table'}
              onPressedChange={() => setViewMode('table')}
              size='sm'
              className='data-[state=on]:bg-muted flex items-center gap-2 px-3'
            >
              <TableIcon className='h-4 w-4' />
              <span className='text-sm'>List</span>
            </Toggle>
            <Toggle
              pressed={viewMode === 'card'}
              onPressedChange={() => setViewMode('card')}
              size='sm'
              className='data-[state=on]:bg-muted flex items-center gap-2 px-3'
            >
              <LayoutGrid className='h-4 w-4' />
              <span className='text-sm'>Grid</span>
            </Toggle>
          </div>

          {/* clear all keywords */}
          <Dialog open={isClearDialogOpen} onOpenChange={setIsClearDialogOpen}>
            <DialogTrigger asChild>
              <Button variant='outline' disabled={keywords.length === 0}>
                <Trash2 className='h-4 w-4 mr-2' />
                Clear All
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Clear All Keywords</DialogTitle>
              </DialogHeader>
              <div className='py-4'>
                <p>Are you sure you want to clear all keywords? This action cannot be undone.</p>
                <p className='text-muted-foreground mt-2'>This will remove {keywords.length} keywords.</p>
              </div>
              <DialogFooter>
                <Button variant='outline' onClick={() => setIsClearDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant='destructive' onClick={handleClearAll}>
                  Clear All
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* add custom query dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant='outline'>
                <Plus className='h-4 w-4 mr-2' />
                Add Custom Query
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Custom Query</DialogTitle>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <div className='flex items-center gap-4'>
                  <Input
                    placeholder='Enter query...'
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddKeyword()}
                  />
                  <Button onClick={handleAddKeyword} disabled={!newKeyword.trim()}>
                    Add
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* export pdf */}
          <Button variant='outline' onClick={handleExport} disabled={keywords.length === 0}>
            <Download className='h-4 w-4 mr-2' />
            Export PDF
          </Button>
        </div>

        {/* Status Message */}
        {analysisStatus !== 'idle' && (
          <div className='flex items-center gap-2 justify-end'> {/* Added justify-end for right alignment */}
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                analysisStatus === 'analyzing'
                  ? 'bg-blue-50 text-blue-700'
                  : analysisStatus === 'success'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
              }`}
            >
              {analysisStatus === 'analyzing' ? (
                <RefreshCw className='h-5 w-5 animate-spin' />
              ) : analysisStatus === 'success' ? (
                <CheckCircle2 className='h-5 w-5' />
              ) : (
                <XCircle className='h-5 w-5' />
              )}
            </div>
            {/* Added text message */}
            <span className={`text-sm ${
              analysisStatus === 'analyzing'
                ? 'text-blue-700'
                : analysisStatus === 'success'
                  ? 'text-green-700'
                  : 'text-red-700'
            }`}>
              {analysisMessage}
            </span>
          </div>
        )} {/* rest of empty state handling */}
      </div>

      <div ref={contentRef} className='space-y-8 bg-white print:p-8 rounded-lg'>
        {/* AI Visibility Score card */}
        <div className='p-6 border rounded-lg bg-white'>
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='text-2xl font-semibold mb-2'>AI Visibility Score</h2>
              <p className='text-muted-foreground'>
                Combined score based on volume, AI likelihood, optimization ease, and purchase intent
              </p>
            </div>
            <div className='text-right'>
              <div className='text-4xl font-bold text-primary mb-1'>
                {aiVisibilityScore !== null ? (
                  <>
                    {aiVisibilityScore}
                    <span className='text-lg text-muted-foreground'>/100</span>
                  </>
                ) : (
                  '—'
                )}
              </div>
              <div className='text-sm text-muted-foreground'>
                {keywords.length === 0
                  ? 'Add keywords to see score'
                  : aiVisibilityScore === null
                    ? 'Analyze keywords to see score'
                    : `Based on ${keywords.filter((k) => k.analysisStatus === 'success').length} analyzed keywords`}
              </div>
            </div>
          </div>
          {aiVisibilityScore !== null && (
            <div className='mt-4'>
              <Progress value={aiVisibilityScore} className='h-2' />
            </div>
          )}
        </div>

        {/* Keywords table/cards */}
        {viewMode === 'table' ? (
          <div className='rounded-md border bg-white'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Query</TableHead>
                  <TableHead>
                    <Button
                      variant='ghost'
                      onClick={() => handleSort('volume')}
                      className={`flex items-center gap-1 ${sortField === 'volume' ? 'text-primary' : ''}`}
                    >
                      Volume
                      <ArrowUpDown className='h-4 w-4' />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant='ghost'
                      onClick={() => handleSort('aiOverviewLikelihood')}
                      className={`flex items-center gap-1 ${sortField === 'aiOverviewLikelihood' ? 'text-primary' : ''}`}
                    >
                      AI Likelihood
                      <ArrowUpDown className='h-4 w-4' />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant='ghost'
                      onClick={() => handleSort('optimizationDifficulty')}
                      className={`flex items-center gap-1 ${sortField === 'optimizationDifficulty' ? 'text-primary' : ''}`}
                    >
                      Difficulty
                      <ArrowUpDown className='h-4 w-4' />
                    </Button>
                  </TableHead>
                  <TableHead>Purchase Intent</TableHead>
                  <TableHead className='text-right'>
                    {sortField && (
                      <Button variant='ghost' size='sm' onClick={clearSort}>
                        Reset Order
                      </Button>
                    )}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedKeywords.map((keyword) => (
                  <TableRow key={keyword.id}>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        {getStatusIcon(keyword)}
                        {/* {keyword.analysisMessage && (
                          <span className="text-xs text-muted-foreground">{keyword.analysisMessage}</span>
                        )} */}
                      </div>
                    </TableCell>
                    <TableCell className='font-medium'>
                      <div 
                        className='cursor-pointer hover:text-primary transition-colors'
                        onClick={() => handleQueryClick(keyword.term)}
                      >
                        {keyword.term}
                        {keyword.isCustom && (
                          <Badge variant='secondary' className='ml-2'>
                            Custom
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{keyword.volume?.toLocaleString() || '—'}</TableCell>
                    <TableCell>
                      <div className='w-32'>
                        {keyword.aiOverviewLikelihood !== undefined ? (
                          <>
                            <Progress value={keyword.aiOverviewLikelihood} className='h-2' />
                            <span className='text-sm text-muted-foreground'>{keyword.aiOverviewLikelihood}%</span>
                          </>
                        ) : (
                          '—'
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='w-32'>
                        {keyword.optimizationDifficulty !== undefined ? (
                          <>
                            <Progress value={keyword.optimizationDifficulty} className='h-2' />
                            <span className='text-sm text-muted-foreground'>{keyword.optimizationDifficulty}%</span>
                          </>
                        ) : (
                          '—'
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='w-32'>
                        {keyword.purchaseIntent !== undefined && keyword.purchaseIntent !== null ? (
                          <>
                            <Progress value={keyword.purchaseIntent} className='h-2' />
                            <span className='text-sm text-muted-foreground'>{keyword.purchaseIntent}%</span>
                          </>
                        ) : (
                          <span className='text-sm text-muted-foreground'>N/A</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className='text-right'>
                      <Button variant='outline' size='sm' onClick={() => deleteKeyword(keyword.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className='grid gap-4'>
            {sortedKeywords.map((keyword) => (
              <Card key={keyword.id} className='bg-white'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <div 
                    className='flex items-center gap-4 cursor-pointer hover:text-primary transition-colors'
                    onClick={() => handleQueryClick(keyword.term)}
                  >
                    {getStatusIcon(keyword)}
                    <div>
                      <CardTitle className='text-lg font-medium'>{keyword.term}</CardTitle>
                      {keyword.isCustom && (
                        <Badge variant='secondary' className='mt-1'>
                          Custom
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className='flex gap-2'>
                    <Button variant='ghost' size='sm' onClick={() => deleteKeyword(keyword.id)}>
                      Delete
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='grid gap-4'>
                    <div className='grid grid-cols-3 gap-4'>
                      <div>
                        <div className='text-sm font-medium mb-2'>AI Overview Likelihood</div>
                        {keyword.aiOverviewLikelihood !== undefined ? (
                          <>
                            <Progress value={keyword.aiOverviewLikelihood} className='h-2' />
                            <div className='text-sm text-muted-foreground mt-1'>{keyword.aiOverviewLikelihood}%</div>
                          </>
                        ) : (
                          '—'
                        )}
                      </div>
                      <div>
                        <div className='text-sm font-medium mb-2'>Optimization Difficulty</div>
                        {keyword.optimizationDifficulty !== undefined ? (
                          <>
                            <Progress value={keyword.optimizationDifficulty} className='h-2' />
                            <div className='text-sm text-muted-foreground mt-1'>{keyword.optimizationDifficulty}%</div>
                          </>
                        ) : (
                          '—'
                        )}
                      </div>
                      <div>
                        <div className='text-sm font-medium mb-2'>Purchase Intent</div>
                        {keyword.purchaseIntent !== undefined && keyword.purchaseIntent !== null ? (
                          <>
                            <Progress value={keyword.purchaseIntent} className='h-2' />
                            <div className='text-sm text-muted-foreground mt-1'>{keyword.purchaseIntent}%</div>
                          </>
                        ) : (
                          <span className='text-sm text-muted-foreground'>N/A</span>
                        )}
                      </div>
                    </div>
                    <div className='flex gap-2'>
                      <Badge>Volume: {keyword.volume?.toLocaleString() || '—'}</Badge>
                      {keyword.analysisMessage && (
                        <Badge variant={keyword.analysisStatus === 'error' ? 'destructive' : 'secondary'}>
                          {keyword.analysisMessage}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
