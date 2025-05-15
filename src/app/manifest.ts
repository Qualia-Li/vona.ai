import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Enception - AI-Powered SEO Platform',
		short_name: 'Enception',
		description: "Optimize your website's visibility with AI-powered SEO tools",
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
				src: '/enception_logo.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/enception_logo.png',
				sizes: '512x512',
				type: 'image/png',
			},
		],
	};
}
