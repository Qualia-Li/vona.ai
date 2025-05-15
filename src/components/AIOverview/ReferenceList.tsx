"use client";

import { Reference } from "@/types/aiOverview";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import Image from "next/image";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { getFaviconUrl } from "@/lib/utils";
import { Favicon } from "../common/Favicon";

interface ReferenceListProps {
  references: Reference[];
}

export default function ReferenceList({ references }: ReferenceListProps) {

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      <Card className="bg-[#202124] p-4 space-y-4">
        {references.map((reference, index) => (
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

      </Card>
    </div>
  );
} 