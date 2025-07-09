'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Reference } from '@/types/aiOverview';

import ReferenceIcon from './ReferenceIcon';

interface OptimizationAnalysisProps {
  referenceList: Reference[];
}

export default function OptimizationAnalysis({ referenceList }: OptimizationAnalysisProps) {
  // Calculate overall easiness score (0-100)
  const easinessScores = {
    hard: 33,
    medium: 66,
    easy: 100,
  };

  if (!referenceList || referenceList.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Optimization Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            Run an AI Overview query to see optimization analysis for your target keywords.
          </div>
        </CardContent>
      </Card>
    );
  }

  const averageEasiness = Math.round(
    referenceList.reduce((acc, ref) => acc + easinessScores[ref.difficulty], 0) / referenceList.length,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Optimization Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          <div>
            <div className='text-sm font-medium mb-2'>Reference List</div>
            <div className='flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent'>
              {referenceList
                .sort((a, b) => easinessScores[b.difficulty] - easinessScores[a.difficulty])
                .map((ref) => (
                  <ReferenceIcon key={ref.index} reference={ref} difficulty={ref.difficulty} />
                ))}
            </div>
          </div>

          <div>
            <div className='text-sm font-medium mb-2'>Overall Optimization Easiness</div>
            <Progress value={averageEasiness} className='h-2' />
            <div className='text-sm text-muted-foreground mt-1'>
              {averageEasiness}% - {averageEasiness > 60 ? 'Easy' : averageEasiness > 30 ? 'Moderate' : 'Hard'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
