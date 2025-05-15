import { create } from 'zustand'
import { AIOverview } from '@/types/aiOverview'

interface AIOverviewState {
  data: AIOverview | null;
  isLoading: boolean;
  setData: (
    textBlocks: AIOverview["text_blocks"],
    references: AIOverview["references"]
  ) => void;
}

export const useAIOverview = create<AIOverviewState>((set) => ({
  data: null,
  isLoading: false,
  setData: (text_blocks, references) => set({ data: { text_blocks, references } }),
})) 