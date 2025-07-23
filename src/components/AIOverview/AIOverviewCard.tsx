import { ChevronRight, Link as LinkIcon, MoreVertical, PlayCircle } from 'lucide-react';
import Image from 'next/image';

import ReferenceList from '@/components/AIOverview/ReferenceList';
import { Card } from '@/components/ui/card';
import { AIOverview, TextBlock, ListItem } from '@/types/aiOverview';

import { Button } from '../ui/button';

interface AIOverviewProps {
  data?: AIOverview | null;
}

export default function AIOverviewCard({ data }: AIOverviewProps) {
  if (!data?.text_blocks || data.text_blocks.length === 0) {
    return (
      <div className='flex gap-6'>
        <Card className='flex-1 p-6 bg-[#202124] text-white'>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center gap-2'>
              <span className='text-blue-400'>✦</span>
              <h2 className='text-xl font-medium'>AI Overview</h2>
            </div>
          </div>
          <div className='text-gray-400'>
            No AI overview content available for this query. Please check SERP Analysis or Organic Results.
          </div>
        </Card>
        <div className='w-[400px]'>
          <Card className='p-6 bg-[#202124] text-white h-full'>
            <div className='text-gray-400'>
              No references available.
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className='flex gap-6'>
      {/* Main content */}
      <Card className='flex-1 p-6 bg-[#202124] text-white'>
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center gap-2'>
            <span className='text-blue-400'>✦</span>
            <h2 className='text-xl font-medium'>AI Overview</h2>
          </div>
        </div>

        <div className='space-y-6'>
          {data.text_blocks.map((block: TextBlock, index: number) => {
            if (block.type === 'paragraph') {
              return (
                <div key={index} className='relative group'>
                  <p className='text-[15px] leading-relaxed'>
                    {block.snippet}
                    {block.reference_indexes && (
                      <button className='ml-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                        <LinkIcon className='h-4 w-4 text-gray-400' />
                      </button>
                    )}
                  </p>

                  {block.video && (
                    <div key={index} className='relative group'>
                      <a
                        href={block.video.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='block relative rounded-lg overflow-hidden hover:opacity-90 transition-opacity'
                      >
                        <div className='relative aspect-video'>
                          <Image src={block.video.thumbnail} alt='Video thumbnail' fill className='object-cover' />
                          <div className='absolute inset-0 bg-black/30 flex items-center justify-center'>
                            <PlayCircle className='w-16 h-16 text-white' />
                          </div>
                        </div>
                        <div className='mt-2 space-y-1'>
                          <p className='text-[15px] leading-relaxed'>{block.snippet}</p>
                          <div className='flex items-center gap-2 text-sm text-gray-400'>
                            <span>{block.video.source}</span>
                            <span>•</span>
                            <span>{block.video.date}</span>
                          </div>
                        </div>
                      </a>
                    </div>
                  )}
                </div>
              );
            }

            if (block.type === 'list' && block.list) {
              return (
                <div key={index} className='space-y-4'>
                  {block.list?.map((item: ListItem, itemIndex: number) => (
                    <div key={itemIndex} className='relative group'>
                      <h3 className='font-medium mb-1'>{item.title}</h3>
                      <p className='text-[15px] leading-relaxed text-gray-300'>
                        {item.snippet}
                        <button className='ml-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                          <LinkIcon className='h-4 w-4 text-gray-400' />
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
      <div className='w-[400px]'>
        <ReferenceList references={data.references} />
      </div>
    </div>
  );
}
