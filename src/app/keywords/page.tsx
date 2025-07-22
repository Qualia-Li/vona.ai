'use client';

import { ArrowUpDown, LayoutGrid, Plus, Table as TableIcon, RefreshCw, CheckCircle2, XCircle, Hourglass } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Toggle } from '@/components/ui/toggle';
import { useKeywordsStore } from '@/lib/store/keywordsStore';
import { analyzeKeywords } from '@/lib/api/keywords';
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
  const keywords = useKeywordsStore((state) => state.keywords) as KeywordWithStatus[];
  const deleteKeyword = useKeywordsStore((state) => state.deleteKeyword);
  const addKeyword = useKeywordsStore((state) => state.addKeyword);
  const updateKeyword = useKeywordsStore((state) => state.updateKeyword);
  const [sortField, setSortField] = useState<SortField>('volume');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');
  const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatus>('idle');
  const [analysisMessage, setAnalysisMessage] = useState('');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
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
      setTimeout(() => setAnalysisStatus('idle'), 3000);
      return;
    }

    setAnalysisStatus('analyzing');
    setAnalysisMessage(`Analyzing ${keywords.length} keywords...`);

    // Mark all keywords as analyzing
    keywords.forEach(keyword => {
      updateKeyword(keyword.id, {
        analysisStatus: 'analyzing',
        analysisMessage: 'Analyzing...'
      } as Partial<KeywordWithStatus>);
    });

    try {
      const results = await analyzeKeywords(keywords.map(k => k.term));
      
      // Update each keyword with its results
      results.forEach((result, index) => {
        const keyword = keywords[index];
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
      });

      setAnalysisStatus('success');
      setAnalysisMessage(`Successfully analyzed ${results.length} keywords`);
      setTimeout(() => setAnalysisStatus('idle'), 3000);
    } catch (error) {
      console.error('Failed to analyze keywords:', error);
      setAnalysisStatus('error');
      setAnalysisMessage('Failed to analyze keywords. Please try again.');
      setTimeout(() => setAnalysisStatus('idle'), 3000);

      // Mark all keywords as error
      keywords.forEach(keyword => {
        updateKeyword(keyword.id, {
          analysisStatus: 'error',
          analysisMessage: 'Analysis failed'
        } as Partial<KeywordWithStatus>);
      });
    }
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

  const sortedKeywords = [...keywords].sort((a, b) => {
    const multiplier = sortOrder === 'asc' ? 1 : -1;
    const aValue = a[sortField] || 0;
    const bValue = b[sortField] || 0;
    return (aValue - bValue) * multiplier;
  });

  return (
    <div>
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='text-4xl font-bold'>Conversational Query Suggestions</h1>
          <p className='text-muted-foreground mt-2'>Customize and manage your target conversational queries for AI optimization.</p>
        </div>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            {analysisStatus !== 'idle' && (
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                analysisStatus === 'analyzing' ? 'bg-blue-50 text-blue-700' :
                analysisStatus === 'success' ? 'bg-green-50 text-green-700' :
                'bg-red-50 text-red-700'
              }`}>
                {analysisStatus === 'analyzing' ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : analysisStatus === 'success' ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                <span className="text-sm font-medium">{analysisMessage}</span>
              </div>
            )}
            <Button 
              variant="outline"
              onClick={handleAnalyzeAll}
              disabled={analysisStatus === 'analyzing' || keywords.length === 0}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${analysisStatus === 'analyzing' ? 'animate-spin' : ''}`} />
              {analysisStatus === 'analyzing' ? 'Analyzing...' : 'Analyze All'}
            </Button>
          </div>
          <div className='flex items-center border rounded-lg p-1'>
            <Toggle
              pressed={viewMode === 'table'}
              onPressedChange={() => setViewMode('table')}
              size='sm'
              className='data-[state=on]:bg-muted'
            >
              <TableIcon className='h-4 w-4' />
            </Toggle>
            <Toggle
              pressed={viewMode === 'card'}
              onPressedChange={() => setViewMode('card')}
              size='sm'
              className='data-[state=on]:bg-muted'
            >
              <LayoutGrid className='h-4 w-4' />
            </Toggle>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Custom Query
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Custom Query</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center gap-4">
                  <Input
                    placeholder="Enter query..."
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddKeyword()}
                  />
                  <Button onClick={handleAddKeyword} disabled={!newKeyword.trim()}>Add</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {viewMode === 'table' ? (
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Query</TableHead>
                <TableHead>
                  <Button variant='ghost' onClick={() => handleSort('volume')} className='flex items-center gap-1'>
                    Volume
                    <ArrowUpDown className='h-4 w-4' />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant='ghost'
                    onClick={() => handleSort('aiOverviewLikelihood')}
                    className='flex items-center gap-1'
                  >
                    AI Likelihood
                    <ArrowUpDown className='h-4 w-4' />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant='ghost'
                    onClick={() => handleSort('optimizationDifficulty')}
                    className='flex items-center gap-1'
                  >
                    Difficulty
                    <ArrowUpDown className='h-4 w-4' />
                  </Button>
                </TableHead>
                <TableHead>Purchase Intent</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedKeywords.map((keyword) => (
                <TableRow key={keyword.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(keyword)}
                      {keyword.analysisMessage && (
                        <span className="text-xs text-muted-foreground">{keyword.analysisMessage}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className='font-medium'>
                    <div>
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
                      ) : '—'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='w-32'>
                      {keyword.optimizationDifficulty !== undefined ? (
                        <>
                          <Progress value={keyword.optimizationDifficulty} className='h-2' />
                          <span className='text-sm text-muted-foreground'>{keyword.optimizationDifficulty}%</span>
                        </>
                      ) : '—'}
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
            <Card key={keyword.id}>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <div className="flex items-center gap-4">
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
                      ) : '—'}
                    </div>
                    <div>
                      <div className='text-sm font-medium mb-2'>Optimization Difficulty</div>
                      {keyword.optimizationDifficulty !== undefined ? (
                        <>
                          <Progress value={keyword.optimizationDifficulty} className='h-2' />
                          <div className='text-sm text-muted-foreground mt-1'>{keyword.optimizationDifficulty}%</div>
                        </>
                      ) : '—'}
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
  );
}
