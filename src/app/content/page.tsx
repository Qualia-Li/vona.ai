import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

export default function ContentPage() {
  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-4xl font-bold'>Content Generation</h1>
        <p className='text-muted-foreground mt-2'>Generate and manage AI-optimized content for different platforms.</p>
      </div>

      <Tabs defaultValue='reddit' className='space-y-4'>
        <div className='flex justify-between items-center'>
          <TabsList>
            <TabsTrigger value='reddit'>Reddit</TabsTrigger>
            <TabsTrigger value='quora'>Quora</TabsTrigger>
            <TabsTrigger value='medium'>Medium</TabsTrigger>
          </TabsList>
          <Button>Generate New Content</Button>
        </div>

        <TabsContent value='reddit' className='space-y-4'>
          <Card>
            <CardHeader>
              <div className='flex justify-between items-start'>
                <div>
                  <CardTitle>Best Online Shopping Experience</CardTitle>
                  <div className='flex gap-2 mt-2'>
                    <Badge variant='outline'>r/ecommerce</Badge>
                    <Badge variant='outline'>Draft</Badge>
                  </div>
                </div>
                <div className='flex gap-2'>
                  <Button variant='outline' size='sm'>
                    Edit
                  </Button>
                  <Button variant='default' size='sm'>
                    Publish
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                className='min-h-[200px]'
                value="Hey everyone! 👋 Long-time e-commerce enthusiast here. I've been researching and testing various online shopping platforms, and I wanted to share my insights on what makes for the best online shopping experience in 2024.

First off, let's talk about what's changed. With AI becoming more prevalent in search and shopping, we're seeing some interesting trends..."
                readOnly
              />
              <div className='mt-4 flex gap-4'>
                <div>
                  <div className='text-sm font-medium'>Estimated Engagement</div>
                  <div className='text-2xl font-bold mt-1'>High</div>
                </div>
                <div>
                  <div className='text-sm font-medium'>Target Audience</div>
                  <div className='text-2xl font-bold mt-1'>Tech-savvy shoppers</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className='flex justify-between items-start'>
                <div>
                  <CardTitle>Electronics Deals Guide</CardTitle>
                  <div className='flex gap-2 mt-2'>
                    <Badge variant='outline'>r/deals</Badge>
                    <Badge variant='outline'>Published</Badge>
                  </div>
                </div>
                <div className='flex gap-2'>
                  <Button variant='outline' size='sm'>
                    View Stats
                  </Button>
                  <Button variant='ghost' size='sm'>
                    Archive
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-3 gap-4'>
                <div className='text-center'>
                  <div className='text-2xl font-bold'>1.2k</div>
                  <div className='text-sm text-muted-foreground'>Views</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold'>45</div>
                  <div className='text-sm text-muted-foreground'>Comments</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold'>89%</div>
                  <div className='text-sm text-muted-foreground'>Upvote Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='quora' className='space-y-4'>
          {/* Similar structure for Quora content */}
        </TabsContent>

        <TabsContent value='medium' className='space-y-4'>
          {/* Similar structure for Medium content */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
