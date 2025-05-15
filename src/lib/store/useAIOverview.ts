import { create } from 'zustand'
import { AIOverview } from '@/types/aiOverview'

interface AIOverviewState {
  aiOverviewData: AIOverview | null;
  isLoading: boolean;
  setAiOverviewData: (
    textBlocks: AIOverview["text_blocks"],
    references: AIOverview["references"]
  ) => void;
}

export const useAIOverview = create<AIOverviewState>((set) => ({
  aiOverviewData: null,
  isLoading: false,
  setAiOverviewData: (text_blocks, references) => set({ aiOverviewData: { text_blocks, references } }),
})) 