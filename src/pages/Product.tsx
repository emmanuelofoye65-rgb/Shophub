import { useParams, Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, MessageCircle, ShoppingBag, Share2 } from 'lucide-react';
import { useState } from 'react';
import { PaystackButton } from 'react-paystack';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';

export function Product() {
  const { id } = useParams();
  const { data: products, isLoading } = useProducts();
  const { user } = useStore();
  const [activeImage, setActiveImage] = useState(0);

  const product = products?.find(p => p.id === id);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-6 pb-32 sm:pb-6">
        <div className="flex flex-col md:flex-row gap-8 mt-3">
          <Skeleton className="w-full md:w-1/2 aspect-square rounded-3xl" />
          <div className="w-full md:w-1/2 space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/" className={cn(buttonVariants({ variant: "default" }))}>
          Back to Home
        </Link>
      </div>
    );
  }

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hi, I'm interested in your product: ${product.title} - ₦${(product.price * 1500).toLocaleString()}`);
    window.open(`https://wa.me/2348000000000?text=${text}`, '_blank');
  };

  const handleShare = () => {
    const productUrl = window.location.href;
    const text = encodeURIComponent(`Check out this product on TradeBetter: ${product.title} - ₦${(product.price * 1500).toLocaleString()}\n\n${productUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const paystackConfig = {
    reference: (new Date()).getTime().toString(),
    email: user?.email || "customer@example.com",
    amount: (product.price * 1500) * 100, // in kobo
    publicKey: "pk_test_dummy_key_replace_me", // Requires actual key in production
    text: "Buy Now",
    onSuccess: (reference: any) => {
      // Typically we would verify on the backend here
      toast.success("Payment Successful! Receipt sent to your email.");
      console.log(reference);
    },
    onClose: () => {
      toast.error("Payment cancelled");
    },
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 pb-32 sm:pb-6">
      <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
        ← Back
      </Link>
      <div className="mt-3 grid gap-6 sm:grid-cols-2">
        <div>
          <div className="aspect-square overflow-hidden rounded-xl border border-border bg-surface">
            <img 
              src={product.images[activeImage] || 'https://via.placeholder.com/800'} 
              alt={product.title}
              className="h-full w-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-2 flex gap-2 overflow-x-auto">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border ${activeImage === idx ? 'border-neon' : 'border-border'}`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-start justify-between gap-4">
            <h1 className="font-display text-2xl font-black sm:text-3xl">{product.title}</h1>
            <button
              onClick={handleShare}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface text-muted-foreground hover:bg-neutral-200 hover:text-foreground transition-colors"
              title="Share on WhatsApp"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-2 font-display text-3xl font-black text-neon">
            ₦{(product.price * 1500).toLocaleString()}
          </div>
          
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
            {product.description || "No description."}
          </p>

          <div className="mt-5 hidden gap-3 sm:flex">
            <PaystackButton
              {...paystackConfig}
              className="flex flex-1 items-center justify-center gap-2 rounded-md bg-neon px-4 py-3 font-bold text-neon-foreground shadow-neon hover:bg-neon/90"
            />
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); handleWhatsApp(); }}
              className="flex items-center justify-center gap-2 rounded-md border border-[#25D366] bg-[#25D366]/10 px-4 py-3 font-bold text-[#25D366] hover:bg-[#25D366]/20"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-border bg-background/95 p-3 backdrop-blur sm:hidden">
        <PaystackButton
          {...paystackConfig}
          className="flex flex-1 items-center justify-center gap-2 rounded-md bg-neon px-4 py-3 font-bold text-neon-foreground shadow-[0_0_10px_rgba(204,255,0,0.3)]"
        />
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); handleWhatsApp(); }}
          className="flex items-center justify-center gap-2 rounded-md border border-[#25D366] bg-[#25D366]/10 px-4 py-3 font-bold text-[#25D366]"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
      </div>
    </div>
  );
}
