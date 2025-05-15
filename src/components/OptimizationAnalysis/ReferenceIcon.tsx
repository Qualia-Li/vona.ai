'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Difficulty, Reference } from "@/types/aiOverview"
import { getFaviconUrl } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface ReferenceIconProps {
  reference: Reference
  difficulty: Difficulty
}

const getDifficultyBadgeVariant = (difficulty: Difficulty) => {
  switch (difficulty) {
    case "easy":
      return "secondary";
    case "medium":
      return "outline";
    case "hard":
      return "destructive";
  }
}

export default function ReferenceIcon({ reference, difficulty }: ReferenceIconProps) {
  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case "easy":
        return "border-green-500";
      case "medium":
        return "border-yellow-500";
      case "hard":
        return "border-red-500";
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className={`relative h-8 w-8 rounded-full overflow-hidden border-2 ${getDifficultyColor(difficulty)} transition-all cursor-pointer`} onClick={() => window.open(reference.link, '_blank')}>
            <img
              src={getFaviconUrl(reference.link)}
              alt={`${reference.title} favicon`}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="hidden absolute inset-0 bg-secondary flex items-center justify-center text-xs font-medium">
              {reference.title.substring(0, 2).toUpperCase()}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="shadow-md">
          <p className="font-medium">{reference.title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
} 