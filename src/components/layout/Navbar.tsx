import { Link, useNavigate } from 'react-router-dom';
import { Search, User, LogOut, Upload, ShoppingBag } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';

export function Navbar() {
  const { user, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 md:gap-4 flex-1">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-neon font-display text-lg font-black text-neon-foreground shadow-[0_0_10px_rgba(204,255,0,0.5)]">
              T
            </div>
            <div className="hidden sm:inline-block font-display text-lg font-black tracking-tight">
              Trendhub <span className="text-orange">NG</span>
            </div>
          </Link>
          
          <div className="flex-1 max-w-xl px-2 md:px-6">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full bg-muted/50 pl-9 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <nav className="hidden items-center gap-5 text-sm font-medium text-muted-foreground sm:flex">
            <button onClick={() => setSelectedCategory('PlugMarket')} className={`hover:text-foreground transition-colors ${selectedCategory === 'PlugMarket' ? 'text-foreground' : ''}`}>
              PlugMarket
            </button>
            <button onClick={() => setSelectedCategory('HotPick NG')} className={`hover:text-foreground transition-colors ${selectedCategory === 'HotPick NG' ? 'text-foreground' : ''}`}>
              HotPick NG
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          {user ? (
            <>
              <Link to="/upload" className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "hidden sm:flex")}>
                <Upload className="w-5 h-5" />
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="relative h-9 w-9 rounded-full flex items-center justify-center outline-none ring-offset-background transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-neon/20 text-neon-foreground">
                      {user.email?.charAt(0).toUpperCase() || <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Account</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email || user.phone}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/upload')} className="sm:hidden">
                    Upload Product
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:bg-red-50 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link
              to="/auth"
              className="flex items-center gap-1 rounded-md bg-neon px-3 py-1.5 text-xs font-bold text-neon-foreground shadow-[0_0_10px_rgba(204,255,0,0.3)] hover:opacity-90 transition-opacity"
            >
              <User className="h-3.5 w-3.5" /> Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
