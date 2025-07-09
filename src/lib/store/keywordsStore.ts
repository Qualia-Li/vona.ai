import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { Keyword } from '@/types/keywords';

interface KeywordsStore {
  keywords: Keyword[];
  addKeyword: (keyword: Keyword) => void;
  addKeywords: (keywords: Keyword[]) => void;
  deleteKeyword: (id: string) => void;
  updateKeyword: (id: string, keyword: Partial<Keyword>) => void;
  clearKeywords: () => void;
}

export const useKeywordsStore = create<KeywordsStore>()(
  persist(
    (set) => ({
      keywords: [],
      addKeyword: (keyword: Keyword) =>
        set((state) => ({
          keywords: [...state.keywords, keyword],
        })),
      addKeywords: (newKeywords: Keyword[]) =>
        set((state) => ({
          keywords: [...state.keywords, ...newKeywords],
        })),
      deleteKeyword: (id: string) =>
        set((state) => ({
          keywords: state.keywords.filter((k) => k.id !== id),
        })),
      updateKeyword: (id: string, updatedKeyword: Partial<Keyword>) =>
        set((state) => ({
          keywords: state.keywords.map((k) => (k.id === id ? { ...k, ...updatedKeyword } : k)),
        })),
      clearKeywords: () => set({ keywords: [] }),
    }),
    {
      name: 'keywords-storage',
      storage: typeof window !== 'undefined' ? createJSONStorage(() => sessionStorage) : undefined,
    },
  ),
);
