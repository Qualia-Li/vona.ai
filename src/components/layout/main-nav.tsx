'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const items = [
  {
    title: 'Website Input',
    href: '/website',
  },
  {
    title: 'Keywords',
    href: '/keywords',
  },
  {
    title: 'Query Analysis',
    href: '/query-analysis',
  },
  {
    title: 'Content',
    href: '/content',
  },
  {
    title: 'Performance',
    href: '/performance',
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className='flex items-center space-x-6 lg:space-x-8'>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname === item.href ? 'text-black dark:text-white' : 'text-muted-foreground',
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
