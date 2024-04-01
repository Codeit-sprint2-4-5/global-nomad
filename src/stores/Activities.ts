import create from 'zustand';

interface CategoryFilterState {
  mainCategory: string;
  mainFilter: string;
  setMainCategory: (mainCategory: string) => void;
  setMainFilter: (mainFilter: string) => void;
}

export const useCategoryFilterStore = create<CategoryFilterState>((set) => ({
  mainCategory: '',
  mainFilter: '',
  setMainCategory: (mainCategory) => set({ mainCategory }),
  setMainFilter: (mainFilter) => set({ mainFilter }),
}));
