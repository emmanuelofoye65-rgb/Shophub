import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  user_id: string;
  created_at: string;
}

export function useProducts(category?: string, searchQuery?: string, priceRange?: [number, number]) {
  return useQuery({
    queryKey: ['products', category, searchQuery, priceRange],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (category && category !== 'All') {
        query = query.eq('category', category);
      }

      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }

      if (priceRange) {
        // Price in DB is usually stored as standard value, we display it as price * 1500 in UI.
        // Or if price is in Naira, we filter directly. Wait, looking at the code `(product.price * 1500).toLocaleString()` the DB stores in USD.
        // I will filter by DB price
        query = query.gte('price', priceRange[0] / 1500).lte('price', priceRange[1] / 1500);
      }

      const { data, error } = await query;
      
      // Return mock data if supabase fails (for preview environment)
      if (error) {
        // Only log error if not using mock keys
        if (!import.meta.env.VITE_SUPABASE_URL) {
           console.log('Using mock products data (Supabase not configured)');
        } else {
           console.error('Supabase error:', error);
        }
        return MOCK_PRODUCTS.filter(p => {
          const matchCategory = !category || category === 'All' || p.category === category;
          const matchSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase());
          const matchPrice = !priceRange || (p.price * 1500 >= priceRange[0] && p.price * 1500 <= priceRange[1]);
          return matchCategory && matchSearch && matchPrice;
        });
      }

      return data as Product[];
    },
  });
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Nike Air Max 2024',
    price: 129.99,
    description: 'Latest edition of the iconic Air Max series. Comfort and style combined.',
    category: 'Fashion',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'],
    user_id: 'mock',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Sony WH-1000XM5',
    price: 349.00,
    description: 'Industry leading noise canceling wireless headphones.',
    category: 'PlugMarket',
    images: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80'],
    user_id: 'mock',
    created_at: new Date(Date.now() - 100000).toISOString()
  },
  {
    id: '3',
    title: 'Minimalist Coffee Maker',
    price: 89.99,
    description: 'Brew the perfect cup with this sleek, modern coffee maker.',
    category: 'Home',
    images: ['https://images.unsplash.com/photo-1495474472205-16284eb43081?w=800&q=80'],
    user_id: 'mock',
    created_at: new Date(Date.now() - 200000).toISOString()
  },
  {
    id: '4',
    title: 'Premium Leather Watch',
    price: 199.50,
    description: 'Classic timepiece with genuine leather strap.',
    category: 'HotPick NG',
    images: ['https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80'],
    user_id: 'mock',
    created_at: new Date(Date.now() - 300000).toISOString()
  }
];
