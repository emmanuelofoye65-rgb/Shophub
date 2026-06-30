import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, FormEvent } from "react";
import { toast } from "sonner";

const MOCK_USERS = [
  { id: '1', email: 'tradebetter98@gmail.com', name: 'Admin', role: 'SUPER_ADMIN', joined: '2026-06-01' },
  { id: '2', email: 'support1@tradebetter.com', name: 'Support Staff', role: 'CUSTOMER_SUPPORT', joined: '2026-06-15' },
  { id: '3', email: 'delivery1@tradebetter.com', name: 'Rider Mike', role: 'DELIVERY_SUPPORT', joined: '2026-06-16' },
  { id: '4', email: 'customer@gmail.com', name: 'Regular User', role: 'CUSTOMER', joined: '2026-06-20' },
];

export function UsersTab() {
  const [isOpen, setIsOpen] = useState(false);

  const handleAddStaff = (e: FormEvent) => {
    e.preventDefault();
    toast.success("Staff member invited successfully!");
    setIsOpen(false);
  };

  return (
    <Card className="rounded-3xl border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>User & Staff Management</CardTitle>
          <CardDescription>Manage customer accounts and assign staff roles</CardDescription>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger render={<Button className="rounded-full" />}>
            Add Staff Member
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Staff</DialogTitle>
              <DialogDescription>
                Create a new staff account and assign them a role.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddStaff} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="staff@tradebetter.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Temporary Password</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select required defaultValue="CUSTOMER_SUPPORT">
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CUSTOMER_SUPPORT">Customer Support</SelectItem>
                    <SelectItem value="REFUND_SUPPORT">Refund Support</SelectItem>
                    <SelectItem value="DELIVERY_SUPPORT">Delivery Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">Create Staff Account</Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_USERS.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.joined}</TableCell>
                <TableCell>
                  <Badge variant={user.role === 'SUPER_ADMIN' ? 'default' : user.role === 'CUSTOMER' ? 'secondary' : 'outline'}>
                    {user.role.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Manage Role</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
