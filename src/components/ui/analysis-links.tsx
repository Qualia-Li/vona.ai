import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Button } from './button';

interface AnalysisLinksProps {
  url: string;
}

export function AnalysisLinks({ url }: AnalysisLinksProps) {
  const encodedUrl = encodeURIComponent(url);
  
  const links = [
    {
      name: 'Wayback Machine',
      url: `https://web.archive.org/web/*/${url}`,
      description: 'View historical versions of the webpage'
    },
    {
      name: 'Archive.org',
      url: `https://web.archive.org/save/${url}`,
      description: 'Save current version to Internet Archive'
    },
    {
      name: 'SimilarWeb',
      url: `https://www.similarweb.com/website/${url}/`,
      description: 'Traffic and engagement analytics'
    },
    {
      name: 'SEMrush',
      url: `https://www.semrush.com/analytics/overview/?searchType=domain&q=${encodedUrl}`,
      description: 'SEO and competitive analysis'
    },
    {
      name: 'Ahrefs',
      url: `https://app.ahrefs.com/site-explorer/overview/v2/subdomains/live?target=${encodedUrl}`,
      description: 'Backlink and keyword analysis'
    },
    {
      name: 'PageSpeed Insights',
      url: `https://pagespeed.web.dev/analysis?url=${encodedUrl}`,
      description: 'Performance and Core Web Vitals'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>3rd Party Analysis Tools</CardTitle>
        <CardDescription>Analyze your website using these popular tools</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4 sm:grid-cols-2'>
          {links.map((link) => (
            <div key={link.name} className='space-y-1'>
              <div className='text-sm text-gray-600 px-1'>{link.description}</div>
              <a href={link.url} target='_blank' rel='noopener noreferrer' className='block'>
                <Button variant='outline' className='w-full justify-between'>
                  <div className='font-medium'>{link.name}</div>
                  <ExternalLink className='h-4 w-4 ml-2' />
                </Button>
              </a>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 