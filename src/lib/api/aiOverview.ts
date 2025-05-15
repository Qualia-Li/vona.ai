import { AIOverview, Difficulty } from '@/types/aiOverview';

export async function fetchAIOverview(query: string): Promise<AIOverview> {
	const response = await fetch('/api/ai-overview', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ query }),
	});

	if (!response.ok) {
		throw new Error('Failed to fetch AI overview data');
	}

	const data = await response.json();

	return {
		...data,
		references:
			data.references?.map((ref: any) => ({
				...ref,
				difficulty: calculateDifficulty(ref.link),
			})) || [],
	};
}

function calculateDifficulty(link: string): Difficulty {
	const url = link.toLowerCase();

	if (url.includes('quora.com') || url.includes('reddit.com')) {
		return 'easy';
	}

	if (url.includes('youtube.com') || url.includes('wikipedia.org')) {
		return 'medium';
	}

	return 'hard';
}
