import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';
import { Product } from '@/hooks/useProducts';
import React from 'react';

interface ProductCardProps {
  product: Product;
  key?: React.Key;
}

export function ProductCard({ product }: ProductCardProps) {
  const img = product.images?.[0];
  const isTrending = product.category === 'PlugMarket' || product.category === 'HotPick NG'; // Just a placeholder for trending

  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition hover:border-neon/60 hover:shadow-[0_0_10px_rgba(204,255,0,0.5)]"
    >
      <div className="relative aspect-square overflow-hidden bg-surface">
        {img ? (
          <img
            src={img}
            alt={product.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-muted-foreground">No image</div>
        )}
        {isTrending && (
          <div className="absolute left-2 top-2 flex items-center gap-1 rounded-md bg-orange px-2 py-0.5 text-[10px] font-bold uppercase text-orange-foreground shadow-[0_0_10px_rgba(255,69,0,0.3)]">
            <Flame className="h-3 w-3" /> Trending
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
          {product.title}
        </h3>
        <p className="mt-auto font-display font-black text-lg text-foreground">
          ₦{(product.price * 1500).toLocaleString()}
        </p>
      </div>
    </Link>
  );
}
