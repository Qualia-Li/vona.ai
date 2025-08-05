import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vona - AI Voice Chatbot for Shopify',
    short_name: 'Vona',
    description: "The AI voice chatbot that converts. Transform your Shopify store with conversational commerce.",
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/vona_logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/vona_logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
