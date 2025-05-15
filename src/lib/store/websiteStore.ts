import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Website } from '@/types';

export interface WebsiteStore {
	results: Website | null;
	setResults: (results: Website) => void;
	clearResults: () => void;
}

export const useWebsiteStore = create<WebsiteStore>()(
	persist(
		(set) => ({
			results: null,
			setResults: (results) => set({ results }),
			clearResults: () => set({ results: null }),
		}),
		{
			name: 'website-analysis-storage',
		},
	),
);
