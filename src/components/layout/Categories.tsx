import { cn } from '@/lib/utils';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

const CATEGORIES = [
  'All',
  'PlugMarket',
  'HotPick NG',
  'Gadgets',
  'Fashion',
  'Home',
  'Beauty'
];

export function Categories() {
  const { selectedCategory, setSelectedCategory, priceRange, setPriceRange } = useStore();
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(priceRange);

  const handlePriceApply = () => {
    setPriceRange(localPriceRange);
  };

  return (
    <div className="w-full border-b bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/20">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="container mx-auto px-4 flex items-center w-max space-x-2 p-3">
          <Popover>
            <PopoverTrigger render={<Button variant="outline" size="sm" className="rounded-full px-4 gap-2 border-dashed" />}>
                <SlidersHorizontal className="h-4 w-4" />
                Price Filter
                {(priceRange[0] > 0 || priceRange[1] < 1000000) && (
                  <span className="ml-1 rounded-sm bg-secondary px-1 text-xs">Active</span>
                )}
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
              <div className="space-y-4">
                <h4 className="font-medium leading-none">Price Range (₦)</h4>
                <p className="text-sm text-muted-foreground">
                  Refine products by cost
                </p>
                <div className="pt-4">
                  <Slider
                    defaultValue={[0, 1000000]}
                    value={localPriceRange}
                    min={0}
                    max={1000000}
                    step={1000}
                    onValueChange={(val) => setLocalPriceRange(val as [number, number])}
                  />
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm font-medium">₦{localPriceRange[0].toLocaleString()}</span>
                    <span className="text-sm font-medium">₦{localPriceRange[1].toLocaleString()}</span>
                  </div>
                </div>
                <div className="pt-2">
                  <Button size="sm" className="w-full" onClick={handlePriceApply}>Apply Filter</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <div className="h-4 w-[1px] bg-border mx-2" />

          {CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'secondary'}
              size="sm"
              className={cn(
                "rounded-full px-6",
                selectedCategory !== category && "bg-muted/50 hover:bg-muted"
              )}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}
