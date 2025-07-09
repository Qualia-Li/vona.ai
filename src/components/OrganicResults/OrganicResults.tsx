import { Card, CardContent } from "@/components/ui/card";
import { OrganicResult } from "@/types/aiOverview";
import { ExternalLink, Star, MessageCircle } from "lucide-react";
import Image from "next/image";

interface OrganicResultsProps {
  results: OrganicResult[];
}

export default function OrganicResults({ results }: OrganicResultsProps) {
  if (!results?.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      {results.map((result, index) => (
        <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex gap-4">
              {/* Thumbnail Section */}
              {result.thumbnail && (
                <div className="flex-shrink-0 w-48 h-32 relative rounded-md overflow-hidden">
                  <Image
                    src={result.thumbnail}
                    alt={result.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Content Section */}
              <div className="flex-grow space-y-2">
                {/* Header with favicon and source */}
                <div className="flex items-center gap-2">
                  {result.favicon && (
                    <div className="w-4 h-4 relative">
                      <Image
                        src={result.favicon}
                        alt={result.source}
                        width={16}
                        height={16}
                      />
                    </div>
                  )}
                  <span className="text-sm text-muted-foreground">{result.source}</span>
                  {result.date && (
                    <span className="text-sm text-muted-foreground">• {result.date}</span>
                  )}
                </div>

                {/* Title and Link */}
                <div>
                  <a 
                    href={result.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold hover:text-primary flex items-center gap-1"
                  >
                    {result.title}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <div className="text-sm text-muted-foreground truncate">
                    {result.displayed_link}
                  </div>
                </div>

                {/* Snippet */}
                <p className="text-sm">{result.snippet}</p>

                {/* Rich Snippet Data */}
                {result.rich_snippet?.bottom?.detected_extensions && (
                  <div className="flex items-center gap-4 text-sm">
                    {result.rich_snippet.bottom.detected_extensions.price && (
                      <span className="font-semibold">
                        {result.rich_snippet.bottom.detected_extensions.currency}
                        {result.rich_snippet.bottom.detected_extensions.price}
                      </span>
                    )}
                    {result.rich_snippet.bottom.detected_extensions.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{result.rich_snippet.bottom.detected_extensions.rating}</span>
                        {result.rich_snippet.bottom.detected_extensions.reviews && (
                          <span className="text-muted-foreground">
                            ({result.rich_snippet.bottom.detected_extensions.reviews} reviews)
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Sitelinks */}
                {result.sitelinks?.list && result.sitelinks.list.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {result.sitelinks.list.map((sitelink, idx) => (
                      <a
                        key={idx}
                        href={sitelink.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:text-primary flex items-center gap-2"
                      >
                        <span className="truncate">{sitelink.title}</span>
                        {sitelink.answer_count && (
                          <span className="flex items-center text-muted-foreground">
                            <MessageCircle className="w-3 h-3 mr-1" />
                            {sitelink.answer_count}
                          </span>
                        )}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 