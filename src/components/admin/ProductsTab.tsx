import { useStore } from '@/store/useStore';
import { useProducts } from '@/hooks/useProducts';
import { Link } from 'react-router-dom';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Plus } from 'lucide-react';

export function ProductsTab() {
  const { user } = useStore();
  const { data: products } = useProducts();

  // Mock dashboard for preview if not logged in but allow viewing for demo
  const userProducts = products?.filter(p => p.user_id === user?.id) || products?.slice(0, 3) || [];

  return (
    <Card className="rounded-3xl border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Product Management</CardTitle>
          <CardDescription>Add, edit or remove products from the marketplace</CardDescription>
        </div>
        <Link to="/upload" className={cn(buttonVariants({ variant: "default" }), "rounded-full")}>
          <Plus className="mr-2 h-4 w-4" /> Add New Product
        </Link>
      </CardHeader>
      <CardContent>
        <div className="bg-white rounded-3xl border border-neutral-100 overflow-hidden">
          <div className="divide-y divide-neutral-100">
            {userProducts.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No products yet. Click "Add New Product" to get started.
              </div>
            ) : (
              userProducts.map((product) => (
                <div key={product.id} className="p-4 sm:p-6 flex items-center gap-4 hover:bg-neutral-50 transition-colors">
                  <img 
                    src={product.images[0]} 
                    alt={product.title} 
                    className="w-16 h-16 rounded-xl object-cover bg-muted"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">{product.title}</h4>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <div className="font-medium shrink-0">
                    ₦{(product.price * 1500).toLocaleString()}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="destructive" size="sm">Remove</Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
