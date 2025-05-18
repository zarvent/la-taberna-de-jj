import Link from "next/link";
import Image from "next/image";
import type { Store } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star, ShoppingBag } from "lucide-react";

interface StoreCardProps {
  store: Store;
}

export function StoreCard({ store }: StoreCardProps) {
  const totalStockItems = store.inventory.reduce((sum, item) => sum + (item.stock > 0 ? 1 : 0), 0);
  const averageRating = store.rating || "N/A";

  return (
    <Card className="flex flex-col h-full overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0 relative">
        <Image
          src={store.photos[0] || `https://placehold.co/400x250.png`}
          alt={store.name}
          width={400}
          height={250}
          className="w-full h-48 object-cover"
          data-ai-hint="storefront shop"
        />
        {store.rating && (
            <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                <Star className="h-3 w-3 mr-1 fill-current" /> {store.rating.toFixed(1)}
            </div>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold text-primary mb-1 truncate" title={store.name}>{store.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-2 flex items-start">
          <MapPin className="h-4 w-4 mr-1 mt-0.5 shrink-0 text-accent" /> {store.address}
        </CardDescription>
        <CardDescription className="text-xs text-muted-foreground/80 flex items-center">
          <Clock className="h-3.5 w-3.5 mr-1.5 shrink-0 text-accent" /> {store.hours}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 border-t bg-secondary/10 flex items-center justify-between">
        <div className="text-sm text-muted-foreground flex items-center">
          <ShoppingBag className="h-4 w-4 mr-1.5 text-primary" />
          {totalStockItems} items in stock
        </div>
        <Button asChild size="sm" variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href={`/stores/${store.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
