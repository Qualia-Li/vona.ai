import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { Competitor } from '@/types/competitor';

interface CompetitorStore {
  competitors: Competitor[];
  addCompetitor: (competitor: Competitor) => void;
  addCompetitors: (competitors: Competitor[]) => void;
  setCompetitors: (competitors: Competitor[]) => void;
  deleteCompetitor: (id: string) => void;
  updateCompetitor: (id: string, competitor: Partial<Competitor>) => void;
  clearCompetitors: () => void;
}

export const useCompetitorStore = create<CompetitorStore>()(
  persist(
    (set) => ({
      competitors: [],
      addCompetitor: (competitor: Competitor) =>
        set((state) => ({
          competitors: [...state.competitors, competitor],
        })),
      addCompetitors: (newCompetitors: Competitor[]) =>
        set((state) => ({
          competitors: [...state.competitors, ...newCompetitors],
        })),
      setCompetitors: (newCompetitors: Competitor[]) => set({ competitors: newCompetitors }),
      deleteCompetitor: (id: string) =>
        set((state) => ({
          competitors: state.competitors.filter((c) => c.id !== id),
        })),
      updateCompetitor: (id: string, updatedCompetitor: Partial<Competitor>) =>
        set((state) => ({
          competitors: state.competitors.map((c) => (c.id === id ? { ...c, ...updatedCompetitor } : c)),
        })),
      clearCompetitors: () => set({ competitors: [] }),
    }),
    {
      name: 'competitors-storage',
      storage: typeof window !== 'undefined' ? createJSONStorage(() => sessionStorage) : undefined,
    },
  ),
); 