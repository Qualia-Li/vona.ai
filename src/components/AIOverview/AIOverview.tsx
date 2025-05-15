import { Card } from "@/components/ui/card";
import { AIOverview as AIOverviewType } from "@/types/aiOverview";
import { ChevronRight, Link as LinkIcon, MoreVertical } from "lucide-react";
import { Button } from "../ui/button";
import ReferenceList from "@/components/AIOverview/ReferenceList";

interface AIOverviewProps {
  data: AIOverviewType;
}

export default function AIOverview({ data }: AIOverviewProps) {
  return (
    <div className="flex gap-6">
      {/* Main content */}
      <Card className="flex-1 p-6 bg-[#202124] text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-blue-400">✦</span>
            <h2 className="text-xl font-medium">AI Overview</h2>
          </div>
        </div>

        <div className="space-y-6">
          {data.text_blocks.map((block, index) => {
            if (block.type === 'paragraph') {
              return (
                <div key={index} className="relative group">
                  <p className="text-[15px] leading-relaxed">
                    {block.snippet}
                    {block.reference_indexes && (
                      <button className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <LinkIcon className="h-4 w-4 text-gray-400" />
                      </button>
                    )}
                  </p>
                </div>
              );
            }

            if (block.type === 'list' && block.list) {
              return (
                <div key={index} className="space-y-4">
                  {block.list.map((item, itemIndex) => (
                    <div key={itemIndex} className="relative group">
                      <h3 className="font-medium mb-1">{item.title}</h3>
                      <p className="text-[15px] leading-relaxed text-gray-300">
                        {item.snippet}
                        <button className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <LinkIcon className="h-4 w-4 text-gray-400" />
                        </button>
                      </p>
                    </div>
                  ))}
                </div>
              );
            }

            return null;
          })}
        </div>
      </Card>

      {/* References sidebar */}
      <div className="w-[400px]">
        <ReferenceList references={data.references} />
      </div>
    </div>
  );
} 