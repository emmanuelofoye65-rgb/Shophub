import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Toaster } from '@/components/ui/sonner';

export function Layout() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Toaster position="top-center" />
    </div>
  );
}
