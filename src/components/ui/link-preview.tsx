import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card } from './card';
import { Favicon } from '../common/Favicon';

interface OGMetadata {
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
}

interface LinkPreviewProps {
  url: string;
  title: string;
  className?: string;
}

export function LinkPreview({ url, title, className = '' }: LinkPreviewProps) {
  const [metadata, setMetadata] = useState<OGMetadata | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch('/api/og-metadata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        });
        const data = await response.json();
        setMetadata(data);
      } catch (error) {
        console.error('Error fetching metadata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [url]);

  return (
    <Card className={`overflow-hidden hover:shadow-md transition-shadow ${className}`}>
      <a href={url} target="_blank" rel="noopener noreferrer" className="block">
        <div className="flex flex-col md:flex-row">
          {metadata?.ogImage && (
            <div className="relative w-full md:w-48 h-48 md:h-32">
              <Image
                src={metadata.ogImage}
                alt={metadata.ogTitle || title}
                fill
                className="object-cover"
                unoptimized // Since we're dealing with external images
              />
            </div>
          )}
          <div className="p-4 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Favicon url={url} source={title} size={16} />
              <span className="text-sm text-gray-500 truncate">{new URL(url).hostname}</span>
            </div>
            <h3 className="font-medium text-gray-900 line-clamp-2">
              {metadata?.ogTitle || title}
            </h3>
            {metadata?.ogDescription && (
              <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                {metadata.ogDescription}
              </p>
            )}
          </div>
        </div>
      </a>
    </Card>
  );
} 