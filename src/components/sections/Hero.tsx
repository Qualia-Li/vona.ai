'use client';

import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';

export const Hero = () => {
  const scrollToSignup = () => {
    // Implement smooth scroll to signup section
    const element = document.getElementById('signup');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className='relative min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-16'>
      <div className='container px-4 mx-auto'>
        <div className='max-w-4xl mx-auto text-center'>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className='mb-4'>
              <span className='inline-block px-4 py-2 mb-4 text-sm font-semibold bg-blue-600/20 text-blue-400 rounded-full'>
                Seen in Google AI Overview / ChatGPT
              </span>
            </div>
            <h1 className='mb-6 text-5xl font-bold leading-tight md:text-6xl'>Get Discovered in AI Search Engines</h1>
            <p className='mb-8 text-xl text-gray-300 md:text-2xl'>
              We help brands appear in AI-generated answers like Google AI Overview, ChatGPT, and Perplexity — using
              long-tail video content and multi-channel SEO.
            </p>
            <Button
              size='lg'
              onClick={scrollToSignup}
              className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg'
            >
              Request Early Access
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className='mt-12'
          >
            <div className='relative w-full max-w-3xl mx-auto'>
              {/* Placeholder for the AI search engine animation */}
              <div className='aspect-video bg-gray-800/50 rounded-lg border border-gray-700 shadow-2xl'>
                {/* Add animation here later */}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
