"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { getFaviconUrl } from "@/lib/utils";
import { Reference } from "@/types/aiOverview";

import { Favicon } from "../common/Favicon";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";




interface ReferenceListProps {
  references: Reference[];
}

export default function ReferenceList({ references }: ReferenceListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const DEFAULT_DISPLAY_COUNT = 10;

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const displayedReferences = isExpanded 
    ? references 
    : references.slice(0, DEFAULT_DISPLAY_COUNT);

  return (
    <div className="space-y-4">
      <Card className="bg-[#202124] p-4 space-y-4 gap-0">
        {displayedReferences.map((reference, index) => (
          <a
            key={index}
            href={reference.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="group rounded-lg hover:bg-white/5 transition-colors p-3 cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white text-sm font-medium truncate">
                      {reference.title}
                    </h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <span
                            className={`px-2 py-0.5 rounded text-xs text-white transition-all hover:opacity-80 hover:scale-105 ${getDifficultyColor(
                              reference.difficulty
                            )}`}
                          >
                            {reference.difficulty}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Optimization difficulty level: {reference.difficulty}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {reference.snippet}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Favicon url={reference.link} source={reference.source} size={20}/>
                    <span className="text-sm text-gray-400">
                      {reference.source}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}

        {references.length > DEFAULT_DISPLAY_COUNT && (
          <Button
            variant="ghost"
            className="w-full text-gray-400 hover:text-white hover:bg-white/5"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <div className="flex items-center gap-2">
                Show Less <ChevronUp className="h-4 w-4" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                Show More ({references.length - DEFAULT_DISPLAY_COUNT} more) <ChevronDown className="h-4 w-4" />
              </div>
            )}
          </Button>
        )}
      </Card>
    </div>
  );
} 