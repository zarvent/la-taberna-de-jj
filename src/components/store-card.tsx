import Link from "next/link";
import Image from "next/image";
import type { Store } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star, ShoppingBag, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StoreCardProps {
  store: Store;
}

export function StoreCard({ store }: StoreCardProps) {
  const totalStockItems = store.inventory.reduce((sum, item) => sum + (item.stock > 0 ? 1 : 0), 0);

  return (
    <Card className="group flex flex-col h-full overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border">
      <CardHeader className="p-0 relative">
        <div className="aspect-[16/10] w-full overflow-hidden">
          <Image
            src={store.photos[0] || `https://placehold.co/400x250.png`}
            alt={store.name}
            width={400}
            height={250}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            data-ai-hint="storefront shop"
          />
        </div>
        {store.rating && (
            <Badge variant="secondary" className="absolute top-2 right-2 bg-accent text-accent-foreground px-2.5 py-1 rounded-full text-xs font-semibold flex items-center shadow-sm">
                <Star className="h-3.5 w-3.5 mr-1 fill-current" /> {store.rating.toFixed(1)}
            </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold text-primary group-hover:text-primary/90 transition-colors mb-1.5 truncate" title={store.name}>{store.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-2 flex items-start">
          <MapPin className="h-4 w-4 mr-1.5 mt-0.5 shrink-0 text-accent" /> {store.address}
        </CardDescription>
        <CardDescription className="text-xs text-muted-foreground/80 flex items-center">
          <Clock className="h-3.5 w-3.5 mr-1.5 shrink-0 text-accent" /> {store.hours}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 border-t bg-card flex items-center justify-between">
        <div className="text-sm text-muted-foreground flex items-center">
          <ShoppingBag className="h-4 w-4 mr-1.5 text-primary" />
          {totalStockItems > 0 ? `${totalStockItems} bebidas en stock` : "Consultar stock"}
        </div>
        <Button asChild size="sm" variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href={`/stores/${store.id}`}>
            Ver Detalles <ExternalLink className="ml-1.5 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
