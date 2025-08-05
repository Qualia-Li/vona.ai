'use client';


import { Video, Share2, Globe, MessageCircle, BarChart, Zap } from 'lucide-react';

const features = [
  {
    icon: <Video className='w-6 h-6' />,
    title: 'AI-ready YouTube video generation',
    description: 'Automatically create optimized video content that AI search engines love to reference',
  },
  {
    icon: <Share2 className='w-6 h-6' />,
    title: 'Long-tail content targeting',
    description: 'Target specific long-tail queries that your potential customers are asking AI assistants',
  },
  {
    icon: <Globe className='w-6 h-6' />,
    title: 'Multi-channel publishing',
    description: 'Distribute your content across multiple platforms for maximum AI visibility',
  },
  {
    icon: <MessageCircle className='w-6 h-6' />,
    title: 'Reddit and UGC optimization',
    description: 'Strategic placement of user-generated content to influence AI responses',
  },
  {
    icon: <BarChart className='w-6 h-6' />,
    title: 'GEO dashboard',
    description: 'Track your visibility across different AI platforms and search engines',
  },
  {
    icon: <Zap className='w-6 h-6' />,
    title: 'Real-time optimization',
    description: 'Continuously adapt your content based on AI search patterns',
  },
];

export const Features = () => {
  return (
    <section className='py-24 bg-gray-50'>
      <div className='container px-4 mx-auto'>
        <div className='max-w-4xl mx-auto text-center mb-16'>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>What you get with Vona</h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300'
            >
              <div className='flex items-center mb-4'>
                <div className='flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg text-blue-600 mr-4'>
                  {feature.icon}
                </div>
                <h3 className='text-xl font-semibold text-gray-900'>{feature.title}</h3>
              </div>
              <p className='text-gray-600'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
