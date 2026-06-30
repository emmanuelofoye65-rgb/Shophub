import { create } from 'zustand';
import { User } from '@supabase/supabase-js';

interface StoreState {
  user: User | null;
  setUser: (user: User | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
}

export const useStore = create<StoreState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  searchQuery: '',
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  selectedCategory: 'All',
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  priceRange: [0, 1000000],
  setPriceRange: (priceRange) => set({ priceRange }),
}));
