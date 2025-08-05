import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';

import './globals.css';
import { MainNav } from '@/components/layout/main-nav';
import { Footer } from '@/components/footer'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vona - The AI Voice Chatbot That Converts | Shopify Voice Commerce',
  description: "Transform your Shopify store with Vona's voice-first shopping assistant. 25% higher conversions, 40% less cart abandonment. One-click installation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='border-b'>
          <div className='flex h-16 items-center px-4 max-w-7xl mx-auto'>
            <MainNav />
          </div>
        </div>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
