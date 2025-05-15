import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { AIOverview } from '@/types/aiOverview'

interface AIOverviewState {
  aiOverviewData: AIOverview | null;
  isLoading: boolean;
  setAiOverviewData: (
    textBlocks: AIOverview["text_blocks"],
    references: AIOverview["references"]
  ) => void;
}

export const useAIOverview = create<AIOverviewState>()(
  persist(
    (set) => ({
      aiOverviewData: null,
      isLoading: false,
      setAiOverviewData: (text_blocks, references) => set({ aiOverviewData: { text_blocks, references } }),
    }),
    {
      name: 'ai-overview-storage',
      storage: typeof window !== 'undefined' ? createJSONStorage(() => sessionStorage) : undefined,
    }
  )
) 