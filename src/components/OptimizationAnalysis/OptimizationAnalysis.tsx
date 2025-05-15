'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Reference } from "@/types/aiOverview"
import Image from "next/image"


interface OptimizationAnalysisProps {
  referenceList: Reference[]
}

export default function OptimizationAnalysis({ referenceList }: OptimizationAnalysisProps) {
  // Calculate overall easiness score (0-100)
  const easinessScores = {
    hard: 33,
    medium: 66,
    easy: 100
  }
  
  const averageEasiness = Math.round(
    referenceList.reduce((acc, ref) => acc + easinessScores[ref.difficulty], 0) / 
    referenceList.length
  )

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-500'
      case 'medium': return 'bg-yellow-500'
      case 'hard': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Optimization Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="text-sm font-medium mb-2">Reference Difficulty</div>
            <div className="flex gap-2 mb-4">
              {referenceList
                .sort(
                  (a, b) =>
                    easinessScores[a.difficulty] -
                    easinessScores[b.difficulty]
                )
                .map((ref) => (
                  <div
                    key={ref.index}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${getDifficultyColor(
                      ref.difficulty
                    )} overflow-hidden`}
                    title={`${ref.title} - ${ref.difficulty}`}
                  >
                    <Image
                      src={`https://www.google.com/s2/favicons?domain=${ref.link}`}
                      alt={`${ref.title} favicon`}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                  </div>
                ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium mb-2">
              Overall Optimization Easiness
            </div>
            <Progress value={averageEasiness} className="h-2" />
            <div className="text-sm text-muted-foreground mt-1">
              {averageEasiness}% -{" "}
              {averageEasiness > 60
                ? "Easy"
                : averageEasiness > 30
                ? "Moderate"
                : "Hard"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 