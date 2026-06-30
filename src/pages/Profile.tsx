import { useStore } from '@/store/useStore';
import { useProducts } from '@/hooks/useProducts';
import { Link } from 'react-router-dom';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Package, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useState, FormEvent } from 'react';
import { toast } from 'sonner';

export function Profile() {
  const { user } = useStore();
  const { data: products } = useProducts();
  const [isEditing, setIsEditing] = useState(false);

  // Mock products for preview
  const userProducts = products?.filter(p => p.user_id === user?.id) || products?.slice(0, 3) || [];

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">User Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your account and view your uploads</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Card className="rounded-3xl border-none shadow-sm">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="bg-neon/20 text-neon-foreground text-2xl font-bold">
                    {user?.email?.charAt(0).toUpperCase() || <User className="h-10 w-10" />}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-xl">{user?.email?.split('@')[0] || 'Guest User'}</CardTitle>
              <CardDescription>{user?.email || 'Not logged in'}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 flex justify-center">
              <Button 
                variant={isEditing ? "outline" : "default"} 
                className="w-full rounded-full"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
              </Button>
            </CardContent>
          </Card>

          {isEditing && (
            <Card className="rounded-3xl border-none shadow-sm animate-in slide-in-from-top-4 duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Account Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Display Name</Label>
                    <Input id="name" defaultValue={user?.email?.split('@')[0] || ''} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue={user?.email || ''} disabled />
                    <p className="text-xs text-muted-foreground">Email cannot be changed directly.</p>
                  </div>
                  <Button type="submit" className="w-full rounded-full">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Package className="h-6 w-6" /> Your Uploads
            </h2>
            <Link to="/upload" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full")}>
              Upload New
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-neutral-100 overflow-hidden">
            <div className="divide-y divide-neutral-100">
              {userProducts.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  No products uploaded yet.
                </div>
              ) : (
                userProducts.map((product) => (
                  <div key={product.id} className="p-4 sm:p-6 flex items-center gap-4 hover:bg-neutral-50 transition-colors">
                    <img 
                      src={product.images[0]} 
                      alt={product.title} 
                      className="w-20 h-20 rounded-xl object-cover bg-muted"
                    />
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${product.id}`} className="font-semibold text-lg truncate hover:text-neon hover:underline">
                        {product.title}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-medium px-2 py-1 bg-surface rounded-md">{product.category}</span>
                        <span className="text-sm font-bold">₦{(product.price * 1500).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
