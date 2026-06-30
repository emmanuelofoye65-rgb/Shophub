import { useStore } from '@/store/useStore';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalyticsTab } from '@/components/admin/AnalyticsTab';
import { OrdersTab } from '@/components/admin/OrdersTab';
import { UsersTab } from '@/components/admin/UsersTab';
import { ProductsTab } from '@/components/admin/ProductsTab';

export function Dashboard() {
  const { user } = useStore();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Workspace</h1>
        <p className="text-muted-foreground mt-1">Manage operations, staff, and analytics</p>
      </div>

      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="mb-8 grid w-full max-w-2xl grid-cols-4 rounded-xl p-1 bg-neutral-100">
          <TabsTrigger value="analytics" className="rounded-lg">Analytics</TabsTrigger>
          <TabsTrigger value="orders" className="rounded-lg">Orders</TabsTrigger>
          <TabsTrigger value="users" className="rounded-lg">Staff & Users</TabsTrigger>
          <TabsTrigger value="products" className="rounded-lg">Products</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="mt-0">
          <AnalyticsTab />
        </TabsContent>

        <TabsContent value="orders" className="mt-0">
          <OrdersTab />
        </TabsContent>

        <TabsContent value="users" className="mt-0">
          <UsersTab />
        </TabsContent>

        <TabsContent value="products" className="mt-0">
          <ProductsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
