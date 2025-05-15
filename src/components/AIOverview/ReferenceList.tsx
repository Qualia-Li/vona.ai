"use client";

import { Reference } from "@/types/aiOverview";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ReferenceListProps {
  references: Reference[];
}

export default function ReferenceList({ references }: ReferenceListProps) {
  const [showAll, setShowAll] = useState(false);
  const initialDisplayCount = 3;
  const displayedReferences = showAll ? references : references.slice(0, initialDisplayCount);

  return (
    <Card className="bg-[#202124] p-4 space-y-4">
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
                <h3 className="text-white text-sm font-medium mb-1 truncate">
                  {reference.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {reference.snippet}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Image
                    src={`https://www.google.com/s2/favicons?domain=${reference.link}`}
                    alt={`${reference.source} favicon`}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  <span className="text-sm text-gray-400">{reference.source}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </a>
      ))}
      
      {references.length > initialDisplayCount && (
        <Button
          variant="secondary"
          className="w-full bg-[#3E4044] text-white hover:bg-[#4B4D52] transition-colors"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show less" : "Show all"}
        </Button>
      )}
    </Card>
  );
} 