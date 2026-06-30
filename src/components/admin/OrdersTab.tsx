import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const MOCK_ORDERS = [
  { id: 'ORD-1234', customer: 'John Doe', amount: 150000, status: 'PENDING', date: '2026-06-30' },
  { id: 'ORD-1235', customer: 'Jane Smith', amount: 45000, status: 'PAID', date: '2026-06-29' },
  { id: 'ORD-1236', customer: 'Alice Johnson', amount: 89000, status: 'DELIVERED', date: '2026-06-28' },
  { id: 'ORD-1237', customer: 'Bob Williams', amount: 12000, status: 'REFUNDED', date: '2026-06-27' },
];

export function OrdersTab() {
  return (
    <Card className="rounded-3xl border-none shadow-sm">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_ORDERS.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Badge 
                    variant={order.status === 'DELIVERED' ? 'default' : order.status === 'REFUNDED' ? 'destructive' : 'secondary'}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-bold">₦{order.amount.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
