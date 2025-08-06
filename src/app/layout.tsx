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
  keywords: 'Shopify, AI chatbot, voice commerce, ecommerce, conversions, voice assistant, shopping assistant',
  authors: [{ name: 'Vona.AI' }],
  creator: 'Vona.AI',
  publisher: 'Vona.AI',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.tryvona.ai',
    title: 'Vona - The AI Voice Chatbot That Converts | Shopify Voice Commerce',
    description: "Transform your Shopify store with Vona's voice-first shopping assistant. 25% higher conversions, 40% less cart abandonment. One-click installation.",
    siteName: 'Vona.AI',
    images: [
      {
        url: '/ogimage.png',
        width: 1200,
        height: 630,
        alt: 'Vona - AI Voice Chatbot for Shopify',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vona - The AI Voice Chatbot That Converts | Shopify Voice Commerce',
    description: "Transform your Shopify store with Vona's voice-first shopping assistant. 25% higher conversions, 40% less cart abandonment.",
    images: ['/ogimage.png'],
    creator: '@VonaAI',
    site: '@VonaAI',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
