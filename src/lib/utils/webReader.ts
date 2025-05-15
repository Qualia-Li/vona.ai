export interface ParsedWebPage {
	title: string;
	content: string;
	textContent: string;
	length: number;
	excerpt: string;
	siteName: string | null;
}

/**
 * Fetches and parses a webpage, extracting the main content
 */
export async function parseWebPage(url: string): Promise<string> {
	try {
		const response = await fetch('/api/webpage-parser', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ url }),
		});

		const data = await response.json();
		return data.text;
	} catch (error) {
		console.error('Error parsing webpage:', error);
		return '';
	}
}
