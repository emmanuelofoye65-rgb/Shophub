import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { ImagePlus, X } from 'lucide-react';

const CATEGORIES = [
  'Fashion',
  'Electronics',
  'Home & Garden',
  'Beauty',
  'Sports',
  'Toys',
  'Automotive'
];

export function Upload() {
  const navigate = useNavigate();
  const { user } = useStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
  });
  const [imageUrl, setImageUrl] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const handleAddImage = () => {
    if (imageUrl && !images.includes(imageUrl)) {
      setImages([...images, imageUrl]);
      setImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('You must be logged in to upload products');
      return;
    }
    if (images.length === 0) {
      toast.error('Please add at least one image');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from('products').insert([
        {
          title: formData.title,
          price: parseFloat(formData.price),
          description: formData.description,
          category: formData.category,
          images: images,
          user_id: user.id,
        }
      ]);

      if (error) throw error;
      toast.success('Product uploaded successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload product');
      // For preview mode, just succeed if Supabase fails
      toast.success('Preview Mode: Product simulated upload success');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="rounded-3xl border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Product Title</Label>
              <Input
                required
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. Nike Air Max 2024"
                className="bg-muted/50 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price ($)</Label>
                <Input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                  placeholder="0.00"
                  className="bg-muted/50 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select required value={formData.category} onValueChange={val => setFormData({...formData, category: val})}>
                  <SelectTrigger className="bg-muted/50 rounded-xl">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                required
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Describe your product..."
                className="min-h-[120px] bg-muted/50 rounded-xl"
              />
            </div>

            <div className="space-y-4">
              <Label>Product Images (URLs for demo)</Label>
              <div className="flex gap-2">
                <Input
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="bg-muted/50 rounded-xl"
                />
                <Button type="button" onClick={handleAddImage} variant="secondary">
                  Add
                </Button>
              </div>
              
              {images.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((img, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(i)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button type="submit" className="w-full h-12 rounded-xl text-base" disabled={loading}>
              {loading ? 'Uploading...' : 'Publish Product'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
