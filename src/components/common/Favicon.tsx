import { Globe2 } from 'lucide-react';
import Image from 'next/image';

import { getFaviconUrl } from '@/lib/utils';

interface FaviconProps {
  url: string;
  source: string;
  size?: number;
}

export function Favicon({ url, source, size = 20 }: FaviconProps) {
  return (
    <div className='relative' style={{ width: size, height: size }}>
      <Image
        src={getFaviconUrl(url)}
        alt={`${source} favicon`}
        width={size}
        height={size}
        className='rounded-full'
        onError={(e) => {
          // Prevent infinite error loop
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextElementSibling?.classList.remove('hidden');
        }}
      />
      <div className='hidden absolute inset-0 bg-gray-100 rounded-full flex items-center justify-center'>
        <Globe2 size={size * 0.7} className='text-gray-500' />
      </div>
    </div>
  );
}
