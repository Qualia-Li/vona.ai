import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface BrandInfo {
  name: string;
  color: string;
  website: string;
  logo?: string;
}

interface BrandStore {
  brand: BrandInfo | null;
  setBrand: (info: BrandInfo) => void;
  clearBrand: () => void;
}

export const useBrandStore = create<BrandStore>()(
  persist(
    (set) => ({
      brand: null,
      setBrand: (info: BrandInfo) => set({ brand: info }),
      clearBrand: () => set({ brand: null }),
    }),
    {
      name: 'brand-storage',
      storage: typeof window !== 'undefined' ? createJSONStorage(() => sessionStorage) : undefined,
    },
  ),
); 