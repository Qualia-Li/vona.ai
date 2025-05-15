import { create } from 'zustand';

import { Keyword } from '@/types/keywords';

interface KeywordsStore {
	keywords: Keyword[];
	addKeyword: (keyword: Keyword) => void;
	deleteKeyword: (id: string) => void;
	updateKeyword: (id: string, keyword: Partial<Keyword>) => void;
}

export const useKeywordsStore = create<KeywordsStore>((set) => ({
	keywords: [
		{
			id: '1',
			term: 'best online shopping',
			volume: 10000,
			aiOverviewLikelihood: 85,
			optimizationDifficulty: 65,
			purchaseIntent: 90,
			isCustom: false,
		},
		{
			id: '2',
			term: 'discount electronics',
			volume: 8500,
			aiOverviewLikelihood: 75,
			optimizationDifficulty: 45,
			purchaseIntent: 85,
			isCustom: false,
		},
	],
	addKeyword: (keyword) =>
		set((state) => ({
			keywords: [...state.keywords, keyword],
		})),
	deleteKeyword: (id) =>
		set((state) => ({
			keywords: state.keywords.filter((k) => k.id !== id),
		})),
	updateKeyword: (id, updatedKeyword) =>
		set((state) => ({
			keywords: state.keywords.map((k) => (k.id === id ? { ...k, ...updatedKeyword } : k)),
		})),
}));
