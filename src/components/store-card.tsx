
import Link from "next/link";
import Image from "next/image";
import type { Store } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star, ShoppingBag, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StoreCardProps {
  store: Store;
  className?: string;
}

export function StoreCard({ store, className }: StoreCardProps) {
  const totalStockItems = store.inventory.reduce((sum, item) => sum + (item.stock > 0 ? 1 : 0), 0);

  return (
    <Card className={`group flex flex-col h-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-out border border-border/70 hover:border-primary/50 transform hover:-translate-y-1.5 hover:scale-[1.02] ${className}`}>
      <CardHeader className="p-0 relative">
        <div className="aspect-[16/10] w-full overflow-hidden bg-muted/30">
          <Image
            src={store.photos[0] || `https://placehold.co/400x250.png`}
            alt={store.name}
            width={400}
            height={250}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            data-ai-hint="storefront shop"
          />
        </div>
        {store.rating && (
            <Badge variant="secondary" className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-accent text-accent-foreground px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold flex items-center shadow-md border border-accent-foreground/20">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-1.5 fill-current group-hover:animate-icon-pop" /> {store.rating.toFixed(1)}
            </Badge>
        )}
      </CardHeader>
      <CardContent className="p-3 sm:p-4 flex-grow">
        <CardTitle className="text-md sm:text-lg font-semibold text-primary group-hover:text-primary/90 transition-colors duration-300 mb-1 sm:mb-1.5 truncate leading-tight" title={store.name}>{store.name}</CardTitle>
        <CardDescription className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-1.5 flex items-start">
          <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 mt-0.5 shrink-0 text-accent group-hover:animate-icon-pop" /> {store.address}
        </CardDescription>
        <CardDescription className="text-xs text-muted-foreground/90 flex items-center">
          <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1.5 sm:mr-2 shrink-0 text-accent group-hover:animate-icon-pop" /> {store.hours}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-3 sm:p-4 border-t bg-card/90 backdrop-blur-sm flex items-center justify-between">
        <div className="text-xs sm:text-sm text-muted-foreground flex items-center">
          <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 text-primary group-hover:animate-icon-pop" />
          {totalStockItems > 0 ? `${totalStockItems} en stock` : "Consultar"}
        </div>
        <Button asChild size="sm" variant="default" className="bg-primary hover:bg-primary/80 text-primary-foreground transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 sm:py-2 h-auto sm:h-9 group/button">
          <Link href={`/stores/${store.id}`}>
            Ver Detalles <ExternalLink className="ml-1 sm:ml-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5 group-hover/button:animate-icon-pop" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
