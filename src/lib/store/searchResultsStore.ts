import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { OrganicResult, TextBlock, Reference, AIOverview } from '@/types/aiOverview';

interface SearchResultsState {
  query: string;
  currentQuery: string; // The query that was actually executed
  aiOverviewData: AIOverview | null;
  organicResults: OrganicResult[];
  isLoading: boolean;
  setQuery: (query: string) => void;
  setCurrentQuery: (query: string) => void;
  setAiOverviewData: (text_blocks: TextBlock[], references: Reference[]) => void;
  setOrganicResults: (results: OrganicResult[]) => void;
  setIsLoading: (loading: boolean) => void;
  clearResults: () => void;
}

export const useSearchResults = create<SearchResultsState>()(
  persist(
    (set) => ({
      query: '',
      currentQuery: '',
      aiOverviewData: null,
      organicResults: [],
      isLoading: false,
      setQuery: (query: string) => set({ query }),
      setCurrentQuery: (query: string) => {
        if (!query) {
          set({ currentQuery: '', aiOverviewData: null, organicResults: [] });
        } else {
          set({ currentQuery: query });
        }
      },
      setAiOverviewData: (text_blocks: TextBlock[], references: Reference[]) => 
        set({ aiOverviewData: { text_blocks, references } }),
      setOrganicResults: (results: OrganicResult[]) => 
        set({ organicResults: results }),
      setIsLoading: (loading: boolean) => 
        set({ isLoading: loading }),
      clearResults: () => 
        set({ query: '', currentQuery: '', aiOverviewData: null, organicResults: [], isLoading: false }),
    }),
    {
      name: 'search-results-storage',
      storage: typeof window !== 'undefined' ? createJSONStorage(() => sessionStorage) : undefined,
    }
  )
); 