'use client'

import Image from "next/image"
import { useState, useEffect } from "react"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { getFaviconUrl } from "@/lib/utils"
import { parseWebPage } from "@/lib/utils/webReader"
import { Reference } from "@/types/aiOverview"

import { Favicon } from "../common/Favicon"

interface CompetitorAnalysisProps {
  references: Reference[]
}

const COMPETITORS = ['Gamma', 'ChatSlide', 'SlideSpeak', 'SlidesAI']
const METRICS = ['Authority', 'Traffic'] as const

export default function CompetitorAnalysis({ references }: CompetitorAnalysisProps) {
  const [analysisResults, setAnalysisResults] = useState<Record<string, Record<string, boolean>>>({})

  useEffect(() => {
    references.forEach(async (ref) => {
      const parsedContent = await parseWebPage(ref.link)
      setAnalysisResults(prev => ({
        ...prev,
        [ref.link]: COMPETITORS.reduce((acc, competitor) => ({
          ...acc,
          [competitor]: parsedContent.toLowerCase().includes(competitor.toLowerCase())
        }), {})
      }))
    })
  }, [references])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Competitor Analysis</CardTitle>
        <p className="text-sm text-muted-foreground">Accuracy is continuously improving as we gather more data</p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2">Source</th>
                {COMPETITORS.map((competitor) => (
                  <th key={competitor} className="text-center p-2">{competitor}</th>
                ))}
                {METRICS.map((metric) => (
                  <th key={metric} className="text-center p-2">
                    {metric}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {references.map((ref, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2 flex flex-row items-center gap-2 cursor-pointer" onClick={() => window.open(ref.link, '_blank')}>
                    {/* <Image
                      src={getFaviconUrl(ref.link)}
                      alt={`Favicon for ${ref.link}`}
                      width={16}
                      height={16}
                      className="inline-block mr-2"
                    /> */}
                    <Favicon url={ref.link} source={ref.title} size={16}/>
                    {ref.title}
                  </td>
                  {COMPETITORS.map((competitor) => (
                    <td key={competitor} className="text-center p-2">
                      {!analysisResults[ref.link] ? '⏳' :
                        analysisResults[ref.link][competitor] ? '✅' : '❌'}
                    </td>
                  ))}
                  {METRICS.map((metric) => (
                    <td key={metric} className="text-center p-2 text-muted-foreground">
                      <span title="Premium feature">🔒</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
} 