import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/api/', '/dashboard/'], // Adjust based on your needs
		},
		sitemap: 'https://enception.ai/sitemap.xml', // Replace with your domain
	};
}
