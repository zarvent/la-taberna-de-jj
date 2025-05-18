
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
    <Card className="group flex flex-col h-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-out border border-border/70 hover:border-primary/50 transform hover:-translate-y-1">
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
            <Badge variant="secondary" className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1.5 rounded-full text-sm font-semibold flex items-center shadow-md border border-accent-foreground/20">
                <Star className="h-4 w-4 mr-1.5 fill-current" /> {store.rating.toFixed(1)}
            </Badge>
        )}
      </CardHeader>
      <CardContent className="p-5 flex-grow"> {/* Increased padding */}
        <CardTitle className="text-xl font-semibold text-primary group-hover:text-primary/90 transition-colors duration-300 mb-2 truncate leading-tight" title={store.name}>{store.name}</CardTitle> {/* Larger title */}
        <CardDescription className="text-base text-muted-foreground mb-2 flex items-start"> {/* Larger address text */}
          <MapPin className="h-5 w-5 mr-2 mt-0.5 shrink-0 text-accent" /> {store.address}
        </CardDescription>
        <CardDescription className="text-sm text-muted-foreground/90 flex items-center"> {/* Slightly larger hours text */}
          <Clock className="h-4 w-4 mr-2 shrink-0 text-accent" /> {store.hours}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-5 border-t bg-card/90 backdrop-blur-sm flex items-center justify-between">
        <div className="text-base text-muted-foreground flex items-center"> {/* Larger stock text */}
          <ShoppingBag className="h-5 w-5 mr-2 text-primary" />
          {totalStockItems > 0 ? `${totalStockItems} bebidas en stock` : "Consultar stock"}
        </div>
        <Button asChild size="default" variant="default" className="bg-primary hover:bg-primary/80 text-primary-foreground transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
          <Link href={`/stores/${store.id}`}>
            Ver Detalles <ExternalLink className="ml-2 h-4 w-4" /> {/* Slightly larger icon & margin */}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
