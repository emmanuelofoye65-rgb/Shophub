import { Categories } from '@/components/layout/Categories';
import { ProductCard } from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { useStore } from '@/store/useStore';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Home() {
  const { selectedCategory, searchQuery, priceRange } = useStore();
  const { data: products, isLoading } = useProducts(selectedCategory, searchQuery, priceRange);

  return (
    <div className="flex-1 flex flex-col">
      <Categories />
      
      {!searchQuery && selectedCategory === 'All' && (
        <section className="bg-surface py-16 md:py-24 border-b">
          <div className="container mx-auto px-4 text-center max-w-3xl space-y-6">
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight text-neutral-900 leading-tight">
              Trendhub NG <br/> 
              <span className="text-orange">Naija's hottest deals, delivered fast.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Shop PlugMarket for gadgets and HotPick NG for viral picks. Secure bank transfer. WhatsApp support that actually replies.
            </p>
            <div className="pt-4 flex items-center justify-center gap-4">
              <Button size="lg" className="rounded-md bg-neon text-neon-foreground font-bold hover:bg-neon/90 shadow-[0_0_10px_rgba(204,255,0,0.3)]">
                Shop PlugMarket <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">
            {searchQuery ? `Search Results for "${searchQuery}"` : 
             selectedCategory !== 'All' ? `${selectedCategory} Products` : 'Trending Now'}
          </h2>
          <span className="text-sm text-muted-foreground font-medium">
            {products?.length || 0} Results
          </span>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square w-full rounded-2xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : products?.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground bg-white rounded-3xl shadow-sm border border-neutral-100">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2 text-neutral-900">No products found</h3>
            <p>Try adjusting your search or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
